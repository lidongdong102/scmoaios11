/** 通讯录 */
GLOBAL.namespace("mb.vi");
/*待解决问题：
 * 
 */
mb.vi.contacts = function(options) {
	var defaults = {
		"sId":""//服务ID
	};
	this.opts = $.extend(defaults,options);
	this.servId = this.opts.sId;
	this.model = this.model;
};
/*
 * 渲染列表主方法
 */
mb.vi.contacts.prototype.show = function() {
	var _self = this;
    $.mobile.loading( "show", {
        text: "加载中……",
        textVisible: true,
        textonly: false 
    });
	//获取登录用户的dept
	var odeptCode = System.getVar("@ODEPT_CODE@");
	_self._initMainData(odeptCode).then(function(){
        _self._layout();
        _self._render();
        _self._afterLoad();
    }).catch(function(err){
//        console.log(err);
    }).finally(function(){
        $.mobile.loading( "hide" );
    });  
	
};
mb.vi.contacts.prototype._initMainData = function(odeptCode) {
	 var _self = this;
	 //分公司不显示机构
	 return $.mobile.window.isBranch ? _self._initPersonData(odeptCode) : 
	    			Q.all([_self._initPersonData(odeptCode), _self._initOdeptData()]);
};
/**
 * 初始化人员数据
 */
mb.vi.contacts.prototype._initPersonData = function(odeptCode) {
	var _self = this; 
    //将人员数据进行缓存
	var cachedData = $.mobile.window.data("PERSON_"+odeptCode);
    return Q(cachedData).then(function(data){
        if(data) {
            _self._personData = data;
            return;
        } else {
            var cmpyCode = System.getUser("CMPY_CODE");
            //获取用户数据
            var param ={
                    "_SELECT_" : "USER_CODE,USER_NAME,USER_LOGIN_NAME,USER_SPELLING,USER_POST,ODEPT_CODE,DEPT_CODE,DEPT_NAME,DEPT_SORT,USER_OFFICE_PHONE,USER_MOBILE,USER_IMG_SRC,USER_EMAIL",
                    "_WHERE_" : "AND S_FLAG = 1 AND ODEPT_CODE='" + odeptCode +"' AND CMPY_CODE=" +cmpyCode
            };
            return FireFly.doAct(_self.servId, "finds", param).then(function(result){
                console.log("person result",result);
                if(result["_DATA_"].length > 0){
                    _self._personData = result["_DATA_"];
                    $.mobile.window.data("PERSON_" + odeptCode , result["_DATA_"]);
                }  
            });
        }
    });
};
/**
 * 初始化机构数据
 */
mb.vi.contacts.prototype._initOdeptData = function() {
	var _self = this;
    //将机构数据进行缓存
	var cachedOdeptData = $.mobile.window.data("ODEPT");
    return Q(cachedOdeptData).then(function(data){
        if(data) {
            _self._odeptData = data;
            return;
        } else {
            return FireFly.getDict("PT_ODEPT_ALL").then(function(result){
                _self._odeptData = result;
                $.mobile.window.data("ODEPT" , result);
            });
        }
    });
};


/*
 * 构建列表页面布局
 */
mb.vi.contacts.prototype._layout = function() {
	var _self = this;
	this.headerWrp = $("#contacts_header");
    this.contentWrp = $("#contacts_content");
    this.contactsAllWrp = $("#contactsList");			//该机构的全部人员
    this.contactsGroupWrp = $("#contactsGroup");     //该机构的全部分组
    if(!$.mobile.window.isBranch){//总公司显示机构
    	if(!$("#j-odeptPanel").length){
    		$("<a href='#odeptPanel' id='j-odeptPanel' class='ui-btn ui-btn-icon-left ui-btn-icon-notext ui-icon-list'>机构</a>").appendTo(this.headerWrp);
    	}
    	if(!$("#odeptPanel").length){//机构panel
    		this.odeptPanel=$("<div data-role='panel' id='odeptPanel' data-display='push' data-position='right' data-position-fixed='true'></div>").insertAfter(this.contentWrp);
    		this.odeptWrap = $("<ul data-role='listview' id='odeptList' data-inset='false' data-icon='false'></ul>").appendTo(this.odeptPanel);
    	}else{
    		this.odeptPanel = $("#odeptPanel");
    	    this.odeptWrap = $("#odeptList");					//所有机构
    	}
    }
};
/*
 * 绑定数据
 */
mb.vi.contacts.prototype._render = function() {
	var _self = this;
	//人员
    _self._renderPerson();
    //机构
    !$.mobile.window.isBranch && _self._renderOdept();
};
/*
 * 绑定人员数据
 */
