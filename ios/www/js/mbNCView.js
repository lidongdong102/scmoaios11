
/**
 * NC报销系统
 * ----2016-03-18 liufengyuan
 */
/**
 * NC报销单
 */
mb.vi.cardView.prototype._NCApplyCard = function() {
    var _self = this;

	if(_self.servId != "EA_APPLY"){
		console.log("不是NC报销单－－_self.servId :"+_self.servId+"－－return");
		return;
	}
	var eaId = _self.getPKCode();// eaId 为主键编码
	console.log("--------------_NCApplyCard，报销单.eaId:" + eaId);
    
	// EA_SUBJ 报销科目   cardBtn isZD
	FireFly.doAct("EA_SUBJ", "query", {"_WHERE_":" and EA_ID='"+eaId+"'"}).done(function(res){
		var data = res._DATA_;// EA_SUBJ 的 _DATA_ 数组
		    
		var traSDept = jQuery("li[code='NCZiDan']");//获取最后一个code，后面添加
		
		var eaTable = $("#EA_SUBJ_card");//获取 报销子单
		if( eaTable.length == 0 ){//如果不存在，则添加，如果存在，则跳过
			eaTable = $("<li class='ui-field-contain ui-li-static ui-body-inherit' code='EA_SUBJ' model='3'><table id='EA_SUBJ_card' width='340px' style='border:solid #add9c0; border-width:1px 0px 0px 1px;'><tbody><tbody></table></li>").insertAfter(traSDept);
			var eaTr = $("<tr><th colspan='2' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>报销科目</th></tr>").appendTo(eaTable);
		}else{
			return;
		}
		
		for(var i=0; i<data.length; i++){// 遍历得到的数据，并且展示。
			var deptName = res._DATA_[i].DEPTNAME;// 预算部门名称
			var costName = res._DATA_[i].COSTNAME;// 预算科目名称
			var jobName = res._DATA_[i].JOBNAME;// 费用项目名称
			var jobNameTZ = res._DATA_[i].JOBNAME_TZ;// 投资项目名称
			var BxSubjItemBal = res._DATA_[i].BX_SUBJ_ITEM_BAL;// 可用余额
			var BxDetailResion = res._DATA_[i].BX_DETAIL_RESION;// 支出明细及原因
			var BxAmount = res._DATA_[i].BX_AMOUNT;// 报销金额
			var BxDocCount = res._DATA_[i].BX_DOC_COUNT;// 单据张数
			jQuery("" +
					"<tr id='EaSubjLi-" + (i+1) + "'><th width='30%' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + (i+1) + "、预算部门</th><th style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + deptName + "</th></tr>"  
					+ "<tr><th width='30%' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>预算科目</th><th style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + costName + "</th></tr>"
					+ "<tr><th width='30%' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>费用项目</th><th style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + jobName + "</th></tr>"
					+ "<tr><th width='30%' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>投资项目</th><th  style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + jobNameTZ + "</th></tr>"
					+ "<tr><th width='30%' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>可用余额</th><th   style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + BxSubjItemBal + "</th></tr>"
					+ "<tr><th width='30%' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>支出明细及原因</th><th style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + BxDetailResion + "</th></tr>"
					+ "<tr><th width='30%' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>报销金额</th><th  style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + BxAmount + "</th></tr>"
					+ "<tr><th width='30%' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>单据张数</th><th  style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + BxDocCount + "</th>"
					+ "</tr>").appendTo(eaTable);
		}
		
		// EA_PAYEE_INFO 领款人信息
		FireFly.doAct("EA_PAYEE_INFO", "query", {"_WHERE_":" and EA_ID='"+eaId+"'"}).done(function(res2){
			var data = res2._DATA_;// EA_PAYEE_INFO 的 _DATA_ 数组
			
			var traEASubj = jQuery("li[code='EA_SUBJ']");//获取最后一个code，后面添加
			
			var eaTable = $("#EA_PAYEE_INFO_card");//获取 报销子单
			if( eaTable.length == 0 ){//如果不存在，则添加，如果存在，则跳过
				eaTable = $("<li class='ui-field-contain ui-li-static ui-body-inherit' code='EA_PAYEE_INFO' model='3'><table id='EA_PAYEE_INFO_card' width='340px' style='border:solid #add9c0; border-width:1px 0px 0px 1px;'><tbody></tbody></table></li>").insertAfter(traEASubj);
				var eaTr = $("<tr><th colspan='2' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>领款人信息</th></tr>").appendTo(eaTable);
			}else{
				return;
			}
			
			for(var i=0; i<data.length; i++){// 遍历得到的数据，并且展示。
				
				var payName = res2._DATA_[i].PAY_NAME;// 领款人姓名
				var payBank = res2._DATA_[i].PAY_BANK;// 开户银行
				var payBankCode = res2._DATA_[i].PAY_BANK_CODE;// 领款人银行账号
				var payGetAmount = res2._DATA_[i].PAY_GET_AMOUNT;// 领款金额
				jQuery( "<tr id='EaPayeeInfoLi-" + (i+1) + "'><th width='30%' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + (i+1) + "、领款人姓名</th><th style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + payName + "</th></tr>"
						+ "<tr><th width='30%' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>开户银行</th><th style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + payBank + "</th></tr>"
						+ "<tr><th width='30%' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>领款人银行账号</th><th style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + payBankCode + "</th></tr>"
						+ "<tr><th width='30%' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>领款金额</th><th style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + payGetAmount + "</th>"
						+ "</tr>").appendTo(eaTable);
			}
		});
	});
	
}

