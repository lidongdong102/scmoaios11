/**工作流*/ 
GLOBAL.namespace("mb.vi");

mb.vi.wfCardView = function(options) {
    var defaults = {
		"id":options.sId + "-viWfCardView",
		"sId":"",//服务ID
		"pId":options.sId,
		"parHandler":null,//主卡片的句柄
		"pkCode":""
	};
	this.opts = $.extend(defaults,options);
	
	this.servId = this.opts.sId;				//card 服务ID
	this.pkCode = this.opts.pkCode;  		//card 数据主键
	//servId,pkCode,ownerCode,pId,readOnly,cardAct
	this.ownerCode = this.opts.ownerCode;
	this.pId = this.opts.pId;
	this.readOnly = this.opts.readOnly;
	this.cardAct = this.opts.cardAct;
	
	
	this._parHandler = this.opts.parHandler;
	this._nextStepNodeCode = "";
	
	//从页面取流程实例的信息，因手机版的未绑定流程信息故，注释掉该代码
	this.procInstId = this._parHandler.itemValue("S_WF_INST");
	this.wfState = this._parHandler.itemValue("S_WF_STATE");	
    this.reqdata = {};
	this.reqdata["PI_ID"] = this.procInstId;	//流程实例ID
	this.reqdata["INST_IF_RUNNING"] = this.wfState;	   //流程是否在运行
	if (!(this.getNodeInstBean() == undefined)) {
		this.reqdata["NI_ID"] = this.getNodeInstBean().NI_ID;
	} 
	this.wfBtns = {};
	this.wfNextBtns = {};
	this.wfNextBtnNames = {};
	this._confirmSendFlag = true; // 送交标志 true:可以送交，false:不可以送交
};

mb.vi.wfCardView.prototype.render = function() {
	//绑定流程按钮
	this._bldBtnBar();
	//处理文件控制
	this._doFiledControl();
	//初始化意见
	this._initMind();
	// 确定是否意见为必填
	this._mindMust();
};

/*
 * 意见Code Bean
 */
mb.vi.wfCardView.prototype.getMindCodeBean = function() {
    var _self = this;
	return _self._parHandler._formData.mindCodeBean;
};

/*
 * 节点实例bean
 */
mb.vi.wfCardView.prototype.getNodeInstBean = function() {
    var _self = this;
	
	return _self._parHandler._formData.nodeInstBean;
};

/*
 * 相关权限 比如能否手写意见， 当前人是否正在处理当前的流程
 */
mb.vi.wfCardView.prototype.getAuthBean = function() {
    var _self = this;
	return _self._parHandler._formData.authBean;
};

/*
 * 获取按钮
 */
mb.vi.wfCardView.prototype.getButtonBean = function() {
    var _self = this;
	return _self._parHandler._formData.buttonBean;
};


/*
 * 获取页面field控制的数据
 */
mb.vi.wfCardView.prototype.getFieldControlBean = function() {
    var _self = this;
	return _self._parHandler._formData.fieldControlBean;
};

/*
 * 获取页面field控制的数据
 */
mb.vi.wfCardView.prototype.getBindTitle = function() {
    var _self = this;
	return _self._parHandler._formData.bindTitle;
};
mb.vi.wfCardView.prototype.getNextStepBean = function() {
    var _self = this;
	if (_self._parHandler._formData.nextSteps == undefined || 
			_self._parHandler._formData.nextSteps == "undefined") {
	    return "";
	}
	return _self._parHandler._formData.nextSteps;
};

/*
 * 对页面字段进行控制 , 如显示、隐藏、 必填等控制
 */
mb.vi.wfCardView.prototype._doFiledControl = function() {
    var _self = this;
    var _fileControlData = _self.getFieldControlBean();
	
//	var entirelyControl = _fileControlData.FIELD_CONTROL;	   // 是否完全控制	
	var exceptionFiledStr = _fileControlData.FIELD_EXCEPTION;  // 可编辑
	var displayFieldStr = _fileControlData.FIELD_DISPLAY;	   // 显示字段
	var hiddenFiledStr = _fileControlData.FIELD_HIDDEN;		   // 隐藏字段
	var mustFiledStr = _fileControlData.FIELD_MUST;		       // 必填字段
	var groupDis = _fileControlData.GROUP_DISPLAY || "";	   // 显示分组
	var groupHide = _fileControlData.GROUP_HIDE || "";		   // 隐藏分组
	
	
	var parServID = _self.opts.pId;
	//可编辑字段
//	if(entirelyControl == "false") {
//		_self._parHandler.form.disabledAll();
//		if (exceptionFiledStr.length > 0) {
//			$.each(exceptionFiledStr.split(','),function(i,item) {
//				if(_self._parHandler.getItem(item)) {
//					_self._parHandler.getItem(item).enabled();
//				}
//			});	
//		}
//	}
	// 显示字段
	if (displayFieldStr && displayFieldStr.length > 0) {
		var disps = displayFieldStr.split(',');
		$.each(disps, function(i, itemCode) {
			var field = _self._parHandler.getItem(itemCode);
			if (field) {
				var $li = field.getContainer();
				if($li.attr("model")!= UIConst.ITEM_MOBILE_FORCEHIDDEN){
					$li.show()
				}
			}
		});
	}
	//隐藏字段
	if (hiddenFiledStr.length > 0) {
		$.each(hiddenFiledStr.split(','),function(i,item) {
			_self._parHandler.getItem(item).getContainer().hide();
		});
	}
	
	//必填字段
//	if (mustFiledStr.length > 0) {
//		$.each(mustFiledStr.split(','),function(i,item) {
//			_self._parHandler.form.setNotNull(item,true);
//		});	
//	}
	
	// 显示分组
	if (groupDis.length > 0) {
		var groupArr = groupDis.split(',');
		$.each(groupArr, function(i, itemCode) {
			_self._parHandler.showGroup(itemCode);
		});
	}

	// 隐藏分组
	if (groupHide.length > 0) {
		var groupArr = groupHide.split(',');
		$.each(groupArr, function(i, item) {
			_self._parHandler.hideGroup(item);
		});
	}
	
};
/*
 * 构建卡片按钮条, 表单按钮  节点定义转换之后的按钮
 */
