/** 手机卡片页面form组件 */
GLOBAL.namespace("mb.ui");
mb.ui.form = function(options) {
   var defaults = {
		"id":options.pId + "-card",
		"sId":"",
		"pCon":null,
		"parHandler":null,
		"readOnly":false 
   };
   this.opts = jQuery.extend(defaults,options);
   
   this.servId = this.opts.sId; 
   this.pkCode = this.opts.pkCode;
   this._pCon = this.opts.pCon;
   this._data = this.opts.data;									//服务定义信息
   this._items = this._data.ITEMS; 								//字段定义信息
   
   this.servSrcId = this.opts.data.SERV_SRC_ID;					// 服务src
   
   this.dicts = this.opts.data.DICTS;
   this.origData = null;
   
   this.lTitle = UIConst.ITEM_MOBILE_LTITLE; 					/*1 移动列表标题 */
   this.lItem = UIConst.ITEM_MOBILE_LITEM;    					/*2 移动列表项 */
   this.cItem = UIConst.ITEM_MOBILE_CITEM;					    /*3 移动卡片项 */
   this.lTime = UIConst.ITEM_MOBILE_LTIME;					    /*4列表时间项 */
   this.lImg = UIConst.ITEM_MOBILE_LIMG;					    /*5列表图片项 */
   this.cHidden = UIConst.ITEM_MOBILE_CHIDDEN;    				/*9 移动卡隐藏项 */
   this.forceHidden = UIConst.ITEM_MOBILE_FORCEHIDDEN;    		/*91 移动卡强制隐藏项(忽略流程设置) */
   
   this._uItems = {};
};
 
/*
 * 显示卡片页面，主方法
 */
mb.ui.form.prototype.render = function() {
   this._bldLayout();
   this._afterLoad();
};
/**
 * 填充数据
 */
mb.ui.form.prototype.fillData = function(formData,fileData) {
    this.origData = formData;
   jQuery.each(this._uItems,function(i,n) {
	   var value = formData[i];
	   if (n.setValue) {
		   if (formData[i + "__NAME"]) {
			   n.setValue(value,formData[i + "__NAME"]);
		   } else if (n.type == UIConst.FITEM_ELEMENT_ATTACH) {
			   n.setValue(fileData);
		   } else {
			   n.setValue(value);
		   }
	   }
   });
};

/**
 * 填充相关文件信息
 * 20161012huangshikai
 */
mb.ui.form.prototype.fillRelate = function(relateData){
	 jQuery.each(this._uItems,function(i,n) {
		 if (n.setValue) {
			 if(n.type == "relate"){
				 n.setValue(relateData);
			 }
		 }   
	 });
};
/**
 * 隐藏相关文件分组
 * 20161028huangshikai
 */
mb.ui.form.prototype.hideRelate = function(relateData){
	var _self = this;
	if(!relateData){
		alert(_self.groupXGWJ);
		$("#"+_self.groupXGWJ).hide();
	}
};

mb.ui.form.prototype._bldLayout = function() {
   this.mainContainer = jQuery("<form class='sc-form'></form>").appendTo(this._pCon);
   //第一个分组框
   this.group = jQuery("<div id='" + this.pkCode + "_base' class='mb-card-group'></div>").appendTo(this.mainContainer);
   this.groupTitle = jQuery("<div class='mb-card-group-title'></div>").html("基本信息").appendTo(this.group);
   this.groupList = jQuery("<ul data-role='listview' data-inset='true'></ul>").appendTo(this.group);

   this._bldForm();
   this._bindEvent();
};
/**
 * 渲染form表单
 */