/**
 * NC出差报销单
 */
mb.vi.cardView.prototype._NCApplyCardTra = function() {
	var _self = this;
	if(_self.servId != "EA_APPLY_TRA"){
		console.log("不是NC出差报销单－－_self.servId :"+_self.servId+"－－return");
		return;
	}
	var eaId = _self.getPKCode();// eaId 为主键编码
	console.log("--------------_NCApplyCardTra，出差报销单.eaId:" + eaId);
	
	// EA_SUBJ_TRA 报销科目   cardBtn isZD
	FireFly.doAct("EA_SUBJ_TRA", "query", {"_WHERE_":" and EA_ID='"+eaId+"'"}).done(function(res01){
		var data = res01._DATA_;// EA_SUBJ_TRA 的 _DATA_ 数组
		
		var traSDept = jQuery("li[code='NCZiDan']");//获取最后一个code，后面添加
		
		var eaTable = $("#EA_SUBJ_TRA_card");//获取 报销子单
		if( eaTable.length == 0 ){//如果不存在，则添加，如果存在，则跳过
			eaTable = $("<li class='ui-field-contain ui-li-static ui-body-inherit' code='EA_SUBJ_TRA' model='3'><table id='EA_SUBJ_TRA_card' width='340px' style='border:solid #add9c0; border-width:1px 0px 0px 1px;'><tbody><tbody></table></li>").insertAfter(traSDept);
			var eaTr = $("<tr><th colspan='2' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>报销明细项</th></tr>").appendTo(eaTable);
		}else{
			return;
		}
		
		for(var i=0; i<data.length; i++){// 遍历得到的数据，并且展示。
			var deptName = res01._DATA_[i].DEPTNAME;// 预算部门名称
			var costName = res01._DATA_[i].COSTNAME;// 预算科目名称
			var jobName = res01._DATA_[i].JOBNAME;// 费用项目名称
			var jobNameTZ = res01._DATA_[i].JOBNAME_TZ;// 所属项目名称
//			var BxSubjItemBal = res01._DATA_[i].BX_SUBJ_ITEM_BAL;// 可用余额
			var BxDetailResion = res01._DATA_[i].BX_DETAIL_RESION;// 支出明细及原因
			var BxAmount = res01._DATA_[i].BX_AMOUNT;// 报销金额
			var BxDocCount = res01._DATA_[i].BX_DOC_COUNT;// 单据张数
			jQuery( "<tr id='EaSubjLi-" + (i+1) + "'><th width='30%' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + (i+1) + "、预算部门名称</th><th style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + deptName + "</th></tr>"  
					+ "<tr><th width='30%' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>预算科目名称</th><th style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + costName + "</th></tr>"
					+ "<tr><th width='30%' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>费用项目名称</th><th style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + jobName + "</th></tr>"
					+ "<tr><th width='30%' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>所属项目名称</th><th style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + jobNameTZ + "</th></tr>"
					+ "<tr><th width='30%' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>支出明细及原因</th><th style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + BxDetailResion + "</th></tr>"
					+ "<tr><th width='30%' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>报销金额</th><th style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + BxAmount + "</th></tr>"
					+ "<tr><th width='30%' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>单据张数</th><th style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + BxDocCount + "</th>"
					+ "</tr>").appendTo(eaTable);
		}
		
		// EA_PAYEE_INFO_TRA 领款人信息   cardBtn isZD
		FireFly.doAct("EA_PAYEE_INFO_TRA", "query", {"_WHERE_":" and EA_ID='"+eaId+"'"}).done(function(res){
			var data = res._DATA_;// EA_PAYEE_INFO_TRA 的 _DATA_ 数组
			
			var traEaST = jQuery("li[code='EA_SUBJ_TRA']");//获取最后一个code，后面添加
			
			var eaTable = $("EA_PAYEE_INFO_TRA_card");//获取 报销子单
			if( eaTable.length == 0 ){//如果不存在，则添加，如果存在，则跳过
				eaTable = $("<li class='ui-field-contain ui-li-static ui-body-inherit' code='EA_PAYEE_INFO_TRA' model='3'><table id='EA_PAYEE_INFO_TRA_card' width='340px' style='border:solid #add9c0; border-width:1px 0px 0px 1px;'><tbody><tbody></table></li>").insertAfter(traEaST);
				var eaTr = $("<tr><th colspan='2' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>领款人信息</th></tr>").appendTo(eaTable);
			}else{
				return;
			}
			
			for(var i=0; i<data.length; i++){// 遍历得到的数据，并且展示。
				var payBankCode = res._DATA_[i].PAY_BANK_CODE;// 账号
				var payName = res._DATA_[i].PAY_NAME;// 户名
				var payGetAmount = res._DATA_[i].PAY_GET_AMOUNT;// 金额
				var payBank =  res._DATA_[i].PAY_BANK;// 开户行
				jQuery( "<tr id='EaSubjLi-" + (i+1) + "'><th width='30%' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + (i+1) + "、账号</th><th style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + payBankCode + "</th></tr>"  
						+ "<tr><th width='30%' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>户名</th><th style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + payName + "</th></tr>"
						+ "<tr><th width='30%' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>金额</th><th style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + payGetAmount + "</th></tr>"
						+ "<tr><th width='30%' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>开户行</th><th style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + payBank + "</th></tr>"
						+ "</tr>").appendTo(eaTable);
			}
		});
	});
	
	
}

