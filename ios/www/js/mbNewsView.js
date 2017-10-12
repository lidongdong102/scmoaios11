/** 新闻浏览页面渲染引擎 */
GLOBAL.namespace("mb.vi");
mb.vi.newsView = function(options) {
	var defaults = {
		"id" :"newsview"
	};
	this.opts = $.extend(defaults,options);
	this.id = this.opts.id;
	this.servId = this.opts.sId;
	this.pkCode = this.opts.pkCode;
	this.headerTitle = this.opts.headerTitle;
	this._data = null;	
};
mb.vi.newsView.prototype.show = function( k) {
	var _self = this;
	$.mobile.loading( "show", {
		text: "加载中……",
		textVisible: true,
		textonly: false 
	});
	this._initMainData().then(function(){
		_self._layout();
		_self._render();
		_self._afterLoad();
	}).catch(function(err){
		// console.log(err);
	}).finally(function(){
		$.mobile.loading( "hide" );
	});
};
mb.vi.newsView.prototype._initMainData = function() {
	var _self = this;
	return FireFly.byId4Card(this.servId,this.pkCode).then(function(result){
		if(result){
			_self._data = result;
			_self.news = result["form"];
			if (result["file"] && result["file"]["_DATA_"].length > 0){
				_self.attachList = result["file"]["_DATA_"];
			}
		}
	});
};
mb.vi.newsView.prototype._layout = function() {
	this.pageWrp = $("#" + this.id );
	this.headerWrapper = $("#" + this.id + "_header");
    this.contentWrapper = $("#" + this.id + "_content");
};
mb.vi.newsView.prototype._render = function() {
	var _self = this,
	 	picArr = [],
		fileArr = [],
		hasFileFlag = false,
		hasPicFlag = false;
	
	//1.标题
	this.headerWrapper.find("h1").html(this.headerTitle);
	
	if (this.attachList) {//如果有附件
		//只取图片集
		$.each(this.attachList,function(i,obj){
			if(obj["FILE_CAT"]=='TUPIANJI'){
				hasPicFlag = true;
				var filename = obj["DIS_NAME"]? obj["DIS_NAME"] : obj["FILE_NAME"];
				picArr.push("<img src='"+ ScImgPath + "/file/" +obj["FILE_ID"] +"?mobile=1' alt='"+obj["FILE_NAME"]+"'/>");
			}
			if(obj["FILE_CAT"]=='FUJIAN'){
				hasFileFlag = true;
				var filename = obj["DIS_NAME"]? obj["DIS_NAME"] : obj["FILE_NAME"];
				fileArr.push("<a href='"+ ScImgPath + "/file/" +obj["FILE_ID"] +"?mobile=1' class='sc-file-link' data-filename='"+obj["FILE_NAME"]+"' data-ajax='false'>"+ filename +"</a>");
			}
		});
	}
	//1.1 标题
	var $title = $("<div class='sc-news-title'>"+this.news["NEWS_SUBJECT"]+"</div>").appendTo(this.contentWrapper);
	//1.2 时间
	var $time = $("<div class='sc-news-time'>发布日期: "+this.news["NEWS_TIME"]+"</div>").appendTo(this.contentWrapper);
	//2.内容
	this.contentWrapper.append(this.news["NEWS_BODY"]);
	//3.图片
	if(hasPicFlag) {
		this.contentWrapper.append("<hr/>图片集:<br/>");
		var $picgroup = $("<div class='sc-news-imgGroup'></div>").appendTo(this.contentWrapper);
			$picgroup.append(picArr.join(""));
	}
	//4.附件
	if(hasFileFlag) {
		this.contentWrapper.append("<hr/>附件:<br/>");
		var $filegroup = $("<div class='sc-file'></div>").appendTo(this.contentWrapper);
		$filegroup.append(fileArr.join(""));
		this.contentWrapper.append("<br/><br/>");
		this.contentWrapper.on("vclick","a.sc-file-link",function(event){
			event.preventDefault();
			event.stopImmediatePropagation();
			var url = $(this).attr("href"),
			    filename = $(this).attr("data-filename");
                               //FileHelper.download(url,filename);
                               var index = url.lastIndexOf(".") ;
                               var suffix = url.substring(index,url.replace('?mobile=1','').length);
                               if(suffix == ".docx" || suffix == ".xlsx" ){
                              // url = "http://xdoc.aliapp.com/xdoc?_format=html5&_fun=to&_xdoc=" + url;
							   url = "http://www.xdocin.com/xdoc?_format=html&_xformat=*&_fun=to&_xdoc=" + url;
							  
                               }
                               var ref = window.open(encodeURI(url), '_blank', 'location=no,enableViewportScale=yes');
		});
	}
	this.contentWrapper.find("img").each(function(){
		var osrc = $(this).attr("src");
		if(!osrc.match(/http/gi)) {
			var src =  ScImgPath + osrc;
			$(this).attr("src",src);
		} 
	});
};
mb.vi.newsView.prototype._afterLoad = function() {
	$.mobile.pageContainer.pagecontainer( "change", this.pageWrp );
};
 