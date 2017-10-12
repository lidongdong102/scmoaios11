$(document).ready(function(){
	var h = $(".dc-paper").height();
	var w = $(".dc-paper").width();
	//var divId = $("#testID").val();
	//var paperType = $("#paperType").val();
	//$(parent.document).find("div #OA_WJDC_TEST_PAPER-show-do_PK_"+divId+"showType"+paperType+"-tabDiv").height(h);
	//Tab.setFrameHei(100);
	if(h<542){
		$(".dc-paper").height(542);
	}
	if(w>=1200){
		$(".dc-paper").css("width","78%");
	}

	/*if($("#disableFlag").val()!="10"){
		if("SY"==paperType){
			$("a,input,textarea,select").each(function(){
				if((!$(this).hasClass("dc-sy-item"))||$("#disableFlag").val()=="30"){
					$(this).attr('disabled','disabled');
				}
			});
		}else{
			$("input,textarea,select").each(function(){
				$(this).attr('disabled','disabled');
			});
		}
	}*/
});
var qItemsAns = {};//存放答案的键值对
var valideFlag = {};//存放验证的结果
/**
 * 单选及多选的change方法
 * @param {Object} name inputName
 * @param {Object} id 测评题ID
 */
function radioOrCheckBoxChange(name,id){
	var selecter = "input[name='"+name+"']:checked";
	var selected = $(selecter);
	var values = [];
	for(var i=0;i<selected.size();i++){
		values.push($(selected[i]).val());
	}
	$("#"+id).text(values.join(","));
	qItemsAns[id]=values.join(",");
}

/**
 * 普通输入框（文本、文本域）change事件
 * @param {Object} name input/textarea NAME
 * @param {Object} id 测评题ID
 * @param {Object} type 输入框类型，input 或 area
 */
function normalTkOrWdChange(name,id,type){
	var selecter = "input[name='"+name+"']";
	var selected = $(selecter);
	var values = [];
	if(type=="area"){
		selecter = "#"+name;
		selected = $(selecter);
		qItemsAns[id]=selected.val();
	}else{
		for(var i=0;i<selected.size();i++){
			values.push($(selected[i]).val());
		}
		qItemsAns[id]=values.join(",");
	}
}

/**
 * 手动打分项的change事件
 * @param {Object} name inputName
 * @param {Object} id 测评题ID
 * @param {Object} type 单项打分或多项打分 sign 或 mutil
 * @param {Object} maxValue 数值最大值
 * @param {Object} index 索引
 */
function handleScored(name,id,type,maxValue,index){
	var selecter = "input[name='"+name+"']";
	var selected = $(selecter);
	var values = [];
	var total = 0;
	for(var i=0;i<selected.size();i++){
		values.push($(selected[i]).val());
		var tipSpan = $("#"+id+"-tip"+i);
		if(i==index){
			if(parseInt($(selected[i]).val())<1 || parseInt($(selected[i]).val())>parseInt(maxValue)){
				if(tipSpan.hasClass("tip-hide")){
					tipSpan.removeClass("tip-hide");
				}
				valideFlag[id+"-tip"+i]=false;
			}else{
				if(!tipSpan.hasClass("tip-hide")){
					tipSpan.addClass("tip-hide");
				}
				valideFlag[id+"-tip"+i]=true;
			}
		}
		if($(selected[i]).val().length>0){
			total = total+parseInt($(selected[i]).val());
		}
		
	}
	qItemsAns[id]=values.join(",");
	if(type=="areaScore"){
		qItemsAns[id]=values.join(",")+"&areaScore";
	}else if(total>0&&type=="mutil"){
		$("#"+id).text(total);
	}
}

function numberValide(_obj){
	_obj.value=_obj.value.replace(/\D/g,'').substring(0,2);
}

/**
 * 测评用户保存测评试卷
 * @param {Object} submitType
 */
function saveValues(submitType){
	var datas = {};
	datas["TITEM_ANS_DATAS"] = jQuery.toJSON(qItemsAns);
	datas["testID"] =$("#testID").val();
	datas["wjdcID"] =$("#wjdcID").val();
	for(var s in valideFlag){
		if(!valideFlag[s]){
			alert("存在不合法数据，请核查，不能保存或提交！");
			return false;
		}
	}
	if("nomalSave"==submitType){
		FireFly.doAct("QA_WJDC_TEST_PAPER","userSubmit",datas,true,true);
	}else if("submitDT"==submitType){
		if(confirm("提交测评后，数据将不能修改，请确认！")){
		 	datas["submitType"] = submitType;
		 	FireFly.doAct("QA_WJDC_TEST_PAPER","userSubmit",datas).then(function(result){
		 		if(Tools.actIsSuccessed(result)){
		 			//window.location.reload(); //刷新
		 			$.mobile.changePage("#mbDesk");
		 		}
		 	});
		 }
	}else{
		if(confirm("您确认要提交对此测评的评判吗？")){
		 	datas["submitType"] = submitType;
		 	FireFly.doAct("QA_WJDC_TEST_PAPER","userSubmit",datas).then(function(result){
		 		if(Tools.actIsSuccessed(result)){
		 			//window.location.reload(); //刷新
		 			$.mobile.changePage("#mbDesk");
		 			}
		 	});
		 }

	}
	
}