/**
 * NC 支票汇票申请单  EA_APPLY_ZHP
 */
mb.vi.cardView.prototype._NCApplyZhp = function() {
	var _self = this;
	if(_self.servId != "EA_APPLY_ZHP"){
		console.log("不是NC 支票汇票申请单－－_self.servId :"+_self.servId+"－－return");
		return;
	}
	var eaId = _self.getPKCode();// eaId 为主键编码
	console.log("--------------_NCApplyZhp，支票汇票申请单.eaId:" + eaId);
	
	// EA_SUBJ_TRA 报销科目   
	FireFly.doAct("EA_SUBJ_ZHP", "query", {"_WHERE_":" and EA_ID='"+eaId+"'"}).done(function(res){
		var data = res._DATA_;// EA_SUBJ_TRA 的 _DATA_ 数组
		
		var traSDetp = jQuery("li[code='NCZiDan']");//获取最后一个code，后面添加
		
		var eaTable = $("#EA_SUBJ_ZHP_card");//获取 报销子单
		if( eaTable.length == 0 ){//如果不存在，则添加，如果存在，则跳过
			eaTable = $("<li class='ui-field-contain ui-li-static ui-body-inherit' code='EA_SUBJ_ZHP' model='3'><table id='EA_SUBJ_ZHP_card' width='340px' style='border:solid #add9c0; border-width:1px 0px 0px 1px;'><tbody><tbody></table></li>").insertAfter(traSDetp);
			var eaTr = $("<tr><th colspan='2' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>报销科目</th></tr>").appendTo(eaTable);
		}else{
			return;
		}
		
		for(var i=0; i<data.length; i++){// 遍历得到的数据，并且展示。
			var deptName = res._DATA_[i].DEPTNAME;// 预算部门名称
			var costName = res._DATA_[i].COSTNAME;// 预算科目名称
			var jobName = res._DATA_[i].JOBNAME;// 费用项目名称
			var jobNameTZ = res._DATA_[i].JOBNAME_TZ;// 投资项目名称
			var BxSubjItemBal = res._DATA_[i].BX_SUBJ_ITEM_BAL;// 可用余额
			var BxDetailResion = res._DATA_[i].BX_DETAIL_RESION;// 支出明细及原因
			var BxAmount = res._DATA_[i].BX_AMOUNT;// 报销金额
			var BxDocCount = res._DATA_[i].BX_DOC_COUNT;// 单据张数
			jQuery( "<tr id='EaSubjZhpLi-" + (i+1) + "'><th width='30%' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + (i+1) + "、预算部门名称</th><th style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + deptName + "</th></tr>"  
					+ "<tr><th width='30%' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>预算科目名称</th><th style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + costName + "</th></tr>"
					+ "<tr><th width='30%' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>费用项目名称</th><th style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + jobName + "</th></tr>"
					+ "<tr><th width='30%' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>投资项目名称</th><th style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + jobNameTZ + "</th></tr>"
					+ "<tr><th width='30%' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>可用余额</th><th style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + BxSubjItemBal + "</th></tr>"
					+ "<tr><th width='30%' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>支出明细及原因</th><th style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + BxDetailResion + "</th></tr>"
					+ "<tr><th width='30%' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>报销金额</th><th style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + BxAmount + "</th></tr>"
					+ "<tr><th width='30%' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>单据张数</th><th style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + BxDocCount + "</th>"
					+ "</tr>").appendTo(eaTable);
		}
	});
}


