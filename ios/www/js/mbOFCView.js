
/**
* OFC报销系统
* ----2016-03-18 liufengyuan
*/
/**
* OFC报销单
*/
mb.vi.cardView.prototype._OFCApplyCard = function() {
    var _self = this;

    if(_self.servId != "OA_OFC_APPLY"){
        console.log("不是OFC报销单－－_self.servId :"+_self.servId+"－－return");
        return;
    }
    var ofcId = _self.getPKCode();// eaId 为主键编码
    console.log("--------------_NCApplyCard，报销单.eaId:" + ofcId);

    // EA_SUBJ 报销科目   cardBtn isZD
    FireFly.doAct("OA_OFC_APPLY_ITEM", "query", {"_WHERE_":" and APPLY_CODE='"+ofcId+"'"}).done(function(res){
        var data = res._DATA_;// OFC_SUBJ 的 _DATA_ 数组

        var traSDept = jQuery("li[code='OFCZiDan']");//获取最后一个code，后面添加
        var eaTable = $("#OA_OFC_SUBJ_card");//获取 报销子单
        if( eaTable.length == 0 ){//如果不存在，则添加，如果存在，则跳过
            eaTable = $("<li class='ui-field-contain ui-li-static ui-body-inherit' code='EA_SUBJ' model='3'><table id='OA_OFC_SUBJ_card'  style='border:solid #add9c0; border-width:1px 0px 0px 1px;'><tbody></tbody></table></li>").insertAfter(traSDept);
            var eaTr = $("<tr><th style='width:170px;border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>名称</th><td style='width:170px;border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>数量</td></tr>").appendTo(eaTable);
        }else{
            return;
        }

        for(var i=0; i<data.length; i++){// 遍历得到的数据，并且展示。
            var colName = res._DATA_[i].WARES_NAME;// 物品名称
            var colValue = res._DATA_[i].APPLY_NUM;// 物品数量
            var unite = res._DATA_[i].WARES_UNITE;//物品数量
            jQuery("" +
                "<tr id='EaSubjLi-" + (i+1) + "'><th style='width:170px;border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + (i+1) + "、"+colName+"</th><td style='width:170px;border:solid #add9c0; border-width:0px 1px 1px 0px; padding:10px 0px;'>" + colValue + " "+unite+"</td></tr>").appendTo(eaTable);
        }

    });

}
