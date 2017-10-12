/**平台级工具类，工具类方法，方法目录
 * -----------------$-----------------------
 * jQuery.parseJSON(jsonStr); //将字符串转化成json
 * jQuery.toJSON(jsonObj);//将json转化成字符串
 * jQuery.contextmenu();//右键菜单
 * jQuery.textSearch(str, options);  //高亮页面文本
 * jQuery.evalJSON(); //--------------
 * jQuery.secureEvalJSON();//-----
 * jQuery.quoteString(str);//-------
 * jQuery.extend(opts,default);//合并两个对象
 * jQuery.timeago(timeago);//给定时间，返回字面显示，如返回“刚刚”，“2分钟前”，“昨天”等
 * JsonToStr(obj);//将json转化成字符串，不推荐使用
 * StrToJson(str);//将字符串转化成对象，不推荐使用
 * "字符串".format(); //替换字符串中含{}的字符
 * -----------------rhDate------------------
 * rhDate.getCurentTime(); //获取系统当前时间，返回结果：2013-01-23 16:28    
 * rhDate.stringToDate();//将时间格式的字符串转化成时间
 * rhDate.getDateTime(); //获取系统当前时间
 * rhDate.getAreaDate(); //根据小时获取当前系统的中文区块时间
 * rhDate.doDateDiff();  //求时间差
 * rhDate.nextDate();  //某个日期减去天数得到另外一个日期
 * rhDate.getTime();//取得格式化事件 2012-03-01 07:06:02
 * rhDate.pattern(fmt,dateStr);//日期格式化，根据格式化类型，返回日期字符串;
 * 1.rhDate.pattern('yyyy/MM/dd');返回当前时间日期格式化
 * 2.可以将一个时间字符串转化成另外的格式，例如：rhDate.pattern('yyyy/MM/dd','2013-03-27');返回的是2013/03/27
 * rhDate.dateDiff(strInterval, dtEnd);//获取传入时间与当前时间差 dateDiff("d","2013-1-28"),返回当前时间与2013-1-28相差天数，
 															//参数d表示天，也可以是y表示年，则返回相差年数
 * rhDate.compareTwoDate(beforeDate, endDate, dateFormat)参数说明：beforeDate, endDate两个具有日期空间的jQuery对象(没有也行)；
 *dateFormat 日期格式，目前支持：yyyy-MM-dd、yyyy-MM-dd HH:mm、yyyy-MM-dd HH:mm:ss，
 *三种方式，默认为yyyy-MM-dd
 *方法作用：两个日期之间大小联动，比如开始时间需小于结束时间 
 * -----------------Cookie------------------
 * Cookie.get(cookName);//读cookie操作,参数：cookie名称 返回值：字符串
 * Cookie.set(sName, sValue, oExpires, sPath, sDomain, bSecure);//写cookie操作 sName：cookie名称.sValue：cookie值,oExpires：过期时间
 * Cookie.del(sName);//删除cookie操作sName ：cookie名称
 
 * -----------------Tip---------------------
 * Tip.show(msg, parentFlag, scopeObj);//提示信息条，定时会隐藏, msg显示顶部提示信息,parentFlag 父层对象的标识
 * Tip.showAttention(msg, parentFlag, scopeObj);//提示信息条，定时会隐藏,msg 显示顶部提示信息,parentFlag 父层对象的标识
 * Tip.showError(msg, parentFlag, scopeObj);//提示信息条，定时会隐藏,msg显示顶部提示信息,parentFlag父层对象的标识
 * Tip.showLoad(msg, parentFlag, appendObj, timeout, scopeObj);//加载信息提示,msg显示顶部提示信息, parentFlag父层对象的标识
 * Tip.clear();//外层清除提示信息
 * Tip.clearLoad();//删除加载提示信息条
 
 * ------------------Format------------------
 * Format.formatNum(str);//系统数据格式化方法
 * Format.clearNum(strNum);//去除逗号
 * Format.(size, fix, value) ;//------------------
 * Format.limit(size, value);//--------------
 * Format.substr(start, end, value);//截串
 * Format.replaceDblQuotes(str);// 双引号替换为空串
 * Format.replaceSinQuotes(str);//// 单引号替换为空串
 * Format.RMBCapital(number);//人民币大写转换,numberValue 人民币小写
 
 * -----------------Load--------------------
 * Load.js(pathUrl, viewer);//动态加载js，并执行,pathUrl js的路径viewer 列表/卡片js 中的 viewer 对象
 * Load.scriptJS(pathUrl);//动态加载js,放入骑到<script>标签，判断重复加载
 
 *------------------Tools-------------------
 * Tools.getFileSuffix(fileName);//取出文件扩展名
 * Tools.redirect(url);//重定位url
 * Tools.toMbIndex();//判断当前登录页面，如果为手机登录页则跳转
 * Tools.lTrim(val);//-----------
 * Tools.rTrim(val);//-----------
 * Tools.itemVarReplace(str, data);//系统字段级变量替换
 * Tools.systemVarReplace(str);//系统级变量替换
 * Tools.parVarReplace(str);//父层级级变量替换
 * Tools.rhSetBodyBack();//根据个性化的数据，设置背景的方法
 * Tools.xdocUrlReplace(url);//xdoc的url特殊处理替换
 * Tools.rhReplaceId(url);//替换菜单的info中的字符变量为id可用的字符等
 * Tools.rhReplaceHtmlTag(value);//html格式字符替换
 * Tools.getTreeLeafClass(dictId);//根据字典编号返回对应的叶子节点class
 * Tools.openCard(itemOjb);//列表url的配置可以在列表显示时打开卡片，配置如：Tools.openCard(this)
 
 *------------------Browser-----------------
 * Browser.versions();//rh封装的判断浏览器类别,Browser.versions.iPad
    
 *------------------StringUtils--------------------
 * endWith(srcStr,str); //是否以指定字符串结束
 * starWith(srcStr,str); //是否以指定字符串开始
 *------------------其他--------------------
 * showRHDialog(title,content,func,handler,widHeiArray);//显示提示信息框通用方法,title 标题,content 内容,func 回调方法,handler 回调句柄
 * Stopwatch();//辅助调试计时器
 * -----------------Agent------------------
 * checkAgentStatus();//判断是否处于委托他人办理业务状态
 * checkSubStatus();//判断是否处于代他人办理业务状态
 *---------------------Hex-------------------------
 *1，str2hex方法把字符串转换成16进制字符串。例如:把“中国”转换成“e4b8ade59bbd”
 *2，hex2str方法把16进制字符串转换成字符串。例如:把“e4b8ade59bbd”转换成“中国”
 *Hex.encode(String);//把本地字符转成16进制
 *Hex.decode(String);//把16进制字符转化成本地字符
 *Hex._utf8_encode(utftext);把字符串转成UTF-8编码
 *Hex._utf8_decode(utftext);把UTF-8转成本地字符串
 *
 */       
/**
 * 字符串转换成JSON对象:  jQuery.parseJSON(jsonStr);
 * 将JSON对象转成字符串:  jQuery.toJSON(jsonObj);
 */