mb.ui.form.prototype._bldForm = function() {
    var _self = this;
    var count = 0;
    jQuery.each(this._items,function(i,obj) {
    	var itemName = obj.ITEM_NAME,			//名称
    		inputType = obj.ITEM_INPUT_TYPE, 	//输入类型
    	    mbType = obj.ITEM_MOBILE_TYPE,	    //移动类型
    	    isHidden = obj.ITEM_HIDDEN;		    //隐藏
    	if (mbType && mbType.length > 0) {//卡片显示：包括卡片项和列表的展示项
    		
    		if (inputType == UIConst.FITEM_ELEMENT_HR) {//如果是分组字段
    			if (count == 0){
    				_self.groupTitle.html(itemName);//替换第一个分组框的默认标题
    			} else {
    				_self.group = jQuery("<div id='"+ _self.pkCode +"_" + i + "' class='mb-card-group'></div>").appendTo(_self.mainContainer);
    				_self.groupTitle = jQuery("<div class='mb-card-group-title'></div>").html(itemName).appendTo(_self.group);
    				_self.groupList = jQuery("<ul data-role='listview' data-inset='true'></ul>").appendTo(_self.group);
    			}
    			
    			if(isHidden==1){ // 隐藏分组
    				$("#" + _self.pkCode +"_" + i ).hide();
    			}
    			
    			count++;
    			return;
    		}
    		/**
    		 * 20161013huangshikai相关文件
    		 */
    		if (inputType == "16") {//如果是相关文件字段
    			if (count == 0){
    				_self.groupTitle.html(itemName);//替换第一个分组框的默认标题
    			} else {
    				_self.group = jQuery("<div id='"+ _self.pkCode +"_" + i + "' class='mb-card-group'></div>").appendTo(_self.mainContainer);
    				_self.groupTitle = jQuery("<div class='mb-card-group-title'></div>").html(itemName).appendTo(_self.group);
    				_self.groupList = jQuery("<ul data-role='listview' data-inset='true'></ul>").appendTo(_self.group);
    			}
    			
    			if(isHidden==1){ // 隐藏分组
    				$("#" + _self.pkCode +"_" + i ).hide();
    			}
    			
    			count++;
    		}
    		
    		//渲染各个字段
    		var currField = _self._renderField( obj );
    		
    		if (currField) {
    			if ((isHidden == 1 && mbType < _self.cHidden) || 
    					(mbType == _self.cHidden)||
    					(mbType == _self.forceHidden)) {//隐藏字段自动隐藏
    				currField.hide();
    			}
    			currField.appendTo(_self.groupList);
    		}
    		count++;
    	}
    });
};
/**
 * 渲染form表单
 */
mb.ui.form.prototype._bindEvent = function() {
    this.mainContainer.on("vclick", "a.sc-file-link", function(event){
    	event.preventDefault();
		var url = $(this).attr("href"),
        filename = $(this).attr("data-filename");
        //FileHelper.download(url,filename);
        var index = url.lastIndexOf(".") ;
        var suffix = url.substring(index,url.replace('?mobile=1','').length);
        if(suffix == ".docx" || suffix == ".xlsx" ){
        //url = "http://xdoc.aliapp.com/xdoc?_format=html5&_fun=to&_xdoc=" + url;
		url = "http://www.xdocin.com/xdoc?_format=html&_xformat=*&_fun=to&_xdoc=" + url;
        }
		
        var ref = window.open(encodeURI(url), '_blank', 'location=no,enableViewportScale=yes');
    }); 
};

/**
 * 渲染各个字段
 */