mb.vi.wfCardView.prototype._bldBtnBar = function() {
    var _self = this;
	_self._buttonData = _self.getButtonBean();
	
	var formSaveButtonFlag = false;
	
	$.each(this._buttonData,function(i,actItem) {
		var id,  
			actCode = actItem.ACT_CODE,
			param={};
		id = GLOBAL.getUnId(actItem.ACT_CODE , actItem.SERV_ID);
		param["id"] =  id ;	
		param["data-icon"] = actItem.ACT_CSS ? actItem.ACT_CSS : "default"; 
		
		
		if (actCode == "save") { // 如果循环到了save
			formSaveButtonFlag = true;
			return;
		}
		
		if(actCode == "cmSaveAndSend" ){ //“完成并发送”按钮
		 
		}
		if(actCode == "finish" || 				//办结
			actCode == "cmSaveAndSend" || 		//送交流转
			actCode == "cmWfTrackFigure" ||		//流程跟踪
			actCode == "withdraw" || 			//收回
//			actCode == "cmTuiHui" ||			//"退回"
			actCode == "cmQianShou" ||			//阅毕
			actCode == "undoFinish"	||		    //取消办结
			actCode == "cmSimpleFenFa" ||       //分发
			actCode == "stopParallelWf"	){ 		//终止会签	 
			
			 
		}else {//流程收藏夹,打印,数据管理,变更历史 暂时屏蔽
			return;
		}
		
		var $liWrapper = $("<li></li>");
		var btn = $("<a href='#'></a>").appendTo($liWrapper);
		btn.attr(param).text(actItem.ACT_NAME);
		 
     	var actId = actItem.ACT_CODE ,
     		servId = actItem.SERV_ID;
     	//绑定事件
     	_self._act(actId , servId , btn , actItem);
     	//添加到footer
		_self._parHandler.addBtn($liWrapper);

	});
	
	
	// TODO 为什么隐藏 2013-11-29
	if(!formSaveButtonFlag){ //没有save,隐藏表单的
	    $("#" + GLOBAL.getUnId("save",this.opts.pId)).parent().hide();
	}
};
/*
 * 构建下一步卡片按钮条，主要针对送交流转
 */
