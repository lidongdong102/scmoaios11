/** 通讯录 */
GLOBAL.namespace("mb.vi");
/*待解决问题：
 * 
 */
mb.vi.contactDetail = function(options) {
	var defaults = {
		"sId":""//服务ID
	};
	this.opts = jQuery.extend(defaults,options);
	this.servId = this.opts.sId;
};
/*
 * 渲染列表主方法
 */
mb.vi.contactDetail.prototype.show = function() {
	this._initMainData();
	this._layout();
	this._render();
	
	var alreadyRendered = $.mobile.window.data("alreadyRendered");
	if (alreadyRendered) {
		this._refresh();
	} else {
		$.mobile.window.data("alreadyRendered" , true);
	}
	
	
	this._afterLoad();
};
mb.vi.contactDetail.prototype._initMainData = function() {
	//初始化人员数据
	this._data = this.opts.data;
//console.log("detail data" , this._data);
};

/*
 * 构建列表页面布局
 */
mb.vi.contactDetail.prototype._layout = function() {
	var _self = this;
	this.headerWrp = $("#contactDetail_header");
	this.listWrp = $("#contactDetailList");
	 
};
/*
 * 绑定数据
 */
mb.vi.contactDetail.prototype._render = function() {
	var _self = this;
	var data = this._data;
	
	var username = data["USER_NAME"];
	this.headerWrp.find("h1").html(username?username:"");
	
//	var imgPath = data["USER_IMG_SRC"] ? ScImgPath + "/file/" + data["USER_IMG_SRC"]  + "?size=160x160" : defaultBigProfile;
	var imgPath = data["USER_IMG_SRC"] ? ScImgPath + "/file/" + data["USER_IMG_SRC"].split(",")[0]  + "?size=160x160" : defaultBigProfile;
	//TODO 号码为空验证
	
	
	//TODO 号码为空验证
	this.listWrp.empty()
				.append("<li><a href='#'><img src='" + imgPath +"'>")
				.append("<a href='tel:"+data["USER_MOBILE"]+"' target='_blank' class='ui-btn ui-btn-inline sc-contact-call'>打电话</a>")
				.append("<a href='sms:"+data["USER_MOBILE"]+"' target='_blank' class='ui-btn ui-btn-inline sc-contact-msg'>发短信</a>")
				.append("</a></li>")
				.append("<li data-role='list-divider'>职务</li>")
				.append("<li><a href='#'>" + data["USER_POST"] + "</a></li>")
				.append("<li data-role='list-divider'>分机</li>")
				.append("<li><a href='#'>" + data["USER_OFFICE_PHONE"] + "</a></li>")
				.append("<li data-role='list-divider'>手机</li>")
				.append("<li><a href='#'>" + data["USER_MOBILE"] + "</a></li>")
				.append("<li data-role='list-divider'>Email</li>")
				.append("<li><a href='#'>" + data["USER_EMAIL"] + "</a></li>")
				.append("<li data-role='list-divider'>所在部门</li>")
				.append("<li><a href='#'>" + data["DEPT_NAME"] + "</a></li>"); 
};
 
mb.vi.contactDetail.prototype._refresh = function() {
	this.listWrp.listview().listview("refresh");
};
/*
 * 加载后执行
 */
mb.vi.contactDetail.prototype._afterLoad = function() {
	$.mobile.pageContainer.pagecontainer( "change","#contactDetail");
};
 