mb.ui.form.prototype._renderField = function(item) {
	var _self = this;
	
    var fieldcontain = jQuery("<li class='ui-field-contain' code='"+item.ITEM_CODE+"' model='"+item.ITEM_MOBILE_TYPE+"'></li>");
    
    var id = item.ITEM_ID;
    
    var name = item.ITEM_NAME;
	// 输入框类型
	var type = item.ITEM_INPUT_TYPE;
	// 输入模式
	var inputMode = item.ITEM_INPUT_MODE;
	// 必填
	var notNull = item.ITEM_NOTNULL;
	// 只读
	var readOnly = item.ITEM_READONLY;
	
	var itemCode = item.ITEM_CODE;
	
	var itemName = item.ITEM_NAME;
	
	//构造输入框
	var ui,
		opts = {
			"id"   : id,
			"item" : item,
			"readOnly":readOnly
	};
	switch (type) {
	case UIConst.FITEM_ELEMENT_INPUT ://输入框
		if (inputMode == UIConst.FITEM_INPUT_QUERY ) { //2查询选择
			
			ui = new mb.ui.input(opts);
			
		} else if (inputMode == UIConst.FITEM_INPUT_DICT) {//字典
			
			opts["data"] = _self.dicts[item.DICT_ID];
			opts["dictId"] = item.DICT_ID;
			ui = new mb.ui.dict(opts);
			
		} else if (inputMode == UIConst.FITEM_INPUT_AUTO || inputMode == UIConst.FITEM_INPUT_DATE) {//输入框
			
			ui = new mb.ui.input(opts);
			
		} /*else if (inputMode == UIConst.FITEM_INPUT_DATE) {//日期选择
			
			//日期类型html5:datetime|datetime-local|date
			opts["inputType"] = item.ITEM_INPUT_CONFIG
			ui = new mb.ui.DateInput(opts);
			
		}*/	
		break;
	case UIConst.FITEM_ELEMENT_RADIO ://单选
		
		opts["data"] = _self.dicts[item.DICT_ID];
		ui = new mb.ui.radioBoxGroup(opts);
		break;
		
	case UIConst.FITEM_ELEMENT_CHECKBOX ://多选
		if(item.DICT_ID) {
			opts["data"] = _self.dicts[item.DICT_ID];
			ui = new mb.ui.checkBoxGroup(opts);
		} else {
			ui = new mb.ui.input(opts);
		}
		break;
		
	case UIConst.FITEM_ELEMENT_SELECT ://下拉框
		
		opts["data"] = _self.dicts[item.DICT_ID];
		ui = new mb.ui.select(opts);
		break;
		
	case UIConst.FITEM_ELEMENT_TEXTAREA ://大文本
		
		ui = new mb.ui.textArea(opts);
		break;
		
	case UIConst.FITEM_ELEMENT_FILE ://文件
		
		ui = new mb.ui.file(opts);
		break;
		
	case "16"://相关文件----20161012huangshikai
		ui = new mb.ui.relate(opts);
		break;
		
	case UIConst.FITEM_ELEMENT_ATTACH ://上传文件
		
		opts["servId"] = _self.servId;
		opts["servSrcId"] = _self.servSrcId;
		ui = new mb.ui.attach(opts);
		ui.type = UIConst.FITEM_ELEMENT_ATTACH;
		break;
		
	case UIConst.FITEM_ELEMENT_IMAGE ://图片
		
		ui = new mb.ui.img(opts);
		break;
		
	case UIConst.FITEM_ELEMENT_PSW ://密码框
		
		ui = new mb.ui.pwd(opts);
		break;
		
	case UIConst.FITEM_ELEMENT_STATICTEXT://静态显示文本区 
		
		ui = new mb.ui.staticText(opts);
		break;
		
	default :
		
    }
	
	
	
	if(ui){
		_self._uItems[itemCode] = ui;
		
		if(ui.obj.is("fieldset")){//主要针对radioBoxGroup和checkBoxGroup
			_self._legend({"id":id,"text":name}).prependTo(ui.obj);
		} else {
			//构造lable
			var label = _self._label({"id":id,"text":name});
			//对静态文本添加ui-input-text 样式类，以对齐form
			if (ui.type == UIConst.FITEM_ELEMENT_STATICTEXT ) {
				label.addClass("ui-input-text sc-static-label");
			} 
			
			label.appendTo(fieldcontain);
			
		}
		
		
		ui.obj.appendTo(fieldcontain);	
	}
	//必填项的支持
	if (notNull == UIConst.STR_YES) {
//		jQuery("<span>*</span>").addClass("mbCard-form-notNull mb-icon-notNull").appendTo(label);
	}
	
	return fieldcontain;
};
mb.ui.form.prototype._label = function(options) {
    var defaults = {
			"id":"",
			"text":null			
	};
    var opts = jQuery.extend(defaults,options);
    var text = opts.text || "";
    text = text.replace(/\&nbsp;/g, "").replace(/\&nbsp/g, "");
	return jQuery("<label></label>").attr("for",opts.id).text(text);
};
/**
 * filedset 标题
 */
mb.ui.form.prototype._legend = function(options) {
    var defaults = {
			"id":"",
			"text":null			
	};
    var opts = jQuery.extend(defaults,options);
    var text = opts.text || "";
    text = text.replace(/\&nbsp;/g, "").replace(/\&nbsp/g, "");
	return jQuery("<legend></legend>").attr("for",opts.id).text(text);
};

mb.ui.form.prototype._afterLoad = function() {
    
};


mb.ui.form.prototype.getModifyData = function() {
	var _self = this;
	var modiData = {};
	if (_self.origData) {//有初始数据
		var origData = _self.origData;
		jQuery.each(_self._uItems,function(i,n) {
			var origValue = origData[i];
			if (n.getValue() == origValue) {
				
			} else {
				modiData[i] = n.getValue();
			}
		});
		
	} else {
		jQuery.each(this._uItems,function(i,n) {
			modiData[i] = n.getVlaue();
		});		
	}
    return modiData;
};
/**
 * 通过key获取UI对象，key就是当前UI的id
 */