mb.vi.wfCardView.prototype._bldNextBtnBar = function(target) {
	
    var _self = this;
	var _nextData = _self.getNextStepBean();
 
	$.each(_nextData,function(i,actItem) {
    	var id, param={};
		id = GLOBAL.getUnId(actItem.NODE_CODE , "cmSaveAndSend");
		param["id"] =  id ;	
		param["data-icon"] = actItem.ACT_CSS ? actItem.ACT_CSS : "default"; 
    	param["data-rel"]="dialog";
    	var $liWrapper = $("<li></li>");
		var btn = $("<a href='#'></a>").appendTo($liWrapper);
			btn.attr(param).text(actItem.NODE_NAME);
    	$liWrapper.appendTo(target);
    	console.log("========>actItem.NODE_USER:" + actItem.NODE_USER)
	 	if(typeof(actItem.NODE_USER) != "undefined"){ // 如果是返回XX的按钮，取得返回人的CODE
			btn.bind("vclick",function() {
				// TODO 自动保存一下意见
				if (_self.mindMust.pass == "NO") { // 先执行送交前的代码，这里只判断了'必填意见'
					alert(_self.mindMust.reason);
					return false;
				}
				_self.reqdata["NODE_CODE"] = actItem.NODE_CODE;
				_self.reqdata["TO_USERS"] = actItem.NODE_USER;		
				_self.reqdata["TO_TYPE"] = "3";		
				//把流程信息送交给oa
				FireFly.doAct("SY_WFE_PROC_DEF", "toNext", _self.reqdata).done(function(result){
					//送交给oa得到oa返回的成功信息
					navigator.notification.alert(
						    '已经成功' + actItem.NODE_NAME,   
						    function(){
						    	$.mobile.pageContainer.find("#"+_self._parHandler.pId).remove();
						    	$.mobile.back();
						    	setTimeout(_self._parHandler.back,100);
						    },          
						    '提示', '确定'
					);
                    /**
                    * 发送下一节点后，判断流程参数isLockData是否为true，
                    * 是，则将字段IS_LOCK置为1，限制后续节点查看时无法修改申请单内容
                    * ---add by lidongdong 20161112
                    */
                    var isLockData = _self.getCustomVarContent("isLockData") || false;
                    var curCode = System.getUser("USER_CODE");
                    var ucode = System.getVar("@C_OA_FM_FILE_FILE_LOCK_USER@") || "12035";
                    if(isLockData && curCode == ucode){
                    var servId = _self._parHandler.servId;
                    var data = {};
                    data["_PK_"] = _self._parHandler.pkCode;
                    data["IS_LOCK"] = 1;//锁定标识
                    data["LOCK_TIME"] = rhDate.getTime();//锁定时间
                    FireFly.doAct(servId,"save",data);
                                                                               }

				});
		    });			
		} else {
			btn.bind("vclick",function(event) {
				event.preventDefault();
	    		event.stopImmediatePropagation();
	    		_self._nextStepNodeCode = actItem.NODE_CODE;	
				_self.reqdata["NI_ID"] = _self.getNodeInstBean().NI_ID;
				_self.reqdata["NODE_CODE"] = actItem.NODE_CODE;
				FireFly.doAct("SY_WFE_PROC_DEF", "getNextStepUsersForSelect", _self.reqdata).done(function(result){
					_self._openSelectOrg(actItem.NODE_CODE, result);
//					console.log("======>result:" + JsonToStr(result))
				});
		    });
			
			var nextBtnObj = {};
			nextBtnObj.layoutObj = btn;
			nextBtnObj.dataObj = actItem;
		    _self.wfNextBtns[actItem.NODE_CODE] = nextBtnObj;
			_self.wfNextBtnNames[actItem.NODE_NAME] = nextBtnObj;
		}
	});
	
};
/**
 * 必填意见的判断，不通过mind去判断了 , 写到这里，直接查数据库
 */
mb.vi.wfCardView.prototype._mindMust = function() {
	var _self = this;
	var mindMustReq = {};
	mindMustReq.GENERAL = JsonToStr(_self.getMindCodeBean());
	mindMustReq.REGULAR = JsonToStr({"MIND_MUST":"2"});
	mindMustReq.TERMINAL = JsonToStr({"MIND_MUST":"2"});
	mindMustReq.NI_ID = _self.getNodeInstBean().NI_ID;
	mindMustReq.DATA_ID = _self._parHandler.pkCode;
	FireFly.doAct("SY_COMM_MIND", "checkFillMind", mindMustReq).done(function(result) {
		_self.mindMust = result;
//		console.log("==============>是否是必填的意见result:" + JsonToStr(result));
	});
};
/*
* 根据动作绑定相应的方法
* @param actId 动作ID
* 
*/
mb.vi.wfCardView.prototype._act = function(actId, servId, btn, actItem) {
	var _self = this;
	
	if (actItem.ACT_CODE == "delete") {
	    actItem.ACT_CODE = "deleteDoc";
	}
	if (actItem.ACT_CODE == "cmWfTrackFigure") {//流程跟踪(图像化),暂时以列表形式展示
	    actItem.ACT_CODE = "cmWfTracking";
	}
	if(actItem.ACT_CODE == "cmSaveAndSend"){ //“完成并发送”按钮
		btn.on("vclick",function(event){
			// 意见是否已修改
			if(_self.mind.isModify()) {
//				alert("您的意见尚未保存，请保存后执行此操作！");
				if (confirm('意见已修改，是否自动保存？')) {
					// 保存意见
					$('#save-btn').trigger('vclick');
				} else {
					// 直接送交
				}
//				return false;
			}
			var id = GLOBAL.getUnId(actItem.ACT_CODE , actItem.SERV_ID);
			//弹出popup
			var popupWrp = $("<div data-role='popup' id='" + id + "_popup' data-dismissible='false'> <a href='#' class='sc-btn-close ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right'>Close</a></div>");
			var popupListView = $("<ul data-role='listview' data-inset='true' style='min-width:210px;'><li data-role='divider'>送交流转</li></div>").appendTo(popupWrp);
			//添加送交按钮组
			_self._bldNextBtnBar(popupListView);
			popupWrp.on("vclick","a.sc-btn-close",function(){
				popupWrp.popup("close");
			})
			popupWrp.on( "popupafterclose", function() {
				$(this).remove();
			});
			$.mobile.activePage.append(popupWrp);//.trigger("create");
			popupWrp.popup().enhanceWithin();
			popupWrp.popup( "open");
		});
	}else{
		btn.on("vclick",function(event){
			event.preventDefault();
			event.stopImmediatePropagation();
			if(actItem.ACT_MEMO.length > 1 && actItem.ACT_MEMO != "null") {
				eval(actItem.ACT_MEMO);
			} else {
				eval("_self." + actItem.ACT_CODE + "(event,actItem)");
			}
		});
	}

	var wfBtnObj = {};
	wfBtnObj.layoutObj = btn;
	
	wfBtnObj.dataObj = actItem;		
	
	_self.wfBtns[actItem.ACT_CODE] = wfBtnObj;	
};
/**
 * 判断返回的组织资源树，是否只有一个人  //"NAME":.*?"usr".*?usr:.*?}    new RegExp("\"usr:.*?\"", "g");
 */
