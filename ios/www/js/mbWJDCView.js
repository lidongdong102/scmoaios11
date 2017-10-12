/** 新闻浏览页面渲染引擎 */
GLOBAL.namespace("mb.vi");
mb.vi.wjdcView = function(options) {

	var defaults = {
		"id" :"WJDCview"
	};
	this.opts = $.extend(defaults,options);
	this.id = this.opts.id;
	this.servId = this.opts.sId;
	this.pkCode = this.opts.pkCode;
	this.headerTitle = this.opts.headerTitle;
	this._data = null;
    this.testState = this.opts.testState;
};
mb.vi.wjdcView.prototype.show = function( k) {

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
mb.vi.wjdcView.prototype._initMainData = function() {
	var _self = this;
    var showType = "";
    if(_self.testState == "10"){
        showType = "DT";
    }else{
        showType = "";
    }
	return FireFly.doAct("QA_WJDC_TEST_PAPER","getWjdcArea",{"_PK_":this.pkCode,"showType":showType}).then(function(result){
		if(result){
			_self._data = result;

		}
	});
};
mb.vi.wjdcView.prototype._layout = function() {
	this.pageWrp = $("#" + this.id );
	this.headerWrapper = $("#" + this.id + "_header");
    this.contentWrapper = $("#" + this.id + "_content");
};
mb.vi.wjdcView.prototype._render = function() {
    var _self = this;
    if(this.contentWrapper != undefined){
	    this.contentWrapper.empty();
	};

    this.contentWrapper.append(_self._data._DATA_._HTML_);
    this.contentWrapper.enhanceWithin();
};
mb.vi.wjdcView.prototype._afterLoad = function() {
	$.mobile.pageContainer.pagecontainer( "change", this.pageWrp );
};
 