mb.ui.form.prototype.getItem = function(itemCode) {
	var _self = this;
    var ui = _self._uItems[itemCode];
    return ui;
};

mb.ui.form.prototype.itemValue = function(itemCode) {
	var _self = this;
    var ui = _self.getItem(itemCode);  
    if (ui) {
    	return ui.getValue();
    } else {
    	return "";
    }
};

//==================普通输入框======================
mb.ui.input = function(options) {
    var defaults = {
			"id":"",
			"type":"text"
	};
    var opts = jQuery.extend(defaults,options);
    var item = opts.item;
    var readOnly = opts.readOnly;
//	this.obj = jQuery("<input type='text' class='ui-disabled'/>").attr("id",opts.id); 
	this.obj = jQuery("<div class='sc-input-text ui-disabled ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset'></div>").attr("id",opts.id);
	if(readOnly == "1"){
//    	this.obj.addClass("ui-disabled");
		//this.obj.attr("disabled","disabled");
    }
};
mb.ui.input.prototype.setValue = function(value) {
//	this.obj.val(value);
	this.obj.html(value);
};
mb.ui.input.prototype.getValue = function() {
//	return this.obj.val();
	return this.obj.html();
};

mb.ui.input.prototype.getContainer = function() {
	return this.obj.closest("li");
};
 
//==================大文本框======================
mb.ui.textArea = function(options) {
    var defaults = {
			"id":""
	};
    var opts = jQuery.extend(defaults,options);
    var item = opts.item;
//	this.obj = jQuery("<textarea class='ui-disabled'></textarea>").attr("id",opts.id); 
    this.obj = jQuery("<div class='sc-textarea ui-disabled ui-input-text ui-shadow-inset ui-body-inherit ui-corner-all'></div>").attr("id",opts.id);;
};
mb.ui.textArea.prototype.setValue = function(value) {
//	this.obj.val(value);
	this.obj.html(value);
};
mb.ui.textArea.prototype.getValue = function() {
//	return this.obj.val();
	return this.obj.html();
};
mb.ui.textArea.prototype.getContainer = function() {
	return this.obj.closest("li");
};

//==================日期输入框======================

/**
 * 平台日期格式
	DATETIME	yyyy-MM-dd HH:mm:ss
	DATETIMEH	yyyy-MM-dd HH
	DATETIMEHM	yyyy-MM-dd HH:mm
	YEAR		yyyy
	MONTH		yyyy-MM
	TIME		H:mm
  HTML5 日期格式：
  	data 			 yyyy-MM-dd
  	datetime		 yyyy-MM-dd HH:mm:ss
  	datetime-local   yyyy-MM-dd HH:mm
*/
mb.ui.DateInput = function(options) {
    var defaults = {
			"id":"",
			"inputType":"date"
	};
    var opts = jQuery.extend(defaults,options);
    var type = opts.inputType;
    var item = opts.item;
    
    if (type == "DATETIMEHM") {
    	type = "datetime-local";
    } else if (type == "MONTH") {
    	type = "month";
    }else{
    	type="datetime";
    }
   
    
    this.obj = jQuery("<input type='" + type + "' height='20px' class='ui-disabled'></input>").attr("id",opts.id); 
};
mb.ui.DateInput.prototype.setValue = function(value) {
	this.obj.val(value);
};
mb.ui.DateInput.prototype.getValue = function() {
	return this.obj.val();
};
mb.ui.DateInput.prototype.getContainer = function() {
	return this.obj.closest("li");
};