mb.vi.wfCardView.prototype.treeDataHaseOneMan = function (treeData) {
	if (treeData == "[]") {
	    return "multi";
	}

	var reg = new RegExp("\"NAME\":.*?\"usr\".*?usr:.*?\"", "g");  
	
	if (treeData.match(reg).length == 1) {
	    // 取到这个人，然后直接送这个人，  "usr:.*?"
		var userCode = treeData.match(reg);
		
		return userCode;
	}
	
	return "multi";
};


 /*
 * 根据 节点信息， 打开人员选择窗口 ，也就是送交人
 * @param aId 动作ID
 */
mb.vi.wfCardView.prototype._openSelectOrg = function(nodeCode, result) {
	var _self = this;
	// TODO 自动保存一下意见
	if (_self.mindMust.pass == "NO") { // 先执行送交前的代码，这里只判断了'必填意见'
		alert(_self.mindMust.reason);
		return false;
	}
	var rtnTreeData = result;
	var treeData = rtnTreeData.treeData;
	
	if (treeData == "[]") {
	    alert("当前节点没有可供选择的人员，请检查工作流配置！");
		return false;
	}
	
	var sendDirectFlag = true;
	var oneUserCodes = "";
	
	var bindTreeTitle = "人员选择";
	this.binderType = rtnTreeData.binderType;  //送交类型  

	if (_self.binderType == "ROLE") {
	    //如果是角色，取到角色的CODE
		this._binderRoleCode = rtnTreeData.roleCode;
		bindTreeTitle = "角色选择";
		sendDirectFlag = false;
	} else { //送人
		var rtnOneValue = _self.treeDataHaseOneMan(treeData);
		
		if (rtnOneValue == "multi") {
		    sendDirectFlag = false;
		} else {
		    oneUserCodes = rtnOneValue;
		}
	}
	
	if (sendDirectFlag) { // 直接送人
	    var oneUserObj = StrToJson("{" + oneUserCodes + "}");
	    var userCodeArray = [];
			userCodeArray.push(oneUserObj.ID);
	    _self._confirmSend(userCodeArray);
	    
	} else { //显示组织机构树
	    var len = $("#"+nodeCode + "_dialog").length;
	    if (!len){
			
			var extendTreeSetting ={
				cascadecheck: false,  
				checkParent: false,  
				rhexpand: false, 
				showcheck: false
			};
			
			var multiSelect = rtnTreeData.multiSelect;  //是否能多选
			if (multiSelect == "true") {
				extendTreeSetting["cascadecheck"] = true;
				extendTreeSetting["showcheck"] = true;
			}  
	    	
            if(_self._parHandler.servId=="OA_OFC_APPLY" && _self.wfNextBtnNames && JsonToStr(_self.wfNextBtnNames).indexOf("管理员") >= 0){
                //显示组织机构树前，重构叶子节点名字，用于区别办公用品管理员和固定资产管理员
                var hasAssets = "onlyOFC";//是否含有固定资产,onlyOFC(只有办公用品),onlyAST(只有固定资产),ofcAndAst(既有办公用品也有固定资产)
                var applyWf = _self._parHandler.getItem("APPLY_WF").getValue() || 0;
                if("456".indexOf(applyWf) >= 0){//既有办公用品也有固定资产
                    hasAssets = "ofcAndAst";
                }else if("2" == applyWf){//onlyAST(只有固定资产)
                    hasAssets = "onlyAST";
                }
                var data = {};
                data.treeData = treeData;
                data.hasAssets = hasAssets;
                FireFly.doAct(_self._parHandler.servId,"resetLeafName",data,true,false).done(function(result){
                    if(result["_MSG_"].indexOf("OK") < 0){
                        this.cardBarTipError(result["_MSG_"]);
                        return false;
                    }
                    treeData = eval("(" + result["treeData"] + ")");
                    extendTreeSetting["data"] = treeData;
                    _self.showTree(nodeCode,multiSelect,extendTreeSetting);
                });
                
                
            }else{
                treeData = eval("(" + treeData + ")");
                extendTreeSetting["data"] = treeData;
                _self.showTree(nodeCode,multiSelect,extendTreeSetting);
            }
	    	//TODO  封装page
	    	
        }
	    //TODO 关闭card页面时 remove dialog
               
	}
};