(function($) {
	var escapeable = /["\\\x00-\x1f\x7f-\x9f]/g, meta = {
		'\b' : '\\b',
		'\t' : '\\t',
		'\n' : '\\n',
		'\f' : '\\f',
		'\r' : '\\r',
		'"' : '\\"',
		'\\' : '\\\\'
	};
	
	// jQuery.browser增加mobile判断
	(function(n){
		jQuery.browser.mobile = /android.+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(n);
	})(navigator.userAgent||navigator.vendor||window.opera)
	
	// IE8下的内置方法JSON.stringify有bug
	if (typeof JSON === 'object' && JSON.stringify && !($.browser.msie && ($.browser.version == "8.0"))) {
		$.toJSON = JSON.stringify;
	} else {
		$.toJSON = function(o) {
			if (o === null) {
				return 'null';
			}
			var type = typeof o;
			if (type === 'undefined') {
				return undefined;
			}
			if (type === 'number' || type === 'boolean') {
				return '' + o;
			}
			if (type === 'string') {
				return $.quoteString(o);
			}
			if (type === 'object') {
				if (typeof o.toJSON === 'function') {
					return $.toJSON(o.toJSON());
				}
				if (o.constructor === Date) {
					var month = o.getUTCMonth() + 1, day = o.getUTCDate(), year = o
							.getUTCFullYear(), hours = o.getUTCHours(), minutes = o
							.getUTCMinutes(), seconds = o.getUTCSeconds(), milli = o
							.getUTCMilliseconds();
					if (month < 10) {
						month = '0' + month;
					}
					if (day < 10) {
						day = '0' + day;
					}
					if (hours < 10) {
						hours = '0' + hours;
					}
					if (minutes < 10) {
						minutes = '0' + minutes;
					}
					if (seconds < 10) {
						seconds = '0' + seconds;
					}
					if (milli < 100) {
						milli = '0' + milli;
					}
					if (milli < 10) {
						milli = '0' + milli;
					}
					return '"' + year + '-' + month + '-' + day + 'T'
							+ hours + ':' + minutes + ':' + seconds + '.'
							+ milli + 'Z"';
				}
				if (o.constructor === Array) {
					var ret = [];
					for ( var i = 0; i < o.length; i++) {
						ret.push($.toJSON(o[i]) || 'null');
					}
					return '[' + ret.join(',') + ']';
				}
				var name, val, pairs = [];
				for ( var k in o) {
					type = typeof k;
					if (type === 'number') {
						name = '"' + k + '"';
					} else if (type === 'string') {
						name = $.quoteString(k);
					} else {
						continue;
					}
					type = typeof o[k];
					if (type === 'function' || type === 'undefined') {
						continue;
					}
					val = $.toJSON(o[k]);
					pairs.push(name + ':' + val);
				}
				return '{' + pairs.join(',') + '}';
			}
		};
	}
	$.evalJSON = typeof JSON === 'object' && JSON.parse ? JSON.parse
			: function(src) {
				return eval('(' + src + ')');
			};
	$.secureEvalJSON = typeof JSON === 'object' && JSON.parse ? JSON.parse
			: function(src) {
				var filtered = src
						.replace(/\\["\\\/bfnrtu]/g, '@')
						.replace(
								/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
								']').replace(/(?:^|:|,)(?:\s*\[)+/g, '');
				if (/^[\],:{}\s]*$/.test(filtered)) {
					return eval('(' + src + ')');
				} else {
					throw new SyntaxError(
							'Error parsing JSON, source is not valid.');
				}
			};
	$.quoteString = function(string) {
		if (string.match(escapeable)) {
			return '"'
					+ string.replace(escapeable, function(a) {
						var c = meta[a];
						if (typeof c === 'string') {
							return c;
						}
						c = a.charCodeAt();
						return '\\u00' + Math.floor(c / 16).toString(16)
								+ (c % 16).toString(16);
					}) + '"';
		}
		return '"' + string + '"';
	};
})(jQuery);
/*
 * 文字高亮代码，有一个参数是必须的，就是你要搜索的关键字字符串（默认状况下，使用空格隔开可表示多个关键字），
 * 调用方式：jQuery(".test").textSearch("世界杯",{markColor: "blue"});
 */
(function($) {
	$.fn.textSearch = function(str, options) {
		var defaults = {
			divFlag : true,
			divStr : " ",
			markClass : "",
			markColor : "red",
			nullReport : true,
			callback : function() {
				return false;
			}
		};
		var sets = $.extend({}, defaults, options || {}), clStr;
		if (sets.markClass) {
			clStr = "class='" + sets.markClass + "'";
		} else {
			clStr = "style='color:" + sets.markColor + ";'";
		}
		// 对前一次高亮处理的文字还原
		$("span[rel='mark']").removeAttr("class").removeAttr("style")
				.removeAttr("rel");

		// 字符串正则表达式关键字转化
		$.regTrim = function(s) {
			var imp = /[\^\.\\\|\(\)\*\+\-\$\[\]\?]/g;
			var imp_c = {};
			imp_c["^"] = "\\^";
			imp_c["."] = "\\.";
			imp_c["\\"] = "\\\\";
			imp_c["|"] = "\\|";
			imp_c["("] = "\\(";
			imp_c[")"] = "\\)";
			imp_c["*"] = "\\*";
			imp_c["+"] = "\\+";
			imp_c["-"] = "\\-";
			imp_c["$"] = "\$";
			imp_c["["] = "\\[";
			imp_c["]"] = "\\]";
			imp_c["?"] = "\\?";
			s = s.replace(imp, function(o) {
				return imp_c[o];
			});
			return s;
		};
		$(this).each(
				function() {
					var t = $(this);
					str = $.trim(str);
					if (str === "") {
						alert("关键字为空");
						return false;
					} else {
						// 将关键字push到数组之中
						var arr = [];
						if (sets.divFlag) {
							arr = str.split(sets.divStr);
						} else {
							arr.push(str);
						}
					}
					var v_html = t.html();
					// 删除注释
					v_html = v_html.replace(/<!--(?:.*)\-->/g, "");

					// 将HTML代码支离为HTML片段和文字片段，其中文字片段用于正则替换处理，而HTML片段置之不理
					var tags = /[^<>]+|<(\/?)([A-Za-z]+)([^<>]*)>/g;
					var a = v_html.match(tags), test = 0;
					$.each(a, function(i, c) {
						if (!/<(?:.|\s)*?>/.test(c)) {// 非标签
							// 开始执行替换
							$.each(arr, function(index, con) {
								if (con === "") {
									return;
								}
								var reg = new RegExp($.regTrim(con), "g");
								if (reg.test(c)) {
									// 正则替换
									c = c.replace(reg, "♂" + con + "♀");
									test = 1;
								}
							});
							c = c.replace(/♂/g,
									"<span rel='mark' " + clStr + ">").replace(
									/♀/g, "</span>");
							a[i] = c;
						}
					});
					// 将支离数组重新组成字符串
					var new_html = a.join("");

					$(this).html(new_html);

					if (test === 0 && sets.nullReport) {
						alert("没有搜索结果");
						return false;
					}

					// 执行回调函数
					sets.callback();
				});
	};
})(jQuery);

/**
 * 根据给定时间，返回与给定时间的字面显示，如返回“刚刚”，“2分钟前”，“昨天”等
 * jQuery.timeago(timeago)：参数timeago 
 * 可以是Date类型；
 * 可以是能转换成Date类型的字符串（如2012-12-26 11:33:27）；
 * 可以是数字（时间毫秒数）
 */
(function($) {
  $.timeago = function(timestamp) {
    if (timestamp instanceof Date) {
      return inWords(timestamp);
    } else if (typeof timestamp === "string") {
      return inWords($.timeago.parse(timestamp));
    } else if (typeof timestamp === "number") {
      return inWords(new Date(timestamp));
    } else {
      return inWords($.timeago.datetime(timestamp));
    }
  };
  var $t = $.timeago;

  $.extend($.timeago, {
    settings: {
      refreshMillis: 60000,
      allowFuture: false,
      strings: {
        prefixAgo: null,
        prefixFromNow: null,
        suffixAgo: "", //前
        suffixFromNow: "from now",
        seconds: "刚刚",//1分钟内
        minute: "1分钟前",
        minutes: "%d分钟前",
        hour: "1小时前",
        hours: "%d小时前",
        day: "1天前",
        days: "%d天前",
        month: "1个月前",
        months: "%d月前",
        year: "1年前",
        years: "%d年前",
        wordSeparator: "",
        numbers: []
      }
    },
    inWords: function(distanceMillis) {
      var $l = this.settings.strings;
      var prefix = $l.prefixAgo;
      var suffix = $l.suffixAgo;
      if (this.settings.allowFuture) {
        if (distanceMillis < 0) {
          prefix = $l.prefixFromNow;
          suffix = $l.suffixFromNow;
        }
      }

      var seconds = Math.abs(distanceMillis) / 1000;
      var minutes = seconds / 60;
      var hours = minutes / 60;
      var days = hours / 24;
      var years = days / 365;

      function substitute(stringOrFunction, number) {
        var string = $.isFunction(stringOrFunction) ? stringOrFunction(number, distanceMillis) : stringOrFunction;
        var value = ($l.numbers && $l.numbers[number]) || number;
        return string.replace(/%d/i, value);
      }

      var words = seconds < 45 && substitute($l.seconds, Math.round(seconds)) ||
        seconds < 90 && substitute($l.minute, 1) ||
        minutes < 45 && substitute($l.minutes, Math.round(minutes)) ||
        minutes < 90 && substitute($l.hour, 1) ||
        hours < 24 && substitute($l.hours, Math.round(hours)) ||
        hours < 42 && substitute($l.day, 1) ||
        days < 30 && substitute($l.days, Math.round(days)) ||
        days < 45 && substitute($l.month, 1) ||
        days < 365 && substitute($l.months, Math.round(days / 30)) ||
        years < 1.5 && substitute($l.year, 1) ||
        substitute($l.years, Math.round(years));

      var separator = $l.wordSeparator === undefined ?  " " : $l.wordSeparator;
      return $.trim([prefix, words, suffix].join(separator));
    },
    parse: function(iso8601) {
      var s = $.trim(iso8601);
      s = s.replace(/\.\d+/,""); // remove milliseconds
      s = s.replace(/-/,"/").replace(/-/,"/");
      s = s.replace(/T/," ").replace(/Z/," UTC");
      s = s.replace(/([\+\-]\d\d)\:?(\d\d)/," $1$2"); // -04:00 -> -0400
      return new Date(s);
    },
    datetime: function(elem) {
      var iso8601 = $t.isTime(elem) ? $(elem).attr("datetime") : $(elem).attr("title");
      return $t.parse(iso8601);
    },
    isTime: function(elem) {
      // jQuery's `is()` doesn't play well with HTML5 in IE
      return $(elem).get(0).tagName.toLowerCase() === "time"; // $(elem).is("time");
    }
  });

  $.fn.timeago = function() {
    var self = this;
    self.each(refresh);

    var $s = $t.settings;
    if ($s.refreshMillis > 0) {
      setInterval(function() { self.each(refresh); }, $s.refreshMillis);
    }
    return self;
  };

  function refresh() {
    var data = prepareData(this);
    if (!isNaN(data.datetime)) {
      $(this).text(inWords(data.datetime));
    }
    return this;
  }

  function prepareData(element) {
    element = $(element);
    if (!element.data("timeago")) {
      element.data("timeago", { datetime: $t.datetime(element) });
      var text = $.trim(element.text());
      if (text.length > 0 && !($t.isTime(element) && element.attr("title"))) {
        element.attr("title", text);
      }
    }
    return element.data("timeago");
  }

  function inWords(date) {
    return $t.inWords(distance(date));
  }

  function distance(date) {
    return (new Date().getTime() - date.getTime());
  }

  // fix for IE6 suckage
  document.createElement("abbr");
  document.createElement("time");
}(jQuery));

/**
 * 日期封装系统方法都写在此，不要定义到外面的全局方法，
 */
var rhDate = {
	/**
	 * 获取系统当前时间，返回结果：2013-01-23 16:28
	 */
	getCurentTime : function() {
		var now = new Date();
		var year = now.getFullYear(); // 年
		var month = now.getMonth() + 1; // 月
		var day = now.getDate(); // 日
		var hh = now.getHours(); // 时
		var mm = now.getMinutes(); // 分

		var clock = year + "-";
		if (month < 10)
			clock += "0";
		clock += month + "-";
		if (day < 10)
			clock += "0";
		clock += day + " ";
		if (hh < 10)
			clock += "0";
		clock += hh + ":";
		if (mm < 10)
			clock += '0';
		clock += mm;
		return (clock);		
	},
	stringToDate : function (DateStr) {//TODO：测试，示例
		var converted = Date.parse(DateStr.replace(/-/g, '/'));
		var myDate = new Date(converted);
		if (isNaN(myDate)) {
			// var delimCahar = DateStr.indexOf('/')!=-1?'/':'-';
			var arys = DateStr.split('-');
			myDate = new Date(arys[0], --arys[1], arys[2]);
		}
		return myDate;
	},
	/**
	 * js获取当前系统时间
	 * @paramm type 参数：日期类型
	 * @return String 返回值：字符串
	 */
	getDateTime : function (type) {//TODO：测试，示例说明
		var dateTime = new Date();
		// 取得当前时间
		var nowdate = "";// dateTime.format("yyyy-MM-dd hh:mm:ss");
		if (type == "DATE") {
			var year = dateTime.getFullYear();
			var mon = dateTime.getMonth() + 1 + "";
			if (mon.length < 2) {
				mon = "0" + mon;
			}
			var day = dateTime.getDate() + "";
			if (day.length < 2) {
				day = "0" + day;
			}
			nowdate = year + "-" + mon + "-" + day;
			return nowdate;
		} else if (type == "hh") {
			var hh = dateTime.getHours();
			return hh;
		} else if (type == "mm") {
			var mm = dateTime.getMinutes();
			// var ss=dateTime.getSeconds();
			return mm;
		}
		return nowdate;
	},
	/**
	 * 根据小时获取当前系统的中文区块时间
	 * @paramm hhDate 参数：小时的数字
	 * @return String 返回值：中文的区块时间
	 */
	getAreaDate : function (hhDate) {
		if ((6 <= hhDate) && (hhDate <= 12)) {
			return "上午";
		} else if ((12 < hhDate) && (hhDate <= 18)) {
			return "下午";
		} else if ((18 < hhDate) && (hhDate < 24)) {
			return "晚上";
		} else if ((0 <= hhDate) && (hhDate < 6)) {
			return "凌晨";
		}
	},
	/**
	 * 求时间差
	 * @param  interval ：D表示查询精确到天数的之差 interval ：H表示查询精确到小时之差 interval
	 *            ：M表示查询精确到分钟之差 interval ：S表示查询精确到秒之差 interval ：T表示查询精确到毫秒之差
	 * @param date1  时间1
	 * @param date2 时间2
	 * @param dec 保留几位小数
	 * @return 时间差
	 */
	doDateDiff : function (interval, date1, date2, dec) {
		var objInterval = {
				'D' : 1000 * 60 * 60 * 24,
				'H' : 1000 * 60 * 60,
				'M' : 1000 * 60,
				'S' : 1000,
				'T' : 1
			};
			interval = interval.toUpperCase();
			var dt1 = new Date(Date.parse(date1.replace(/-/g, '/')));
			var dt2 = new Date(Date.parse(date2.replace(/-/g, '/')));
			try {
				if (dec) {
					dec = parseInt(dec);
					return Math.round((dt2.getTime() - dt1.getTime())
							/ eval('objInterval.' + interval) * (dec * 10))
							/ (dec * 10);
				} else {
					return Math.round((dt2.getTime() - dt1.getTime())
							/ eval('objInterval.' + interval));
				}
			} catch (e) {
				return e.message;
			}
	},
	/**
	 * 某个日期减去天数得到另外一个日期
	 * @param oldDate 当前日期字符串
	 * @param diffDay 相差天数
	 */
	nextDate : function (oldDate,diffDay){
		var formitDate = Date.parse(oldDate.replace(/-/gi,'/'));
		//可以加上错误处理
		var old = new Date(formitDate);
		old = old.valueOf();
		old = old - diffDay * 24 * 60 * 60 * 1000;
		old = new Date(old);
		var formitM = old.getMonth() + 1 + "";
		var formitD = old.getDate() + "";
		if (formitM.length == 1) {
			formitM = "0" + formitM;
		}
		if (formitD.length == 1) {
			formitD = "0" + formitD;
		}
		return (old.getFullYear() + "-" + formitM + "-" + formitD);
	},
	
	/**
	 * 将时间字符串转化成date类型，字符串类型为 yyyy*MM*dd [HH]*[mm]*[ss]
	 */
	strToDate:function(dateStr){
		//将时间和日期分割开来
		var dateStr = dateStr.split(" ");
		//如果包括时间格式
		if (dateStr.length == 2) {
			var dateChar = dateStr[0].charAt(4);//获取日期之间的连接符
			var timeChar = dateStr[1].charAt(2);//获取时间之间的连接符
			var timeStr = dateStr[1].replace("/"+timeChar+"/gi",":");//将时间之间的连接符替换成 ：
			var dateFullStr = dateStr[0].split(dateChar);//获取日期的年，月，日字符数组
			//将日期转换成 MM-yyyy-dd HH:mm:ss
			var dateFtmStr = dateFullStr[1] + "-" + dateFullStr[2] + "-" + dateFullStr[0] + " " + timeStr;
			return new Date(dateFtmStr);
		//如果只有日期字符串
		} else if (dateStr.length == 1) {
			var dateChar = dateStr[0].charAt(4);
			var dateFullStr = dateStr[0].split(dateChar);
			var dateFtmStr = dateFullStr[1] + "-" + dateFullStr[2] + "-" + dateFullStr[0];
			return new Date(dateFtmStr);
		}
	},
	
	/**
	 * 取得格式化事件
	 * @return 2012-03-01 07:06:02
	 */
	getTime : function() {
		var d = new Date()
		var vYear = d.getFullYear()
		var vMon = d.getMonth() + 1
		var vDay = d.getDate()
		var h = d.getHours();
		var m = d.getMinutes();
		var se = d.getSeconds();
		var s = vYear + "-" + (vMon < 10 ? "0" + vMon : vMon) + "-"
				+ (vDay < 10 ? "0" + vDay : vDay) + " " + (h < 10 ? "0" + h : h)
				+ ":" + (m < 10 ? "0" + m : m) + ":" + (se < 10 ? "0" + se : se);
		return s;
	},
	/**
	 * 日期格式化 TODO 测试 并示例
	 * @param fmt 参数：格式描述
	 * @param dateStr 参数：时间字符串
	 * @return String 返回值：字符串
	 */
	pattern : function(fmt,dateStr) {
		var dateString = dateStr || "";
		var date;
		if (dateString == "") {
			date = new Date();
		} else {
			date = this.strToDate(dateStr);
		}
		var o = {
			"M+" : date.getMonth() + 1, // 月份
			"d+" : date.getDate(), // 日
			"h+" : date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, // 小时
			"H+" : date.getHours(), // 小时
			"m+" : date.getMinutes(), // 分
			"s+" : date.getSeconds(), // 秒
			"q+" : Math.floor((date.getMonth() + 3) / 3), // 季度
			"S" : date.getMilliseconds()
		// 毫秒
		};
		var week = {
			"0" : "\u65e5",
			"1" : "\u4e00",
			"2" : "\u4e8c",
			"3" : "\u4e09",
			"4" : "\u56db",
			"5" : "\u4e94",
			"6" : "\u516d"
		};
		if (/(y+)/.test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "")
					.substr(4 - RegExp.$1.length));
		}
		if (/(E+)/.test(fmt)) {
			fmt = fmt
					.replace(
							RegExp.$1,
							((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f"
									: "\u5468")
									: "")
									+ week[date.getDay() + ""]);
		}
		for ( var k in o) {
			if (new RegExp("(" + k + ")").test(fmt)) {
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k])
						: (("00" + o[k]).substr(("" + o[k]).length)));
			}
		}
		return fmt;
	},
	/**
	 * 取当前时间和参数的时间差，TODO:测试，并示例
	 * 如：rhDate.dateDiff("d",time)
	 */
    dateDiff : function(strInterval, dtEnd) {
		var dtStart = new Date();
		if (typeof dtEnd == 'string') {// 如果是字符串转换为日期型
			dtEnd = rhDate.stringToDate(dtEnd);
		}
		switch (strInterval) {
		case 's':
			return parseInt((dtEnd - dtStart) / 1000);
		case 'n':
			return parseInt((dtEnd - dtStart) / 60000);
		case 'h':
			return parseInt((dtEnd - dtStart) / 3600000);
		case 'd':
			return parseInt((dtEnd - dtStart) / 86400000);
		case 'w':
			return parseInt((dtEnd - dtStart) / (86400000 * 7));
		case 'm':
			return (dtEnd.getMonth() + 1)
					+ ((dtEnd.getFullYear() - dtStart.getFullYear()) * 12)
					- (dtStart.getMonth() + 1);
		case 'y':
			return dtEnd.getFullYear() - dtStart.getFullYear();
		}
	},
	/**
	 * 两个日期控件之间，开始时间小于结束时间并且最大日期为当前日期
	 * @param {Object} beginDate 开始时间
	 * @param {Object} endDate 结束时间
	 * @param  dateFormat 格式化
	 * @param newDateIsMax 当前时间是最大时间，不传递和true是，false则不是
	 */
	compareTwoDate : function (beginDate, endDate, dateFormat, newDateIsMax) {
		var thisDateVal = "";
		var myDateFormat = dateFormat || "yyyy-MM-dd";
		if (newDateIsMax === undefined) {
			newDateIsMax = true;
		}
		if (dateFormat == "yyyy-MM") {
			var d = new Date()
			var vYear = d.getFullYear();
			var vMon = d.getMonth() + 1;
			vMon = vMon > 9 ? "0" + vMon : vMon;
			thisDateVal = vYear + "-" + vMon;
		//如果不存在时间，即是 yyyy-MM-dd
		}else if (myDateFormat == "yyyy-MM-dd") {
			thisDateVal = rhDate.getDateTime("DATE");
		//如果存在时间，即是 yyyy-MM-dd HH:mm
		} else if (myDateFormat == "yyyy-MM-dd HH:mm") {
			thisDateVal = rhDate.getCurentTime();
		//如果存在时间，即是 yyyy-MM-dd HH:mm:ss	
		} else if (myDateFormat == "yyyy-MM-dd HH:mm:ss") {
			thisDateVal = rhDate.getTime();
		}
		beginDate.addClass("Wdate").unbind("focus").bind("focus", function(){
			var beforeValue = parseInt(beginDate.val().replace(/-/gi,"").replace(/:/gi,"").replace(/ /gi,""));
			var endValue = parseInt(endDate.val().replace(/-/gi, "").replace(/:/gi,"").replace(/ /gi,""));
			if (newDateIsMax) {
				WdatePicker({
					onpicked:function(){
						if (beforeValue > endValue) {
							endDate.focus();
						} else {
							beginDate.blur();
						}
					},
					dateFmt:myDateFormat,
					maxDate:(endDate.val() || thisDateVal)
				});
			} else {
				if ("" == (endDate.val() || "")) {
					WdatePicker({
						onpicked: function(){
							if (beforeValue > endValue) {
								endDate.focus();
							}
							else {
								beginDate.blur();
							}
						},
						dateFmt: myDateFormat
					});
				} else {
					WdatePicker({
						onpicked: function(){
							if (beforeValue > endValue) {
								endDate.focus();
							}
							else {
								beginDate.blur();
							}
						},
						dateFmt: myDateFormat,
						maxDate: endDate.val()
					});
				}
			}
		});
	   endDate.addClass("Wdate").unbind("focus").bind("focus", function(){
			var before_Value = parseInt(beginDate.val().replace(/-/gi,"").replace(/:/gi,"").replace(/ /gi,""));
			var end_Value = parseInt(endDate.val().replace(/-/gi, "").replace(/:/gi,"").replace(/ /gi,""));
			if (newDateIsMax) { //当前时间是最大时间值
				WdatePicker({
					onpicked:function(){
						if (before_Value > end_Value) {
							beginDate.focus();
						} else {
							endDate.blur();
						}
					},
					dateFmt:myDateFormat,
					minDate:beginDate.val(),
					maxDate:thisDateVal
				});
			} else { //不需要当前时间为最大值
				WdatePicker({
					onpicked:function(){
						if (before_Value > end_Value) {
							beginDate.focus();
						} else {
							endDate.blur();
						}
					},
					dateFmt:myDateFormat,
					minDate:beginDate.val()
				});
			}
	   });
	}
};
/**
 * 系统封装的读写删Cookie的操作
 */