//==================单选输入框======================
mb.ui.radioBoxGroup = function(options) {
	var _self = this;
    var defaults = {
			"id":"",
			"data":null//字典数据
	};
    var opts = jQuery.extend(defaults,options);
    var dictData = opts.data;
    this.id = opts.id;
    
    var len = dictData.length - 1;
    var group = jQuery("<fieldset data-role='controlgroup' data-type='horizontal' data-mini='true'></fieldset>");
    
    jQuery.each(dictData , function(i,n) {
    	var name = _self.id + "-" + n.DICT_ID;
    	var id = _self.id + "-" + n.ID;
    	var value = n.ITEM_CODE;
    	var labelText = n.NAME;
    	jQuery("<input/>").attr({
		    		"id"   : id, 
					"name" : name,
					"value": value,
					"type" : "radio",
					"disabled" : "disabled"
    		}).appendTo(group);
    	
    	jQuery("<label/>").attr({"for":id})
    					  .html(labelText).appendTo(group);
    });
	this.obj = group; 
};
mb.ui.radioBoxGroup.prototype.setValue = function(value) {
	var id = this.id + "-" + value;
	this.obj.find("#" + id).prop("checked", true);
};
mb.ui.radioBoxGroup.prototype.getValue = function() {
	var res = this.obj.find(":checked").attr("value");
	return res || '';
};
mb.ui.radioBoxGroup.prototype.getContainer = function() {
	return this.obj.closest("li");
};


//==================多选输入框======================
mb.ui.checkBoxGroup = function(options) {
	var _self = this;
    var defaults = {
			"id":"",
			"data":null//字典数据
	};
    var opts = jQuery.extend(defaults,options);
    var item = opts.item;
    
    var data = opts.data;
    this.id = opts.id;
    
    var len = data.length - 1;
    var group = jQuery("<fieldset data-role='controlgroup' data-type='horizontal' data-mini='true'></fieldset>");
    jQuery.each(data,function(i,n) {
    	var id = n.ID;
    	var value = n.ITEM_CODE;
    	var unitId = _self.id + "-" + id;
    	var labelText = n.NAME;
    	
    	jQuery("<input/>").attr({
    		"id"   : unitId, 
			"name" : _self.id,
			"value": value,
			"type" : "checkbox",
			"disabled" : "disabled"
    	}).appendTo(group);
    	jQuery("<label/>").attr({"for":unitId})
    					  .html(labelText).appendTo(group);
    });
	this.obj = group;
};
mb.ui.checkBoxGroup.prototype.setValue = function(value) {
	var _self = this;
	//对于checkbox,多个字放在一个字段里，比如10,20,30,40,50
	if(value) {
		var arr = value.split(",");
		$.each(arr, function(i,val){
			var unitId = _self.id + "-" + val;
			_self.obj.find("#" + unitId).attr("CHECKED","checked");
		});
	}
};
mb.ui.checkBoxGroup.prototype.dsetValue = function(value) {
	
	var unitId = this.id + "-" + value;
	this.obj.find("#" + unitId).removeAttr("CHECKED");
};
mb.ui.checkBoxGroup.prototype.getValue = function() {
	var res = this.obj.find(":checked");
	var resArray = [];
	jQuery.each(res,function(i,n) {
		resArray.push(jQuery(n).attr("value"));
	});
	return resArray.join(",");
};

mb.ui.checkBoxGroup.prototype.getContainer = function() {
	return this.obj.closest("li");
};



//==================下拉选择框======================
mb.ui.select = function(options) {
	var _self = this;
    var defaults = {
			"id":"",
			"data":null//字典数据
	};
    var opts = jQuery.extend(defaults,options);
    var item = opts.item;
    this._data = opts.data;
    this.id = opts.id;
    
    var name = item.ITEM_NAME;
    this.$select = $("<select id='" + this.id + "' disabled='disabled'></select>").attr({"data-native-menu":false,"data-theme":"c"});
    var optionStr="<option></option>";
    if(this._data){
    	jQuery.each(this._data,function(i,n) {
    		optionStr += "<option value='" + n.ID + "'>" + n.NAME + "</option>";
    	});
    }
    
    this.$select.html(optionStr);
    
	this.obj = this.$select;
};
mb.ui.select.prototype.setValue = function(value,text) {
	var _self = this;
	if ($.trim(text)) {
		_self.$select.find("option[value='" + value + "']").attr("selected",true);
	} /*else {
	 
		var len = this._data? this._data.length:0;
		for (var i = 0; i < len ; i++) {
			var obj = _self._data[i];
			if (obj.ID == value) {
				_self.$select.find("option[value='" + value + "']").attr("selected",true);
				break;
			}
		}
	}*/
};
mb.ui.select.prototype.getValue = function() {
	var _self = this;
    return _self.$select.find("option:selected").val();
};
mb.ui.select.prototype.getText = function() {
	var _self = this;
	return _self.$select.find("option:selected").text();
};
mb.ui.select.prototype.setActive = function() {
	var _self = this;
};
mb.ui.select.prototype.getContainer = function() {
	return this.obj.closest("li");
};


