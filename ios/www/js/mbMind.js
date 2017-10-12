/**	意见	*/
GLOBAL.namespace("mb.vi");
var regularFlag = ""; //固定意见 的属性值，默认为 2，同意

mb.vi.mind = function (options) {
	var defaults = {
		"parHandler" : null,
		"wfCard" : null,
		"servId" : null,
		"dataId" : null,
		"pCon" : null,
		"origData" : null,
		"regularMind" : null
	};
	this.opts = jQuery.extend(defaults, options);
	this._mind = this.opts.mind;
	this._servId = this.opts.servId;
	this._dataId = this.opts.dataId;
	this._parHandler = this.opts.parHandler;
	this._wfCard = this.opts.wfCard;
	this._pCon = this.opts.pCon;
	this._mindInput = "";
	this._mindList = "";
	this.oldMindText = "";

	this._regularMind = this.opts.regularMind;
	this._origData = this.opts.origData;

	this.ownerCode = this.opts.ownerCode;
	this.pId = this.opts.pId;
	this.readOnly = this.opts.readOnly;
	this.cardAct = this.opts.cardAct;
	this._pkCode = this.opts._pkCode;
	/**
	 * 意见是否已修改，包括意见内容
	 */
	this.isModify = function () {
		return this._textIsModify();
	};
	/**
	 * 意见内容是否已修改
	 */
	this._textIsModify = function () {
		var newVal = $("#mind-content").val() || "";
		if (newVal == '' || newVal == this.oldMindText) {
			return false;
		}
		return true;
	};
  	
  	this._generalMind = "";
};
/**
 * 显示卡片页面，主方法
 */
mb.vi.mind.prototype.show = function () {
	this._initMainData();
	this._layout();
	this._bindEvent();
	this._afterLoad();
};
mb.vi.mind.prototype._initMainData = function () {
	var _self = this;
	this._mindInput = this._mind["mindInput"];
	this._mindList = this._mind["mindDatas"]["mindList"];
	this._currMind = this._mind["mindDatas"]["_DATA_"];
	if (this._currMind.length) {
		$.each(this._currMind, function (index, item) {
			// 如果用户相同，证明是当前用户填写的意见，防止并发同部门的情况下，意见可以互相删除
			if (item["S_USER"] == System.getVar("@USER_CODE@")) {
				_self.pkCode = item["MIND_ID"];
				_self.mindContent = item["MIND_CONTENT"];
				_self.oldMindText = item["MIND_CONTENT"] || "";
			}
		});
	}

};