mb.vi.contacts.prototype._renderPerson = function() {
	var _self = this;
	this.contactsAllWrp.empty();	   //该机构的全部人员
	this.contactsGroupWrp.empty();     //该机构的人员分组
	//人员
    if (_self._personData && _self._personData.length > 0) {
    	
    	//按部门排序
    	var contactGroupData = _self._personData.slice(0);
    	var group={},lastGroup;
    	$.each( contactGroupData , function(i , obj) {
    		//添加分组
    		if (!group[obj["DEPT_CODE"]]) {
    			
    			if (lastGroup && lastGroup != obj["DEPT_CODE"]) {
    				$("#contactGroup-" + lastGroup).data("list",group[lastGroup]);
    			}
    			
    			lastGroup = obj["DEPT_CODE"];
    			
    			group[obj["DEPT_CODE"]] = [];//obj["DEPT_NAME"];
    			//渲染collapsible
    			var tempDom = "<div data-role='collapsible' id='contactGroup-" + obj["DEPT_CODE"] + "' ><h2>" + obj["DEPT_NAME"] + "</h2>" + 
    						 	"<ul data-role='listview' id='listview-" + obj["DEPT_CODE"] + "' data-icon='false' data-swipable='true' style='position:relative;'></ul>" + 
    						 "</div>";
    			_self.contactsGroupWrp.append(tempDom);
    		} 
    		group[obj["DEPT_CODE"]].push(obj);
    	});
    	$("#contactGroup-" + lastGroup).data("list",group[lastGroup]);
    	 
    	//按名称排序
    	var contactAllData = _self._personData.slice(0).sort(_self._orderBy("USER_SPELLING" , false));
    	
    	//每页20条数据
    	var pageSize = 20;
    	
    	var totleSize = contactAllData.length;
    	
    	var totlePage = parseInt(totleSize / pageSize,10) + 1;
    	
    	//总页数
    	this.contactsAllWrp.data("totlepage" , totlePage);
    	
    	//当前页数
    	this.contactsAllWrp.data("currpage" , 0);
    	
    	var pager={};
    	
    	$.each( contactAllData , function(i , obj) {
    		//处于第几页
    		var pageIndex = parseInt(i/pageSize, 10) ;
    		if(!pager[pageIndex]){
    			pager[pageIndex] = [];
    		}
    		pager[pageIndex].push(obj);
    		
    		if( i < 20 ){
//	    		var imgPath = obj["USER_IMG_SRC"] ? ScImgPath + "/file/" +obj["USER_IMG_SRC"]  + "?size=32x32" : defaultSmallProfile;
    			var imgPath = obj["USER_IMG_SRC"] ? ScImgPath + "/file/" +obj["USER_IMG_SRC"].split(",")[0]  + "?size=32x32" : defaultSmallProfile;
	    		var $li = $("<li data-filtertext='"+ obj["USER_SPELLING"] +"'></li>");
	    			$li.data("detail" , obj);
		   		var $a = $("<a></a>").attr("href","#").appendTo($li); 
		   		$("<img class='ui-li-icon'/>").attr("src",imgPath).appendTo($a); 
		   		$("<h1></h1>").html(obj["USER_NAME"]).appendTo($a);
	    		_self.contactsAllWrp.append($li);
    		}
    	});
    	_self.contactsAllWrp.data("contactsPager",pager);
    	
    } else {//TODO 数据错误处理
    	
    }
};
/**
 * 绑定机构数据
 */
mb.vi.contacts.prototype._renderOdept = function() {
	var _self = this;
    //机构
    if (_self._odeptData) {
    	
    	//再次打开panel时,不再渲染
    	if(this.odeptWrap.children().length) {
    		return;
    	}
    	
    	var name = _self._odeptData["DICT_NAME"],
    		odeptArr = _self._odeptData["CHILD"] ;
    	this.odeptWrap.append("<li data-role='list-divider'>" + name + "</li>");	
    	$.each(odeptArr , function(i , obj) {
    		_self.odeptWrap.append("<li><a href='#' data-rel='close' data-odept-code='" + obj["ID"] + "'>" + obj["NAME"] + "</a></li>");
    	});
    	
    	/*_self.headerWrp.on("click","a.ui-icon-list",function(){
    		_self.odeptPanel.panel( "open" );
    	});*/
    	_self.odeptWrap.on( "vclick" , "a" , function( event) {
    		$.mobile.loading("show");
    		_self.odeptWrap.data("odeptCode",$(this).data("odeptCode"));
    	});
    	_self.odeptPanel.on( "panelbeforeclose", function( event, ui ) {
    		var odeptCode = _self.odeptWrap.data("odeptCode");
    		if(odeptCode) {
    			_self._reset(odeptCode).then(function(){
                    _self.odeptWrap.removeData("odeptCode");
                    $.mobile.loading("hide"); 
                });
    		}
		});
    }
};
mb.vi.contacts.prototype._reset = function(odeptCode) {
	 var _self = this;
     this.contactsAllWrp.empty();	   //该机构的全部人员
	 this.contactsGroupWrp.empty();    //该机构的全部分组
	 //重置人员和分组
	 return _self._initPersonData(odeptCode).then(function(){
        _self._renderPerson();
        _self._refresh();
     });
};

mb.vi.contacts.prototype._refresh = function() {
	this.contactsAllWrp.listview().listview("refresh");
	this.contactsGroupWrp.collapsibleset("refresh");
	this.contactsGroupWrp.find("ul").listview().listview("refresh");
};
/**
* 排序方法
* @method orderBy   
* @param {String} type 根据指定属性排序
* @param {Boolean} desc 是否降序 true:降序，false:升序
* @return{Function} 匿名的compare排序方法，供Array.sort调用
*/
mb.vi.contacts.prototype._orderBy = function(type,desc){
	return function(v1,v2){
		if(desc){
			return v2[type] > v1[type] ? 1 : -1;
		}else{
			return v2[type] < v1[type] ? 1 : -1;
		}
	};
}
/*
 * 加载后执行
 */
mb.vi.contacts.prototype._afterLoad = function() {
	$.mobile.pageContainer.pagecontainer( "change","#contacts",{transition:"slide"});
};
 
