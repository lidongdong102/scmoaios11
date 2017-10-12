/****************************************
data:[{
id:1, //ID只能包含英文数字下划线中划线
text:"node 1",
value:"1",
showcheck:false,
checkstate:0,         //0,1,2
hasChildren:true,
isexpand:false,
complete:false, 是否已加载子节点
CHILD:[] // child nodes
},
..........
]
author:xuanye.wan@gmail.com
***************************************/
(function($) {
	
    //实例化并渲染树
    $.fn.treeview = function(settings) {    	
    	/**初始化默认参数*/
        var dfop = {
			method: "POST", //默认采用POST提交数据
			datatype: "json", //数据类型是json
			url: false, //异步请求的url
			cbiconpath: "images/icons/", //checkbox icon的目录位置
			icons: ["checkbox_false_full", "checkbox_true_full", "checkbox_true_part"],
			emptyiconpath: "images/s.gif", //checkBox三态的图片
			showcheck: false, //是否显示checkBox
			oncheckboxclick: false, //当checkstate状态变化时所触发的事件，但是不会触发因级联选择而引起的变化
			onnodeclick: false, // 触发节点单击事件
			rhBeforeOnNodeClick:false,//节点点击添加样式之前执行事件 
			onnodedblclick: false, // 触发节点双击单击事件
			cascadecheck: false, //是否启用级联，默认启用
			checkParent: false, // 是否启用反向级联，选中子的时候选中所有的父级节点
			data: null, //初始化数据
			clicktoggle: true, //点击节点展开和收缩子节点
			theme: "bbit-tree-arrows", //三种风格备选：bbit-tree-lines ,bbit-tree-no-lines,bbit-tree-arrows
			rhcomplete: true, //非组件本身属性，后修改增加，用于全局参数
			rhexpand: false, //非组件本身属性，后修改增加，用于全局参数
			expandLevel: 1, // 指定展开到第几级，从1开始，默认展开第1级
			rhItemCode:"",
			root_no_check:false, // 指定根不用显示checkbox
			childOnly:false,
            rhLeafIcon:"",//自定义的叶子节点图标，供选择的：user
            afterExpand:function(){/*alert(JsonToStr(this));*/},// 父节点被展开的事件，this为被点击的节点数据对象
            afterCollapsed:function(){/*alert(JsonToStr(this));*/},// 父节点被折叠的事件，this为被点击的节点数据对象
        	rhTreeHandler: settings.rhTreeHandler || {} //rhDictTreeView实例传递的句柄  
		};        
        /**合并传入参数*/
        $.extend(dfop, settings); //用传进来的参数覆盖默认，没传则保留        
        /**初始化叶子样式的css标识*/
        var rhDefLeafIcon = "bbit-tree-node-icon";//默认叶子节点样式
        if (dfop.rhLeafIcon.length > 0) {//覆盖的叶子图标
        	rhDefLeafIcon = rhDefLeafIcon + " " + rhDefLeafIcon;
        	rhDefLeafIcon = rhDefLeafIcon + "-" + dfop.rhLeafIcon;
        }       
        /**获取数据，内部引用*/
        var treenodes = dfop.data;        
        /**jQuery封装本实例，为每棵树生成全局唯一ID*/
        var me = $(this);
        var id = me.attr("id");
        if (id == null || id == "") {
            id = "bbtree" + (+new Date);
            me.attr("id", id);
        }        
        /**先将构造出的树HTML代码缓存在数组中，最后一次性操作DOM让浏览器绘制到页面，提高性能*/
        var html = [];       
        /**虚拟构造树*/
        buildtree(dfop.data, html);
        /**一次性操作DOM让浏览器绘制到页面*/
        me.addClass("bbit-tree").html(html.join(""));
        /**初始化事件*/
        InitEvent(me);
        /**构造完树后回收缓存垃圾*/
        html = null;
  
        /**
         * 虚拟构造树，先将构造出的树HTML代码缓存在html数组中
         */
        function buildtree(data, ht) {
            ht.push("<div class='bbit-tree-bwrap'>"); // Wrap ; 包装层DIV
            
            ht.push("<div class='bbit-tree-body "); // body ; 树主题外层DIV
            if (dfop.showcheck == true) { // 给主体添加单选或多选标识（目前没有对应css）
            	ht.push("bbit-tree-multi");
            } else {
            	ht.push("bbit-tree-single");
            }
            ht.push("'>"); // body ;
            
            ht.push("<ul class='bbit-tree-root ", dfop.theme, "'>"); //root 根树
            
            if (data && data.length > 0) { //根树有数据则直接递归虚拟构造
                var len = data.length;
                for (var i = 0; i < len; i++) { //将本级的所有子节点依次递归虚拟构造
                	if(i == 0 && dfop.root_no_check) { //判断是否
                		buildnode(data[i], ht, 0, i, i == len - 1, true);
                	} else {
                    	buildnode(data[i], ht, 0, i, i == len - 1);
                	}
                }
            } else { //根树无数据则异步获取再递归虚拟构造
                asnyloadc(null, false, function(data) {
                    if (data && data.length > 0) {
                        treenodes = data;
                        dfop.data = data;
                        var l = data.length;
                        for (var i = 0; i < l; i++) {
                        	if(i == 0 && dfop.root_no_check) {
                        		buildnode(data[i], ht, 0, i, i == l - 1, true);
                        	} else {
                            	buildnode(data[i], ht, 0, i, i == l - 1);
                        	}
                        }
                    }
                });
            }
            //标签收尾
            ht.push("</ul>"); // root and;
            ht.push("</div>"); // body end;
            ht.push("</div>"); // Wrap end;
        }
        
        /**
         * 字符工具函数： 把特殊字符替换成"_"
         */
        function getNID(id) {
        	return id.replace(/[^\w]/gi, "_");
        }
        
        /**
         * 递归虚拟构造
         */
        function buildnode(nd, ht, deep, path, isEnd, no_check) {
        	// 当前节点的处在哪一级，从1开始，用于指定展开哪一级
        	var level = 1;
        	if (path && path != "0") {
        		level = path.toString().split(".").length;
        	}
        	
            var nid = getNID(nd.ID);// 非字母和数字都替换成"_"
            ht.push("<li class='bbit-tree-node'>");
            ht.push("<div id='", id, "_", nid, "' tpath='", path, "' title='", nd.NAME, "'");
            ht.push(" itemid='",nd.ID,"'");// add by liujinkai
            var cs = [];
            cs.push("bbit-tree-node-el");
            if (nd.CHILD) {
            	if(dfop.rhexpand) {// 全部展开
            		cs.push("bbit-tree-node-expanded");
            	} else {
            		if (level <= dfop.expandLevel) { // 指定展开到第几级
            			cs.push("bbit-tree-node-expanded");
            		} else {
                		cs.push(nd.isexpand ? "bbit-tree-node-expanded" : "bbit-tree-node-collapsed");
            		}
            	}
            } else {
            	if(nd.LEAF && nd.LEAF == 1) { // 被显示指定是叶子节点了
            		cs.push("bbit-tree-node-leaf");
            	} else {
                	cs.push("bbit-tree-node-collapsed");
            	}
            }
 
            if (nd.classes) { cs.push(nd.classes); }

            ht.push(" class='", cs.join(" "), "'>");
            cs.length = 0;
            if (nd.CHILD) {
            	if(dfop.rhexpand) {// 全部展开
            		cs.push(isEnd ? "bbit-tree-elbow-end-minus" : "bbit-tree-elbow-minus");
            	} else {
	            	if (nd.isexpand) {
	                    cs.push(isEnd ? "bbit-tree-elbow-end-minus" : "bbit-tree-elbow-minus");
	                } else {
	                	if (level <= dfop.expandLevel) {
	            			cs.push(isEnd ? "bbit-tree-elbow-end-minus" : "bbit-tree-elbow-minus");
	            		} else {
	                    	cs.push(isEnd ? "bbit-tree-elbow-end-plus" : "bbit-tree-elbow-plus");
	                	}
	                }
                }
            } else {
                cs.push(isEnd ? "bbit-tree-elbow-end" : "bbit-tree-elbow");
            }
            ht.push("<span class='bbit-tree-ec-icon ", cs.join(" "), "'/>");
            //checkbox
            if (dfop.showcheck == true && !no_check && (nd.DEPT_TYPE != 2 || !dfop.rhTreeHandler._multiCheckBox)) { //modify by wangchen
            	if(!nd.showcheck) {
            		if (nd.CHILD) {
            			if (dfop.cascadecheck) { // 级联则显示checkbox
            				if (nd.checkstate == null || nd.checkstate == undefined) {
		                   		nd.checkstate = 0;
			                }
			                ht.push("<span  id='", id, "_", nid, "_cb' class='bbit-tree-node-cb ", dfop.icons[nd.checkstate], "'/>");
            			} else {
            				if (!dfop.childOnly) { // 如果只选择叶子节点则不显示checkbox
            					if (nd.checkstate == null || nd.checkstate == undefined) {
			                   		nd.checkstate = 0;
				                }
				                ht.push("<span  id='", id, "_", nid, "_cb' class='bbit-tree-node-cb ", dfop.icons[nd.checkstate], "'/>");
            				}
            			}
            		} else {
            			if (nd.checkstate == null || nd.checkstate == undefined) {
	                   		nd.checkstate = 0;
		                }
		                ht.push("<span  id='", id, "_", nid, "_cb' class='bbit-tree-node-cb ", dfop.icons[nd.checkstate], "'/>");
            		}
            	}
            }
            ht.push("<span class='" + rhDefLeafIcon + "'/>");

            // 添加<a/>标识的href属性
            // ======= 修改开始 ===========
            if (nd.href) {
                ht.push("<a class='bbit-tree-node-anchor' tabIndex='1' href='" + nd.href + "'>");
            } else {
                ht.push("<a class='bbit-tree-node-anchor' tabIndex='1' href='javascript:void(0);'>");
            }
            // =========== 修改结束 ========

            ht.push("<span>", nd.NAME, "</span>");
            ht.push("</a>");
            ht.push("</div>");
            //Child
            if (nd.CHILD) {
                if (dfop.rhexpand) {
                    ht.push("<ul class='bbit-tree-node-ct'  style='z-index: 0; position: static; visibility: visible; top: auto; left: auto;'>");
                    if (nd.CHILD) {
                        var l = nd.CHILD.length;
                        for (var k = 0; k < l; k++) {//递归调用并产生每个节点的路径 
                            nd.CHILD[k].parent = nd;
                            buildnode(nd.CHILD[k], ht, deep + 1, path + "." + k, k == l - 1);
                        }
                    }
                    ht.push("</ul>");
                } else {
                	if(nd.isexpand || level <= dfop.expandLevel) {
                		ht.push("<ul  class='bbit-tree-node-ct'  style='z-index: 0; position: static; visibility: visible; top: auto; left: auto;'>");
	                    if (nd.CHILD) {
	                        var l = nd.CHILD.length;
	                        for (var k = 0; k < l; k++) {
	                            nd.CHILD[k].parent = nd;
	                            buildnode(nd.CHILD[k], ht, deep + 1, path + "." + k, k == l - 1);
	                        }
	                    }
	                    ht.push("</ul>");
	                } else {
                    	if(nd.CHILD.length == 0) { // 没有数据
                    		ht.push("<ul style='display:none;'></ul>");
                    	} else {
		                	// 非异步，默认全部显示到页面上而不是放在内存里
		                	ht.push("<ul  class='bbit-tree-node-ct'  style='display:none;z-index: 0; position: static; visibility: visible; top: auto; left: auto;'>");
	                        var l = nd.CHILD.length;
	                        for (var k = 0; k < l; k++) {
	                            nd.CHILD[k].parent = nd;
	                            buildnode(nd.CHILD[k], ht, deep + 1, path + "." + k, k == l - 1);
	                        }
		                    ht.push("</ul>");
                    	}
	                }
                }
            }
            ht.push("</li>");
            nd.render = true;
        }
        
        /**
         * 获取单个节点信息
         */
        function getItem(path) {
            var ap = path.split(".");
            var t = treenodes;
            for (var i = 0; i < ap.length; i++) {
                if (i == 0) {
                    t = t[ap[i]];
                } else {
                    t = t.CHILD[ap[i]];
                }
            }
            return t;
        }

        /**
         * 事件触发的选择checkBox
         */
        function check(item, state, type) {
            var pstate = item.checkstate;
            if (type == 1) {
                item.checkstate = state;
            } else {// 上溯
                var cs = item.CHILD;
                var l = cs.length;
                var ch = true;
                for (var i = 0; i < l; i++) {// 遍历子节点如果有一个节点没有选中则父节点的状态为2
                    if ((state == 1 && cs[i].checkstate != 1) || state == 0 && cs[i].checkstate != 0) {
                        ch = false;
                        break;
                    }
                }
                if (ch) {
                    item.checkstate = state;
                } else {
                    item.checkstate = 2;
                }
            }
            //change show
            if (item.render && pstate != item.checkstate) {
                var nid = getNID(item.ID);
                var et = $("#" + id + "_" + nid + "_cb");
                if (et.length == 1) {
                    et.removeClass(function(i,claz){
                    	return claz.match(/checkbox_[\w]+_[\w]+/gi)[0];
                    }).addClass(dfop.icons[item.checkstate]);
	                    if (dfop.rhTreeHandler._multiCheckBox) {
	                    	dfop.rhTreeHandler._checkClick(item, item.checkstate);
	                    	var div = $("#" + id + "_" + nid);
	                    	if (item.DEPT_TYPE != 2 || !dfop.childOnly) {
		                    	if (item.checkstate == 0) {
		                    		div.removeClass("bbit-tree-selected");
		                    	} else {
		                    		div.addClass("bbit-tree-selected");
		                    	}
	                    	}
	                    	if (item.LEAF != 1 && item.CHILD.length == 0) {	        
		                		var ul = div.next();
		                		var path = div.attr("tpath");
		                		var deep = path.split(".").length;
			                	asnyloadc(item, true, function(data) {
			                        //item.complete = true;
			                        item.CHILD = data.CHILD;
			                        asnybuildWithHide(data.CHILD, deep, path, ul, item);
			                        cascade(check, item, item.checkstate);
			                    });
	                		}
	                    }
                }
            }
        }

        /**
         * 级联后代
         */
        function cascade(fn, item, args) {
            if (fn(item, args, 1) != false) {
                if (item.CHILD != null && item.CHILD.length > 0) {
                    var cs = item.CHILD;
                    for (var i = 0, len = cs.length; i < len; i++) {
                        cascade(fn, cs[i], args);
                    }
                }
            }
        }

        /**
         * 冒泡祖先
         */
        function bubble(fn, item, args) {
            var p = item.parent;
            while (p) {
                if (fn(p, args, 0) === false) {
                    break;
                }
                p = p.parent;
            }
        }
        
        /**
         * 选中子节点则选中父节点
         */
        function checkParent(fn, item, args) {
            var p = item.parent;
            while (p) {
                if (fn(p, args, 1) === false) {
                    break;
                }
                p = p.parent;
            }
        }
        
        /**
         * 展开有子节点被选中的父节点
         */
        function expandParent(item) {
        	if(item && item.CHILD && item.CHILD.length > 0) {
        		jQuery.each(item.CHILD, function(index, n) {
        			if(n.CHILD && n.CHILD.length > 0) {
						expandParent(n);
					}					
					if(n.checkstate == 1 || (n.CHILD && childIsCheck(n))) {
						var img = jQuery("#" + id + "_" + item.ID.replace(/[^\w]/gi, "_") + " img.bbit-tree-ec-icon");
			            if (img.length > 0 && item.ID != "root" && img.parent().hasClass("bbit-tree-node-collapsed")) {// 该节点没有被展开
			                img.click();
			            }
						return;
					}
				});
        	}
        }
       
        /**
         * 递归函数：检测有没有后代被选中
         */
        function childIsCheck(item) {
        	var bool = false;
        	jQuery.each(item.CHILD, function(index, n) {
        		if(n.checkstate == 1) {
					bool = true;
					return;
				}
				
    			if(n.CHILD && n.CHILD.length > 0) {
    				if(childIsCheck(n)) {
    					bool = true;
    					return;
    				}
				}
			});
			return bool;
        }

        /**
         * 节点单击事件函数
         */
        function nodeclick(e) {
        	var isLeaf = true;
            var path = $(this).attr("tpath");
            var et = e.target || e.srcElement;
            var item = getItem(path);
            isLeaf = (item.LEAF == 1);
            if (et.tagName == "SPAN") { //点击图片：加号、减号、checkBox、文件夹
            	//+加号
                if ($(et).hasClass("bbit-tree-elbow-plus") || $(et).hasClass("bbit-tree-elbow-end-plus")) {
                    var ul = $(this).next(); //"bbit-tree-node-ct"
                    if (ul.hasClass("bbit-tree-node-ct")) {
                        ul.show();
                    } else {
                        var deep = path.split(".").length;
                        if (item.CHILD && item.CHILD.length > 0) {
                            item.CHILD != null && asnybuild(item.CHILD, deep, path, ul, item);
                        } else {
                            $(this).addClass("bbit-tree-node-loading");
                            asnyloadc(item, true, function(data) {
                                item.CHILD = data.CHILD;
                                asnybuild(data.CHILD, deep, path, ul, item);
                            });
                        }
                    }
                    if ($(et).hasClass("bbit-tree-elbow-plus")) {
                        $(et).swapClass("bbit-tree-elbow-plus", "bbit-tree-elbow-minus");
                    } else {
                        $(et).swapClass("bbit-tree-elbow-end-plus", "bbit-tree-elbow-end-minus");
                    }
                    $(this).swapClass("bbit-tree-node-collapsed", "bbit-tree-node-expanded");
                    // 展开之后的事件
                    dfop.afterExpand.call(item);
                //-减号
                } else if ($(et).hasClass("bbit-tree-elbow-minus") || $(et).hasClass("bbit-tree-elbow-end-minus")) {  //- 号需要收缩
                    $(this).next().hide();
                    if ($(et).hasClass("bbit-tree-elbow-minus")) {
                        $(et).swapClass("bbit-tree-elbow-minus", "bbit-tree-elbow-plus");
                    } else {
                        $(et).swapClass("bbit-tree-elbow-end-minus", "bbit-tree-elbow-end-plus");
                    }
                    $(this).swapClass("bbit-tree-node-expanded", "bbit-tree-node-collapsed");
                    dfop.afterCollapsed.call(item);
                } else if ($(et).hasClass("bbit-tree-node-cb")) {// 点击了Checkbox
                	if (dfop.rhTreeHandler._multiCheckBox) {
                		if (!isLeaf && item.CHILD.length == 0) {
	                		var ul = $(this).next();
	                		var deep = path.split(".").length;
		                	asnyloadc(item, true, function(data) {
		                        //item.complete = true;
		                        item.CHILD = data.CHILD;
		                        asnybuildWithHide(data.CHILD, deep, path, ul, item);
		                        selectChkbox(item);
		                    });
                		} else {
                			selectChkbox(item);
                		}
                	} else {
                		selectChkbox(item);
                	}
                } else {//点击文字
                	if ($(this).is(".bbit-tree-node-leaf")) {//如果是叶子节点,则选中或取消选中
                		$(this).trigger("click");
                	} else {//否则，展开或折叠
                		$(this).find(".bbit-tree-ec-icon").trigger("click");
                	}
                }
            } else { //点击非图片：空白处、文字
				if($(et).is("div") && $(et).has("span.bbit-tree-node-cb")){ //点的节点整行后面的空白处且显示有checkBox
					//如果选中了DIV，且是多选模式，不是只选叶子节点					
					if(dfop.childOnly) {
						if(isLeaf) {
							selectChkbox(item);
						}
					} else {
						selectChkbox(item);
					}					
				} else if($(et).is("span") && $(et).parent().parent().has("span.bbit-tree-node-cb")){ //点的节点文字且显示有checkBox
					if(dfop.childOnly) {
	                    if (!dfop.rhTreeHandler._multiCheckBox) {
	                    	$(et).parent().parent().find("span.bbit-tree-node-cb").click();
	                    }
						$(et).parent().parent().find("span.bbit-tree-ec-icon").click();
						if(isLeaf) {
							//如果选中了标题，且是多选模式
							selectChkbox(item);
						}
					} else {
						//如果选中了标题，且是多选模式
						selectChkbox(item);
					}	
				}
				//==============ljk增加，点击节点增加样式之前执行begin=============//
				if (dfop.rhBeforeOnNodeClick) {
					dfop.rhBeforeOnNodeClick.call(this, item, id);
				}
				//==============ljk增加，点击节点增加样式之前执行end=============//
				if (!dfop.rhTreeHandler._multiCheckBox) { // add by wangchen
					if(dfop.childOnly) {
						if(isLeaf && !item.CHILD) {// bbit-tree-node-collapsed bbit-tree-node-expanded
							if (dfop.citem) {
			                    var nid = getNID(dfop.citem.ID);
			                    $("#" + id + "_" + nid).removeClass("bbit-tree-selected");
			                }
			                dfop.citem = item;
			                $(this).addClass("bbit-tree-selected");
						}
					} else {
						if (dfop.citem) {
		                    var nid = getNID(dfop.citem.ID);
		                    $("#" + id + "_" + nid).removeClass("bbit-tree-selected");
		                }
		                dfop.citem = item;
		                $(this).addClass("bbit-tree-selected");
					}
				}  
                if (dfop.onnodeclick) {
                    if (!item.expand) {
                    	//获取字典编号
                    	item["rhItemCode"] = dfop.rhItemCode;
                        item.expand = function() { expandnode.call(item); };
                    }
                    dfop.onnodeclick.call(this, item, id);
                }
            }
			
            /**
             * 程序调用的内嵌函数：程序来调用选择checkBox
             */
			function selectChkbox(item){
				var s = item.checkstate != 1 ? 1 : 0;
				var r = true;
				if (dfop.oncheckboxclick) {
					r = dfop.oncheckboxclick.call(et, item, s, id);
				}

				if (r != false) {
					if (dfop.cascadecheck) {
						//遍历
						cascade(check, item, s);
						
						if(dfop.checkParent) {// 反向选中父级节点，取消选中父节点时不会取消父节点的选中
							checkParent(check, item, 1);
						} else {//上溯
							bubble(check, item, s);	
						}
					} else {
						check(item, s, 1);
						
						if(dfop.checkParent) {// 反向选中父级节点
							checkParent(check, item, 1);
						}
					}
				}			
			}
        }
        
        /**
         * 节点双击事件函数
         */
        function nodedblclick(e) {
            var path = $(this).attr("tpath");
            var et = e.target || e.srcElement;
            var item = getItem(path);
            
            if(dfop.childOnly) {
            	if(item.LEAF == 1) {
            		 if (dfop.onnodedblclick) {
		                dfop.onnodedblclick.call(this, item);
		            }
            	}
            } else {
	            if (dfop.onnodedblclick) {
	                dfop.onnodedblclick.call(this, item);
	            }
        	}
        }
        
        /**
         * 展开节点
         */
        function expandnode() {
            var item = this;
            var nid = getNID(item.id);
            var img = $("#" + id + "_" + nid + " span.bbit-tree-ec-icon");
            if (img.length > 0) {
                img.click();
            }
        }
        
        /**
         * 异步创建
         */
        function asnybuild(nodes, deep, path, ul, pnode) {
            var l = nodes.length;
            if (l > 0) {
                var ht = [];
                for (var i = 0; i < l; i++) {
                    nodes[i].parent = pnode;
                    buildnode(nodes[i], ht, deep, path + "." + i, i == l - 1);
                }
                ul.html(ht.join(""));
                ht = null;
                InitEvent(ul);
            }
            ul.addClass("bbit-tree-node-ct").css({"z-index": 0, position: "static", visibility: "visible", top: "auto", left: "auto", display: ""});
            ul.prev().removeClass("bbit-tree-node-loading");
        }
        
        /**
         * 异步隐身创建 // add by wangchen
         */
        function asnybuildWithHide(nodes, deep, path, ul, pnode) {
            var l = nodes.length;
            if (l > 0) {
                var ht = [];
                for (var i = 0; i < l; i++) {
                    nodes[i].parent = pnode;
                    buildnode(nodes[i], ht, deep, path + "." + i, i == l - 1);
                }
                ul.html(ht.join(""));
                ht = null;
                InitEvent(ul);
            }
            ul.addClass("bbit-tree-node-ct").css({"z-index": 0, position: "static", visibility: "visible", top: "auto", left: "auto", display: "none"});
        }
        
        /**
         * 异步加载
         */
        function asnyloadc(pnode, isAsync, callback) {
            if (dfop.url) {
                if (pnode && pnode != null) {
                    var param = builparam(pnode);
				}

                $.ajax({
                    type: dfop.method,
                    url: dfop.url,
                    data: param,
                    async: isAsync,
                    dataType: dfop.datatype,
                    success: callback,
                    error: function(e) {alert("error occur!");}
                });
            }
        }
        
        /**
         * 构造请求后台获取子树的参数
         */
        function builparam(node) {
            var p = [
           	 	{name : "DICT_ID", value : dfop.dictId},
            	{name : "LEVEL", value : 1},
            	{name : "_extWhere", value : encodeURIComponent(dfop.extWhere ? dfop.extWhere : "")},
				{name : "PID", value : encodeURIComponent(node.ID)}, 
				{name : "NAME", value : encodeURIComponent(node.NAME)}, 
				{name : "checkstate", value : node.checkstate}
			];
            return p;
        }
        
        /**
         * 初始化事件
         */
        function InitEvent(parent) {
            var nodes = $("li.bbit-tree-node>div", parent);
            nodes.each(function(){
            	var node = getItem($(this).attr("tpath"));
            	bindevent.call(this);
            });
        }
        
        /**
         * 绑定事件
         */
        function bindevent() {
        	// 只获取子节点时不注册双击事件
        	var item = getItem($(this).attr("tpath"));
        	if (dfop.childOnly) {
        		if (item.CHILD) {
        			$(this).hover(function() {
                        $(this).addClass("bbit-tree-node-over");
                    }, function() {
                    	$(this).removeClass("bbit-tree-node-over");
                    }).click(nodeclick).find("span.bbit-tree-ec-icon").each(function(e) {
                        if (!$(this).hasClass("bbit-tree-elbow")) {
                        	$(this).hover(function() {
                        		$(this).parent().addClass("bbit-tree-ec-over");
                            }, function() {
                            	$(this).parent().removeClass("bbit-tree-ec-over");
                            });
                        }
                    });
        		} else {
        			$(this).hover(function() {
	                     $(this).addClass("bbit-tree-node-over");
	                }, function() {
	                     $(this).removeClass("bbit-tree-node-over");
	                }).click(nodeclick).dblclick(nodedblclick).find("span.bbit-tree-ec-icon").each(function(e) {
	                	if (!$(this).hasClass("bbit-tree-elbow")) {
	                		$(this).hover(function() {
	                			$(this).parent().addClass("bbit-tree-ec-over");
	                        }, function() {
	                        	$(this).parent().removeClass("bbit-tree-ec-over");
	                        });
	                	}
	                });
        		}
        	} else {
        		$(this).hover(function() {
        			$(this).addClass("bbit-tree-node-over");
        		}, function() {
                    $(this).removeClass("bbit-tree-node-over");
        		}).click(nodeclick).dblclick(nodedblclick).find("span.bbit-tree-ec-icon").each(function(e) {
               	if (!$(this).hasClass("bbit-tree-elbow")) {
               		$(this).hover(function() {
               			$(this).parent().addClass("bbit-tree-ec-over");
                       }, function() {
                       	$(this).parent().removeClass("bbit-tree-ec-over");
                       });
               		}
        		});
        	}			 
        }
                
        /**
         * 重刷
         */
        function reflash(itemId) {
            var nid = getNID(itemId);
            var node = $("#" + id + "_" + nid);
            if (node.length > 0) {
                node.addClass("bbit-tree-node-loading");
                var isEnd = node.hasClass("bbit-tree-elbow-end") || node.hasClass("bbit-tree-elbow-end-plus") || node.hasClass("bbit-tree-elbow-end-minus");
                var path = node.attr("tpath");
                var deep = path.split(".").length;
                var item = getItem(path);
                if (item) {
                    asnyloadc(item, true, function(data) {
                        item.complete = true;
                        item.CHILD = data;
                        //item.isexpand = true;
                        if (data && data.length > 0) {
                            //item.hasChildren = true;
                        } else {
                            //item.hasChildren = false;
                        }
                        var ht = [];
                        buildnode(item, ht, deep - 1, path, isEnd);
                        ht.shift();
                        ht.pop();
                        var li = node.parent();
                        li.html(ht.join(""));
                        ht = null;
                        InitEvent(li);
                        bindevent.call(li.find(">div"));
                    });
                }
            } else {
                alert("该节点还没有生成");
            }
        }
        
//@rh-TODO:showcheck值的设置引起的问题------------
        function getck(items, c, fn) {
            for (var i = 0, l = items.length; i < l; i++) {
				if(items[i].checkstate == 1){
					if(dfop.childOnly) { // 只需要子节点
						if(!items[i].CHILD && items[i].LEAF == "1") {
							c.push(fn(items[i]));
						}
					} else {
						c.push(fn(items[i]));
					}
				}
                if (items[i].CHILD != null && items[i].CHILD.length > 0) {
                    getck(items[i].CHILD, c, fn);
                }
            }
        }
//@rh-TODO:showcheck值的设置引起的问题------------
        
        function getCkAndHalfCk(items, c, fn) {
            for (var i = 0, l = items.length; i < l; i++) {
                ((items[i].checkstate == 1 || items[i].checkstate == 2)) && c.push(fn(items[i]));
                if (items[i].CHILD != null && items[i].CHILD.length > 0) {
                    getCkAndHalfCk(items[i].CHILD, c, fn);
                }
            }
        }
        
        me[0].t = {
            getSelectedNodes: function(gethalfchecknode) {
                var s = [];
                if (gethalfchecknode) {
                    getCkAndHalfCk(treenodes, s, function(item) { return item; });
                }
                else {
                    getck(treenodes, s, function(item) { return item; });
                }
                return s;
            },
            getSelectedValues: function() {
                var s = [];
                getck(treenodes, s, function(item) {return item.ID; });
                return s;
            },
            getCurrentItem: function() {
                return dfop.citem;
            },
            setCurrentItem: function(item) {
                dfop.citem = item;
            },
            reflash: function(itemOrItemId) {
                var id;
                if (typeof (itemOrItemId) == "string") {
                    id = itemOrItemId;
                }
                else {
                    id = itemOrItemId.id;
                }
                reflash(id);
            },
            getTreeId: function() {
            	return me.attr("id");
            },
            getItem: function(path) {
            	return getItem(path);
            },
            checkNode: function(path) {
            	if(dfop.checkParent) {// 反向选中父级节点
                	checkParent(check, getItem(path), 1);
                }
            	check(getItem(path), 1 ,1);
            },
            uncheckNode: function(path) {
            	check(getItem(path), 0, 1);
            },
            expandParent :function() {
            	expandParent(dfop.data[0]);
            }
        };
        return me;
    };

    //清除第一个class,添加第二个class
    $.fn.swapClass = function(c1, c2) {
        return this.removeClass(c1).addClass(c2);
    };
    
    //切换成两个class中不存在的那个class
    $.fn.switchClass = function(c1, c2) {
        if (this.hasClass(c1)) {
            return this.swapClass(c1, c2);
        } else {
            return this.swapClass(c2, c1);
        }
    };
    
    //获取所有选中的节点的Value数组
    $.fn.getTSVs = function() {
        if (this[0].t) {
            return this[0].t.getSelectedValues();
        }
        return null;
    };

    //获取所有选中的节点的Item数组
    $.fn.getTSNs = function(gethalfchecknode) {
        if (this[0].t) {
            return this[0].t.getSelectedNodes(gethalfchecknode);
        }
        return null;
    };

    $.fn.getTCT = function() {
        if (this[0].t) {
            return this[0].t.getCurrentItem();
        }
        return null;
    };
    
    $.fn.setTCT = function(item) {
        if (this[0].t) {
            this[0].t.setCurrentItem(item);
        }
    };

    $.fn.reflash = function(ItemOrItemId) {
        if (this[0].t) {
            return this[0].t.reflash(ItemOrItemId);
        }
    };
    
    $.fn.getItem = function(path) {
        if (this[0].t) {
            return this[0].t.getItem(path);
        }
    };
    
    $.fn.checkNode = function(path) {
        if (this[0].t) {
            this[0].t.checkNode(path);
        }
    };
    
    $.fn.uncheckNode = function(path) {
    	if(this[0].t) {
    		this[0].t.uncheckNode(path);
    	}
    };
    
    $.fn.expandParent = function() {
    	if(this[0].t) {
    		this[0].t.expandParent();
    	}
    }
})(jQuery);