var Cookie = {
	/**
	 * 读cookie操作
	 * @param name 参数：cookie名称
	 * @return String 返回值：字符串
	 */
	get : function (sName) {
		var sRE = "(?:; )?" + sName + "=([^;]*);?";
		var oRE = new RegExp(sRE);
		if (oRE.test(document.cookie)) {
			return decodeURIComponent(RegExp["$1"]);
		} else {
			return null;
		}
	},
	/**
	 * 写cookie操作
	 * @param name  参数：cookie名称
	 * @param value  参数：cookie值
	 * @param oExpires  参数：过期时间
	 * @return 返回值：无
	 */
	set : function (sName, sValue, oExpires, sPath, sDomain, bSecure) {
		var sCookie = sName + "=" + encodeURIComponent(sValue);
		if (oExpires) {
			var sst = oExpires * 24 * 60 * 60 * 1000;
			date = new Date();
			date.setTime(date.getTime() + sst);
			sCookie += "; expires=" + date.toGMTString();
		}
		if (sPath) {
			sCookie += "; path=" + sPath;
		}
		if (sDomain) {
			sCookie += "; domain=" + sDomain;
		}
		if (bSecure) {
			sCookie += "; secure";
		}
		document.cookie = sCookie;
	},
	/**
	 * 删除cookie操作
	 * @param name  参数：cookie名称
	 */
	del : function (name) {// 为了删除指定名称的cookie，可以将其过期时间设定为一个过去的时间
		var date = new Date();
		date.setTime(date.getTime() - 10000);
		document.cookie = name + "=a; expires=" + date.toGMTString();
	}
};
/**
 * 将json对象转为字符串,只能返回一层的转换，更深层的转换请使用jQuery.toJSON(jsonObj)方法
 * @param o  参数：json对象
 * @return 返回值：字符串
 */