mb.vi.mind.prototype._layout = function () {
	var _self = this;
	var generalMind = _self._mindInput.generalMind;
	var _regMind = _self._regularMind;
	var agreeVal = "";
	var disAgreeVal = "";
	if (_self._mindList && _self._mindList.length > 0) {
		var mindVal = _self._mindList[0].MIND_VALUE || "2";
		if (mindVal == "2") {
			regularFlag = "2";
			agreeVal = "checked='checked'";
		} else {
			disAgreeVal = "checked='checked'";
			regularFlag = "3";
		}
	} else {
		regularFlag = "2";
		agreeVal = "checked='checked'";
	}
	/*
	 * 绘制分组框
	 */
	if (generalMind && generalMind.CODE_ID) {
		// textarea绘制
		_self._pCon.append("<li class='ui-field-contain'><label for='mind-content'>办理意见：</label><textarea cols='40' rows='8' id='mind-content'>" + (_self.mindContent ? _self.mindContent : "") + "</textarea></li>");
		// 绘制签名选择
		var signList = _self._mindInput.signList,
		signListLen = signList.length;
		if (signListLen > 0) {
			var signArr = [];
			
			signArr.push("<li class='ui-field-contain sc-li-mind'>");
			signArr.push("<label class='ui-input-text sc-static-label'>请选择</label>");
			signArr.push("<div class='ui-input-text ui-grid-a ui-input-text' style='margin-top:1em;border-width:0;'>");
			for (var i = 0; i < signListLen; i++) {
				var signBean = signList[i];
				signArr.push("<div class='ui-block-b' data-corners='true'>");
				signArr.push("<a href='#' data-role='button' data-corners='false' data-sign-id='", signBean.SIGN_ID, "' data-shadow='false' class='sc-sign-block" + (i == 0 ? " sc-sign-selected" : "") + "'>");
				signArr.push("<img style='width:100%;' src='", FireFlyContextPath + signBean.imgSrc, "'/>");
				signArr.push("</a>");
				signArr.push("</div>");
			}
			signArr.push("</div>");
			signArr.push("</li>");
			_self._pCon.append(signArr.join(""));
		}
		// 保存意见按钮
		_self._pCon.append("<li class='js-btn-save-contain ui-field-contain ui-body ui-body-a'><div class='ui-grid-a'><div class='ui-block-a'><a href='#' id='save-btn' class='ui-btn ui-corner-all'>保存意见</a></div><div class='ui-block-b'><a href='#' id='general-mind' class='js-general-mind-contain ui-btn ui-corner-all'>常用批语</a></div></div></li>");
		// 保存意见按钮
		 _self._initMindBtn(1);
	}

	/**
	 * 绘制固定意见
	 * －－－－2016-06-22 huangshikai
	 */
	if(_regMind && _regMind.CODE_ID){

		_self._pCon.append("<li><form id='regularMind'><span>固定意见：</span>" +
				"<label><input type='radio' code='"+_regMind.CODE_ID+"' codeName='"+_regMind.CODE_NAME+"' name='regularType' id='2' value='同意' onclick='fillData(\"2\",\"同意。\");' "+agreeVal+" />同意</label>" +
				"<label><input type='radio' code='"+_regMind.CODE_ID+"' codeName='"+_regMind.CODE_NAME+"' name='regularType' id='3' value='不同意' onclick='fillData(\"3\",\"不同意。\");' "+disAgreeVal+" />不同意</label>" +
			"</form><textarea cols='40' rows='8' id='regularMind-content'>" +
			(_self.mindContent ? _self.mindContent : "同意。") + "</textarea></li>");
		
		// 绘制签名选择
		var signList = _self._mindInput.signList;
		var	signListLen = signList.length;
		if (signListLen > 0) {
			var signArr = [];
			signArr.push("<li class='ui-field-contain sc-li-mind'>");
			signArr.push("<label class='ui-input-text sc-static-label'>请选择</label>");
			signArr.push("<div class='ui-input-text ui-grid-a ui-input-text' style='margin-top:1em;border-width:0;'>");
			for (var i = 0; i < signListLen; i++) {
				var signBean = signList[i];
				signArr.push("<div class='ui-block-b' data-corners='true'>");
				signArr.push("<a href='#' data-role='button' data-corners='false' data-sign-id='", signBean.SIGN_ID, "' data-shadow='false' class='sc-sign-block" + (i == 0 ? " sc-sign-selected" : "") + "'>");
				signArr.push("<img style='width:100%;' src='", FireFlyContextPath + signBean.imgSrc, "'>");
				signArr.push("</a>");
				signArr.push("</div>");
			}
			signArr.push("</div>");
			signArr.push("</li>");
			_self._pCon.append(signArr.join(""));
		}

		//保存意见按钮
		_self._pCon.append("<li class='js-btn-save-contain ui-field-contain ui-body ui-body-a'><div class='ui-grid-a'><div class='ui-block-a'><a href='#' id='save-regularMindBtn' class='ui-btn ui-corner-all'>保存意见</a></div><div class='ui-block-b'><a href='#' id='general-mind' class='js-general-mind-contain ui-btn ui-corner-all'>常用批语</a></div></div></li>");
		_self._initMindBtn(2);
	}

	//意见列表
	var mindListHtml = '',
	mindList = this._mindList,
	mindListLen = mindList.length;
	if (mindListLen > 0) {
		for (var i = 0; i < mindListLen; i++) {
			mindListHtml += _self._renderMindBean(mindList[i]);
		}
	}
	if (mindListHtml) {
		_self._pCon.append(mindListHtml);
	}
};

