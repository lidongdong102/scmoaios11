/** 通讯录 */
GLOBAL.namespace("mb.vi");
/*待解决问题：
 * 
 */
mb.vi.contactsChoose = function(options) {
	var defaults = {
		"sId":"PT_DEPT_USER" //服务ID
	};
	this.opts = $.extend(defaults,options);
	this.servId = this.opts.sId;
	this._personData = {};
};
/*
 * 渲染列表主方法
 */
mb.vi.contactsChoose.prototype.show = function() {
	var _self = this;
	$.mobile.loading( "show", {
		text: "加载中……",
		textVisible: true,
		textonly: false 
	});
	//获取登录用户的dept
	this._initMainData().then(function(){
		_self._layout();
		_self._render();
		_self._afterLoad();
	}).catch(function(err){
//		console.log(err);
	}).finally(function(){
		$.mobile.loading( "hide" );
	}); 
};
mb.vi.contactsChoose.prototype._initMainData = function() {
	var _self = this;
	var cachedData = $.mobile.window.data("PERSON_CHOOSE");
	return Q(cachedData).then(function(data){
		if (data) {
			_self._deptUserTreeData = data["CHILD"];
			_self._getPersonData(data);
			return;
		} else {
			return FireFly.getDict(_self.servId).then(function(result){
				_self._deptUserTreeData = result["CHILD"];
				_self._getPersonData(result);
				$.mobile.window.data("PERSON_CHOOSE",result);
			});
		}
	});
};
/*
 * 构建列表页面布局
 */
mb.vi.contactsChoose.prototype._layout = function() {
	var _self = this;
    this.contentWrp = $("#contactsChoose_content");		 
    this.footerWrp = $("#contactsChoose_footer");		
    
};
/*
 * 绑定数据
 */
mb.vi.contactsChoose.prototype._render = function() {
	var _self = this;
	this.contentWrp.empty();
	if(!this.contentWrp.children().length){
		var $treeWrp = $("<div></div>").appendTo(this.contentWrp);
		var extendTreeSetting ={
				cascadecheck: true,  
				showcheck: true
		};
		extendTreeSetting["data"] = this._deptUserTreeData;
		
		$treeWrp.treeview(extendTreeSetting);
	}
	
	//确认
    this.footerWrp.on("vclick",".js-sc-save",function(event){
		event.preventDefault();
	    event.stopImmediatePropagation();
		
	    var numArr=[],
	    	nameArr=[];
		var checks = _self.contentWrp.find(".bbit-tree-node-leaf .checkbox_true_full");
		
		
		$.each(checks , function(i , el) {
			var $parent = $(this).parent(),
				id = $parent.attr("itemid");
				var num = _self._personData[id]["USER_MOBILE"],
					name = _self._personData[id]["NAME"];
			if($.trim(num)) {
				numArr.push(num);
				nameArr.push(name);
			}
		});
		
//		console.log("numArr", numArr,"nameArr", nameArr);
		
		$("#receivers").data("receivers" , numArr.join(","));
		
		var len = nameArr.length;
		if (len > 3) {
			$("#receivers").val(nameArr.slice(0,2).join(' ') + "...和" + (len-3)+"个更多");
		}else{
			$("#receivers").val(nameArr.join(' '));
		}
		$.mobile.back(); 
	});
};
/**
 *  
 */
mb.vi.contactsChoose.prototype._getPersonData = function(rawData) {
	var _self = this;
	var child = rawData.CHILD;
	if (child) {
	    for (var i = 0, len = child.length; i < len; i++) {
	    	_self._getPersonData(child[i]);
	    }
	} else {
		var id = rawData.ID;
		_self._personData[id] = rawData;
	}
};
/*
 * 加载后执行
 */
mb.vi.contactsChoose.prototype._afterLoad = function() {
	$.mobile.pageContainer.pagecontainer( "change","#contactsChoose");
};
 