mb.vi.wfCardView.prototype.showTree = function(nodeCode,multiSelect,extendTreeSetting){
    var _self = this;
    var pageWrp = $("<div data-role='page' id='" + nodeCode + "_dialog'></div>");
    var headerWrp = $("<div data-role='header' data-position='fixed' data-tap-toggle='false'><a href='#' data-rel='back' class='ui-btn ui-btn-icon-left ui-btn-icon-notext ui-icon-back'>返回</a><h1></h1></div>").appendTo(pageWrp);
    var contentWrp = $("<div role='main' class='ui-content'></div>").appendTo(pageWrp);
    var footerWrp = $("<div data-role='footer' data-position='fixed' data-tap-toggle='false'><div data-role='navbar'><ul><li><a href='#' id='cancel' data-rel='back' class='ui-link ui-btn ui-icon-cancel ui-btn-icon-top'>取消</a></li><li><a href='#' id='save' class='ui-link ui-btn ui-icon-confirm ui-btn-icon-top'>确认</a></li></ul></div></div>").appendTo(pageWrp);
    //渲染数据
    var $treeWrp = $("<div></div>").appendTo(contentWrp);
    
    //确认
    footerWrp.on("vclick","#save",function(event){
        event.preventDefault();
        event.stopImmediatePropagation();
        var ids=[];
        if (multiSelect == "true") { //checkbox
            var checks = $treeWrp.find(".bbit-tree-node-leaf .checkbox_true_full");
            $.each(checks , function(i , el) {
                var $parent = $(this).parent(),
                id = $parent.attr("itemid");
                ids.push(id);
            });
        } else { //radio
            var check = $treeWrp.find(".bbit-tree-node-leaf.bbit-tree-selected");
            if (check.length) {
                var id = check.attr("itemid");
                ids.push(id)
            }
                 
        }
        _self._confirmSend(ids);
    });
    $treeWrp.treeview(extendTreeSetting);
    pageWrp.appendTo($.mobile.pageContainer).page();
    pageWrp.on( "pagehide", function( event, ui ) {
        $(this).remove();
    });
    $.mobile.pageContainer.pagecontainer( "change", pageWrp );
};


/**
 * 将流程送下个节点的人
 */
mb.vi.wfCardView.prototype._confirmSend = function(idArray) {
	var _self = this;
	//alert("此处应该为true : " + _self._confirmSendFlag);
	// 如果标志为false，就是不能送交
	if (!_self._confirmSendFlag) {
		return false;
	} else {
		_self._confirmSendFlag = false;
	}
	//送交的类型  1 送部门+角色 , 3 送用户
	var toType = "3";
	if(_self.binderType == "ROLE"){
	    toType = "1";
		_self.reqdata["TO_DEPT"] = idArray[0].replace("dept:",""); //送交部门
		_self.reqdata["TO_ROLE"] = _self._binderRoleCode; //送交角色		
	} else {
		var userArray = [];
		if (idArray.length) {
			$(idArray).each(function(i , intrty){
				if (intrty.indexOf("usr:") ==0) {
					userArray.push(intrty);
				}
			});
		}
		
		var userNameStr = userArray.toString().replace(new RegExp("usr:","gm"),"");
		
		if (userNameStr.length<=0) {
//			alert("没有选中人员，请重新选择送交人员!");
			navigator.notification.alert(
				    '没有选中人员，请重新选择送交人员!',
				    function(){},
				    '提示',  '确定'                   
			);
			_self._confirmSendFlag = true;
			return false;
		} 
	    _self.reqdata["TO_USERS"] = userNameStr; //送交人 替换掉所有的usr:
	}
	
	_self.reqdata["TO_TYPE"] = toType;  //类别
	_self.reqdata["NI_ID"] = _self.getNodeInstBean().NI_ID;  //当前节点实例ID
	_self.reqdata["NODE_CODE"] = _self._nextStepNodeCode;  //下个节点CODE
	$.mobile.loading('show', {  
        text: '送交中...'
    }); 
	FireFly.doAct("SY_WFE_PROC_DEF", "toNext", _self.reqdata).done(function(result){
		$.mobile.loading('hide');
		if(Tools.actIsSuccessed(result)){
                                                                  
			navigator.notification.alert(
				    '已经成功送交!', 
					function(){
						$.mobile.pageContainer.find("#"+_self._parHandler.pId).remove();
						$.mobile.back();
						//setTimeout(_self._parHandler.back,100);
                                        
					},
				    '提示', '确定'                   
			);
		} else {
			navigator.notification.alert('送交失败!', null,'提示','确定');
		}
		setTimeout(function() {
			_self._confirmSendFlag = true;
		},1000);
	});
};
/**
 * @param varCode
 *            变量名称
 * @returns 指定变量的值，未找到指定变量则返回undefined
 */