function JsonToStr(o) {
	/**
	 * 对字符串进行特殊字符编码
	 * @param str 参数：源字符串
	 * @return String 返回值：编码后的字符串
	 */
	function encode(str) {
		var sb = [];
		sb.push("\"");
		var c = "";
		for ( var i = 0; i < str.length; i++) {
			c = str.charAt(i);
			if (c == '\\') {
				sb.push("\\\\");
			} else if (c == '\n') {
				sb.push("\\n");
			} else if (c == '\r') {
				sb.push("\\r");
			} else if (c == '\t') {
				sb.push("\\t");
			} else if (c == '\'') {
				sb.push("\\\'");
			} else if (c == '\"') {
				sb.push("\\\"");
			} else if (c == '%') {
				sb.push("%25");
			} else if (c == '+') {
				sb.push(encodeURIComponent("+"));
			} else {
				sb.push(c);
			}
		}
		sb.push("\"");
		return sb.join("");
	};
	//
	var arr = [];
	var fmt = function(s) {
		if (/^(number)$/.test(typeof s)) {
			return s;
		} else {
			return /^(string)$/.test(typeof s) ? "" + encode(s) + "" : s;
		}

	};
	for ( var i in o) {
		arr.push("\"" + i + "\":" + fmt(o[i]));
	}
	return "{" + arr.join(",") + "}";
};

/**
 * 字符串转换为json对象,简单的一层级的调用，未增加转义等，如使用更复杂的调用，使用jQuery.parseJSON(jsonStr)
 * @param strData 参数：json格式字符串
 * @return 返回值：json对象
 */
function StrToJson(strData) {
	try {
		return (new Function("return " + strData))();
	} catch (e) {
		return {};
	}
};
/**
 *  系统提示信息变量
 */