/**
 * NC 借款申请单  EA_APPLY_JK
 */
mb.vi.cardView.prototype._NCApplyJk = function() {
	var _self = this;
	if(_self.servId != "EA_APPLY_JK"){
		console.log("不是NC 支票汇票申请单－－_self.servId :"+_self.servId+"－－return");
		return;
	}
	var eaId = _self.getPKCode();// eaId 为主键编码
	console.log("--------------_NCApplyJk，支票汇票申请单.eaId:" + eaId);
	
	// EA_APPLY_JK 借款申请单  
	FireFly.doAct("EA_PAYEE_INFO_JK", "query", {"_WHERE_":" and EA_ID='"+eaId+"'"}).done(function(res){
		var data = res._DATA_;// EA_SUBJ_TRA 的 _DATA_ 数组
		
		var traSDetp = jQuery("li[code='NCZiDan']");//获取最后一个code，后面添加
		
		var eaTable = $("#EA_PAYEE_INFO_JK_card");//获取 报销子单
		if( eaTable.length == 0 ){//如果不存在，则添加，如果存在，则跳过
			eaTable = $("<li class='ui-field-contain ui-li-static ui-body-inherit' code='EA_PAYEE_INFO_JK' model='3'><table id='EA_PAYEE_INFO_JK_card' width='340px' style='border:solid #add9c0; border-width:1px 0px 0px 1px;'><tbody><tbody></table></li>").insertAfter(traSDetp);
			var eaTr = $("<tr><th colspan='2' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>领款人信息</th></tr>").appendTo(eaTable);
		}else{
			return;
		}
		
		for(var i=0; i<data.length; i++){// 遍历得到的数据，并且展示。
			var payBankCode = res._DATA_[i].PAY_BANK_CODE;// 账号
			var payName = res._DATA_[i].PAY_NAME;// 户名
			var payGetAmount = res._DATA_[i].PAY_GET_AMOUNT;// 金额
			var payBank =  res._DATA_[i].PAY_BANK;// 开户行
			jQuery("" +
					"<tr id='EaSubjLi-" + (i+1) + "'><th width='30%' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + (i+1) + "、账号</th><th style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + payBankCode + "</th></tr>"  
					+ "<tr><th width='30%' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>户名</th><th style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + payName + "</th></tr>"
					+ "<tr><th width='30%' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>金额</th><th style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + payGetAmount + "</th></tr>"
					+ "<tr><th width='30%' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>开户行</th><th style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + payBank + "</th></tr>"
					+ "</tr>").appendTo(eaTable);
		}
	});
}