/**
*  初始化常用批语按钮点击事件
*	type:1，普通意见，2，固定意见
*/
mb.vi.mind.prototype._initMindBtn = function (type) {
	var _self = this;
		//_self._pCon.append("<li class='ui-field-contain ui-body ui-body-a'><div class='ui-grid-a'><div class='ui-block-a'><a href='#' id='save-btn' class='js-btn-save-contain ui-btn ui-corner-all'>保存意见</a></div><div class='ui-block-b'><a href='#' id='general-mind' class='js-general-mind-contain ui-btn ui-corner-all'>常用批语</a></div></div></li>");
	//绑定常用批语弹出事件
	$("#general-mind").on("vclick",_self,function(event) {
		event.preventDefault();
		event.stopImmediatePropagation();
		var popupWrp = $("<div data-role='popup' id='generalMind_popup' data-dismissible='false'> <a href='#' class='sc-btn-close ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right'>Close</a></div>");
		var popupListView = $("<ul data-role='listview' data-inset='true' style='min-width:210px;'><li data-role='divider'>常用批语</li></ul>").appendTo(popupWrp);
		FireFly.doAct("SY_COMM_USUAL", "query", {}).done(function(result){
		 	if (result && result["_DATA_"] && result["_DATA_"].length) {
		 		_self._generalMind = result["_DATA_"];
		 	}
		
		if (_self._generalMind) {
			$.each(_self._generalMind, function(index, item) {
				if (index>=5) {
					return false;
				}
				var $liWrapper = $("<li></li>");
				var mindItem = $("<a href='#'></a>").appendTo($liWrapper);
				mindItem.text(item.TITLE);
				$liWrapper.appendTo(popupListView);
				mindItem.bind("vclick",function() {
					if(type == "1"){
						$("#mind-content").val(mindItem.text());
					}else if (type == "2"){
						$("#regularMind-content").val(mindItem.text());
					}else{
						$("#mind-content").val(mindItem.text());
					}
					popupWrp.popup("close");
				});
			});
		}
		popupWrp.on("vclick","a.sc-btn-close",function(){
			popupWrp.popup("close");
		})
		popupWrp.on( "popupafterclose", function() {
			$(this).remove();
		});
		$.mobile.activePage.append(popupWrp);//.trigger("create");
		popupWrp.popup().enhanceWithin();
		popupWrp.popup("open");
		});
	});
}

/**
 * 给元素绑定事件
 */
mb.vi.mind.prototype._renderMindBean = function (mindBean, isNew) {
	//意见列表
	var mindHtml = "";
	if (mindBean) {
		var canDelete = false;
		if (isNew || this.pkCode == mindBean["MIND_ID"]) {
			canDelete = true;
		}
		mindHtml += "<li class='ui-field-contain" + (canDelete ? " sc-mind-temp" : "") + "' id='" + mindBean["MIND_ID"] + "'>" +
		"<label class='ui-input-text sc-mind-label'>" + mindBean["MIND_CODE_NAME"] + "</label>" +
		(canDelete ? "<span>删除</span>" : "") +
		"<div class='ui-input-text ui-grid-a ui-input-text' style='margin-top:1em;border-width:0'>" +
		"<span class='sc-mind-user'>" + mindBean["S_UNAME"] + ": </span>" +
		"<div class='sc-mind-text'>" + mindBean["MIND_CONTENT"] + "</div>";
		var mindImgSrc = "";
		if (mindBean['imgSrc']) {
			mindImgSrc = FireFlyContextPath + mindBean['imgSrc'];
		} else if (isNew && $(".sc-sign-selected").length) { //如果是新增
			mindImgSrc = $(".sc-sign-selected").find("img").attr("src");
		}
		var mobileFlag = mindBean['MOBILE_FLAG'];

		if (mindImgSrc) {
			mindHtml += "<img class='sc-mind-img' data-sign-id='" + mindBean["SIGN_ID"] + "' src='" + mindImgSrc + "'>";
			if (mobileFlag == 1) {
				mindHtml += "<div style='width:30%;float:right;'>&nbsp;<a href='#' MIND_ID='"
				 + mindBean['MIND_ID']
				 + "' class='CADS_MIND'>"
				 + "验证手机签名</a></div>";
			} else {
				mindHtml += "<div style='width:30%;float:right;'>&nbsp;<a href='#' MIND_ID='"
				 + mindBean['MIND_ID']
				 + "' class='CADS_MIND'>"
				 + "验证数字签名</a></div>";
			}
		}

		mindHtml += "</div></li>";
	}
	return mindHtml;
};
/**
 * 给元素绑定事件
 */