var Tip = {
	/**
	 * 提示信息条，定时会隐藏
	 * @param msg  显示顶部提示信息
	 * @param parentFlag 父层对象的标识
	 */
	show:function(msg, parentFlag, scopeObj) {
		msg = Tools.rhReplaceHtmlTag(msg);
		parent.jQuery('.rh-barTip').remove();
		jQuery('.rh-barTip').remove();
		var closeA = jQuery("<a href='javascript:void(0);'></a>").addClass(
				"rh-barTip-close");
		closeA.bind("click", function(event) {
			jQuery(this).parent().remove();
		});
		var obj = jQuery();
		if ((typeof parentFlag == "boolean") && parentFlag) {
			var tip = jQuery("<span></span>").addClass("rh-barTip").addClass(
					"rh-barTipOK").append(msg);
			tip.append(closeA);
			if (scopeObj) {
				tip.appendTo(scopeObj);
			} else {
				tip.appendTo(parent.jQuery(".tabUL"));
			}
			obj = tip;
			Tip.clear();
		} else {
			var defaultObj = null;
			var tip = jQuery("<span></span>").addClass("rh-barTip").addClass(
					"rh-barTipOK").append(msg).append(closeA);
			if (parentFlag == "list") {
				defaultObj = jQuery(".conHeaderTitle").last();
			} else if (parentFlag == "listBottom") {
				defaultObj = jQuery(".tabUL-bottom").last();
			} else {
				if (scopeObj) {
					defaultObj = jQuery(scopeObj);
				} else {
					defaultObj = jQuery(".tabUL-top").last();
				}
			}
			tip.appendTo(defaultObj);
			obj = tip;
			setTimeout(function() {
				tip.remove();
			}, 5000);
		}
		return obj;
	},
	/**
	 * 提示信息条，定时会隐藏
	 * @param msg 显示顶部提示信息
	 * @param parentFlag 父层对象的标识
	 */
	showAttention : function(msg, parentFlag, scopeObj) {
		msg = Tools.rhReplaceHtmlTag(msg);
		parent.jQuery('.rh-barTip').remove();
		jQuery('.rh-barTip').remove();
		var closeA = jQuery("<a href='javascript:void(0);'></a>").addClass(
				"rh-barTip-close");
		closeA.bind("click", function(event) {
			jQuery(this).parent().remove();
		});
		if ((typeof parentFlag == "boolean") && parentFlag) {
			var tip = jQuery("<span></span>").addClass("rh-barTip").addClass(
					"rh-barTipAttention").append(msg);
			tip.append(closeA);
			if (scopeObj) {
				tip.appendTo(scopeObj);
			} else {
				tip.appendTo(parent.jQuery(".tabUL"));
			}
			Tip.clear();
		} else {
			var defaultObj = null;
			var tip = jQuery("<span></span>").addClass("rh-barTip").addClass(
					"rh-barTipAttention").append(msg).append(closeA);
			if (parentFlag == "list") {
				defaultObj = jQuery(".conHeaderTitle").last();
			} else if (parentFlag == "listBottom") {
				defaultObj = jQuery(".tabUL-bottom").last();
			} else {
				if (scopeObj) {
					defaultObj = jQuery(scopeObj);
				} else {
					defaultObj = jQuery(".tabUL-top").last();
				}
			}
			tip.appendTo(defaultObj);
			setTimeout(function() {
				tip.remove();
			}, 5000);
		}
	},
	/**
	 * 提示信息条，定时会隐藏
	 * @param msg  显示顶部提示信息
	 * @param parentFlag  父层对象的标识
	 */
	showError : function(msg, parentFlag, scopeObj) {
		msg = Tools.rhReplaceHtmlTag(msg);
		parent.jQuery('.rh-barTip').remove();
		jQuery('.rh-barTip').remove();
		var closeA = jQuery("<a href='javascript:void(0);'></a>").addClass(
				"rh-barTip-close");
		closeA.bind("click", function(event) {
			jQuery(this).parent().remove();
		});
		if ((typeof parentFlag == "boolean") && parentFlag) {
			var tip = jQuery("<span></span>").addClass("rh-barTip").addClass(
			"rh-barTipError").append(msg);
			tip.append(closeA);
			if (scopeObj) {
				tip.appendTo(scopeObj);
			} else {
				tip.appendTo(parent.jQuery(".tabUL"));
			}
			Tip.clear();
		} else {
			var defaultObj = null;
			var tip = jQuery("<span></span>").addClass("rh-barTip").addClass(
					"rh-barTipError").append(msg).append(closeA);
			if (parentFlag == "list") {
				defaultObj = jQuery(".conHeaderTitle").last();
			} else if (parentFlag == "listBottom") {
				defaultObj = jQuery(".tabUL-bottom").last();
			} else {
				if (scopeObj) {
					defaultObj = jQuery(scopeObj);
				} else {
					defaultObj = jQuery(".tabUL-top").last();
				}
			}
			tip.appendTo(defaultObj);
			setTimeout(function() {
				tip.remove();
			}, 5000);
		}
	},
	/**
	 * 加载信息提示
	 * @param msg  显示顶部提示信息
	 * @param parentFlag 父层对象的标识
	 */
	showLoad : function(msg, parentFlag, appendObj, timeout, scopeObj) {
		msg = Tools.rhReplaceHtmlTag(msg);
		parent.jQuery('.rh-barTip').remove();
		jQuery('.rh-barTip').remove();
		var closeA = jQuery("<a href='javascript:void(0);'></a>").addClass(
				"rh-barTip-close");
		closeA.bind("click", function(event) {
			jQuery(this).parent().remove();
		});
		if ((typeof parentFlag == "boolean") && parentFlag) {
			var tip = jQuery("<span></span>")
					.addClass("rh-barTip")
					.addClass("rh-barTipLoad")
					.append(
							"<img src='"
									+ FireFly.contextPath
									+ "/sy/theme/default/images/body/load.gif' class='rh-tipLoadImg'></img>")
					.append(msg);
			tip.append(closeA);
			if (scopeObj) {
				tip.appendTo(scopeObj);
			} else {
				tip.appendTo(parent.jQuery(".tabUL"));
			}
		} else {
			var defaultObj = null;
			var tip = jQuery("<span></span>")
					.addClass("rh-barTip")
					.addClass("rh-barTipLoad")
					.append(
							"<img src='"
									+ FireFly.contextPath
									+ "/sy/theme/default/images/body/load.gif' class='rh-tipLoadImg'></img>")
					.append(msg).append(closeA);
			if (parentFlag == "list") {
				defaultObj = jQuery(".conHeaderTitle").last();
			} else if (parentFlag == "listBottom") {
				defaultObj = jQuery(".tabUL-bottom").last();
			} else if (appendObj) {
				tip.addClass("rh-barTipLoad-diffClass");
				appendObj.after(tip);
				return true;
			} else {
				if (scopeObj) {
					defaultObj = jQuery(scopeObj);
				} else {
					defaultObj = jQuery(".tabUL").last();
				}
			}
			tip.appendTo(defaultObj);
			if (timeout) {
				setTimeout(function() {
					tip.remove();
				}, timeout);
			}
		}
	},
	/**
	 * 外层清除提示信息
	 */
	clear : function() {
		setTimeout(function() {
			jQuery('.rh-barTip').remove();
			parent.jQuery('.rh-barTip').remove();
		}, 5000);
	},
	/**
	 * 删除加载提示信息条
	 */
	clearLoad : function() {
		parent.jQuery('.rh-barTipLoad').remove();
		jQuery('.rh-barTipLoad').remove();
	}
};
// 系统数据格式化方法
var Format = {
	formatNum : function(strNum) {
		if (strNum.length <= 3) {
			return strNum;
		}
		if (!/^(\+|-)?(\d+)(\.\d+)?$/.test(strNum)) {
			return strNum;
		}
		var a = RegExp.$1, b = RegExp.$2, c = RegExp.$3;
		var re = new RegExp();
		re.compile("(\\d)(\\d{3})(,|$)");
		while (re.test(b)) {
			b = b.replace(re, "$1,$2$3");
		}
		return a + "" + b + "" + c;
	},
	clearNum : function(strNum) {
		return strNum.replace(/,/g, "");
	},
	formatSize : function(size, fix, value) {
		var value = parseInt(value);
		var res = value / (size);
		if (fix == -1) {
		} else {
			res = res.toFixed(fix);
		}
		return res;
	},
	limit : function(size, value) {
		var len = value.length;
		if (len > size) {
			return value.substring(0, size) + "..."
		} else {
			return value;
		}
	},
	substr : function(start, end, value) {
		var len = value.length;
		if (len > start) {
			if (len > end) {
				return value.substring(start, end);
			} else {
				return value.substring(start);
			}
		} else {
			return value;
		}
	},
	replaceDblQuotes : function(str) {// 双引号替换为空串
		return str.replace(/\"/g, "");
	},
	replaceSinQuotes : function(str) {// 单引号替换为空串
		return str.replace(/\'/g, "");
	},
	/**
	 * 人民币大写转换
	 * @param {} numberValue 人民币小写
	 * @return {String}
	 */
	RMBCapital : function(numberValue) {
		var numberValue = new String(Math.round(numberValue * 100)); // 数字金额
		var isNegative = false;
		if (numberValue.indexOf("-") == 0) { // 检测是否是负数
			isNegative = true;
			numberValue = numberValue.substr(1, numberValue.length);
		}
		var chineseValue = ""; // 转换后的汉字金额
		var String1 = "零壹贰叁肆伍陆柒捌玖"; // 汉字数字
		var String2 = "万仟佰拾亿仟佰拾万仟佰拾元角分"; // 对应单位
		var len = numberValue.length; // numberValue 的字符串长度
		var Ch1; // 数字的汉语读法
		var Ch2; // 数字位的汉字读法
		var nZero = 0; // 用来计算连续的零值的个数
		var String3; // 指定位置的数值
		if (len > 15) {
			throw new Error("超出计算范围");
			return "";
		}
		if (numberValue == 0) {
			chineseValue = "零元整";
			return chineseValue;
		}
		String2 = String2.substr(String2.length - len, len); // 取出对应位数的STRING2的值

		for ( var i = 0; i < len; i++) {
			String3 = parseInt(numberValue.substr(i, 1), 10); // 取出需转换的某一位的值
			if (i != (len - 3) && i != (len - 7) && i != (len - 11)
					&& i != (len - 15)) {
				if (String3 == 0) {
					Ch1 = "";
					Ch2 = "";
					nZero = nZero + 1;
				} else if (String3 != 0 && nZero != 0) {
					Ch1 = "零" + String1.substr(String3, 1);
					Ch2 = String2.substr(i, 1);
					nZero = 0;
				} else {
					Ch1 = String1.substr(String3, 1);
					Ch2 = String2.substr(i, 1);
					nZero = 0;
				}
			} else { // 该位是万亿，亿，万，元位等关键位
				if (String3 != 0 && nZero != 0) {
					Ch1 = "零" + String1.substr(String3, 1);
					Ch2 = String2.substr(i, 1);
					nZero = 0;
				} else if (String3 != 0 && nZero == 0) {
					Ch1 = String1.substr(String3, 1);
					Ch2 = String2.substr(i, 1);
					nZero = 0;
				} else if (String3 == 0 && nZero >= 3) {
					Ch1 = "";
					Ch2 = "";
					nZero = nZero + 1;
				} else {
					Ch1 = "";
					Ch2 = String2.substr(i, 1);
					nZero = nZero + 1;
				}

				if (i == (len - 11) || i == (len - 3)) { // 如果该位是亿位或元位，则必须写上
					Ch2 = String2.substr(i, 1);
				}
			}
			chineseValue = chineseValue + Ch1 + Ch2;
		}
		if (String3 == 0) { // 最后一位（分）为0时，加上“整”
			chineseValue = chineseValue + "整";
		}
		if (isNegative) {
			return "负" + chineseValue;
		}
		return chineseValue;
	}
};
/**
 * 加载文件系统变量
 */
var Load = {
	/**
	 * 动态加载js，并执行
	 * @param pathUrl js的路径
	 * @param viewer 列表/卡片js 中的 viewer 对象
	 */
	js : function (pathUrl, viewer) {
		jQuery.ajax({
			url : pathUrl,
			type : "GET",
			dataType : "text",
			async : false,
			data : {},
			success : function(data) {
				try {
					var servExt = new Function(data);
					servExt.apply(viewer);
				} catch (e) {
				}
			},
			error : function() {
				;
			}
		});
	},
	/*动态加载js,放入骑到<script>标签，判断重复加载*/
	scriptJS : function (pathUrl) {
		var jsFileUrl = FireFly.getContextPath() + pathUrl;
		if (!window.Scripts) {// 用于保存已经加载过的javascript
			window.Scripts = [];
		}
		// 检测该脚本有没有被加载过
		var isLoaded = false;
		var head = jQuery(jQuery("head")[0]);
		if (!head) {
			head = jQuery("<head></head>")[0];
		}
		jQuery.each(head.find("script"), function(index, sc) {// 先在页面上找
			if (sc.src && sc.src.indexOf(pathUrl) != -1) {
				isLoaded = true;
				return;
			}
		});
		if (!isLoaded) {// 然后在Scripts数组里继续找
			jQuery.each(window.Scripts, function(index, url) {
				if (pathUrl == url) {
					isLoaded = true;
					return;
				}
			});
		}
		if (isLoaded) {
			return;
		}
		jQuery.ajax({
			url : jsFileUrl,
			type : "GET",
			dataType : "text",
			async : false,
			data : {},
			success : function(data) {
				try {
					head.append("<script type='text/javascript'>" + data + "<\/script>");
					// 放入Scripts数组里
					window.Scripts.push(pathUrl);
				} catch (e) {
					alert("加载javascript异常，" + e);
				}
			},
			error : function() {
				;
			}
		});
	}
};
/**
 * 平台级类别的调用方法
 */
var Tools = {
	/* 取出文件扩展名 */
	getFileSuffix : function(fileName) {
		return fileName.substr(fileName.lastIndexOf('.') + 1).toLowerCase();
	},
	redirect : function(url) {//重定位url
		window.location.href = url;
	},
	/* 判断当前登录页面，如果为手机登录页则跳转 */
	toMbIndex : function () {
		// document.writeln(" 是否为移动终端: "+Browser.versions.mobile);
		// document.writeln(" ios终端: "+Browser.versions.ios);
		// document.writeln(" android终端: "+Browser.versions.android);
		// document.writeln(" 是否为iPhone: "+Browser.versions.iPhone);
		// document.writeln(" 是否iPad: "+Browser.versions.iPad);
		// document.writeln(navigator.userAgent);
		if (Browser.versions().android == true) {
			window.location.href = "index_mb.jsp";
		} else if ((Browser.versions().iPhone == true)) {
			window.location.href = "index_mb.jsp";
		}
	},
	lTrim : function(val) {
		return jQuery.trim(val + "@").substr(0,
				jQuery.trim(val + "@").length - 1);
	},
	rTrim : function(val) {
		return jQuery.trim("@" + val).substr(1,
				jQuery.trim("@" + val).length - 1);
	},
	/*系统字段级变量替换*/
	itemVarReplace : function(str, data) {
		if(!data){
			return str;
		}
		var reg = /#.*?#/g;
		var result = str.match(reg);
		if (result != null) {
			for (i = 0; i < result.length; i++) {// 循环区块
				var item = result[i].substring(1, result[i].length - 1);
				if (data[item]) {
					str = str.replace(result[i], data[item]);
				} else if (data[item] == "") {
					str = str.replace(result[i], "");
				}
				str = str.replace(/(\r)|(\n)/, "");
			}
		}
		return str;
	},
	/*系统级变量替换*/
	systemVarReplace : function(str) {
		str = str.replace(/@USER_CODE@/g, System.getVar("@USER_CODE@"))
				.replace(/@USER_NAME@/g, System.getVar("@USER_NAME@"))
				.replace(/@LOGIN_NAME@/g, System.getVar("@LOGIN_NAME@"))
				.replace(/@USER_POST@/g, System.getVar("@USER_POST@"))
				.replace(/@USER_SEX@/g, System.getVar("@USER_SEX@"))
				.replace(/@USER_IMG@/g, System.getVar("@USER_IMG@"))
				.replace(/@USER_IMG_SRC@/g, System.getVar("@USER_IMG_SRC@"))
				.replace(/@CMPY_CODE@/g, System.getVar("@CMPY_CODE@"))
				.replace(/@CMPY_NAME@/g, System.getVar("@CMPY_NAME@"))
				.replace(/@CMPY_FULLNAME@/g, System.getVar("@CMPY_FULLNAME@"))
				.replace(/@DEPT_CODE@/g, System.getVar("@DEPT_CODE@"))
				.replace(/@DEPT_NAME@/g, System.getVar("@DEPT_NAME@"))
				.replace(/@ODEPT_SRC_TYPE1@/g, System.getVar("@ODEPT_SRC_TYPE1@"))
				.replace(/@ODEPT_SRC_TYPE2@/g, System.getVar("@ODEPT_SRC_TYPE2@"))
				.replace(/@TDEPT_CODE@/g, System.getVar("@TDEPT_CODE@"))
				.replace(/@TDEPT_NAME@/g, System.getVar("@TDEPT_NAME@"))
				.replace(/@TDEPT_SRC_TYPE1@/g, System.getVar("@TDEPT_SRC_TYPE1@"))
				.replace(/@TDEPT_SRC_TYPE2@/g, System.getVar("@TDEPT_SRC_TYPE2@"))
				.replace(/@OFFICE_PHONE@/g, System.getVar("@OFFICE_PHONE@"))
				.replace(/@USER_MOBILE@/g, System.getVar("@USER_MOBILE@"))
				.replace(/@USER_EMAIL@/g, System.getVar("@USER_EMAIL@"))
				.replace(/@ROLE_CODES@/g, System.getVar("@ROLE_CODES@"))
				.replace(/@DEPT_CODES@/g, System.getVar("@DEPT_CODES@"))
				.replace(/@ODEPT_CODE@/g, System.getVar("@ODEPT_CODE@"))
				.replace(/@ODEPT_NAME@/g, System.getVar("@ODEPT_NAME@"))
				.replace(/@ODEPT_SRC_TYPE1@/g, System.getVar("@ODEPT_SRC_TYPE1@"))
				.replace(/@ODEPT_SRC_TYPE2@/g, System.getVar("@ODEPT_SRC_TYPE2@"))
				.replace(/@ODEPT_CODE_PATH@/g, System.getVar("@ODEPT_CODE_PATH@"))
				.replace(/@ODEPT_PCODE@/g, System.getVar("@ODEPT_PCODE@"))
				.replace(/@ODEPT_LEVEL@/g, System.getVar("@ODEPT_LEVEL@"))
				.replace(/@SUB_CODES@/g, System.getVar("@SUB_CODES@"))
				.replace(/@JIAN_CODES@/g, System.getVar("@JIAN_CODES@"))
				.replace(/@urlPath@/g, System.getVar("@urlPath@"))
				.replace(/@AGT_FLAG@/g, System.getVar("@AGT_FLAG@"));
		return str;
	},
	/*父层级级变量替换*/
	parVarReplace : function(str) {
		if (str) {
			var reg = /@.*?@/g;
			var data = System.getParParams();

			var result = str.match(reg);
			if (result != null) {
				for (i = 0; i < result.length; i++) {// 循环区块
					var item = result[i];
					if (data[item]) {
						str = str.replace(result[i], data[item]).replace(/\^/g,
								"'");
					} else {
						str = str.replace(/\^/g, "'");
					}
				}
			}

			return str;
		} else {
			return "";
		}
	},
	/*根据个性化的数据，设置背景的方法*/
	rhSetBodyBack : function () {
	try{
		if (parent.GLOBAL.style.SS_STYLE_BACK) {// 背景图片
			jQuery(".bodyBack").addClass(parent.GLOBAL.style.SS_STYLE_BACK);
		} else {
			jQuery(".bodyBack").addClass("bodyBack-white");
		}
		} catch (e) {}
	},
	/*xdoc的url特殊处理替换*/
	xdocUrlReplace : function (url) {
		if (url && url.indexOf("@HTTP") >= 0) { // 判断是否需要变量替换
			var httpUrl = FireFly.getHttpHost();
			url = url.replace(/@HTTP_URL@/i, httpUrl);
			url = url.replace(/@HTTP_URL_ENCODE@/i, encodeURIComponent(httpUrl));
			if (url.indexOf("@XDOC_URL@") >= 0) {
				var xdocUrl = System.getVar("@XDOC_URL@");// 获取xdoc_url
				url = url.replace(/@XDOC_URL@/i, xdocUrl);
				var extUrl = "&USER_NAME="
						+ encodeURIComponent(System.getVar("@USER_NAME@"))
						+ "&CMPY_NAME="
						+ encodeURIComponent(System.getVar("@CMPY_NAME@"))
						+ "&CMPY_FULLNAME="
						+ encodeURIComponent(System.getVar("@CMPY_FULLNAME@"))
						+ "&DEPT_NAME="
						+ encodeURIComponent(System.getVar("@DEPT_NAME@"))
						+ "&TDEPT_NAME="
						+ encodeURIComponent(System.getVar("@TDEPT_NAME@"))
						+ "&LOGO_URL="
						+ encodeURIComponent(System.getVar("@LOGO_URL@"))
						+ "&ODEPT_NAME="
						+ encodeURIComponent(System.getVar("@ODEPT_NAME@"))
						+ "&HTTP_URL=" + encodeURIComponent(httpUrl);
				url += extUrl;
			}
		} else {
			url = this.systemVarReplace(url);
		}
                           alert(url);
		return url;
	},
	/*  替换菜单的info中的字符变量为id可用的字符等 */
	rhReplaceId : function (url) {
		if (url) {
			url = url.replace(/\./g, "-").replace(/&/g, "").replace(/=/g, "").replace(/\$/g, "").replace(/\#/g, "").replace(/\:/g, "")
					.replace(/\?/g, "").replace(/\//g, "").replace(/\:/g, "").replace(/\,/g, "").replace(/\;/g, "").replace(/\</g, "")
					.replace(/\@/g, "").replace(/\^/g, "").replace(/\{/g, "").replace(/\}/g, "").replace(/\%/g, "").replace(/\'/g, "")
					.replace(/\>/g, "").replace(/\//g, "").replace(/\[/g, "").replace(/\]/g, "").replace(/\"/g, "").replace(/\ /g, "")
					.replace(/\(/g, "").replace(/\)/g, "");
		}
		return url;
	},
	/* html格式字符替换 */
	rhReplaceHtmlTag : function (value) {
	    value = value.replace(/\</gi, "&lt;").replace(/\</gi, "&gt;");
		return value;
	},
	/**
	 * 根据字典编号返回对应的叶子节点class
	 */
	getTreeLeafClass : function (dictId) {
		// 特殊字典的图标替换
		var res = "";
		if ((dictId == "SY_ORG_DEPT_USER") || (dictId == "SY_ORG_ROLE_USER")) {// 用户树
			res = "user";
		} else if ((dictId == "SY_ORG_DEPT") || (dictId == "SY_ORG_DEPT_IN_ORG")) {// 部门
			res = "org";
		} else if (dictId == "SY_ORG_ROLE") {// 角色
			res = "role";
		} else if (dictId == "SY_ORG_CMPY") {// 公司
			res = "cmpy";
		}
		return res;
	},
	/**
	 * @actResult 检测办理结果的值，如果返回值为“_MSG_=ERROR,”，则返回false，否则返回true。
	 */
	actIsSuccessed : function (actResult){
		try{
			var resultObj = {};
            if (typeof actResult === "string") {//判断返回数据类型
            	resultObj = jQuery.parseJSON(actResult);
            } else if(typeof actResult === "object"){
            	resultObj = actResult;
            }
            
        	if (resultObj[UIConst.RTN_MSG]) { //存在返回值
        		var rtnMsg = resultObj[UIConst.RTN_MSG];
        		if(StringUtils.startWith(rtnMsg, "ERROR,")){ //返回值为ERROR
        			return false;
        		}
        	}else{ //不存在返回值
        		return false;
        	}
		}catch(e){
			return false;
		}
		return true;
	} 
};
/**
 * rh封装的判断浏览器类别
 * 如：Browser.versions.iPad
 */
var Browser = {
	systems : function() {
		var u = navigator.userAgent;
		return {
			windows : u.indexOf("Windows NT") > -1, // Windows
			mac : u.indexOf("mac") > -1, // Mac
			linux : u.indexOf("Linux") > -1, // Linux
			unix : u.indexOf("X11") > -1 // Unix
		}
	},
	versions : function() {
		var u = navigator.userAgent, app = navigator.appVersion;
		return {
			trident : u.indexOf('Trident') > -1, // IE内核
			presto : u.indexOf('Presto') > -1, // opera内核
			webKit : u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
			gecko : u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, // 火狐内核
			mobile : !!u.match(/AppleWebKit.*Mobile.*/)
					|| !!u.match(/AppleWebKit/), // 是否为移动终端
			ios : !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
			android : u.indexOf('Android') > -1,// || u.indexOf('Linux') > -1, // android终端或者uc浏览器
			iPhone : u.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器 || u.indexOf('Mac') > -1
			iPad : u.indexOf('iPad') > -1, // 是否iPad
			webApp : u.indexOf('Safari') == -1
		};
	},
	ignoreButton : function(n) { // 是否忽略按钮
		if (n.ACT_MOBILE_FLAG == UIConst.STR_NO) { // 明确指定为非移动版按钮则忽略掉
			if (this.isMobileOS()) {
				return true;
			}
		}
		return false;
	},
	supportNTKO : function() { // windows平台IE内核支持NTKO
		return this.systems().windows && this.versions().trident;
	},
	isMobileOS : function() { // 是否移动操作系统
		return this.versions().ios || this.versions().android;
	}
};
/**
 * 计时器,辅助调试时查看执行时间。调用如：
 * 	var stopWatch = new Stopwatch();
 * 	stopWatch.start();
 *  //执行代码
 * 	stopWatch.time() + "毫秒"
 */
function Stopwatch() {
	// Private vars
	var startAt = 0; // Time of last start / resume. (0 if not running)
	var lapTime = 0; // Time on the clock when last stopped in milliseconds

	var now = function() {
		return (new Date()).getTime();
	};
	// 启动计时器，或者继续计时
	this.start = function() {
		startAt = now();
		return lapTime;
	};
	// 停止或暂停计时
	this.stop = function() {
		lapTime = startAt ? lapTime + now() - startAt : 0;
		startAt = 0; // 暂停

		return lapTime;
	};
	// 耗时
	this.time = function() {
		return lapTime + (startAt ? now() - startAt : 0);
	};
}; 
/**
 * 判断列表页中是否存在“S_HAS_PS_MIND”列，如果存在列并有值，则展示“对钩”的小图片。当鼠标放到小图片上后，显示领导意见。
 */
var RHWF = {
	showLeaderMind : function(grid) {
		var colDef = grid.getColumnDef("S_HAS_PS_MIND");
		//如果字段不存在则返回
		if(!colDef){
			return;
		}
		var winDlg = new rh.vi.HoverDlg();
		jQuery("td[icode='S_HAS_PS_MIND']", grid.getTable())
				.each(function() {
							var psMind = jQuery(this).text();
							if (psMind != "" && psMind != undefined) {
								jQuery(this).text("");
								jQuery("<img src='" + FireFly.getContextPath() + "/sy/theme/default/images/icons/ok.png'/>").appendTo(jQuery(this));
								jQuery(this).find("img").hover(function(e) {
													winDlg.removeContent();
													winDlg.show(e);
													var rowId = grid.getRowPkByElement(jQuery(this));
													var data = {
														"SERV_ID" : grid.getRowItemValue(rowId,"SERV_ID"),
														"DATA_ID" : grid.getRowItemValue(rowId,"DATA_ID")};
													var content = jQuery(this).attr("leaderMind");
													if (!content) {
														var resultVal = FireFly.doAct("SY_COMM_MIND","leaderMind",data);
														content = getLeaderMind(resultVal);
														jQuery(this).attr("leaderMind",content);
													}
													winDlg.container.append(content);
												}, function() {
													winDlg.hide();
												});
							}
						});
		function getLeaderMind(datas) {
			var vals = new Array();
			for ( var i = 0; i < datas["_DATA_"].length; i++) {
				vals.push("<div class='mt10' style='overflow:hidden;border-bottom: 1px dashed #CCC'>");
				vals.push("<div style='margin-left:5px;float:left;width:29%'>");
				vals.push(datas["_DATA_"][i]["S_UNAME"] + "：");
				vals.push("</div>");
				vals.push("<div style='float:left;width:67%;'>");
				vals.push(datas["_DATA_"][i]["MIND_CONTENT"]);
				vals.push("</div>");
				vals.push("</div>");
			}
			return vals.join("");
		}
	},
	/**
	 * 处理列表（平台或自定义table）数据中工作流活动节点用户状态字段S_WF_USER_STATE的值（本人的行增加属性变色、已看过的数据变色）
	 * 格式如：[{"D":"稽核部总经理","U":"c180c0c718f36e8e0118f36ec6f100bc","N":"周有扣","O":"N"}] 节点名、用户id、用户name、是否办结
	 * userStateCells 整个列所有td的jQuery对象
	 * tableObj table的jQuery对象
	 * colCode 取消排序的列字段
	 * 目前分为td版和span版两种
	 */
	loadWfUserState : function(userStateCells, tableObj, colCode) {
		//版本标识
		var version = true; //true:td版,false:span版
		
		//取消办理用户字段排序事件
		if(colCode){
			tableObj.find("th[icode='" + colCode + "']").unbind("click");
		}
		//遍历所有单元构造状态html
		userStateCells.each(function() {
			var cellObj = jQuery(this);
			//默认取平台grid的隐藏有数据td（自定义的也要是这种结构）
			var stateObj = jQuery(this).parent().find("td[icode='S_WF_STATE']");//办结状态对象，1未办结2已办结
			//已办结
			if (stateObj && stateObj.text() == "2") {
				cellObj.html("<span>已办结</span>");
			//未办结
			} else {
				var val = cellObj.text();
				//有值
				if (val.length > 0) {
					cellObj.text("");//置空
					var userStateList = StrToJson(val);//转换json字符串为对象
					//多个办理用户
					if(userStateList.length > 1){
						var multiObj = jQuery("" +
								"<span clsss='vm fblue' style='text-align:center;display:inline-block;'>并发中</span>" +
								"<span class='vm multi_span' " +
								"style=\"text-align:center;" +
								"display:inline-block;" +
								"width:16px;" +
								"height:16px;" +
								"background: url('/sy/theme/default/images/icons/card.png') no-repeat 0px 0px;\">" +
								"</span>")
						multiObj.addClass("fblue").appendTo(cellObj);
						var eventCon = version ? multiObj.parent() : multiObj;
						eventCon.bind("click", function(event) {
							var allHtmlDiv = jQuery("<div></div>");
							//遍历所有用户的状态对象
							for ( var i = 0; i < userStateList.length; i++) {
								var userStateObj = userStateList[i];
								var htmlVal = "";
								htmlVal = "<SPAN class='WF-USER-STATE-" + userStateObj.O + "' userCode='" + userStateObj.U + "'>";
								if(userStateObj.D){
									htmlVal = htmlVal + userStateObj.D;
								}
								htmlVal = htmlVal + "(" + userStateObj.N + ")";
								htmlVal = htmlVal + "</SPAN>";
								jQuery(htmlVal).appendTo(allHtmlDiv).bind("click", function(event) {
									//取得UserCode
									var userCode = jQuery(this).attr("userCode");
									if(userCode && userCode.length > 0){
										new rh.vi.userInfo(event, userCode);
									}
								});
							}
							new rh.vi.userInfo(event, "" ,{"width":180,"height":220,"html":allHtmlDiv});
						});
					//单个办理用户
					} else {
						var userStateObj = userStateList[0];
						if(userStateObj.U == System.getVars()["@USER_CODE@"]){
							cellObj.parent().addClass("WF-USER-ACTIVE");
						}
						var htmlVal = "";
						if(version){ //td版
							cellObj.addClass("td-WF-USER-STATE-" + userStateObj.O);
							cellObj.attr("userCode",userStateObj.U);
							if(userStateObj.D){
								htmlVal = htmlVal + userStateObj.D;
							}
							htmlVal = htmlVal + "(" + userStateObj.N + ")";
							cellObj.text(htmlVal);
							var eventCon = cellObj;
						}else{ //span版
							htmlVal = "<SPAN class='WF-USER-STATE-" + userStateObj.O + "' userCode='" + userStateObj.U + "'>";
							if(userStateObj.D){
								htmlVal = htmlVal + userStateObj.D;
							}
							htmlVal = htmlVal + "(" + userStateObj.N + ")";
							htmlVal = htmlVal + "</SPAN>";
							var eventCon = jQuery(htmlVal).appendTo(cellObj);
						}	
						//绑定弹出用户信息
						eventCon.bind("click", function(event) {
							//取得UserCode
							var userCode = jQuery(this).attr("userCode");
							if(userCode && userCode.length > 0){
								new rh.vi.userInfo(event, userCode);
							}
						});
					}
				//空值
				} else {
					jQuery("无").appendTo(cellObj);
				}
			}
			
		});	
	},
	/**
	 * 处理超时时间
	 * 列表jQuery句柄
	 */
	highLightOverTime: function(listHandler) {
		var dataList = listHandler._listData._DATA_;	
		jQuery(dataList).each(function(i) {
			var data = dataList[i];
			var overTimeStr = data["TODO_OVERTIME_S"];
			if(overTimeStr.indexOf("超时") >= 0){
				jQuery("tr[id='" + data._PK_ + "']").find("td[icode='TODO_OVERTIME_S']").css({"color":"red"});
			}
		});	
	},	
	/**
	 * 图片化紧急字段
	 * fieldName 原始字段名
	 * className 样式类名
	 * isDict 是否启用数据字典
	 */
	figuredEmergency: function(codeObj, isDict){
		var nameObj = codeObj;
		if(isDict){
			codeObj = codeObj.parent().find("td[icode='S_EMERGENCY']");
		}
		var value = codeObj.text();
		if(value <= 10){
			nameObj.text("");
		} else if(value <= 20) {
			nameObj.text("");
			var imgO = jQuery("<span class='vm span_emergency'></span>");
			imgO.addClass("comm_emergency__normal");
			imgO.appendTo(nameObj);
		} else {
			nameObj.text("");
			var imgO = jQuery("<span class='vm span_emergency'></span>");
			imgO.addClass("comm_emergency__very");
			imgO.appendTo(nameObj);
		}
	}	
};
/**
 * 字符串处理相关通用方法
 */
var StringUtils = {
		/**字符串对象增加方法：是否以指定字符串结束**/
		"endWith" : function(srcStr,str){
			if(str==null || str=="" || srcStr==null || srcStr.length==0 || str.length>srcStr.length) 
			  return false; 
			if(srcStr.substring(srcStr.length-str.length)==str) 
			  return true; 
			else 
			  return false; 
		} ,
		/**字符串对象增加方法：是否以指定字符串开始**/
		"startWith" : function(srcStr,str){
			if(str==null||str=="" || srcStr==null || srcStr.length==0||str.length>srcStr.length) 
			  return false; 
			if(srcStr.substr(0,str.length)==str) 
			  return true; 
			else 
			  return false; 
		},
		/**字符串对象增加方法：获取随机数**/
	    "randomNum" : function() {
			var randomnumber = Math.floor(Math.random() * 10000);
			return randomnumber;
		},
		/**
		 * 扩展string方法，增加format方法，
		 * alert("各种{1}啊{0}木{0}".format("有", "拼串"));
		 */
		"format" : function () { 
			var arr = arguments; 
			try { 
				return this.replace(/\{(\d+)\}/g, function (x, i) { return arr[i]; }); 
			} catch (e) { 
				return this; 
			} 
		}
};

/**
 * 类似于Java中的HashMap的用法
 */
function Map(){
    this.keys = new Array();
    this.data = new Object();
    var toString = Object.prototype.toString;
    /**
     * 当前Map当前长度
     */
    this.size = function(){
        return this.keys.length;
    }
     
    /**
     * 添加值
     * @param {Object} key
     * @param {Object} value
     */
    this.put = function(key, value){
        if(this.data[key] == null){
            this.data[key] = value;
        }
        this.keys.push(key);
    }
    /**
     * 根据当前key获取value
     * @param {Object} key
     */
    this.get = function(key){
        return this.data[key];
    }
    /**
     * 根据当前key移除Map对应值
     * @param {Object} key
     */
    this.remove = function(key){
        var index = this.indexOf(key);
        if(index != -1){
            this.keys.splice(index, 1);
        }
        this.data[key] = null;
    }
    /**
     * 清空Map
     */
    this.clear = function(){
        for(var i=0, len = this.size(); i < len; i++){
            var key = this.keys[i];
            this.data[key] = null;
        }
        this.keys.length = 0;
    }
    /**
     * 当前key是否存在
     * @param {Object} key
     */
    this.containsKey = function(key){
        return this.data[key] != null;
    }
    /**
     * 是否为空
     */
    this.isEmpty = function(){
        return this.keys.length === 0;
    }
    /**
     * 类型Java中Map.entrySet
     */
    this.entrySet = function(){
        var size = this.size();
        var datas = new Array(size);
        for (var i = 0, len = size; i < len; i++) {
            var key = this.keys[i];
            var value = this.data[key];
            datas[i] = {
                'key' : key,
                'value':value  
            }
        }
        return datas;
    }
    /**
     * 遍历当前Map
     * var map = new Map();
     * map.put('key', 'value');
     * map.each(function(index, key, value){
     *      console.log("index:" + index + "--key:" + key + "--value:" + value)
     * })
     * @param {Object} fn
     */
    this.each = function(fn){
        if(toString.call(fn) === '[object Function]'){
            for (var i = 0, len = this.size(); i < len; i++) {
                var key = this.keys[i];
                fn(i, key, this.data[key]);
            }
        }
        return null;
    }
    /**
     * 获取Map中 当前key 索引值
     * @param {Object} key
     */
    this.indexOf = function(key){
        var size = this.size();
        if(size > 0){
            for(var i=0, len=size; i < len; i++){
                if(this.keys[i] == key)
                return i;
            }
        }
        return -1;
    }
    /**
     * Override toString
     */
    this.toString = function(){
        var str = "{";
        for (var i = 0, len = this.size(); i < len; i++, str+=",") {
            var key = this.keys[i];
            var value = this.data[key];
            str += key + "=" + value;
        }
        str = str.substring(0, str.length-1);
        str += "}";
        return str;
    }
    /**
     * 获取Map中的所有value值(Array)
     */
    this.values = function(){
        var size = this.size();
        var values = new Array();
        for(var i = 0; i < size; i++){
            var key = this.keys[i];
            values.push(this.data[key]);
        }
        return values;
    }
}
/**
 * 封装的代理、委托操作方法
 */
var Agent = {
	/**
	 * 判断是否处于委托他人办理业务状态
	 * @return
	 */
	checkAgentStatus: function(){
		var agtFlag = System.getUser("AGT_FLAG");
		if (agtFlag == 2) {
			return false;
		}else{
			return true;
		}
	},
	/**
	 * 判断是否处于代他人办理业务状态
	 * @return
	 */
	checkSubStatus: function(){
		var subFlag = System.getUser("SUB_CODES");
		if (subFlag == "''") {
			return false;
		}else{
			return true;
		}
	},
	/**
	 * 后台清理计算状态
	 * @return
	 */
	computeAgtStatus: function(loginFlag){
		var param = {
			"action":"computeAgtStatus",
			"loginFlag": loginFlag
		};
		var res = FireFly.doAct("SY_ORG_USER_TYPE_AGENT", "doAgentAction", param, false, false);
		if(res[UIConst.RTN_MSG].indexOf(UIConst.RTN_OK) >= 0){
			if (res["_DATA_"].length > 0){
				return true;
			}		
		}
		return false;
	}
};

/**
*提供2个方法： 
*1，str2hex方法把字符串转换成16进制字符串。例如:把“中国”转换成“e4b8ade59bbd”
*2，hex2str方法把16进制字符串转换成字符串。例如:把“e4b8ade59bbd”转换成“中国”
**/
var Hex = {
	"encode" : function(s) {
	  var i, l, o = "", n;
	  s += "";
	  s = this._utf8_encode(s);
	  for (i = 0, l = s.length; i < l; i++) {
		n = s.charCodeAt(i).toString(16)
		o += n.length < 2 ? "0" + n : n;
	  }
	  return o;
	},
	"decode": function(hex){
		var bytes = [], str;
		try{
			for(var i=0; i< hex.length-1; i+=2){
				bytes.push(parseInt(hex.substr(i, 2), 16));
			}
		}catch(e){
			bytes = [];
		}
		var result = String.fromCharCode.apply(String, bytes);
		return this._utf8_decode(result);    
	},
	// 把字符串转成UTF-8编码
	_utf8_encode : function (string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";
		for (var n = 0; n < string.length; n++) {
			var c = string.charCodeAt(n);
			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
		}
		return utftext;
	},
	//把UTF-8编码字符串转成本地字符
	_utf8_decode : function (utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;
		while ( i < utftext.length ) {
			c = utftext.charCodeAt(i);
			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			}
			else if((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i+1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			}
			else {
				c2 = utftext.charCodeAt(i+1);
				c3 = utftext.charCodeAt(i+2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}
		}
		return string;
	}
};

/*
 * Date Format 1.2.3
 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
 * MIT license
 *
 * Includes enhancements by Scott Trenda <scott.trenda.net>
 * and Kris Kowal <cixar.com/~kris.kowal/>
 *
 * Accepts a date, a mask, or a date and a mask.
 * Returns a formatted version of the given date.
 * The date defaults to the current date/time.
 * The mask defaults to dateFormat.masks.default.
 */

var dateFormat = function () {
	var	token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
		timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
		timezoneClip = /[^-+\dA-Z]/g,
		pad = function (val, len) {
			val = String(val);
			len = len || 2;
			while (val.length < len) val = "0" + val;
			return val;
		};

	// Regexes and supporting functions are cached through closure
	return function (date, mask, utc) {
		var dF = dateFormat;

		// You can't provide utc if you skip other args (use the "UTC:" mask prefix)
		if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
			mask = date;
			date = undefined;
		}

		// Passing date through Date applies Date.parse, if necessary
		date = date ? new Date(date) : new Date;
		if (isNaN(date)) throw SyntaxError("invalid date");

		mask = String(dF.masks[mask] || mask || dF.masks["default"]);

		// Allow setting the utc argument via the mask
		if (mask.slice(0, 4) == "UTC:") {
			mask = mask.slice(4);
			utc = true;
		}

		var	_ = utc ? "getUTC" : "get",
			d = date[_ + "Date"](),
			D = date[_ + "Day"](),
			m = date[_ + "Month"](),
			y = date[_ + "FullYear"](),
			H = date[_ + "Hours"](),
			M = date[_ + "Minutes"](),
			s = date[_ + "Seconds"](),
			L = date[_ + "Milliseconds"](),
			o = utc ? 0 : date.getTimezoneOffset(),
			flags = {
				d:    d,
				dd:   pad(d),
				ddd:  dF.i18n.dayNames[D],
				dddd: dF.i18n.dayNames[D + 7],
				m:    m + 1,
				mm:   pad(m + 1),
				mmm:  dF.i18n.monthNames[m],
				mmmm: dF.i18n.monthNames[m + 12],
				yy:   String(y).slice(2),
				yyyy: y,
				h:    H % 12 || 12,
				hh:   pad(H % 12 || 12),
				H:    H,
				HH:   pad(H),
				M:    M,
				MM:   pad(M),
				s:    s,
				ss:   pad(s),
				l:    pad(L, 3),
				L:    pad(L > 99 ? Math.round(L / 10) : L),
				t:    H < 12 ? "a"  : "p",
				tt:   H < 12 ? "am" : "pm",
				T:    H < 12 ? "A"  : "P",
				TT:   H < 12 ? "AM" : "PM",
				Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
				o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
				S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
			};

		return mask.replace(token, function ($0) {
			return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
		});
	};
}();

// Some common format strings
dateFormat.masks = {
	"default":      "ddd mmm dd yyyy HH:MM:ss",
	rhDateTime:		"yyyy-mm-dd HH:MM:ss",
	shortDate:      "m/d/yy",
	mediumDate:     "mmm d, yyyy",
	longDate:       "mmmm d, yyyy",
	fullDate:       "dddd, mmmm d, yyyy",
	shortTime:      "h:MM TT",
	mediumTime:     "h:MM:ss TT",
	longTime:       "h:MM:ss TT Z",
	isoDate:        "yyyy-mm-dd",
	isoTime:        "HH:MM:ss",
	isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
	isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
	dayNames: [
		"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
		"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
	],
	monthNames: [
		"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
		"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
	]
};

// For convenience...
Date.prototype.format = function (mask, utc) {
	return dateFormat(this, mask, utc);
};

/**
 * URL 助手
 */
var UrlHelper={
	//获取URL中的参数 
	getQueryString : function(url, name) {
		  var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i");
		  return reg.test(url) ? unescape(RegExp.$2.replace(/\+/g, " ")) : ""
	}
};

/**
 * 文件 助手
 */
var FileHelper={
	//获取URL中的参数 
	download : function(url,filename,isNeedProgressBar) {
		this.url = url;
		this.filename = filename;
		//请求文件系统
    	window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
    	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
    		
    		var rootDirEntry = fileSystem.root;
    		rootDirEntry.getDirectory(
    				"scoa",
    				{create:true, exclusive:false},
    				function(dirEntry){
    					var dstn = dirEntry.fullPath;
    					getFile(dstn,url,filename,isNeedProgressBar);
    		},errorHandler.blank);
    	}, errorHandler.blank);
	}
}
/**
 * 更新app
 * @param dstn 目标文件夹
 */
function getFile(dstn,url,targetname,isNeedProgressBar){
	 var fileTransfer = new FileTransfer();
	 var filename = targetname;
	 if(StringUtils.endWith(filename,"djvu")){
		filename = filename.slice(0,filename.length-4) + "pdf"; 
	 }
	 var srcUri = encodeURI(url);
	 var target = dstn +"/"+ filename;
	 $.mobile.loading( "show", {
           text: "下载中……",
           textVisible: true,
           textonly: false 
     });
	 if(isNeedProgressBar) {
		 //下载进度
		 fileTransfer.onprogress = function(progressEvent){
			 if (progressEvent.lengthComputable && isNeedProgressBar) {
				 var percentLoaded = Math.round(100 * (progressEvent.loaded / progressEvent.total));  
				 $.mobile.pageContainer.find(".ui-loader>h1").html(parseInt(percentLoaded/2,10) +"%");
			 }
		 } 
	 }
	 
	 //下载
	 fileTransfer.download(
		srcUri,
	    target,
	    function(entry) {
	        //下载成功后打开
			window.plugins.fileOpener.open(target);
	        $.mobile.loading( "hide");
	    },
	    function(error) {
	    	fileTransferErrorHandler(error);
	    	$.mobile.loading( "hide");
	    },
	    false 
	);

}
var errorHandler = {
		connect : function(){
			navigator.notification.alert("连接服务器失败，请检查网络！",function(){
				navigator.app.exitApp();
			},"提示", "确定");
		},
		reqFs : function(){
			navigator.notification.alert("加载文件系统出现错误!",null,"提示", "确定");
		},
		blank : function(){
			
		}
}
function errorHandler1(e) {
	  var msg = '';
	  switch (e.code) {
	    case FileError.QUOTA_EXCEEDED_ERR:
	      msg = 'QUOTA_EXCEEDED_ERR';
	      break;
	    case FileError.NOT_FOUND_ERR:
	      msg = 'NOT_FOUND_ERR';
	      break;
	    case FileError.SECURITY_ERR:
	      msg = 'SECURITY_ERR';
	      break;
	    case FileError.INVALID_MODIFICATION_ERR:
	      msg = 'INVALID_MODIFICATION_ERR';
	      break;
	    case FileError.INVALID_STATE_ERR:
	      msg = 'INVALID_STATE_ERR';
	      break;
	    default:
	      msg = 'Unknown Error';
	      break;
	  };
}

function fileTransferErrorHandler(e){
	switch (e.code) {
	    case FileTransferError.FILE_NOT_FOUND_ERR:
	      msg = '文件不存在!';
	      break;
	    case FileTransferError.INVALID_URL_ERR:
	      msg = '文件链接错误！';
	      break;
	    case FileTransferError.CONNECTION_ERR:
	      msg = '连接文件服务器失败,请稍后重试！';
	      break;
	    case FileTransferError.ABORT_ERR:
	      msg = 'INVALID_MODIFICATION_ERR';
	      break;
	    default:
	      msg = '未知错误!';
	      break;
	  };
	  navigator.notification.alert(msg,null,"错误提示", "确定"); 
}


