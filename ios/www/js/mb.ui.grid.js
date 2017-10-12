/** 表格grid组件 */
GLOBAL.namespace("mb.ui");
mb.ui.grid = function(options) {
	var defaults = {
        "id":options.sId + "mbGrid",
        "parHandler":null

	};	
	this._opts = jQuery.extend(defaults,options);
	this._id = this._opts.id;
	this._parHandler = this._opts.parHandler;
	this._pCon = this._parHandler.contentWrp;
    
	//@TODO:将数据获取放到view里
	this._lData =  options.listData._DATA_ || {};
	this._lPage = options.listData._PAGE_ || {};
	this._data = options.mainData || {};
	this._cols = options.listData._COLS_ || {};
	this._items = this._data.ITEMS;

	
    this.lTitle = UIConst.ITEM_MOBILE_LTITLE; 					/* 1移动列表标题 */
    this.lItem = UIConst.ITEM_MOBILE_LITEM;    					/* 2移动列表项 */
    this.cItem = UIConst.ITEM_MOBILE_CITEM;					    /* 3移动卡片项 */
    this.cHidden = UIConst.ITEM_MOBILE_CHIDDEN;    				/* 9移动卡隐藏项 */
    this.lTime = UIConst.ITEM_MOBILE_LTIME;					    /* 4列表时间项 */
    this.lImg = UIConst.ITEM_MOBILE_LIMG;					    /* 5列表图片项 */
    
    this.lData = {};//以pk为key的行数据集合
};
/*
 * 表格渲染方法，入口
 */
mb.ui.grid.prototype.render = function() {
	var _self = this;
    if(this._id == "QA_WJDC_TEST_PAPER"){
        var qaState = jQuery("<div class='qa-wjdc-state'></div>");
        var finish = jQuery("<div class='text_style right-radius'>已完结</div>");
        var unfinish = jQuery("<div class='text_style left-radius'>未完结</div>");
        qaState.append(unfinish).append(finish).appendTo(this._pCon);
        if(this._opts.TEST_STATE && this._opts.TEST_STATE == "10"){
            finish.addClass("finish");
            unfinish.addClass("unfinish");
        }else{
            unfinish.addClass("finish");
            finish.addClass("unfinish");
        }
        finish.unbind("click").bind("click",function(){
                                    var data = {};
                                    data["nextStep"] = "listview";
                                    data["sId"] = "QA_WJDC_TEST_PAPER";
                                    data["extWhere"] = " and TEST_STATE != '10'";
                                    data["secondStep"] = "readDCWJ";
                                    data["icon"] = "txl";
                                    data["opts"] = {"showLeftTypeImg": "1"};
                                    data["headerTitle"] = "问卷调查";
                                    data["TEST_STATE"] = "30";
                                    var listview = new mb.vi.listView(data);
                                    listview.show();
                                    
//                                    finish.removeClass("finish").addClass("unfinish");
//                                    unfinish.removeClass("unfinish").addClass("finish");
                                    });
        unfinish.unbind("click").bind("click",function(){
                                      var data = {};
                                      data["nextStep"] = "listview";
                                      data["sId"] = "QA_WJDC_TEST_PAPER";
                                      data["extWhere"] = " and TEST_STATE = '10'";
                                      data["secondStep"] = "readDCWJ";
                                      data["icon"] = "txl";
                                      data["opts"] = {"showLeftTypeImg": "1"};
                                      data["headerTitle"] = "问卷调查";
                                      data["TEST_STATE"] = "10";
                                      var listview = new mb.vi.listView(data);
                                      listview.show();
//                                      unfinish.removeClass("finish").addClass("unfinish");
//                                      finish.removeClass("unfinish").addClass("finish");
                                      });
    }
	this._bldGrid().appendTo(this._pCon);
	this._bldPage().appendTo(this._pCon);
	this._afterLoad();
};
/*
 * 构建表格，包括标题头和数据表格
 */
mb.ui.grid.prototype._bldGrid = function() {
	this.listViewWrp = jQuery("<ul data-role='listview' data-inset='true'></ul>").attr("id",this._id);
	this.listViewWrp.append(this._bldItems());

	return this.listViewWrp;
};
/*
 * 构建表格体
 */
