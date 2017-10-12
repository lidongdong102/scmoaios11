GLOBAL.namespace("rh.ui");

/**
 * 数据结构
 * [{
 * 		"id":"3388",
 * 		"text":"密云县",
 * 		"value":"110228",
 * 		"showcheck":true,
 * 		"isexpand":false,
 * 		"checkstate":0,
 * 		"hasChildren":false,
 * 		"ChildNodes":null,
 * 		"complete":false
 * }]
 */
rh.ui.Tree = function(options) {
	//@TODO:考虑用系统变量替换
	this.parPath = "/sy/base/frame/coms/tree/";
	var opts = {
		method: "POST", //默认采用POST提交数据
		datatype: "json", //数据类型是json
		url: false, //异步请求的url
		cbiconpath: this.parPath + "images/icons/", //checkbox icon的目录位置
		icons: ["checkbox_0.gif", "checkbox_1.gif", "checkbox_2.gif"],
		emptyiconpath: this.parPath + "images/s.gif", //checkbxo三态的图片
		showcheck: false, //是否显示checkbox
		oncheckboxclick: false, //当checkstate状态变化时所触发的事件，但是不会触发因级联选择而引起的变化
		onnodeclick: false, // 触发节点单击事件
		onnodedblclick: false, // 触发节点双击单击事件
		cascadecheck: false, //是否启用级联，默认启用
		checkParent: false, // 是否启用反向级联，选中子的时候选中所有的父级节点
		data: null, //初始化数据
		clicktoggle: true, //点击节点展开和收缩子节点
		theme: "bbit-tree-arrows", //三种风格备选：bbit-tree-lines ,bbit-tree-no-lines,bbit-tree-arrows
		rhcomplete: true, //非组件本身属性，后修改增加，用于全局参数
		rhexpand: false, //非组件本身属性，后修改增加，用于全局参数
		rhItemCode:"",
		root_no_check:false, // 指定根不用显示checkbox
		childOnly:false // 只能选中子节点 
	};
	
	this.checkedIcon = opts.icons[1];
	
	jQuery.extend(opts, options);// 把参数复制到对象opts中
	
	this.obj = jQuery("<div></div>");
	
	// 把tree先放在内存里的span中
	this.obj.treeview(opts);
};

/**
 * 获取选中的所有节点项数组
 */
rh.ui.Tree.prototype.getCheckedNodes = function() {
	return this.obj.getTSNs();
};

/**
 * 获取选中的所有节点值数组
 */
rh.ui.Tree.prototype.getCheckedValues = function() {
	return this.obj.getTSVs();
};

/**
 * 获取当前节点，叶子节点
 */
rh.ui.Tree.prototype.getCurrentNode = function() {
	return this.obj.getTCT();
};

/**
 * 重新载入节点
 */
rh.ui.Tree.prototype.reload = function(id) {
	this.obj.reflash(id);
};

/**
 * 获取树的id
 * @return {}
 */
rh.ui.Tree.prototype.getId = function() {
	return this.obj.attr("id");
}

/**
 * 取消所有已被选中的checkbox，收起整棵树
 */
rh.ui.Tree.prototype.clean = function() {
	
	var _self = this;
	
	this.obj.find("div.bbit-tree-node-expanded").each(function(){// 收起所有被展开的节点
		if(jQuery(this).attr("id") && jQuery(this).attr("id") != "" && jQuery(this).attr("id").indexOf("root") < 0) {
			jQuery(this).find("img.bbit-tree-ec-icon").click();
		}
	});
	
	this.obj.find("img[src$='" + _self.checkedIcon + "']").each(function(){// 找到所有被选中的checkbox，取消选择
		var path = jQuery("#" + jQuery(this).attr("id").substr(0, (jQuery(this).attr("id").length - 3))).attr("tpath");
		if(path) {
			_self.obj.uncheckNode(path);
		}
	});
};

/**
 * 通过节点ID获取节点PATH
 * @param {} id 节点ID
 */
rh.ui.Tree.prototype.getPath = function(id) {
	// 需要找的节点的真实的id
	id = this.getId() + "_" + id.replace(/[^\w]/gi, "_");
	
	return jQuery("#" + id).attr("tpath");
};

/**
 * 通过节点ID找到该节点
 * @param {} id
 */
rh.ui.Tree.prototype.getNode = function(id) {
	
	var path = this.getPath(id);
	if(path) {
		return this.obj.getItem(path);
	}
	
	return null;
};

/**
 * 判断一个节点又没有子节点
 * @param {} node 指定节点
 * @return {Boolean}
 */
rh.ui.Tree.prototype.hasChild = function(node) {
	
	// 如果有子节点则返回true
	if(node.CHILD) {
		return true;
	}
	
	return false;
};

/**
 * 指定ID，判断该节点有没有子节点
 * @param {} id 节点ID
 */
rh.ui.Tree.prototype.isLeafNode = function(id) {
	return this.hasChild(this.getNode(id));
};

/**
 * 展开指定id的节点
 * @param {} id
 */
rh.ui.Tree.prototype.checkNode = function(id) {
	var path = this.getPath(id);
	
	if(path) {
		this.obj.checkNode(path);
	}
}

/**
 * 指定选中某一节点
 * @param {} id
 */
rh.ui.Tree.prototype.selectNodes = function(ids) {
	var _self = this;
	
	// 先取消所有选中
	this.obj.find(".bbit-tree-selected").removeClass("bbit-tree-selected");
	
	if(ids.length == 1) {// 单选
		// 选中指定ID的节点
		jQuery("#" + _self.getId() + "_" + ids[0].replace(/[^\w]/gi, "_")).addClass("bbit-tree-selected");
		
		_self.obj.find(".bbit-tree-selected").find("[unselectable]").click();
	} else {
		jQuery.each(ids, function(index, id) {
			_self.checkNode(id);// 选中
			
			// 选中指定ID的节点
			jQuery("#" + _self.getId() + "_" + id.replace(/[^\w]/gi, "_")).addClass("bbit-tree-selected");
		});
	}
};

/**
 * 展开有子节点被选中的节点
 */
rh.ui.Tree.prototype.expandParent = function() {
	this.obj.expandParent();
};

/**
 * 收起树
 */
rh.ui.Tree.prototype.collapsedTree = function() {
	var node = this.obj.find(".bbit-tree-root").find("div").first();
	if(node) {
		var img = node.find("img.bbit-tree-ec-icon");
		if(img.length > 0 && img.parent().hasClass("bbit-tree-node-expanded")) {
			img.click();
		}
	}
	
	this.obj.find(".bbit-tree-selected").removeClass("bbit-tree-selected");
};

/**
 * 取消整棵树的选中
 */
rh.ui.Tree.prototype.unselected = function() {
	this.obj.find(".bbit-tree-selected").removeClass("bbit-tree-selected");
};