mb.vi.wfCardView.prototype.getCustomVarContent = function(varCode) {
    var customVars = this._parHandler._formData.WF_CUSTOM_VARS;
    var result = undefined;
    if (customVars) {
        jQuery(customVars).each(function(index, item) {
                                if (item.VAR_CODE == varCode) {
                                result = item.VAR_CONTENT
                                }
                                });
    }
    
    return result;
}

/**
 * 获取按钮
 */
mb.vi.wfCardView.prototype._getBtn = function(actCode) {
	return this.wfBtns[actCode];
};

/**
 * 获取按钮 根据CODE
 */
mb.vi.wfCardView.prototype._getWfNextBtn = function(actCode) {
	return this.wfNextBtns[actCode];
};


/**
 * 获取按钮 根据名称
 */
mb.vi.wfCardView.prototype._getNextBtnByName = function(actName) {
	return this.wfNextBtnNames[actName];
};
 
 
/**
 * 转发  
 */
mb.vi.wfCardView.prototype._zhuanFa = function(idArray,nameArray) {
    var _self = this;
    $.mobile.loading( "show", {
		text: "加载中……",
		textVisible: true,
		textonly: false 
	});
    
	_self.reqdata["TARGET_USERS"] = idArray.join(",");
	_self.reqdata["SERV_ID"] = _self._parHandler.servId;
	_self.reqdata["DATA_ID"] = _self._parHandler._pkCode;
	_self.reqdata["DATA_TITLE"] = _self.getBindTitle() + "(分发)" ; //_self._parHandler.itemValue("GW_TITLE");
    
	var result = rh_processData(WfActConst.SERV_PROC + ".cmZhuanFa.do",_self.reqdata);
    
	if (result.rtnstr == "success") {
	    Tip.show("转发成功",true);
	} else {
	    Tip.show("转发失败",true);
	}
	_self._parHandler.refresh();    
}

/** 
 * 分发
 * @author liufengyuan
 */
mb.vi.wfCardView.prototype.cmSimpleFenFa = function() { 
	var _self = this;
	console.log("点击cmSimpleFenFa");
	//分发每一次打开分发列表的时候都从新选择角色或者部门
	$.mobile.window.data("ROLE_CHOOSE","");
	$("#roleCode").val("");
	$("#roleName").val("");
	var servId = _self._parHandler.servId;
	var dataId = _self._parHandler.pkCode;//当前文件的 id
	var params = {
			"_WHERE_"	:	"and data_id='" + dataId + "' and serv_id='" + servId + "'"
	};
	var rt;//存放 "sy_comm_entity" 返回的数据
	FireFly.doAct("sy_comm_entity","finds",params).done(function(result){//获取数据
		rt = result._DATA_[0];
	});
	FireFly.afterDoAct();
	
	jQuery.mobile.changePage("#cmSimpleFenFa");//打开分发页面
	jQuery("#choose_Role").unbind("click").bind("click",function(event){
		var choose = new mb.vi.roleChoose();
		choose.show();
	});
	jQuery("#submitfenfa").unbind("click").bind("click",function(){
        navigator.notification.confirm('是否确认分发？',function(index){
                                       if(index==2){
                                            var pars = {
                                                "roleCode":$("#roleCode").val(),
                                                "roleName":$("#roleName").val(),
                                                "SERV_ID":servId,
                                                "DATA_ID":dataId,
                                                "S_USER":rt.S_USER,
                                                "TITLE":rt.TITLE + "(分发)",//标题
                                            };
                                            $.ajax({   //OA_MB_CMSIMPLEFENFA 的扩展类 MoblieSimpleFenFa
                                              url: FireFly.getContextPath() + "/OA_MB_CMSIMPLEFENFA.simpleFenFa.do",
                                              type:"post",
                                              crossDomain: true,
                                              data: pars
                                              });
                                            navigator.notification.alert("分发成功！",null,'提示','确定');
                                            console.log("分发结束");
                                            $.mobile.back();
                                       
                                            }
                                       },'提示',['提示', '确定']);
		/*if(confirm("是否确认分发？")){
			
			//alert($.mobile.window.data("ROLE_CHOOSE"));
		}else{
			alert("分发失败！");
		}*/
		
	});
	
	jQuery("#cardview_header").children(".ui-icon-back").bind("click",function(event){
		console.log("清除数据");
		$("#roleCode").val("");
		$("#roleName").val("");
//		$(".checkbox_true_full").removeClass("checkbox_true_full").addClass("checkbox_false_full");
	});
}


/** 
 * 签收|阅毕
 */