mb.vi.mind.prototype._bindEvent = function () {
	var _self = this;
	$("#" + _self._dataId + "_MIND").on("vclick", ".sc-sign-block", function () { //选择数字签名
		$(".sc-sign-selected").removeClass("sc-sign-selected");
		$(this).addClass("sc-sign-selected");

	}).on("vclick", ".sc-mind-temp>span", function (event) {
		event.preventDefault();
		event.stopImmediatePropagation();
		var $that = $(this).parent();
		navigator.notification.confirm('是否删除?', function (index) {
			if (index == 2) {
				var id = $that.attr("id");
	      	  	 FireFly.doAct("SY_COMM_MIND", "delete", {"_PK_": id}).done(function(result){
					var rtnMsg = result[UIConst.RTN_MSG];
					if (StringUtils.startWith(rtnMsg, UIConst.RTN_OK)) {
						_self.pkCode = null;
						$("#mind-content").val("");
						_self.oldMindText = "";
						$that.fadeOut(500, function () {
							$that.remove();
						});
			  			//2016-06-01 需要刷新， 因为固定意见 如果没有意见是不能流转的。
						_self._wfCard._parHandler._refresh();
					}
				});
			}
		}, '提示', ['取消', '确定']);
	}).on("vclick", "#save-btn", function (event) { // 给保存按钮绑定保存事件
		var currMind = _self._wfCard.getMindCodeBean();
		if (!currMind.CODE_ID) { //没有意见输入框，则返回不保存
			return false;
		}
		var mindContent = $("#mind-content").val();
		if (mindContent == undefined || mindContent.length <= 0) {
			navigator.notification.alert("意见不能为空!", null, '提示', '确定');
			return false;
		}
		var data = {};
		data["MIND_CODE"] = currMind.CODE_ID;
		data["MIND_CONTENT"] = mindContent;
		data["MIND_CODE_NAME"] = currMind.CODE_NAME;
		data["SERV_ID"] = _self._servId;
		data["DATA_ID"] = _self._dataId;
		data["WF_NI_ID"] = _self._wfCard.getNodeInstBean().NI_ID;
		data["WF_NI_NAME"] = _self._wfCard.getNodeInstBean().NODE_NAME;
		data["MIND_DIS_RULE"] = currMind.MIND_DIS_RULE; //显示规则
		data["MIND_TYPE"] = "1"; //1:文字意见;2:手写意见
		data["S_FLAG"] = 2; //启用标志
		data["MOBILE_FLAG"] = "1"; // 是手机端填写
		data["DS_CERT"] = device.udid;

		if (_self.pkCode) { //如果存在则更新，否则保存
			data["_PK_"] = _self.pkCode;
		}
		if ($(".sc-sign-selected").length) {
			data["SIGN_ID"] = $(".sc-sign-selected").data("signId");
		}

		FireFly.doAct("SY_COMM_MIND", "save", data).done(function (result) {
//			console.log("========>>>会签data: " + JsonToStr(data) );
			//{"MIND_CODE":"HQ-1589","MIND_CONTENT":"5","MIND_CODE_NAME":"部门会签意见",
			//"SERV_ID":"OA_FM_FILE","DATA_ID":"1EdKgevcx0F8YWU4BWjTg8","WF_NI_ID":"1Bje4JCdxdQbBBbU8Cw94P",
			//"WF_NI_NAME":"会签","MIND_DIS_RULE":"2","MIND_TYPE":"1","S_FLAG":2,"MOBILE_FLAG":"1",
			//"DS_CERT":"10A5D004E43D"}

			var rtnMsg = result[UIConst.RTN_MSG];
			if (StringUtils.startWith(rtnMsg, UIConst.RTN_OK)) {
				_self.pkCode = result["MIND_ID"];
				_self.oldMindText = result["MIND_CONTENT"] || "";
				if ($("#" + _self.pkCode).length) {
					var $mindText = $("#" + _self.pkCode).find(".sc-mind-text");
					$mindText.html(result["MIND_CONTENT"]);

					//鉴于新选择的数字签名需要请求服务器,在此,直接从本地选取
					var selectedSignId = $(".sc-sign-selected").data("signId");
					var $mindImg = $("#" + _self.pkCode).find(".sc-mind-img");
					if ($mindImg.data("signId") != selectedSignId) {
						var src = $(".sc-sign-selected").find("img").attr("src");
						$mindImg.attr("src", src);
					}
				} else {
					var newMind = _self._renderMindBean(result, true);
					$(".js-btn-save-contain").after(newMind);
					$(".js-btn-save-contain").parent().listview("refresh");
				}
				// zjx -- 重新判断是否为必填意见
				_self._wfCard._mindMust();
 				_self._wfCard._parHandler._refresh();
			} else {
				navigator.notification.alert("意见保存失败，请检查!", null, '提示', '确定');
 				navigator.notification.alert(rtnMsg);
			}
		});
	}).on("vclick", ".CADS_MIND", function (event) { // 给验证签名按钮绑定点击事件
		event.preventDefault();
		event.stopImmediatePropagation();
		var cadsBtn = jQuery(this);
		var data = {};
		var mindId = cadsBtn.attr("MIND_ID");
		data["_PK_"] = mindId;
		FireFly.doAct("SY_COMM_MIND", "cadsMind", data).done(function (result) {
			alert(result["_MSG_"]);
		});
	}).on("vclick", "#save-regularMindBtn", function (event) {
		/**
		 *  给 固定意见 的 保存按钮绑定保存事件
		 *  ---2016-06-22 huangshikai
		 */
		var currMind = _self._regularMind || {};

		if (!currMind || !currMind.CODE_ID) { //没有意见输入框，则返回不保存
			return false;
		}
		var mindContent = $("#regularMind-content").val();
		if (!mindContent) {
			alert("保存意见不能为空！");
			return false;
		}
		if (!regularFlag) {
			alert("请选择固定意见。");
			return false;
		}

		//		debugger;
		//TODO 下面的固定意见获取，如果用其他账号，query 会自动 加上sql条件  S_USER='xxx' 查不到。所以写两个or。使得后面内容满足不了
		//获取 固定意见模板 的 对应 同意不同意 的 ID
		FireFly.doAct("SY_COMM_MIND_USUAL", "query", {
			"_WHERE_" : " and REGULAR_TYPE='" + currMind.CODE_ID + "' or REGULAR_TYPE='" + currMind.CODE_ID + "'"
		}).done(function (res) {

			var data = {};
			data["MIND_CODE"] = currMind.CODE_ID; //固定意见模版 ID
			data["MIND_CONTENT"] = mindContent;
			data["MIND_CODE_NAME"] = currMind.CODE_NAME;
			data["SERV_ID"] = _self._servId;
			data["DATA_ID"] = _self._dataId;
			data["WF_NI_ID"] = _self._origData.nodeInstBean.NI_ID;
			data["WF_NI_NAME"] = _self._origData.nodeInstBean.NODE_NAME;
			data["MIND_DIS_RULE"] = currMind.MIND_DIS_RULE; //显示规则
			data["MIND_TYPE"] = "1"; //1:文字意见;2:手写意见
			data["S_FLAG"] = 2; //启用标志
			data["MOBILE_FLAG"] = "1"; // 是手机端填写
			data["DS_CERT"] = device.udid;
			if (_self.pkCode) { //如果存在则更新，否则保存
				data["_PK_"] = _self.pkCode;
			}
			if ($(".sc-sign-selected").length) { //选择签名
				data["SIGN_ID"] = $(".sc-sign-selected").data("signId");
			}
			//获取固定意见id
		FireFly.doAct('SY_COMM_MIND_USUAL','finds',{"_WHERE_":" AND REGULAR_TYPE='"+currMind.CODE_ID+"' AND MIND_VALUE='"+regularFlag+"' "}).done(function(bean) {
				if (bean && bean._DATA_) {
					data["USUAL_ID"] = bean._DATA_[0].MIND_ID || "";
				}
				FireFly.doAct("SY_COMM_MIND", "save", data).done(function (result) {
					_self._wfCard._parHandler._refresh();
					setTimeout(function () {
						_self._wfCard._parHandler._addNCBtn();
					}, 2000);
					//				navigator.notification.alert("意见保存成功!",null,'提示', '确定');
				}, function (res) {
					navigator.notification.alert("意见保存失败!", null, '提示', '确定');
				});
			});
		});
	});
};