mb.ui.grid.prototype._bldItems = function() {
	var _self = this;
	var preAllNum = parseInt(this._lPage.SHOWNUM)*(parseInt(this._lPage.NOWPAGE)-1);
	var trs = [];
	var excludeServ={
			OA_WJDC_TEMP_SY :true,
			OA_WJDC_TEST_PAPER :true,
			OA_WJDC_TEMP_KH :true,
			OA_WJDC_TEST_PAPER_KH :true
	}
	jQuery.each(this._lData,function(i , obj)  {
		var nextPageNum = preAllNum + i;
		_self.lData[obj._PK_] = obj;
		if (!excludeServ[obj.SERV_ID]) {//暂时屏蔽问卷调查
			trs.push("<li id='"+ obj._PK_ +"' serv='"+obj.SERV_ID+"'>");
			trs.push(_self._bldBlock(nextPageNum, i, obj));
			trs.push("</li>");
		}
	});	

	return trs.join("");
};
/*
 * 构建表格体区块
 */
mb.ui.grid.prototype._bldBlock = function(nextPageNum, index, trData) {
	var _self = this;
	
	var tdRight = [], 
		titleArr = [], 	 // 标题
		summaryArr = [], // 简介
		timeArr = [],    // 时间
		imgArr = [];     // 图片
	 
	jQuery.each(this._cols, function(i, m) {
        var itemCode = m.ITEM_CODE;
        var itemName = m.ITEM_NAME;
        var listFlag = m.ITEM_LIST_FLAG;
        
        var value = trData[itemCode];
        
        if (listFlag == 1) {//是否显示在列表中
        	//通过item获取cols的详细信息
        	var code = itemCode;
        	var _code = "";
        	if (itemCode.indexOf("__NAME") > 0) {
        		var code = itemCode.substring(0,itemCode.indexOf("__NAME"));
        		_code = code;
        	}
        	if (itemCode.indexOf("__IMG") > 0) {
        		return true;
        	}
        	var tempN = _self._items[code];	
        	
        	var mbType = tempN.ITEM_MOBILE_TYPE;
        	if (mbType == _self.lTitle) {//标题项
        		titleArr.push("<h2 ");
        		if (_code.length > 0) {
        			titleArr.push(" _code='");
        			titleArr.push(_code);
        			titleArr.push("'");
        		}
        		titleArr.push(">");
        		titleArr.push(value);
        		titleArr.push("</h2>");
        	} else if (mbType == _self.lItem) {//列表项
        		summaryArr.push("<p");
        		if (_code.length > 0) {
        			summaryArr.push(" _code='");
        			summaryArr.push(_code);
        			summaryArr.push("'");
        		}
        		summaryArr.push(">");
        		summaryArr.push(value);
        		summaryArr.push("</p>");
        	}  else if (mbType == _self.lTime) {//时间差项
    			value = _self._timeDiff(value);
    			timeArr.push("<p code='"+ itemCode +"' class='ui-li-aside'>"+value+"</p>");
    		} else if (mbType == _self.lImg) {//图片显示项
    			if (itemCode.indexOf("__NAME") > 0) {
    				var temp = trData[code + "__IMG"];
    				var array = temp.split(";");
    				var node = array[0].split(",");
    				var imgId = node[0];
    				var imgName = node[2];
    				var src = FireFly.getContextPath() + "/file/" + imgId + "?size=80X80";
    				if (imgId.length == 0) {
    					src = FireFly.getContextPath() + "/sy/theme/default/images/mb/default.png?size=80X80";
    				}
    				imgArr.push("<img src='");
    				imgArr.push(src);
    				imgArr.push("'/>");
 				
    			}  else {
    				var temp = trData[code];
    				var array = temp.split(";");
    				var node = array[0].split(",");
    				var imgId = node[0];
    				var imgName = node[2];
    				var src = FireFly.getContextPath() + "/file/" + imgId + "?size=80X80";
    				if (imgId.length == 0) {
    					src = FireFly.getContextPath() + "/sy/theme/default/images/mb/default.png?size=80X80";
    				}
    				imgArr.push("<img class='mbGrid-td-img mb-bottom-right-radius-6' src='");
    				imgArr.push(src);
    				imgArr.push("'/>");
    			}
    		}
        }
	});
 
	tdRight.push("<a href='#'>");
	// 除了tilte 必须在summary 、time之前  , img 无顺序和位置要求
	tdRight.push(titleArr.join(""));
	tdRight.push(summaryArr.join(""));
	tdRight.push(timeArr.join(""));
	tdRight.push(imgArr.join(""));
	tdRight.push("</a>");

	return tdRight.join("");
};
/*
 * 构建翻页
 */