mb.vi.wfCardView.prototype.cmQianShou = function(event, actItem) { 
	var _self = this;
	//分发ID
	var sendId = actItem.SEND_ID;
	_self.reqdata.SEND_ID = sendId;
	FireFly.doAct("SY_COMM_SEND_SHOW_CARD", "cmQianShou", _self.reqdata).done(function(result){
		if (result.rtnstr == "success") {
			$.mobile.pageContainer.find("#"+_self._parHandler.pId).remove(); 
			$.mobile.back();
		} else {
			navigator.notification.alert('操作失败!',null,'提示', '确定');
		}
	});
}
/** 
 * 流程跟踪 列表
 */
mb.vi.wfCardView.prototype.cmWfTracking = function() { 
	var _self = this;
	$.mobile.loading( "show", {
		text: "加载中……",
		textVisible: true,
		textonly: false 
	});
	var param ={
			"PI_ID" : _self.procInstId ,
			"INST_IF_RUNNING" : _self.wfState ,
			"S_FLAG": 1 
	};
	FireFly.doAct("SY_WFE_TRACK","query",param).then(function(result){
		var cols = result["_COLS_"],
		data = result["_DATA_"];
		var len = data.length;
		if (len) {  
			var pageWrp = $("<div data-role='page' id='" + _self.procInstId + "_cmWfTracking'></div>");
			var headerWrp = $("<div data-role='header' data-position='fixed' data-tap-toggle='false'><a href='#' class='ui-btn ui-btn-icon-left ui-btn-icon-notext ui-icon-back'>返回</a><h1>流程跟踪</h1></div>").appendTo(pageWrp);
			var contentWrp = $("<div role='main' class='ui-content'></div>").appendTo(pageWrp);
			var tableWrp = $("<table data-role='table' data-model='reflow' class='sc-custom-table ui-responsive'/>").appendTo(contentWrp);
			tableWrp.append("<thead><tr>"+
								"<th data-priority='persist'>序号:</th>" +
							    "<th data-priority='persist'>工作名称:</th>" +
							    "<th data-priority='4'>开始时间:</th>" +
							    "<th data-priority='4'>结束时间:</th>" +
							    "<th data-priority='4'>限定时间:</th>" +
							    "<th data-priority='4'>送交人员:</th>" +
							    "<th data-priority='4'>办理人员:</th>" +
							    "<th data-priority='4'>办理部门:</th>" +
							    "<th data-priority='4'>耗时(分):</th>" +
							"</tr></thead>");
			var $tBody = $("<tbody/>").appendTo(tableWrp);
			var trs = [];
			$.each(data,function(i,obj){
				var tr = "<tr>"+
						 "<th>"+(len - i)+"</th>" +
						 "<td>"+ obj["NODE_NAME"] +"</td>"+
						 "<td>"+ obj["NODE_BTIME"] +"</td>"+
						 "<td>"+ obj["NODE_ETIME"] +"</td>"+
						 "<td>"+ obj["NODE_LIMIT_TIME"] +"</td>"+
						 "<td>"+ obj["TO_USER_ID__NAME"] +"</td>"+
						 "<td>"+ obj["DONE_USER_NAME"] +"</td>"+
						 "<td>"+ obj["DONE_DEPT_NAMES"] +"</td>"+
						 "<td>"+ obj["DONE_TYPE"] +"</td>"+
						 "</tr>";
				trs.push(tr);
			});
			$(trs.join()).appendTo($tBody);
			pageWrp.on( "pagehide", function( event, ui ) {
				$(this).remove();
			});
			
			//手动设置返回,不使用data-rel='back'
			headerWrp.on("vclick","a", function(event){
				event.preventDefault();
			    event.stopImmediatePropagation();
				$.mobile.pageContainer.pagecontainer( "change", "#cardview" ,{reverse: true});
			});
			pageWrp.appendTo($.mobile.pageContainer).page();
			$.mobile.pageContainer.pagecontainer( "change", pageWrp );
		}
	}).finally(function(){
		$.mobile.loading( "hide" );
	});
	
}

/** 
 * 办结
 */
mb.vi.wfCardView.prototype.finish = function() { 
	var _self = this;
	FireFly.doAct("SY_WFE_PROC_DEF", "finish", _self.reqdata).done(function(result){
		navigator.notification.alert('办结成功!',function(){
	    	//移除list item 
	    	$.mobile.pageContainer.find("#"+_self._parHandler.pId).remove();
	    	//返回到list页面
	    	$.mobile.back();
	    },'提示', '确定');
	});
}

/** 
 * 取消办结
 */
mb.vi.wfCardView.prototype.undoFinish = function() { 
	var _self = this;
	FireFly.doAct("SY_WFE_PROC_DEF", "undoFinish", _self.reqdata).done(function(result){
		//返回到list页面
	    $.mobile.back();
	});
}

/** 
 * 收回
 */