//==================文件查看======================
mb.ui.file = function(options) {
	var _self = this;
    var defaults = {
			"id":"",
			"data":null//字典数据
	};
    var opts = jQuery.extend(defaults,options);
    var item = opts.item;
    this._data = opts.data;
    this.id = opts.id;
    
    var name = item.ITEM_NAME;
    var group = jQuery("<div></div>").addClass("sc-file");
    var icon = jQuery("<span></span>").addClass("sc-file-icon").appendTo(group);
    this.a = jQuery("<a href='#' data-ajax='false'></a>").addClass("sc-file-link").appendTo(group);
	this.obj = group;
};
mb.ui.file.prototype.setValue = function(value) {
	var _self = this;
	if (value) {
		var array = value.split(";");
		for (i = 0; i< array.length;i++) {
			if (array[i].length > 0) {
				var fileValue = array[i].split(",");
				var href = FireFlyContextPath + "/file/" + fileValue[0]+"?mobile=1";
				_self.a.attr("href",href);
				_self.a.text(fileValue[1]);
			}
		}
	}
};
mb.ui.file.prototype.getValue = function() {
	var _self = this;
    return _self.a.text();
};

mb.ui.file.prototype.getContainer = function() {
	return this.obj.closest("li");
};

//==================相关文件=========================
mb.ui.relate = function(options) {
	var _self = this;
    var defaults = {
			"id":"",
			"data":null//字典数据
	};
    var opts = jQuery.extend(defaults,options);
    var item = opts.item;
    this._data = opts.data;
    this.id = opts.id;
    this.type = "relate";

    var name = item.ITEM_NAME;
    var group = jQuery("<div></div>").addClass("sc-file");
    var icon = jQuery("<span></span>").addClass("sc-file-icon").appendTo(group);
    this.obj = group;
};
mb.ui.relate.prototype.setValue = function(value) {
	var _self = this;
	if (value) {
		jQuery.each(value,function(key,bean){
			var title = bean.TITLE;//相关文件标题
			var id = bean.RELATE_DATA_ID;//相关文件主键
			var serv = bean.RELATE_SERV_ID;//相关文件服务
			var nodeId = bean.NI_ID;//节点实例ID
			var aObj = jQuery("<a href='#' data-ajax='false' class='sc-file-link ui-link'>"+title+"</a>").appendTo(_self.obj);
			aObj.on("vclick",aObj,function(event){
				event.preventDefault();
			    event.stopImmediatePropagation();
			    var pageWrp = $("<div data-role='page' id='" + id + "'></div>");
				var headerWrp = $("<div data-role='header' id='"+id+"_header' data-position='fixed' data-tap-toggle='false'><a href='#' class='ui-btn ui-btn-icon-left ui-btn-icon-notext ui-icon-back' data-rel='back' >返回</a><h1>"+title+"</h1></div>").appendTo(pageWrp);
				var contentWrp = $("<div data-role='main' id='"+id+"_content' class='ui-content'></div>").appendTo(pageWrp);
				var footerWrp = $("<div data-role='footer' id='"+id+"_footer'></div>").appendTo(pageWrp);
			    
				pageWrp.on( "pagehide", function( event, ui ) {
					$(this).remove();
				});
				
				//手动设置返回,不使用data-rel='back'
                    headerWrp.on("vclick","a", function(event){
                                 event.preventDefault();
                                 event.stopImmediatePropagation();
                                 event.stopPropagation()
                                 $.mobile.pageContainer.find("#"+id).remove();
                                 $("#cardview_header").on("vclick","a",function(e1){
                                                          e1.preventDefault();
                                                          e1.stopImmediatePropagation();
                                                          e1.stopPropagation();
                                                          $("#cardview_content").empty();
                                                          $("#listview_header").on("vclick","a",function(e2){
                                                                                   e2.preventDefault();
                                                                                   e2.stopImmediatePropagation();
                                                                                   e2.stopPropagation();
                                                                                   $.mobile.pageContainer.pagecontainer( "change", "#mbDesk" ,{reverse: true});});
                                                          $.mobile.pageContainer.pagecontainer( "change", "#listview" ,{reverse: true});});
                                 $.mobile.pageContainer.pagecontainer( "change", "#cardview" ,{reverse: true});
                                 });
                    
				pageWrp.appendTo($.mobile.pageContainer).page();
                
                    
		 
				$.mobile.pageContainer.pagecontainer( "change", pageWrp );
				
				var data = {};
					data["sId"] 	 = serv;
					data["pkCode"]   = id;
					data["readOnly"] = true;
					data["act"] = "cardRead";
					data["niId"] = nodeId;
					data["pId"]   = id;
					data["id"]   = id;
					data["src"] = "relate";
					data["pageWrp"] = pageWrp;
					data["headerWrp"] = headerWrp;
					data["contentWrp"] = contentWrp;
					data["footerWrp"] = footerWrp;
					var cardView = new mb.vi.cardView(data);
			        cardView.show();
			});
		});
	}
};
mb.ui.relate.prototype.getValue = function() {
	var _self = this;
    return _self.a.text();
};