/**
 * NC 资金调拨单 EA_APPLY_ZJDB
 */
mb.vi.cardView.prototype._NCApplyZjdb = function() {
	var _self = this;
	if(_self.servId != "EA_APPLY_ZJDB"){
		console.log("不是NC 资金调拨单－－_self.servId :"+_self.servId+"－－return");
		return;
	}
	var eaId = _self.getPKCode();// eaId 为主键编码
	console.log("--------------_NCApplyZjdb，资金调拨单.eaId:" + eaId);
	
	// EA_APPLY_JK 借款申请单  
	FireFly.doAct("EA_ZJDB_DETAILS", "query", {"_WHERE_":" and EA_ID='"+eaId+"'"}).done(function(res){
		var data = res._DATA_;// EA_SUBJ_TRA 的 _DATA_ 数组
	
		var traSDetp = jQuery("li[code='NCZiDan']");//获取最后一个code，后面添加
		
		var eaTable = $("#EA_ZJDB_DETAILS_card");//获取 报销子单
		if( eaTable.length == 0 ){//如果不存在，则添加，如果存在，则跳过
			eaTable = $("<li class='ui-field-contain ui-li-static ui-body-inherit' code='EA_ZJDB_DETAILS' model='3'><table id='EA_ZJDB_DETAILS_card' width='340px' style='border:solid #add9c0; border-width:1px 0px 0px 1px;'><tbody><tbody></table></li>").insertAfter(traSDetp);
			var eaTr = $("<tr><th colspan='2' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>资金调拨明细</th></tr>").appendTo(eaTable);
		}else{
			return;
		}
		
		for(var i=0; i<data.length; i++){// 遍历得到的数据，并且展示。
			var subjNameZhuChu = res._DATA_[i].SUBJNAME_ZHUCHU;// 转出科目
			var subjNameZhuRu = res._DATA_[i].SUBJNAME_ZHURU;// 转入科目
			var bankDocNameZhuChu = res._DATA_[i].BANKDOCNAME_ZHUCHU;// 转出银行
			var bankDocNameZhuRu =  res._DATA_[i].BANKDOCNAME_ZHURU;// 转入银行
			var accountNameZhuChu = res._DATA_[i].ACCOUNTNAME_ZHUCHU;//转出账户
			var accountNameZhuRu = res._DATA_[i].ACCOUNTNAME_ZHURU;//转入账户
			var detailZhuChuAmount = res._DATA_[i].DETAIL_ZHUCHU_AMOUNT;//转出金额
			var detailZhuRuAmount = res._DATA_[i].	DETAIL_ZHURU_AMOUNT;//转入金额
			jQuery("" +
					"<tr id='EaSubjLi-" + (i+1) + "'><th width='30%' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + (i+1) + "、转出科目</th><th style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + subjNameZhuChu + "</th></tr>"  
					+ "<tr><th width='30%' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>转入科目</th><th style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + subjNameZhuRu + "</th></tr>"
					+ "<tr><th width='30%' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>转出银行</th><th style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + bankDocNameZhuChu + "</th></tr>"
					+ "<tr><th width='30%' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>转入银行</th><th style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + bankDocNameZhuRu + "</th></tr>"
					+ "<tr><th width='30%' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>转出账户</th><th style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + accountNameZhuChu + "</th></tr>"
					+ "<tr><th width='30%' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>转入账户</th><th style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + accountNameZhuRu + "</th></tr>"
					+ "<tr><th width='30%' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>转出金额</th><th style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + detailZhuChuAmount + "</th></tr>"
					+ "<tr><th width='30%' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>转入金额</th><th style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + detailZhuRuAmount + "</th></tr>"
					+ "</tr>").appendTo(eaTable);
		}
	});
}

/**
 * 内嵌服务 的绘制 
 * ----2016-05-04 liufengyuan
 */
