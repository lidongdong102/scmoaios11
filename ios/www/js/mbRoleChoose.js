
/** 角色 */
GLOBAL.namespace("mb.vi");
/*待解决问题：
 * 
 */

mb.vi.roleChoose = function(options) {
	
	var defaults = {
		"sId":"PT_DEPT_USER" //数据字典 ID 
			//将 数据字典的 一次装载层级 改为 0，否则查不出来子菜单
	};
	this.opts = $.extend(defaults,options);
	this.servId = this.opts.sId;
	this._personData = {};
	
};
/*
 * 渲染列表主方法
 */
mb.vi.roleChoose.prototype.show = function() {
	var _self = this;
	
	jQuery.mobile.changePage("#roleChoose");//打开角色页面
	
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
mb.vi.roleChoose.prototype._initMainData = function() {
	var _self = this;
	var cachedData = $.mobile.window.data("ROLE_CHOOSE");
	return Q(cachedData).then(function(data){
		if (data) {//有缓存则执行缓存
			_self._deptUserTreeData = data["CHILD"];
			_self._getUserData(data);
			return;
		} else {//没有缓存则 重新选择树
			return FireFly.getDict(_self.servId).then(function(result){
				_self._deptUserTreeData = result["CHILD"];
				//设置属性 _deptUserTreeData  值为 result["CHILD"]
				_self._getUserData(result);
				$.mobile.window.data("ROLE_CHOOSE",result);
			});
		}
	});
};
/*
 * 构建列表页面布局
 */
mb.vi.roleChoose.prototype._layout = function() {
	var _self = this;
	//获取 main.html 页面的 两个对象（绘制界面）
    this.contentWrp = $("#roleChoose_content");		 
    this.footerWrp = $("#roleChoose_footer");		
    
};
/*
 * 绑定数据
 */
mb.vi.roleChoose.prototype._render = function() {
	var _self = this;
	this.contentWrp.empty();//将 jQuery 清空
	
	console.log("this.contentWrp.children().length:" + this.contentWrp.children().length + "...");
	
	if(!this.contentWrp.children().length){//如果空，则执行
		
		//console.log("进来了＋1,gogogo");
		
		var $treeWrp = $("<div></div>").appendTo(this.contentWrp);//添加 标签
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
		
	    var numArr=[],//code
	    	nameArr=[];//name
		//var checks = _self.contentWrp.find(".bbit-tree-node-leaf .checkbox_true_full");
	    
	    //查询 所有 被勾选的 选项框（span） 的父元素（即div）
		var checks = _self.contentWrp.find(".checkbox_true_full").parent();
		console.log("checks:"+checks.length+".....");
		
//		var id = $(".checkbox_true_full").parent().attr("id");
//		var title = $(".checkbox_true_full").parent().attr("title");
//		var itemid = $(".checkbox_true_full").parent().attr("itemid");
//		console.log("id:" + id );
//		console.log("title:" + title );
//		console.log("itemid:" + itemid );
		
		//将已经选择的 数据 遍历
		$.each(checks , function(i , el) {
			var $parent = $(this),
				id = $parent.attr("itemid");
			
			console.log("$parent:" + $parent);
			console.log("id:" + id);
//			console.log("_personData:" + JsonToStr(_self._personData));
			console.log("_personData[id]:" + JsonToStr(_self._personData[id]));
			
			try{
				var num = _self._personData[id]["ID"],
				name = _self._personData[id]["NAME"];
			
				console.log("num", num);
				console.log("name", name);
				
				if($.trim(num)) {
					numArr.push(num);
					nameArr.push(name);
				}
			}catch(e){
				
			}
			
			
		});
		
		//获取 input 框
		//$("#roleName").data("roleName" , numArr.join(","));
		
		//将code值 和 name放到隐藏输入框中
		$("#roleCode").val(numArr.join(','));
		$("#roleName").val(nameArr.join(','));
		
		//给返回的数据添加到 input框中，如果超过三个，就 显示 “...和 n个 更多”
		var len = nameArr.length;
//		if (len > 3) {
//			$("#roleName").val(nameArr.slice(0,2).join(' ') + "...和" + (len-3)+"个更多");
//		}else{
//			$("#roleName").val(nameArr.join(' '));
//		}
//		console.log("numArr", numArr);
//		console.log("nameArr", nameArr);
		
		$.mobile.back(); 
	});
};
/**
 *  
 */
mb.vi.roleChoose.prototype._getUserData = function(rawData) {
	var _self = this;
	var child = rawData.CHILD;
	if (child) {
	    for (var i = 0, len = child.length; i < len; i++) {
	    	_self._getUserData(child[i]);
	    }
	} else {
		var id = rawData.ID;
//		console.log("执行id:"+id);
		_self._personData[id] = rawData;
	}
};
/*
 * 加载后执行
 */
mb.vi.roleChoose.prototype._afterLoad = function() {
	$.mobile.pageContainer.pagecontainer( "change","#roleChoose");
};
 


