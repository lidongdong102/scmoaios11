/** 列表页面渲染引擎 */
GLOBAL.namespace("mb.vi");

mb.vi.listView = function(options) {
    var defaults = {
        "id":"listview",
        "sId":"",//服务ID
        "aId":"", //操作ID
        "pCon":null,
        "pId":null,
        "extWhere":"",
        "type":null,
        "parHandler":null,//主卡片的句柄,
        "readOnly":false//页面只读标识
    };
    this.opts = jQuery.extend(defaults,options);
    this.id = this.opts.id;
    this.servId = this.opts.sId;
    this.headerTitle = this.opts.headerTitle;
    this._data = null;
    this._extendWhere = this.opts.extWhere;//扩展条件
    this._readOnly = this.opts.readOnly;
    this._params = this.opts.params || "";
    this._secondStep = this.opts.secondStep;//三级页面打开类型：card | 普通页面
    this.testState = this.opts.TEST_STATE;
    this.topTilte = null;
    this.PAGE = {};
    
};
/*
 * 渲染列表主方法
 */
mb.vi.listView.prototype.show = function() {
    var _self = this;
    var dfd = $.Deferred();
    _self._layout();
    _self._afterLoad();
    $.mobile.loading( "show", {
                     text: "加载中……",
                     textVisible: true,
                     textonly: false
                     });
    _self._initMainData().then(function(){
                               _self._bldGrid();
                               },function(reason){
                               console.log(reason);
                               }).catch(function(exception){
                                        console.log(exception);
                                        }).finally(function(){
                                                   $.mobile.loading( "hide" );
                                                   });
    
};
mb.vi.listView.prototype._initMainData = function() {
    var _self = this;
    function getServData(){
        return FireFly.getCache(_self.servId, FireFly.servMainData).then(function(result){
                                                                         //获取表结构
                                                                         _self._data = result;
                                                                         //服务名称
                                                                         _self.servName = result["SERV_NAME"];
                                                                         });
    }
    function getPageData(){
        //获取表数据
        var options = {
            "_PAGE_":{"SHOWNUM":"20"}
        };
        if (_self._extendWhere.length > 0) {
            options["_extWhere"] = _self._extendWhere;
        }
        //获取表数据
        return FireFly.getPageData(_self.servId,options).then(function(result){
                                                              _self._listData = result;
                                                              });
    }
    
    //	return Q.all([getServData(), getPageData()]);
    return getServData().then(getPageData);
};
/*
 * 构建列表页面布局
 */
mb.vi.listView.prototype._layout = function() {
    var _self = this;
    this.pageWrp = jQuery("#" + this.id);
    this.headerWrp = jQuery("#" + this.id + "_header");
    this.headerWrp.find("h1").html(this.headerTitle);
    this.contentWrp   = jQuery("#" + this.id + "_content");
    this.contentWrp.empty();
};

/*
 * 构建列表页面布局
 */
mb.vi.listView.prototype._bldGrid = function() {
    var temp = {"id":this.servId,"mainData":this._data,"parHandler":this};
    temp["listData"] = this._listData;
    temp["showLeftTypeImg"] = this.opts.showLeftTypeImg;
    temp["TEST_STATE"] = this.testState;
    
    this.grid = new mb.ui.grid(temp);
    this.grid.render();
    
    this.grid.click(this._openLayer, this);
};
mb.vi.listView.prototype._openLayer = function(pkCode, node) {
    var param={},data={};
    if (this._secondStep == "card") {
        data["sId"] 	 = node["SERV_ID"];
        data["pkCode"]   = node["TODO_OBJECT_ID1"];
        data["ownerCode"] = node["OWNER_CODE"];
        if(node["TODO_CATALOG"] == 2){
            data["sendId"] = node["TODO_OBJECT_ID2"];
        }else{
            data["niId"] = node["TODO_OBJECT_ID2"];
        }
        data["readOnly"] = false;
        data["pId"] = pkCode;
        data["act"] = UIConst.ACT_CARD_READ;
        console.log(data);
        (function(params){
         var cardView = new mb.vi.cardView(params);
         cardView.show();
         }(data));
    } else if (this._secondStep == "toread") {
        data["sId"] 	 = node["SERV_ID"];
        data["pkCode"]   = node["TODO_OBJECT_ID1"];
        data["ownerCode"] = node["OWNER_CODE"];
        
        data["readOnly"] = false;
        data["pId"] = pkCode;
        data["act"] = UIConst.ACT_CARD_READ;
        (function(params){
         var cardView = new mb.vi.cardView(params);
         cardView.show();
         }(data));
    } else if (this._secondStep == "unfinish") {
        data["sId"] 	 = node["SERV_ID"];
        data["pkCode"]   = node["DATA_ID"];
        data["ownerCode"] = node["S_USER"];
        data["pId"] = pkCode;
        data["readOnly"] = false;
        data["act"] = UIConst.ACT_CARD_READ;
        (function(params){
         var cardView = new mb.vi.cardView(params);
         cardView.show();
         }(data));
    } else if (this._secondStep == "readNews") {
        data["sId"] 	 = this.servId;
        data["pkCode"]   = pkCode;
        data["headerTitle"] = this.headerTitle;
        (function(params){
         var newsView = new mb.vi.newsView(params);
         newsView.show();
         }(data));
    } else if (this._secondStep == "chain"){//chain  党群工作
        data["sId"] 	 = "SY_COMM_INFOS_VIEW";
        data["secondStep"]   = "readNews";
        data["headerTitle"] = node["CHNL_NAME"];
        data["extWhere"]   = "AND CHNL_ID ='" + pkCode+"'";
        (function(params){
         var listview = new mb.vi.listView(params);
         listview.show();
         }(data));
    }else if (this._secondStep == "readDCWJ"){
            data["sId"] 	 = this.servId;
            data["pkCode"]   = pkCode;
            data["headerTitle"] = this.headerTitle;
            data["testState"] = node.TEST_STATE;
            (function(params){
             var wjdcView = new mb.vi.wjdcView(params);
             wjdcView.show();
             }(data));
    }
};
/*
 * 构建列表页面布局
 */
mb.vi.listView.prototype.morePend = function(options) {
    var _self = this;
    if (options && options._PAGE_) {
        _self.PAGE["_PAGE_"] = options._PAGE_;
    }
    var data = {};
    if (this._extendWhere.length > 0) {
        data["_extWhere"] = this._extendWhere;
    }
    data = jQuery.extend({},_self.PAGE,data);//合并分页信息
    if (options && options._NOPAGEFLAG_ && (options._NOPAGEFLAG_ == "true")) {//删除分页信息
        delete data._PAGE_;
        delete data._NOPAGEFLAG_;
    }
    
    //this._listData = FireFly.getPageData(this.servId,data);
    FireFly.getPageData(_self.servId,data).then(function(result){
                                                _self.grid._morePend(result);
                                                });
    this.grid.click(this._openLayer, this);
    this._afterLoad();
};
/*
 * 构建列表页面布局
 */
mb.vi.listView.prototype._afterLoad = function() {
    $.mobile.pageContainer.pagecontainer( "change",this.pageWrp);
};
/*
 * 刷新
 */
mb.vi.listView.prototype.refresh = function() {
    var _self = this;
    this.gridContainer.empty();
    this._bldGrid();
};
/*
 * 不同的应用跳转方式的处理
 */
mb.vi.listView.prototype._guideTo = function(param) {
    
};