mb.vi.cardView.prototype._NCNQService = function() {
	var _self = this;
	var eaId = _self.getPKCode();// eaId 为主键编码
	console.log("--------------出差内嵌服务的，eaId:" + eaId);
	
	if( _self.servId != "EA_APPLY_TRA"){
		console.log("内嵌服务：不是  NC出差报销单－－－－是：" + _self.servId);
		return;
	}
	
	var traJiao = jQuery("li[code='TRA_JIAO']");
	if(traJiao.length <= 0){
		return;
	}
	
	
	/**
	 * 交通费用明细 EA_TRAVEL_JAOTONG
	 */
	FireFly.doAct("EA_TRAVEL_JAOTONG", "query", {"_WHERE_":" and EA_ID='"+eaId+"'"}).done(function(res){
		
		console.log("-------------执行了")
		var data = res._DATA_;// EA_TRAVEL_JAOTONG 的 _DATA_ 数组
		var traJiaoTAB = $("#EA_TRAVEL_JAOTONG_card");//获取 报销子单
		if( traJiaoTAB.length == 0 ){//如果不存在，则添加，如果存在，则跳过
			traJiaoTAB = $("<table id='EA_TRAVEL_JAOTONG_card' width='340px' style='border:solid #add9c0; border-width:1px 0px 0px 1px;'><tbody><tbody></table>").appendTo(traJiao);
			$("<tr><th colspan='2' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>交通费用明细</th></tr>").appendTo(traJiaoTAB);
		}else{
			return;
		}
		for(var i=0; i<data.length; i++){// 遍历得到的数据，并且展示。  
			var tr1 = res._DATA_[i].TRA_CHUFA_DATE;// 出发日期
			var tr2 = res._DATA_[i].TRA_CHUFA_ADDR;// 出发地点
			var tr3 = res._DATA_[i].TRA_JT_INFO;// 航班号/车次/车号
			var tr4 =  res._DATA_[i].TRA_DAODA_DATE;// 抵达日期
			var tr5 = res._DATA_[i].TRA_DAODA_ADDR;//抵达地点 
			var tr6 = res._DATA_[i].TRA_JT_AMOUNT;//金额
			var tr7 = res._DATA_[i].	TRA_JT_DOC_COUNT;//张数
			
			jQuery("" +
					"<tr id='EaTRAJT-" + (i+1) + "'><th width='30%' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + (i+1) + "、出发日期</th><th style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + tr1 + "</th></tr>"  
					+ "<tr><th width='30%' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>出发地点</th><th style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + tr2 + "</th></tr>"
					+ "<tr><th width='30%' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>航班号/车次/车号</th><th style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + tr3 + "</th></tr>"
					+ "<tr><th width='30%' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>抵达日期</th><th style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + tr4 + "</th></tr>"
					+ "<tr><th width='30%' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>抵达地点</th><th style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + tr5 + "</th></tr>"
					+ "<tr><th width='30%' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>金额</th><th style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + tr6 + "</th></tr>"
					+ "<tr><th width='30%' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>张数</th><th style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + tr7 + "</th></tr>"
					+ "</tr>").appendTo(traJiaoTAB);
			
		}
		
		
		var traZS = jQuery("li[code='TRA_ZHUSU']");
		if(traZS.length <= 0){
			return;
		}
		
		
		/**
		 * 住宿费用明细 EA_TRAVEL_ZHUSU
		 */
		FireFly.doAct("EA_TRAVEL_ZHUSU", "query", {"_WHERE_":" and EA_ID='"+eaId+"'"}).done(function(res){
			var data = res._DATA_;// EA_TRAVEL_ZHUSU 的 _DATA_ 数组
			var traZSTAB = $("#EA_TRAVEL_ZHUSU_card");//获取 报销子单
			if( traZSTAB.length == 0 ){//如果不存在，则添加，如果存在，则跳过
				traZSTAB = $("<table id='EA_TRAVEL_ZHUSU_card' width='340px' style='border:solid #add9c0; border-width:1px 0px 0px 1px;'><tbody><tbody></table>").appendTo(traZS);
				$("<tr><th colspan='2' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>住宿费用明细</th></tr>").appendTo(traZSTAB);
			}else{
				return;
			}
			for(var i=0; i<data.length; i++){// 遍历得到的数据，并且展示。  
				var tr1 = res._DATA_[i].TRA_ZHUSU_BDATE;// 入住日期
				var tr2 = res._DATA_[i].TRA_ZHUSU_EDATE;// 离开日期
				var tr3 = res._DATA_[i].TRA_ZHUSU_INFO;// 宾馆名称&所在城市
				var tr4 =  res._DATA_[i].TRA_ZHUSU_DATES;// 天数
				var tr5 = res._DATA_[i].TRA_ZHUSU_DANJIA;//房价/间数
				var tr6 = res._DATA_[i].TRA_ZHUSU_AMOUNT;//费用总额
				
				jQuery( "<tr id='EaTRAJT-" + (i+1) + "'><th width='30%' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + (i+1) + "、入住日期</th><th style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + tr1 + "</th></tr>"  
						+ "<tr><th width='30%' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>离开日期</th><th style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + tr2 + "</th></tr>"
						+ "<tr><th width='30%' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>宾馆名称&所在城市</th><th style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + tr3 + "</th></tr>"
						+ "<tr><th width='30%' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>天数</th><th style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + tr4 + "</th></tr>"
						+ "<tr><th width='30%' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>房价/间数</th><th style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + tr5 + "</th></tr>"
						+ "<tr><th width='30%' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>费用总额</th><th style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + tr6 + "</th></tr>"
						+ "</tr>").appendTo(traZSTAB);
				
			}
			
			var traZD = jQuery("li[code='TRA_ZHAODAI']");
			if(traZD.length <= 0){
				return;
			}
			
			
			/**
			 * 招待费用明细 EA_TRAVEL_ZHAODAI
			 */
			FireFly.doAct("EA_TRAVEL_ZHAODAI", "query", {"_WHERE_":" and EA_ID='"+eaId+"'"}).done(function(res){
				var data = res._DATA_;// EA_TRAVEL_ZHUSU 的 _DATA_ 数组
				var traZDTAB = $("#EA_TRAVEL_ZHAODAI_card");//获取 报销子单
				if( traZDTAB.length == 0 ){//如果不存在，则添加，如果存在，则跳过
					traZDTAB = $("<table id='EA_TRAVEL_ZHAODAI_card' width='340px' style='border:solid #add9c0; border-width:1px 0px 0px 1px;'><tbody><tbody></table>").appendTo(traZD);
					$("<tr><th colspan='2' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>招待费用明细</th></tr>").appendTo(traZDTAB);
				}else{
					return;
				}
				for(var i=0; i<data.length; i++){// 遍历得到的数据，并且展示。  
					var tr1 = res._DATA_[i].TRA_ZHAODAI_TIME;// 招待日期/时间
					var tr2 = res._DATA_[i].TRA_ZHAODAI_ADDR;// 饭店名称&所在城市
					var tr3 = res._DATA_[i].TRA_ZHAODAI_USERS_INFO;// 对方人员及职位
					var tr4 =  res._DATA_[i].TRA_ZHAODAI_COUNT;// 总人数
					var tr5 = res._DATA_[i].TRA_ZHAODAI_AMOUNT;//招待费用总额
					
					jQuery( "<tr id='EaTRAJT-" + (i+1) + "'><th width='30%' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + (i+1) + "、招待日期/时间</th><th style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + tr1 + "</th></tr>"  
							+ "<tr><th width='30%' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>饭店名称&所在城市</th><th style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + tr2 + "</th></tr>"
							+ "<tr><th width='30%' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>对方人员及职位</th><th style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + tr3 + "</th></tr>"
							+ "<tr><th width='30%' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>总人数</th><th style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + tr4 + "</th></tr>"
							+ "<tr><th width='30%' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>招待费用总额</th><th style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + tr5 + "</th></tr>"
							+ "</tr>").appendTo(traZDTAB);
					
				}
				
				var traElse = jQuery("li[code='TRA_ELSE']");
				if(traElse.length <= 0){
					return;
				}
				
				
				/**
				 * 其它费用明细 EA_TRAVEL_ELSE
				 */
				FireFly.doAct("EA_TRAVEL_ELSE", "query", {"_WHERE_":" and EA_ID='"+eaId+"'"}).done(function(res){
					var data = res._DATA_;// EA_TRAVEL_ZHUSU 的 _DATA_ 数组
					var traElseTAB = $("#EA_TRAVEL_ELSE_card");//获取 报销子单
					if( traElseTAB.length == 0 ){//如果不存在，则添加，如果存在，则跳过
						traElseTAB = $("<table id='EA_TRAVEL_ELSEU_card' width='340px' style='border:solid #add9c0; border-width:1px 0px 0px 1px;'><tbody><tbody></table>").appendTo(traElse);
						$("<tr><th colspan='2' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>其它费用明细</th></tr>").appendTo(traElseTAB);
					}else{
						return;
					}
					for(var i=0; i<data.length; i++){// 遍历得到的数据，并且展示。  
						var tr1 = res._DATA_[i].TRA_ELSE_ITEM;// 支出项目
						var tr2 = res._DATA_[i].TRA_ELSE_AMOUNT;// 金额
						var tr3 =  res._DATA_[i].TRA_ELSE_DOC_COUNT;// 单据张数
						
						jQuery( "<tr id='EaTRAJT-" + (i+1) + "'><th width='30%' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + (i+1) + "、支出项目</th><th style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + tr1 + "</th></tr>"  
								+ "<tr><th width='30%' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>金额</th><th style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + tr2 + "</th></tr>"
								+ "<tr><th width='30%' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>单据张数</th><th style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + tr3 + "</th></tr>"
								+ "</tr>").appendTo(traElseTAB);
						
					}
					
					var traBT = jQuery("li[code='TRA_BUTIE']");
					if(traBT.length <= 0){
						return;
					}
					
					
					/**
					 * 补贴费用信息 EA_TRAVEL_BUTIE
					 */
					FireFly.doAct("EA_TRAVEL_BUTIE", "query", {"_WHERE_":" and EA_ID='"+eaId+"'"}).done(function(res){
						var data = res._DATA_;// EA_TRAVEL_ZHUSU 的 _DATA_ 数组
						var traBTTAB = $("#EA_TRAVEL_BUTIE_card");//获取 报销子单
						if( traBTTAB.length == 0 ){//如果不存在，则添加，如果存在，则跳过
							traBTTAB = $("<table id='EA_TRAVEL_BUTIE_card' width='340px' style='border:solid #add9c0; border-width:1px 0px 0px 1px;'><tbody><tbody></table>").appendTo(traBT);
							$("<tr><th colspan='2' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>补贴费用信息</th></tr>").appendTo(traBTTAB);
						}else{
							return;
						}
						for(var i=0; i<data.length; i++){// 遍历得到的数据，并且展示。  
							var tr1 = res._DATA_[i].TRA_USER;// 出差人
							var tr2 = res._DATA_[i].TRA_GO_DATE;// 出差离开日期
							var tr3 = res._DATA_[i].TRA_RETURN_DATE;// 出差返回日期
							var tr4 =  res._DATA_[i].TRA_DATE_COUNT;// 出差天数
							var tr5 = res._DATA_[i].TRA_BUTIE_PRICE;//补贴/天
							var tr6 = res._DATA_[i].TRA_BUTIE_AMOUNT;//补贴金额
							
							jQuery( "<tr id='EaTRAJT-" + (i+1) + "'><th width='30%' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + (i+1) + "、出差人</th><th style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + tr1 + "</th></tr>"
									+ "<tr><th width='30%' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>出差离开日期</th><th style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + tr2 + "</th></tr>"
									+ "<tr><th width='30%' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>出差返回日期</th><th style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + tr3 + "</th></tr>"
									+ "<tr><th width='30%' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>出差天数</th><th style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + tr4 + "</th></tr>"
									+ "<tr><th width='30%' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>补贴/天</th><th style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + tr5 + "</th></tr>"
									+ "<tr><th width='30%' style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>补贴金额</th><th style='border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + tr6 + "</th></tr>"
									+ "</tr>").appendTo(traBTTAB);
							
						}
					});
					
				});
				
			});
		});
		
	});
}




