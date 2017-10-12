/*平台系统级常量*/
var rh = {};
rh.ui = {};
rh.vi = {};
/**
 * jQuery浏览器对象，可用来判断客户端浏览器类型和版本
 * IE浏览器{"msie":true,"version":"8.0"}
 * chrome，safari浏览器{"webkit":true,"version":"535.1","safari":true}
 * 火狐浏览器{"mozilla":true,"version":"5.0"}
 * Opera浏览器{"opera":true,"version":"11.50"}
 * 如：if (jqbrowser.msie) {//IE浏览器
 *	        //IE特殊处理
 *	   }
 */
var jqbrowser = jQuery.browser;
/**
 * UIConst类，包含常用常量、表单常量、功能常量、按钮常量等
 */
var UIConst = {
	PAGE_WID:"78%",//布局时内容宽度
	MENU_WID:"22%",//布局时左侧菜单宽度
    ViewEngine: {
        VIEW_FUNC: "func",
        VIEW_QUERY: "querySelect",
        VIEW_TEMPLATE: "template",
        VIEW_DEFINE: "define",
        VIEW_STATE_GRID: "grid",
        VIEW_STATE_CHART: "chart"
    },

	PK_KEY: "_PK_",
	CARD_STATUS: "_ADD_",//卡片状态
	QUERY_ID: "_QUERYID_",//常用查询
	RTN_MSG: "_MSG_",
	RTN_TIME: "_TIME_",
	RTN_LOGIN: "LOGIN",
	KEY_WHERE: "KEY_WHERE",
	ORDER_KEY: "$ORDER$",
	RESULT_KEY: "result",
	RTN_OK: "OK,",
	RTN_ERR: "ERROR,",
	RTN_WARN: "WARN,",

	/** 功能类型定义：开始 */
	/** 表单功能 */
	FUNC_TYPE_FORM: "1",
    /** 模板定义功能 */
	FUNC_TYPE_TMPL: "2",
    /** 自定义功能 */
	FUNC_TYPE_SELF: "3",
    /** URL功能 */
	FUNC_TYPE_URL: "4",
    /** Web服务功能 */
	FUNC_TYPE_WS: "5",
	/** 功能类型定义：结束 */

	/**列表按钮事件：开始 */
	/** 列表按钮 */
	ACT_TYPE_LIST: "1",
    /** 卡片按钮 */
	ACT_TYPE_CARD: "2",
	/** 非按钮 */
	ACT_TYPE_NOBTN: "3",
	/** 列表行按钮 */
	ACT_TYPE_LISTROW: "4",
    /** 方法 */
	ACT_TYPE_FUNC: "3",
	ACT_ADD: "add",
	ACT_SAVE: "save",
	ACT_BYID: "byid",
	ACT_SAVE_NEW: "copyNew",
	ACT_LIST_MODIFY: "listModify",
	ACT_DELETE: "delete",
	ACT_EXPORT: "exp",
	ACT_EXPORT_ZIP: "expZip",
	ACT_IMPORT_ZIP: "impZip",
	ACT_QUICK: "quick",
	ACT_DIRECT: "direct",
	ACT_LOG_ITEM: "logItem",
	
	ACT_BATCH_SAVE: "batchSave",
	ACT_BATCH_ADD: "addBatch",
	ACT_BATCH_DELETE: "deleteBatch",
	
	
	ACT_MODIFY: "modify",
	ACT_CARD_ADD: "cardAdd",
	ACT_CARD_MODIFY: "cardModify",
	ACT_CARD_READ: "cardRead",

	/**列表按钮事件：结束 */
	/**卡片按钮事件：开始 */
	ACT_CARD_ACT: "ACT", //保存
	ACT_CARD_SAVEBACK: "saveBack",//保存返回
    ACT_CARD_AUDIT: "audit", //卡片审核
    ACT_CARD_UNAUDIT: "unaudit",//卡片弃审
    ACT_LIST_AUDIT: "listAudit", //卡片审核
    ACT_LIST_UNAUDIT: "listUnaudit",//卡片弃审
	/**卡片按钮事件：结束 */

	/** 批量流程处理action前缀 */
	WF_BATCH_FIX: "BatchWf",
	/** 批量流程处理action连接符号 */
	WF_BATCH_LINK: "__",
    /** 批量启动流程 */
	WF_BATCH_BEGIN: "BatchWf__begin",
    /** 批量取消启动流程 */
	WF_BATCH_UNBEGIN: "BatchWf__cancel",
    /** 批量送交审批 */
	WF_BATCH_NEXT: "BatchWf__showNext",
    /** 批量退回审批 */
	WF_BATCH_BACK: "BatchWf__back",
    /** 批量结束流程 */
	WF_BATCH_END: "BatchWf__end",
    /** 批量取消结束流程 */
	WF_BATCH_UNEND: "BatchWf__cancelEnd",
	/** 批量审批处理 */
	WF_BATCH_DELIVER: "BatchWf__Deliver",
	/** 批量收回处理 */
    WF_BATCH_WITHDRAW: "BatchWf__withDraw",
	STATE_OK: "ok",
	STATE_ERR: "error",

	STR_YES: "1",
	STR_NO: "2",
	STR_THREE: "3",

	SPP_FLAG_PRODUCT: "PRODUCT",
	SPP_FLAG_PROJECT: "PROJECT",

    /** $ACTION$：不显示图形 */
    CHART_BLANK: "0",
    /** $ACTION$：显示饼图 */
    CHART_PIE: "1",
    /** $ACTION$：显示柱状图 */
    CHART_BAR: "2",
    /** $ACTION$：显示曲线图 */
    CHART_XY: "3",
    /** $ACTION$：显示以时间（年、月、日）为单位坐标的曲线图 */
    CHART_XY_TIME: "4",
    /** $ACTION$：时间线图为年线图 */
    CHART_XY_TIME_YEAR: "5",
    /** $ACTION$：时间线图为月线图 */
    CHART_XY_TIME_MONTH: "6",
    /** $ACTION$：时间线图为日线图 */
    CHART_XY_TIME_DAY: "7",

    /** 排序类型: 升序 */
    SORT_TYPE_ASC: 1,
    /** 排序类型: 降序 */
    SORT_TYPE_DESC: 2,
    /** 对齐方式: 左对齐 */
    ALIGN_TYPE_LEFT: "left",
    /** 统计方式：计数 */
    STAT_TYPE_COUNT: "1",
    /** 统计方式：求和 */
    STAT_TYPE_SUM: "2",
    /** 统计方式：平均值 */
    STAT_TYPE_AVG: "3",
    /** 统计方式：最大值 */
    STAT_TYPE_MAX: "4",
    /** 统计方式：最小值 */
    STAT_TYPE_MIN: "5",
    /** $ACTION$：横轴 */
    CHART_XAXIS: "1",
    /** $ACTION$：纵轴 */
    CHART_YAXIS: "2",

    /** 表格各部分区域size：开始 */
    GRID_CAPTION_HEIGHT: 30,
    GRID_TOOLBAR_HEIGHT: 21,
    GRID_FILTERBAR_HEIGHT: 23,
    GRID_PAGER_HEIGHT: 25,
    GRID_ROW_HEIGHT: 22,
    GRID_HEADER_HEIGHT: 22,
    GRID_FOOTERROW_HEIGHT: 22,
    /** 表格各部分区域size：结束 */

    /** 列表数据用于过滤数据的条件key值：开始 */
    SEARCH_WHERE: "_searchWhere",    /* 查询 */
    LINK_WHERE: "_linkWhere",      /* 关联功能 */
    TREE_WHERE: "_treeWhere",      /* 全息树查询功能 */
    SENIOR_WHERE: "_seniorWhere",  /* 高级查询功能 */
    EXT_WHERE: "_extWhere",        /* 附加过滤功能 */
    WHERE: "_WHERE_",			   /* finds用的查询条件*/
    /** 列表数据用于过滤数据的条件key值：结束 */

    /** 字段查询关系定义：开始 */
    QUERY_SIGN_EQ: "=",    /* 等于 */
    QUERY_SIGN_GT: ">",    /* 大于 */
    QUERY_SIGN_LT: "<",    /* 小于 */
    QUERY_SIGN_GE: ">=",    /* 大于等于 */
    QUERY_SIGN_LE: "<=",    /* 小于等于 */
    QUERY_SIGN_NE: "<>",    /* 不等于 */
    QUERY_SIGN_IN: "in",    /* 包含 */
    QUERY_SIGN_NI: "not in",    /* 不包含 */
    QUERY_SIGN_LK: "like",    /* 匹配，LIKE(前后都有%) */
    QUERY_SIGN_NL: "not_like",    /* 不匹配 */
    QUERY_SIGN_BW: "like_value_percent",    /* 开头匹配，LIKE(%在后) */
    QUERY_SIGN_BN: "not_begin_with",    /* 不开头匹配 */
    QUERY_SIGN_EW: "like_percent_value",    /* 结尾匹配，LIKE(%在前) */
    QUERY_SIGN_EN: "not_end_with",    /* 不结尾匹配 */
    QUERY_SIGN_CN: "contains",    /* 全文检索 */
    /** 字段查询关系定义：结束 */

    /** 表单字段类型定义：开始 */
    FORM_FIELD_TYPE_TAB: "1",        /* 表单字段类型：表 */
    FORM_FIELD_TYPE_VIEW: "2",      /* 表单字段类型：视图 */
    FORM_FIELD_TYPE_SELF: "3",      /* 表单字段类型：自定义 */
    /** 表单字段类型定义：结束 */
    
    /** 表单字段数据类型定义：开始 */
    DATA_TYPE_BIGTEXT: "LONG",    		/* 大文本 */
    DATA_TYPE_NUM: "NUM",            	/* 数字 */
    DATA_TYPE_PIC: "PIC",            	/* 图片 */
    DATA_TYPE_STR: "STR",            	/* 字符串 */
    DATA_TYPE_TIME: "TIME",				/* 时间*/
    /** 表单字段数据类型定义：结束 */
    	
    /** 表单字段输入类型定义：开始 */
    /** 输入类型，1：文本框；2：下拉框；3：单选框；4：多选框；5：大文本；6：超大文本；7：文件选择；8：图片上传；9：嵌入服务；10：分组框；14：附件*/
    FITEM_ELEMENT_INPUT: "1",					/* INPUT输入框 */
    FITEM_ELEMENT_SELECT: "2", 					/* SELECT下拉框*/
    FITEM_ELEMENT_RADIO: "3",					/* RADIO单选框 */
    FITEM_ELEMENT_CHECKBOX: "4",				/* CHECKBOX多选框 */
    FITEM_ELEMENT_TEXTAREA: "5", 				/* TEXTAREA大文本 */
    FITEM_ELEMENT_BIGTEXT: "6",					/* BIGTEXT超大文本 */
    FITEM_ELEMENT_FILE: "7",    				/* 文件选择 */
    FITEM_ELEMENT_IMAGE: "8",    				/* 图片上传 */
    FITEM_ELEMENT_DATA_SERVICE: "9",    		/* 嵌入服务 */
    FITEM_ELEMENT_HR: "10",						/* 分组框 */
    FITEM_ELEMENT_STATICTEXT: "11",    				/* 静态文本 */
    FITEM_ELEMENT_PSW: "12",    				/* 密码框 */
   // FITEM_ELEMENT_IMAGE: "IMAGE",    			/* 图片链接 */
    FITEM_ELEMENT_ATTACH: "14",    			    /* 附件 */
    FITEM_ELEMENT_LINKSELECT: "16",    			/* 相关选择 */
    FITEM_ELEMENT_MIND: "17",					/* 意见显示框  */
    FITEM_ELEMENT_IFRAME: "18",					/* ifrom  */
    FITEM_ELEMENT_COMMENT : "19",		/* 评论 */
    
    FITEM_ELEMENT_INCLUDEJSP: "INCLUDEJSP",   	/* jsp文件 */
    FITEM_ELEMENT_DATA_GRID: "DATA_GRID",    	/* 嵌入式表格 */
    FITEM_ELEMENT_DATA_FORM: "DATA_FORM",    	/* 嵌入式表单 */
    FITEM_ELEMENT_HTMLEDITOR: "HTMLEDITOR",    	/* html编辑器 */
    /** 表单字段元素输入类型：结束 */

    /** 表单字段输入模式定义：开始 */
  	/** 输入模式，1：无；2：查询选择；3：字典选择；4：日期选择；5：文件选择；6：动态提示；9：自定义*/
    FITEM_INPUT_AUTO: "1", 						/* 无 */
    FITEM_INPUT_QUERY: "2",    					/* 查询选择 */
    FITEM_INPUT_DICT: "3",    					/* 字典选择 */
    FITEM_INPUT_DATE: "4",    					/* 日期选择 */
    FITEM_INPUT_SUGGEST: "5",    				/* 动态提示 */
    FITEM_INPUT_COMBINE: "6",    				/* 组合框 */
    FITEM_INPUT_HAND: "9",						/* 自定义 */
    FITEM_INPUT_DICTCODE: "DICTCODE",    		/* 字典编码 */
    FITEM_INPUT_CODE: "CODE",    				/* 编码 */
    FITEM_INPUT_DICMUL: "DICMUL",    			/* 多级下拉框 */
    FITEM_INPUT_SELFTRAN: "SELFTRAN",    		/* 自处理 */
    /** 表单字段输入模式：结束 */
  	/** 移动显示类型，1：移动列表标题；2：移动列表子项；3：移动卡片项；9：移动卡隐藏项；*/
    ITEM_MOBILE_LTITLE: "1", 					/* 移动列表标题 */
    ITEM_MOBILE_LITEM: "2",    					/* 移动列表项 */
    ITEM_MOBILE_CITEM: "3",    					/* 移动卡片项 */
    ITEM_MOBILE_LTIME: "4",                     /* 移动列表时间差项 */
    ITEM_MOBILE_LIMG: "5",                      /* 移动列表图片项 */
    ITEM_MOBILE_CHIDDEN: "9",    				/* 移动卡隐藏项 */
    ITEM_MOBILE_FORCEHIDDEN: "91",    			/* 移动卡强制隐藏(忽略流程设置) */
    /** 移动显示类型：结束 */
    
    /** 布尔判断：开始*/
    YES	:	"1",
    NO	:	"2",
    /** 布尔判断：结束*/

    /** 查询选择方式：开始 */
    TYPE_SINGLE: "single",
    TYPE_MULTI: "multi",
    /** 查询选择方式：结束 */

    /** 数据源类型定义：开始 */
    DATA_TYPE_XML: "xml",
    DATA_TYPE_JSON: "json",
    DATA_TYPE_JSONP: "jsonp",
    DATA_TYPE_LOCAL: "local",
    DATA_TYPE_CLIENTSIDE: "clientside",
    DATA_TYPE_XMLSTRING: "xmlstring",
    DATA_TYPE_JSONSTRING: "jsonstring",
    DATA_TYPE_SCRIPT: "script",
    DATA_TYPE_FUNCTION: "function",
    /** 数据源类型定义：结束 */

    /** 卡片显示方式定义：开始 */
    CARD_RIGHT_NUM: "1",
    CARD_BOTTOM_NUM: "2",
    CARD_NORMAL: "cardNormal",
    CARD_BOTTOM: "cardBottom",
    CARD_RIGHT: "cardRight"
    /** 卡片显示方式定义：结束 */

    /** 按钮操作组定义：开始 */
    ,buttonGroup: {
        /* 增加 */
        BTN_GROUP_ADD: "ADD",
        /* 删除 */
        BTN_GROUP_DEL: "DEL",
        /* 修改 */
        BTN_GROUP_EDIT: "EDIT",
        /* 查看 */
        BTN_GROUP_READ: "READ",
        /* 其它 */
        BTN_GROUP_OTHER: "OTHER"
    }
    /** 按钮操作组定义：结束 */

    /** 按钮响应事件定义：开始 */
    ,buttonEvent: {
        /* 鼠标双击 */
        BTN_EVENT_DBLCLICK: "DBLCLICK"
    }
    /** 按钮响应事件定义：结束 */
    ,ACT_WAITING_MSG: "操作提交中... ..."
    ,HOME_PAGE_TITLE: "我的首页"
    /** 扩展字体常量 */
    ,FONT_STROKE_:"FONT_STROKE_"
    ,FONT_STROKE_BACK: "&#x46;"
    ,FONT_STROKE_REFRESH: "&#x60;"
    ,FONT_STROKE_LOAD: "&#x73;"
    ,FONT_STROKE_HOME: "&#x2a;"
    ,FONT_STROKE_save: "&#x44;"
    ,FONT_STROKE_default: "&#x5e;"
    ,FONT_STROKE_more: "&#x2a;"
    ,FONT_STROKE_copy: "&#x5e;"
    ,FONT_STROKE_search: "&#x5e;"
    ,FONT_STROKE_close: "&#x77;"
    ,FONT_STROKE_expand: "&#x78;"
    ,FONT_STROKE_folder: "&#x43;"
    ,FONT_STROKE_leaf: "&#x46;"
    ,FONT_STROKE_add: "&#x5e;"    
    ,FONT_STROKE_clear: "&#x5c;" 
    ,FONT_REG_QUERY: "&#x69;"
    ,FONT_REG_REFRESH: "&#x75;"
    	
    /**意见分组框ITEM_CODE*/
    ,MIND_FIELDSET: "MIND_FIELDSET"
};

var Icon = {
	// excel
	"xls" : "icon-excel",
	"xlsx" : "icon-excel",

	// flash
	"swf" : "icon-flash",
	"flv" : "icon-flash",

	// pdf
	"pdf" : "icon-pdf",

	// 幻灯片
	"ppt" : "icon-ppt",

	// word文档
	"doc" : "icon-word",
	"docx" : "icon-word",
	"xdoc" : "icon-xdoc",

	// 纯文本
	"txt" : "icon-txt",
	"asc" : "icon-txt",

	// 图片
	"gif" : "icon-image",
	"png" : "icon-image",
	"jpg" : "icon-image",
	"jpeg" : "icon-image",

	// 压缩包
	"zip" : "icon-zip",
	"rar" : "icon-zip",
	"7z" : "icon-zip",
	"gzip" : "icon-zip",
	"tar" : "icon-zip",
	"gz" : "icon-zip",

	// 未知
	"unknown" : "icon-unknown"
};