mb.ui.grid.prototype.getBlocks = function() {
	var _self = this;
	return this.listViewWrp.find("li");
};
/*
 * 行点击事件,供外部调用
 */
mb.ui.grid.prototype.click = function(func, parSelf) {
	var _self = this;
	this.listViewWrp.on("vclick", "li", function(event) {
		event.preventDefault();
	    event.stopImmediatePropagation();
		var pkCode = $(this).attr("id");
		func.call(parSelf, pkCode, _self.lData[pkCode]);
	    return false; 
	});
};
/*
 * 构建翻页
 */
mb.ui.grid.prototype._bldPage = function() {
	var _self = this;
	this.more = jQuery("<div></div>").addClass("mbGrid-more");
	this.more.html("<span>查看更多</span>");
	this.more.bind("vclick",function(enent) {
		event.preventDefault();
		event.stopImmediatePropagation();
		_self._nextPage();
		return false;
	});
	jQuery("<span></span>").addClass("mbGrid-more-icon mb-down-nav").appendTo(this.more);
	return this.more;
};
/*
 * 加载完毕提示
 */
mb.ui.grid.prototype._recordOverTip = function() {
	var _self = this;
	this.overTip = jQuery("<div></div>").addClass("mbGrid-overTip");
	var dataLen = this._lData.length || 0;
	var tipText = "全部数据已加载！";
	if (dataLen == 0) {
		tipText = "无相关记录！";
	}
	this.overTip.text(tipText);
	var toTop = $("<span>回到顶部</span>").addClass("mbGrid-toTop").appendTo(this.overTip);
	toTop.bind("tap",function() {
		$.mobile.silentScroll(0)
	});
	return this.overTip.appendTo(this._pCon);
};
/*
 * 下一页
 */
mb.ui.grid.prototype._nextPage = function() {
	var nextPage = parseInt(this._lPage.NOWPAGE) + 1;
	var pages = parseInt(this._lPage.PAGES);
	this._lPage.NOWPAGE = "" + ((nextPage > pages) ? pages:nextPage);
	var data = {"_PAGE_":this._lPage};
    this._parHandler.morePend(data);
};
/*
 * 将更多添加到列表
 */
mb.ui.grid.prototype._morePend = function(listData) {
	this._lData =  listData._DATA_ || {};
	this._lPage = listData._PAGE_ || {};
	this.listViewWrp.append(this._bldItems());
	this.listViewWrp.listview("refresh");
	this._afterLoad();
};
/*
 * 加载后执行
 */
mb.ui.grid.prototype._afterLoad = function() {
	var _self = this;
    var nowPage = this._lPage.NOWPAGE;
    var pages = this._lPage.PAGES;
    if (nowPage == pages) {
    	_self.more.hide();
    	_self._recordOverTip();
    }
    this.listViewWrp.listview().listview("refresh");
};
/*
 * 获取时间差
 */
mb.ui.grid.prototype._timeDiff = function(time) {
	var res = "";
	res = -rhDate.dateDiff("d",time);
    if (res == 0) {//当天
    	res = -rhDate.dateDiff("h",time);
    	if (res == 0) {//当小时
    		res = -rhDate.dateDiff("n",time);
    		if (res == 0) {//当分钟
    			res = -rhDate.dateDiff("s",time) + "秒种前";
    		} else {
            	res += "分钟前";
            }
    	} else {
        	res += "小时前";
        }
    } else if (res <= 2){
    	res += "天前";
    } else {
    	res  = time;
    }			
	return res;
}; 