mb.vi.mind.prototype._refresh = function () {
	this._clear();
	this.show();

};
/**
 * 给元素绑定事件
 */
mb.vi.mind.prototype._afterLoad = function () {
	// 如果没有意见输入框也没有意见列表，隐藏掉意见分组框
	this._hideMindGroup();
};
// 隐藏意见分组框  TODO 由流程控制
mb.vi.mind.prototype._hideMindGroup = function () {
	var _self = this;
	if (jQuery(_self._pCon).children("li").length <= 0) { // 如果既没有输入框也没有列表
		jQuery("#" + _self._dataId + "_MIND").hide(); // 隐藏掉意见分组框
	}
};

/**
 * 填充固定意见输入框的数据，
 * type可取2：同意类型的固定意见；3：不同意类型的固定意见
 * regularflag全局变量，记录当前选中的固定意见类型
 */
function fillData(type, value) {
	regularFlag = type;
	jQuery("#regularMind-content").val(value); //给意见填入框填写内容
	//选中单选框后，设置checked属性为checked，其他的则移除checked属性
	jQuery("#regularMind").find("input[name='regularType']").each(function () {
		var radioVal = jQuery(this).attr("id") || "";
		if (radioVal == type) {
			jQuery(this).attr("checked", "checked");
		} else {
			jQuery(this).removeAttr("checked");
		}
	});
};