mb.vi.wfCardView.prototype.withdraw = function(event,actItem) { 
	
	var _self = this;
	var wdlist = actItem.wdlist;
	if (wdlist) {
		if (wdlist.length == 0) {
			alert("没有可以收回的流程。");
		} else if ( wdlist.length == 1) {
			
			_self._sendWithdrawReq(wdlist[0]["NI_ID"]);
			
		}  else { //如果有多个用户请求需要被收回
			//弹出dialog
	    	var pageWrp = $("<div data-role='page' id='" + _self.procInstId + "_withdraw'></div>");
	    	var headerWrp = $("<div data-role='header' data-position='fixed' data-tap-toggle='false'><a href='#' data-rel='back' data-icon='back' data-inline='true' data-iconpos='notext'></a><h1></h1></div>").appendTo(pageWrp);
	    	var contentWrp = $("<div role='main' class='ui-content'></div>").appendTo(pageWrp);
	    	var tempArr=[];
	    	tempArr.push("<fieldset data-role='controlgroup'>");
	    	for ( var i = 0; i < wdlist.length; i++) {
				var niBean = wdlist[i];
				tempArr.push("<input type='checkbox' id='",niBean["NI_ID"],"'/>");
				tempArr.push("<label for='",niBean["NI_ID"],"'>" ,niBean["TO_USER_NAME"] , "</label>");
			}
	    	tempArr.push("</fieldset>");
	    	contentWrp.html(tempArr.join(""));
	    	
	    	var footerWrp = $("<div data-role='footer' data-position='fixed' data-tap-toggle='false'><a href='#' id='withdrawCancel' data-role='button' data-rel='back' data-icon='delete' class='ui-btn-left'>取消</a><span class='ui-title'></span><a href='#' id='withdrawSave' data-role='button' data-icon='check' class='ui-btn-right'>确认</a></div>").appendTo(pageWrp);
	    	
	    	//确认
	    	footerWrp.on("tap","#withdrawSave",function(event){
	    		var ids=[];
	    		contentWrp.find("input:checked").each(function(i , obj){
	    			ids.push(this.id);
	    		});
	    		_self._sendWithdrawReq(ids.join(","));	
	    	});
	    	
	    	pageWrp.appendTo($.mobile.pageContainer).page();
	    	pageWrp.on( "pagehide", function( event, ui ) {
	    		 $(this).remove();
	    	});
	    	$.mobile.changePage($("#"+_self.procInstId + "_withdraw"),{transition:"slideup"});
	    	
			 
			
		}
	}
	//$.mobile.back();
}

/**
 * 发送收回请求
 */
mb.vi.wfCardView.prototype._sendWithdrawReq = function(nextNiIds){
	var _self = this;
	var data = {};
	$.extend(data,_self.reqdata,{"nextNiIds":nextNiIds});
	FireFly.doAct("SY_WFE_PROC_DEF", "withdraw", data).done(function(result){
		$.mobile.pageContainer.find("#"+_self._parHandler.pId).remove(); 
		$.mobile.back();
		 
	});
}

/** 
 * 终止并发
 */
mb.vi.wfCardView.prototype.stopParallelWf = function() { 
	var _self = this;
//	FireFly.doAct("SY_WFE_PROC_DEF", "stopParallelWf", data).done(function(result){	 
	FireFly.doAct("SY_WFE_PROC_DEF", "stopParallelWf", _self.reqdata).done(function(result){
		$.mobile.back();
	});
}
/**
 * 初始化意见
 */
mb.vi.wfCardView.prototype._initMind = function() {
	var _self = this;
	var targetContainer = _self._parHandler.form.mainContainer;
	
	/*
	 * 2016-04-05 liufengyuan
	 */
	var origData = _self._parHandler.form.origData;//
	var regularMind = _self._parHandler.form.origData.regularMind;//固定意见
	
	var group = $("<div id='"+_self._parHandler.pkCode+"_MIND' class='mb-card-group'></div>");
		group.append("<div class='mb-card-group-title'>审批意见</div>");
	var groupList = $('<ul data-role="listview" data-inset="true" class="ui-listview ui-listview-inset ui-corner-all ui-shadow mind-content"></ul>').appendTo(group);
		group.insertAfter(targetContainer.find(".mb-card-group:first"));
	
	var param = {
			"servId":_self._parHandler.getServSrcId(),
			"dataId":_self.pkCode,
			"mind" : _self._parHandler._mind,
			"wfCard":this,
			"pCon":groupList,
			"regularMind":regularMind,//固定意见 的参数  ----2016.04.05
			"origData":origData,//固定意见 的参数
			"ownerCode":_self.ownerCode,
			"pId":_self.pId,
			"readOnly":_self.readOnly,
			"cardAct":_self.cardAct,
			"_pkCode":_self._pkCode
	};
	
	this.mind = new mb.vi.mind(param);	
	this.mind.show();
};
/*
 * 意见Code Bean
 */
mb.vi.wfCardView.prototype.getMindCodeBean = function() {
	var _self = this;

	return _self._parHandler._formData.mindCodeBean;
};