mb.ui.relate.prototype.getContainer = function() {
	return this.obj.closest("li");
};
//==================自定义文件查看======================

mb.ui.attach = function(options) {
	var _self = this;
    var defaults = {
			"id":"",
			"data":null,//字典数据
			"servId":""
	};
    this.opts = jQuery.extend(defaults,options);
    var item = this.opts.item;
    this._data = this.opts.data;
    this.id = this.opts.id;
    this.itemCode = item.ITEM_CODE;
    this.servId = this.opts.servId;
    this.servSrcId = this.opts.servSrcId;
    
    var name = item.ITEM_NAME;
    var group = jQuery("<div></div>").addClass("sc-file");
    var icon = jQuery("<span></span>").addClass("sc-file-icon").appendTo(group);
	this.obj = group;
};
mb.ui.attach.prototype.setValue = function(fileData) {
	var _self = this;
	// 载入附件
	for (i = 0; i< fileData.length;i++) {
		var item = fileData[i];
		if(item["FILE_CAT"] == this.itemCode){
			$("<a href='"+FireFlyContextPath + "/file/" + item.FILE_ID + "?mobile=1' class='sc-file-link' data-ajax='false' data-filename='"+item["FILE_ID"]+"'>" + item["DIS_NAME"] + "</a>").appendTo(this.obj);
		}
	}
};
mb.ui.attach.prototype.getValue = function() {
	var _self = this;
    return "";
};

mb.ui.attach.prototype.getContainer = function() {
	return this.obj.closest("li");
};




//==================图片显示======================
mb.ui.img = function(options) {
	var _self = this;
    var defaults = {
			"id":"",
			"data":null//字典数据
	};
    var opts = jQuery.extend(defaults,options);
    var item = opts.item;
    this._data = opts.data;
    this.id = opts.id;
    
    var name = item.ITEM_NAME;
    var group = jQuery("<div></div>").addClass("mb-img-div");
    this.img = jQuery("<img></img>").addClass("mb-img").appendTo(group);
    this.img.attr({width:"80px",height:"80px"});
	this.obj = group;
};
mb.ui.img.prototype.setValue = function(value) {
	var array = value.split(",");
	var src = "/file/" + array[0];
	this.img.attr("src",src);
};
mb.ui.img.prototype.getValue = function() {
	var _self = this;
    return this.img.attr("src");
};
mb.ui.img.prototype.getContainer = function() {
	return this.obj.closest("li");
};



//==================密码框======================
mb.ui.pwd = function(options) {
	var _self = this;
    var defaults = {
			"id":"",
			"data":null//字典数据
	};
    var opts = jQuery.extend(defaults,options);
    var item = opts.item;
    this._data = opts.data;
    this.id = opts.id;
    
    var name = item.ITEM_NAME;
	this.obj = jQuery("<input type='password' value=''></input>").attr("id",opts.id); 
};
mb.ui.pwd.prototype.setValue = function(value) {
	this.obj.val(value);
};
mb.ui.pwd.prototype.getValue = function() {
	var _self = this;
    return this.obj.val();
};

mb.ui.pwd.prototype.getContainer = function() {
	return this.obj.closest("li");
};


//==================字典选择======================TODO:异步加载的情况
/**
 * 字典单独弹出一页面，用anchor 模拟
 * 故需在label 和 <a/> 上添加ui-select 样式类 以对齐form
 */
