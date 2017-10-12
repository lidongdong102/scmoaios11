/** 列表选择页面渲染引擎 */
GLOBAL.namespace("mb.vi");
/*待解决问题：
 * 
 * */
mb.vi.selectList = function(options) {
	var defaults = {
		"id":options.dictId,
		"dictId":"",//服务ID
		"pCon":null,
		"linkWhere":"",
		"extWhere":"",
		"showSearchFlag":"true",
		"replaceData":null,
		"replaceCallBack":null,
		"parHandler":null//主卡片的句柄,
	};
	this.opts = jQuery.extend(defaults,options);
    this._pCon = this.opts.pCon;
	this._parHandler = this.opts.parHandler;
	this._replaceData = this.opts.replaceData;
	this._replaceCallBack = this.opts.replaceCallBack;
    this.id = this.opts.id;
    this.title = "字典选择";

	this.dictId = this.opts.dictId;
	this._searchWhere = "";//查询条件
	this._extendWhere = "";//扩展条件

	this._extWhere = (this.opts.extWhere && this.opts.extWhere != "undefined") ?  this.opts.extWhere : "";     
	this._height = "";
	this._width = "";
	this._data = null;	
};
/*
 * 渲染列表主方法
 */
mb.vi.selectList.prototype.show = function(event) {
	this._initMainData();
	this._layout();
	this._bldList();
	this._afterLoad();
};
/*
 * 构建表格，包括标题头和数据表格
 */
mb.vi.selectList.prototype._bldWin = function(event) {
	/*var _self = this;
	jQuery("#" + this.id).empty();
	jQuery("#" + this.id).dialog("destroy");
	//1.构造dialog
	this.winDialog = jQuery("<div></div>").addClass("mbDialog").attr("id",this.id).attr("title",this.title);
	this.winDialog.appendTo(jQuery("body"));
	//@TODO:显示位置处理
	this.hei = 500;
    this.wid = "80%";
    var posArray = [];
    if (event) {
	    var cy = event.clientY;
	    posArray[0] = "";
	    posArray[1] = cy-100;
    }
	jQuery("#" + this.id).dialog({
		autoOpen: false,
		height: _self.hei,
		width: _self.wid,
		modal: true,
		resizable:false,
		position:posArray
	});
    jQuery("#" + this.id).dialog("open");
    jQuery(".ui-dialog-titlebar").last().css("display","block");//设置标题显示
    var obj = jQuery("#" + this.id);
    obj.parent().find(".ui-dialog-titlebar-close").hide();
    var mbClose = jQuery("<a></a>").addClass("mbClose mb-radius-1em");
    var inner = jQuery("<span></span>").addClass("mbClose-inner").appendTo(mbClose);
    var text = jQuery("<span>关闭</span>").addClass("mbClose-text").appendTo(inner);
    var icon = jQuery("<span>&nbsp;</span>").addClass("mbClose-icon mb-icon-close mb-radius-18").appendTo(inner);
    mbClose.bind("click",function() {
    	_self._close();
    });
    mbClose.appendTo(obj.parent().find(".ui-dialog-titlebar"));*/
};
mb.vi.selectList.prototype._initMainData = function() {
	var tempData = {};
	if (this._replaceData) {
	    this._name = "选择";
	    this._data = this._replaceData;
	} else {
		tempData = FireFly.getDict(this.dictId);//设置树的初始化数据
		this._data = tempData;
	}
};
/*
 * 刷新
 */
mb.vi.selectList.prototype.refresh = function() {
	var _self = this;
};
/*
 * 构建列表页面布局
 */
mb.vi.selectList.prototype._layout = function() {
	var _self = this;
	this.headerWrapper = jQuery("#" + this.dictId + "_header");
    this.contentWrapper = jQuery("#" + this.dictId + "_content");
};

mb.vi.selectList.prototype._bldList = function() {
	var _self = this;
	//替换标题
	var root = this._data[0];
	this._name = root.NAME;
	
	this.headerWrapper.find("h1").html(this._name);
	this.ul = jQuery("<ul></ul>").addClass("mbDialog-ul");
    this._bldListLi(root);
    
    this.ul.appendTo(this.contentWrapper);
    
//    var hei = this.ul.height() + 150;
//    jQuery("#" + this.id).height(hei);
};
var liCount= 0;
mb.vi.selectList.prototype._bldListLi = function(data) {
	var _self = this;
	var id = data.ID;
	var name = data.NAME;
	var child = data.CHILD;
	var pId = data.PID;
	if (child) {
		if (child.length > 0) {
			liCount++;
			var marginLeft = "mbDialog-marginLeft-" + liCount;
			var folder = "<span class='mbDialog-node-folder mb-icon-folder'></span>" ;
			var li = jQuery("<li></li>").addClass("mbDialog-li mbDialog-node " + marginLeft);
			li.html(folder + name);
			li.bind("click",function() {alert(123);
				_self._parHandler.setValue(id,name);
				_self._close();
			});
			li.appendTo(this.ul);			
		}
		var i = 0;
		for (i; i < child.length;i++) {
			this._bldListLi(child[i]);
		}
	} else {
		liCount++;
		var marginLeft = "mbDialog-marginLeft-" + liCount;
		var leaf = "<span class='mbDialog-node-folder mb-icon-leaf'></span>" ;
		var li = jQuery("<li></li>").addClass("mbDialog-li mbDialog-leaf " + marginLeft);
		li.html(leaf + name);
		li.bind("click",function() { 
			if (_self._replaceCallBack) { //有替换的回调函数
			    var ids = [];
			    ids.push(id);
			    var names = [];
			    names.push(name);
		        var backFunc = _self._replaceCallBack;
		        backFunc.call(_self.opts.parHandler,ids,names);
		    } else {
		    	_self._parHandler.setValue(id,name);
		    	_self._close();
		    }
		});
		liCount = 0;
		return li.appendTo(this.ul);
	}

};
mb.vi.selectList.prototype._openLayer = function(pkCode) {

};
/*
 * 构建列表页面布局
 */
mb.vi.selectList.prototype.morePend = function(options) {
	var _self = this;

};
/*
 * 构建按钮条
 */
mb.vi.selectList.prototype._bldBtnBar = function() {
	var _self = this;

};

/*
 * 构建列表页面布局
 */
mb.vi.selectList.prototype._afterLoad = function() {


};
mb.vi.selectList.prototype._getUnId = function(id) {
    var dictId = this._dictId;
    return dictId + "-dictList-" + id;
};
/*
 * 加载后执行
 */
mb.vi.selectList.prototype._close = function() {
	var _self = this;
	if (this._parHandler) {
		//this._parHandler.setActive();
	}
//	jQuery("#" + _self.id).remove();
	jQuery("#" + _self.id).dialog("close");
};