mb.ui.dict = function(options) {
	var _self = this;
    var defaults = {
			"id":"",
			"dictId":"",
			"data":null//字典数据
	};
    var opts = jQuery.extend(defaults,options);
    var item = opts.item;
    this._data = opts.data;
    this.id = opts.id;
    this.type = "dict";
    this.dictId = opts.dictId;
    this.readOnly = opts.readOnly;
    var name = item.ITEM_NAME;
    
    var targetUrl = "stdSelectListView-mb.jsp?dictId=" + this.dictId; 
    
    this.text = jQuery("<input type='text' id='" + this.id + "'  class='ui-disabled'/>"); 
    /*this.text = jQuery("<a href='"+_self.dictId+"' data-role='button' data-rel='dialog' data-transition='slideup' data-icon='arrow-d' data-iconpos='right'></a>");
    
    this.text.on("click",function(){
    	$(this).attr("href","#"+_self.dictId);
    	var len = $("#"+_self.dictId).length;
    	if(len == 0){
    		var dialogTempl ="<div data-role='page' id='" + _self.dictId + "' data-overlayTheme='c'>"+
    		"<div data-role='header' id='" + _self.dictId + "_header' data-theme='c'>"+
    		"<h1>"+name+"</h1>"+
    		"</div>"+
    		"<div data-role='content' id='" + _self.dictId + "_content'></div>"+
    		"</div>";
    		jQuery("body").append(dialogTempl);
    	}
    	
    	var temp = {"dictId":_self.dictId,"parHandler":_self};
 	    var selectView = new mb.vi.selectList(temp);
 	    selectView.show();
    });*/
    
    
    
    if(this.readOnly == "1"){//只读
    	this.text.addClass("ui-disabled");
    }
    
//    this.input = jQuery("<input type='hidden'/>");
//    this.input.after(this.text);
    
	this.obj = this.text;
};
mb.ui.dict.prototype.setValue = function(value,text) {
	var _self = this;
	var i = 0;
	if (text) {
//		_self.input.val(value);
		_self.text.val(text);
//		if(_self.text.find(".ui-btn-text").length >0){
//			_self.text.find(".ui-btn-text").html(text);
//		}else{
//			_self.text.html(text);
//		}
	} else {
		//_self.pickNode(value,_self._data);
	}
};
mb.ui.dict.prototype.pickNode = function(id,data) {
	var _self = this;
	var len = data? data.length : 0;
	for (var i = 0; i < len; i++) { // 遍历查找NAME
		if (id == data[i].ID) {
			_self.input.val(id);
			if(_self.text.find(".ui-btn-text").length >0){
				_self.text.find(".ui-btn-text").html(data[i].NAME);
			}else{
				_self.text.html(data[i].NAME);
			}
			return true; // 找到了
		} else if (data[i].CHILD) {
			var ret = _self.pickNode(id,data[i].CHILD);
			if (ret) { // 找到了则直接返回，不进行余下的循环
				return true;
			}
		}
	}
	return false; // 没有找到
};
mb.ui.dict.prototype.getValue = function() {
	var _self = this;
    return _self.input.val();
};
mb.ui.dict.prototype.getText = function() {
	var _self = this;
	return _self.text.val();
};
mb.ui.dict.prototype.setActive = function() {
	var _self = this;
};

mb.ui.dict.prototype.getContainer = function() {
	return this.obj.closest("li");
};



//==================静态文本======================
mb.ui.staticText = function(options) {
	var _self = this;
    var defaults = {
			"id":""
	};
    var opts = jQuery.extend(defaults,options);
    this.item = opts.item;
    this.id = opts.id;
    var name = this.item.ITEM_NAME;
    this.type = this.item.ITEM_INPUT_TYPE;
    this.obj = jQuery("<div class='ui-input-text sc-static-text'></div>");
	this.text = jQuery("<span></span>").attr("id",opts.id).appendTo(this.obj); 
};
mb.ui.staticText.prototype.setValue = function(value) {
	this.text.html(this.item.ITEM_INPUT_CONFIG ? this.item.ITEM_INPUT_CONFIG : this.item.ITEM_INPUT_DEFAULT);
};
mb.ui.staticText.prototype.getValue = function() {
	var _self = this;
    return this.text.html();
};

mb.ui.staticText.prototype.getContainer = function() {
	return this.obj.closest("li");
};


