/**
 * 设备初始化
 */
document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady(){
	//1.检测更新
	//checkVersion(loginInit_mb);
	//2.监听返回
	//document.addEventListener("backbutton",onBackKeyDown,false);
	//3.监听断网
	document.addEventListener("offline", onOffline, false);
    if(device.platform == "iOS" && parseInt(device.version.substring(0,1)) >=9){
       $.mobile.hashListeningEnabled = false;
    }
    
    var db = window.sqlitePlugin.openDatabase({name: "imo.sqlite"});
    
    
    db.transaction(function(tx) {
                   
                   tx.executeSql("select *  from imo;", [], function(tx, res) {
                                 console.log("res.rows.length: " + res.rows.length + " -- should be 1");
                                 var uid = "";
                                 var token = "";
								 var cid = "";
								 cid = res.rows.item(0).CID;
                                 uid = res.rows.item(0).UID;
                                 token = res.rows.item(0).TOKEN;
                                 if(uid){
                                 LogMgrSSo.login(cid,uid,token);
                                 db.transaction(function(tx) {
                                 tx.executeSql("delete  from imo") ;
                                                });
                                 return;
                                 
                                 }
                                 
                                 }, function(e) {
                                 console.log("ERROR: " + e.message);
                                 });
                   
    });

 loginInit_mb();
}




/**
 * IMO单点登录管理类
 * @param {} id
 * @param {} pswds
 */
var LogMgrSSo ={
    login : function(cid,uid,token) {
        var udidSso = device.udid;
        if(dev){
            udidSso = "7EB23055-D577-4270-972F-0C9C2C2AEAE6";
        }
        var msg = "正在进行登录验证，请稍候...";
        
        $("#msg").html(msg);
        $.mobile.loading( "show", {
                         text: "正在登录……",
                         textVisible: true,
                         textonly: false
                         });
        FireFly.loginImo(cid,uid,token,udidSso).then(function(result){
                                                         var rtnMsg = result[UIConst.RTN_MSG];
                                                         if (StringUtils.startWith(rtnMsg, UIConst.RTN_OK)) {
                                                         //桌面系统交互RTN_MSG
                                                         msg = "验证通过，正准备进入系统......";
                                                         //记住用户名和密码
                                                         $("#msg").css("color","green");
                                                         $("#msg").html(msg);
                                                         
                                                         var data = result["orgVar"];
                                                         var userCode  = data["@USER_CODE@"],
														 cmpyCode = 2,
                                                         username  = data["@USER_NAME@"],
                                                         userImg   = data["@USER_IMG@"],
                                                         deptCode  = data["@DEPT_CODE@"],
                                                         deptName  = data["@DEPT_NAME@"],
                                                         odeptCode = data["@ODEPT_CODE@"],
                                                         jianCode  = data["@JIAN_CODES@"];
                                                         System.setUser("USER_CODE", userCode);
                                                         System.setUser("USER_NAME", username);
                                                         System.setUser("DEPT_CODE", deptCode);
                                                         System.setUser("ODEPT_CODE", odeptCode);
                                                         System.setUser("DEPT_NAME", deptName);
                                                         System.setUser("CMPY_CODE", cmpyCode);
                                                         System.setUser("JIAN_CODES", jianCode);
                                                     
                                                         if(odeptCode=="24"){//总公司
                                                         $.mobile.window.isBranch = false;
                                                         }else{//分公司
                                                         $.mobile.window.isBranch = true;
                                                         }
                                                         $.mobile.pageContainer.pagecontainer( "change","#mbDesk");
//                                                         var data = {};
//                                                         data["sId"] = "SY_COMM_TODO";
//                                                         data["headerTitle"] = "待办事务";
//                                                         data["secondStep"] = "card";
//                                                         var listview = new mb.vi.listView(data);
//                                                         listview.show();
                                                         $("#msg").html("");
                                                         
                                                         } else if (StringUtils.startWith(rtnMsg, UIConst.RTN_ERR)) {
                                                         var msg = rtnMsg.substring(6) + "  请重新输入!";
                                                         $("#msg").html(msg);
                                                         }
                                                         }).catch(function(err){
                                                                  $("#msg").html(err.message);
                                                                  }).finally(function(){
                                                                             $.mobile.loading( "hide" );
                                                                             });
    }
    
    
};



function onBackKeyDown(){
//	FireFly.setEnableConnect(false); zjx -- 此处如果设置成断网会影响到使用'物理返回键'不能刷新待办数的情况，注释掉这句可能会引起其他问题
    
		navigator.notification.confirm(
	            '确认要退出吗?',  
	            function(index){
	            	if(index==2){
                                       
                            FireFly.logout().then(function(result) {
	            			//if (result['_MSG_'].indexOf('OK') >= 0) { // 退出成功
                             if (result['_MSG_'].indexOf('再见') >= 0) { // 退出成功
	            				$.mobile.changePage('#login');
	            				$('#USER_PWD').val('');
                               
	            			}
                                              
	            		});
	            	}
	            },            
	            '提示', ['取消','确定']          
	    );
    
}
function onOffline(){
	/*navigator.notification.alert(
            '当前网络不可用,请检查网络设置.',  
            function(){
            	navigator.app.exitApp();
            },            
    "提示", "确定");*/
	window.localStorage.setItem("isOnline",false);
}
$( document ).on( "mobileinit", function() {
	//全局转场效果
	$.mobile.changePage.defaults.transition = "none";
	$.mobile.defaultPageTransition   = 'none';
	$.mobile.defaultDialogTransition = 'none';
	$.mobile.buttonMarkup.hoverDelay = 0;
    //list分组
	$.mobile.listview.prototype.options.autodividersSelector = function( elt ) {
        var text = $.trim( elt.attr("data-filtertext") ) || $.trim( elt.text() ) || null;
        if ( !text ) {
            return null;
        }
        if ( !isNaN(parseFloat(text)) ) {
            return "0-9";
        } else {
            text = text.slice( 0, 1 ).toUpperCase();
            return text;
        }
    };
    function findClosestLink( ele )	{
		while ( ele ) {
			if ( ( typeof ele.nodeName === "string" ) && ele.nodeName.toLowerCase() === "a" ) {
				break;
			}
			ele = ele.parentNode;
		}
		return ele;
	}
    //override resetActivePageHeight
    $.mobile.resetActivePageHeight = function( height ) {
		var page = $( "." + $.mobile.activePageClass ),
			pageHeight = page.height(),
			pageOuterHeight = page.outerHeight( true );

		height = ( typeof height === "number" ) ? height : $.mobile.getScreenHeight();

		page.css( "min-height", height - ( pageOuterHeight - pageHeight ) );
        //IOS8 出现bug列表接卡片页面不能拖动， 故注释掉
		//page.css( "max-height", height - ( pageOuterHeight - pageHeight ) );
	}
    /*$.mobile.document.on( "vclick", "a", function( event ) {
//    	FireFly.setEnableConnect(false);
                         clearTimeout(timeFn);
                         timeFn = setTimeout(function() {
                                             var link = findClosestLink( event.target ),
                                             $link = $( link );
                                             if ( $link.is( ":jqmData(rel='back')" ) ) {
                                             $.mobile.loading( "show", {
                                                              text: "返回中……",
                                                              textVisible: true,
                                                              textonly: false 
                                                              });
                                             }
                                             },30);
    	
    });*/
    /**
     * 桌面
     */
    $.mobile.document.on( "pagebeforeshow", "#mbDesk", function() {
    	//初始化桌面
    	if ($.mobile.window.deskView) {
    		$.mobile.window.deskView.refresh();
    	} else {
    		var deskView = new mb.vi.deskView();
    		deskView.show();
    		$.mobile.window.deskView = deskView;
    	}
    });
    
	/**
	 * 通讯录
	 */
    $.mobile.document.on( "pagebeforeshow", "#contacts", function() {
    	var $group = $("#contactsGroup"),
    		$list = $("#contactsList");
    	
    	//刷新分组
    	if($group.children().length){
    		$group.collapsibleset( "refresh" );
    		$group.find("ul").listview().listview("refresh");
    	}
    	//刷新列表
    	if($list.children().length){
    		$list.listview("refresh");
    	}
    	
    }).on( "pageshow", "#contacts", function() {
    	var $activePage = $(this),
    		$window = $.mobile.window;
    	
    	$window.on( "scroll", function( event ) {
    		var height = $activePage.height(),
			 	 scrollTop = $(this).scrollTop(),
			 	 screenHeight = $.mobile.getScreenHeight();
			if(scrollTop + screenHeight >  height - 100){
				
				var $ul = $("#contactsList",$activePage);
				var currPage = $ul.data("currpage"),
					totlePage = $ul.data("totlepage"),
				    pagerData = $ul.data("contactsPager");
				if (currPage < totlePage-1) {
					var	newPageData = pagerData[currPage+1] ;
					$.each(newPageData , function(i,obj){
//						var imgPath = obj["USER_IMG_SRC"] ? ScImgPath + "/file/" +obj["USER_IMG_SRC"]  + "?size=32x32" : defaultSmallProfile;
						var imgPath = obj["USER_IMG_SRC"] ? ScImgPath + "/file/" +obj["USER_IMG_SRC"].split(",")[0]  + "?size=32x32" : defaultSmallProfile;
			    		var $li = $("<li data-filtertext='"+ obj["USER_SPELLING"] +"'></li>");
			    			$li.data("detail" , obj);
				   		var $a = $("<a></a>").attr("href","#").appendTo($li); 
				   		$("<img class='ui-li-icon'/>").attr("src",imgPath).appendTo($a); 
				   		$("<h1></h1>").html(obj["USER_NAME"]).appendTo($a);
				   		$ul.append($li);
					});
					$ul.listview("refresh");
					$ul.trigger( "updatelayout" );
					$ul.data("currpage", currPage+1);
					
				}
				 
			} 
			 
		});
    	
    	 
    	//显示详细信息
    	$(this).on("vclick" , ".contacts-content li:not(.ui-li-divider)" , function(event){
    		 var data = $(this).data("detail");
                   event.preventDefault();
                   event.stopImmediatePropagation();
    		 var detail = new mb.vi.contactDetail({"data": data});
				detail.show();
    	});
    	
    	
    	//联系人分组，展开式渲染布局
    	$(this).on( "collapsibleexpand", ".ui-collapsible", function( event, ui ) {
    		var $ul = $(this).find("ul");
    		var listData = $(this).data("list");
    		
    		var len = $ul.find("li").length;
    		
    		if(!len) {
    			if (listData && listData.length > 0){
    				$.each(listData , function(i, obj) {
//    					var imgPath = obj["USER_IMG_SRC"] ? ScImgPath + "/file/" +obj["USER_IMG_SRC"] + "?size=32x32" : defaultSmallProfile;
    					var imgPath = obj["USER_IMG_SRC"] ? ScImgPath + "/file/" +obj["USER_IMG_SRC"].split(",")[0] + "?size=32x32" : defaultSmallProfile;
    		    		var $li = $("<li data-filtertext='"+obj["USER_LOGIN_NAME"]+"'></li>");
    		    			$li.data("detail" , obj);
    			   		var $a = $("<a></a>").attr("href","#").appendTo($li); 
    			   		$("<img class='ui-li-icon'/>").attr("src",imgPath).appendTo($a); 
    			   		$("<h1></h1>").html(obj["USER_NAME"]).appendTo($a);
    			   		$li.appendTo($ul);
    				});
    				
    				$ul.listview("refresh");
    				$ul.trigger( "updatelayout");
    			}
    		}
    		
    	});
    	
		// 全部||分组
		$(this).find("input[type='radio']").on("change" , function(){
			var clz = $(this).attr("id");
			if(clz!="js-contacts-all") {
				  $( "#sorter" ).hide();
			} else {
				  $( "#sorter" ).show();
			}
			var $target = $.mobile.activePage.find("." + clz);
			if ($target.hasClass( "contacts-content-active" )) {
				 return;  
			} else {
				 $.mobile.activePage.find(".contacts-content-active").removeClass("contacts-content-active");
			     $target.addClass("contacts-content-active");
			}
		});
    });
    
    /**
	 * OA短信
	 */
    $.mobile.document.on( "pageinit", "#message", function() {
		var that = this;
    	$(this).on("vclick" , "#choosePerson" , function(event) {
    		event.preventDefault();
			event.stopImmediatePropagation();
    		//调用通讯录选择页面
    		$(function(){
    			var choose = new mb.vi.contactsChoose();
    				choose.show();
    		});
    	})/*.on("keyup" , "textarea1" , function(event) {
    		event.preventDefault();
			event.stopImmediatePropagation();
    		var msg = $(this).val();
    		if(msg){
    			$("#send").removeClass("ui-disabled");
    		}else{
    			$("#send").addClass("ui-disabled");
    		}
    	})*/.on("focus" , "textarea" , function(event) {
    		event.preventDefault();
			event.stopImmediatePropagation();
    		if($(this).hasClass("ui-input-text-blank")){
    			$(this).removeClass("ui-input-text-blank");
    		}
    	}).on("vclick" , "#send" , function() {
    		var nums = $("#receivers",that).data("receivers");
    		var msg = $("textarea", that).val();
    		if(msg) {
    			$.mobile.loading( "show", {
    				text: "短信发送中……",
    				textVisible: true,
    				textonly: false 
    			});
    			//调用短发发送方法
    			sendMsg(nums, msg, System.getUser("USER_NAME"));
    			$("#receivers",that).removeData("receivers");
    		}else{
    			$("textarea", that).addClass("ui-input-text-blank");
    			return false;
    		}
    	});
    })
    .on( "pagebeforeshow", "#message", function(event, ui) {
    	var prevPage = ui.prevPage;
    	if ($(prevPage).is("#mbDesk")) {
    		$("#receivers",this).removeData().val("");
    		$("textarea",this).val("");
//    		$("#send").addClass("ui-disabled");
    	}
    });	
    // 发送短信
    function sendMsg(nums,msg,userName){
		var param = {};
			param["MOBILE"] = nums;
			param["MESSAGE"] = msg;
			param["SEND_USER"] = userName;
			
			//TODO 
//		return;
			
			
		$.ajax({
            url: FireFly.getContextPath() + "/OA_SC_SMSCENTER.save.do",
            type:"post",
            crossDomain: true,
            data: param
        })
        .then(function(data){
        	var result = $.parseJSON(data);
        	var tips="",
        		msg = result[UIConst.RTN_MSG];
			
			// TODO 获取返回值	
			if (msg && StringUtils.startWith(msg,"OK")) {
//				tips = "调用短信服务中心方法，发送成功";
				tips = "短信已成功发送";
			} else {
//				tips = "调用短信服务中心方法，发送失败,错误信息：" + msg;
				tips = "短信发送失败，错误信息：" + msg;
			}
			navigator.notification.alert(
					tips,  		 
				    function(){
						$.mobile.loading("hide");
						$("input,textarea",$.mobile.activePage).val("");
				    },'提示', '确定');
        });
	}
    // 重置按钮状态
	function resetCheckedState() {
		$(":checkbox", "#contactsEdit").prop("checked" , false).checkboxradio().checkboxradio("refresh");
	}
	
	/**
	 * 通讯录编辑页面 
	 */
    $.mobile.document.on( "pagebeforeshow", "#contactsEdit", function(e , data) {
    	// 更新完成按钮状态
		function updateBtnOkState () {
			var $btnOk = $("#btnOk", "#contactsEdit");
			
			if($(":checked", "#contactsEdit").length ) {
				if ($btnOk.hasClass("ui-disabled")) {
					$btnOk.removeClass("ui-disabled")
				}
			} else {
				if (!$btnOk.hasClass("ui-disabled")) {
					$btnOk.addClass("ui-disabled")
				}
			}
		}
		
    	$(this).on("change", ":checkbox", function() {
			//如果没有选择，完成按钮disable
			updateBtnOkState();
		});
		//全选 TODO 全选时要包括未滚动加载的数据
		$("#btnCheckAll").on("vclick" , function(event) {
			event.preventDefault();
			event.stopImmediatePropagation();
			$(":checkbox").prop("checked" , function( i , val) {
				return !val;	
			}).checkboxradio("refresh");
			updateBtnOkState();
		});
		//取消
		$("#btnCancle").on("vclick" , function(event) { 	
			event.preventDefault();
			event.stopImmediatePropagation();
			resetCheckedState();
			updateBtnOkState();
			$.mobile.back();
		});
		//返回
		$(":jqmData(role='header')>:jqmData(rel='back')",this).on("vclick" , function() { 	
			event.preventDefault();
			event.stopImmediatePropagation();
			resetCheckedState();
			updateBtnOkState();
			$.mobile.back();
		});
    })
    .on("pageshow","#contactsEdit",function(e, data) {
    	var $window = $.mobile.window,
    		$activePage = $(this);
    	$window.on( "scroll", function( event ) {
			 var height = $activePage.height(),
			 	 scrollTop = $(this).scrollTop(),
			 	 screenHeight = $.mobile.getScreenHeight();
			if(scrollTop + screenHeight >  height - 100){
				var $ul = $("#contactsList4msg", $activePage);
				
				var currPage = $ul.data("currpage"),
					totlePage = $ul.data("totlepage"),
				    pagerData = $ul.data("contactEditPager");
				if (currPage < totlePage-1) {
					var	newPageData = pagerData[currPage+1] ;
					$.each(newPageData , function(i,obj){
//						var imgPath = obj["USER_IMG_SRC"] ? ScImgPath + "/file/" +obj["USER_IMG_SRC"]  + "?size=32x32" : defaultSmallProfile;
						var imgPath = obj["USER_IMG_SRC"] ? ScImgPath + "/file/" +obj["USER_IMG_SRC"].split(",")[0]  + "?size=32x32" : defaultSmallProfile;
		    			var $li = $("<li data-filtertext='"+ obj["USER_SPELLING"] +"'></li>");
		    			var $a = $("<a href='#'></a>").appendTo($li); 
		    			var $img = $("<img class='ui-li-icon'/>").attr("src",imgPath).appendTo($a);
		    			var $h1 = $("<h1>"+obj["USER_NAME"]+"</h1>").appendTo($a);
		    			var $p = $("<p class='ui-li-aside'></p>").appendTo($a);
		    			var $label = $("<label for='contactsEdit-"+obj["USER_CODE"]+"'></label").appendTo($p);
		    			var $checkbox = $("<input type='checkbox' id='contactsEdit-" + obj["USER_CODE"] +"' data-iconpos='right'/>").appendTo($label);
			    			$checkbox.data("num", obj["USER_MOBILE"]);
			    			$checkbox.data("name", obj["USER_NAME"]);
		    			
//		    			$(".ui-li-aside", $li).enhanceWithin();
//			    		$checkbox.checkboxradio().checkboxradio("refresh");
		    			$ul.append($li);
					});
					$ul.enhanceWithin();
					$ul.listview("refresh");
					$ul.trigger( "updatelayout");
					$ul.data("currpage",currPage+1);
				}
			} //end if
		});//end scroll
    })
    .on( "pagebeforehide", "#contactsEdit", function(event , ui) {
		
    	var $target = $(ui.nextPage);
		
		var idArr=[],nameArr=[];
		
		var len = $("#contactsEdit").find(":checked").length;
		
		
		$(":checked").each( function(i , obj) {
			var num = $(this).data("num"),
				name = $(this).data("name");
			if($.trim(num)) {
				idArr.push(num);
				nameArr.push(name);
			}
		});
		
		
		$("#receivers",$target).data("receivers" , idArr.join(","));
		if (len > 3) {
			$("#receivers",$target).val(nameArr.slice(0,2).join(' ') + "...和" + (len-3)+"个更多");
		}else{
			$("#receivers",$target).val(nameArr.join(' '));
		}
		
		resetCheckedState();

	});
    
    /**
     * 查询
     */
    $.mobile.document.on( "pageinit", "#search", function() {
    	$(this).on("focus change","#searchtext",function(){
    		var val, lastval;
    		val = $(this).val().toLowerCase();
			lastval = $(this).data("lastval" ) + "";
			if ( lastval && lastval === val ) {
				return;
			}
			var $ul = $( "#autocomplete" );
			$ul.html( "" );
			
    	}).on("vclick","#searchbtn",function(){
    		var $ul = $( "#autocomplete" ),
    			$input = $("#searchtext"),
    			value = $input.val(),
    			html = "",
    			params = {
    				"SEARCH_FLAG" : "true"
    			};
    		value && $.extend( params ,{"_searchWhere" : "and TITLE like '%"+value+"%'"});
			$ul.html( "" );
			FireFly.getPageData("OA_SY_COMM_ENTITY_QUERY_FORM",params).then(function(result){
            	var data = result["_DATA_"];
            	if(data && data.length>0){
            		$.each( data, function ( i, obj ) {
                       var $li = $("<li data-sid='"+ obj["SERV_ID"] +"' data-pk='"+ obj["DATA_ID"] +"'><span>" + obj["TITLE"] + "</span></li>");
                       $li.appendTo($ul);
                       $li.on("click",function(){
    	                    var userCode = System.getUser("USER_CODE");
    	                    var temp = {
    	                    		act : UIConst.ACT_CARD_READ,
    	                    		sId : $(this).data("sid"),
    	                    		pkCode: $(this).data("pk"),
    	                    		ownerCode : userCode,
    	                    		niId : null,
    	                    		readOnly : false
    	                    };
    	            		(function(param){
    	            			 var cardView = new mb.vi.cardView(param);
     	                    		 cardView.show();
    	            		}(temp));
                       });
                    });
            	} else {
            		html+="<li>没有匹配的搜索结果！</li>";
            		$ul.html(html);
            	}
                $ul.listview( "refresh" );
                $ul.trigger( "updatelayout");
            });
    	});
    });
    
    /**
     * 密码修改
     */
    $.mobile.document.on( "pageinit", "#pwdEdit", function() {
    	$(this).on("click","#pwdEditBtn",function(event){
    		event.preventDefault();
			event.stopImmediatePropagation();
			
    		var oldPwd = $("#oldPwd").val();
    		var newPwd = $("#newPwd").val();
    		var newPwdConfirm = $("#newPwdConfirm").val();
    		
    		// 验证新老密码
    		if ($.trim(oldPwd).length == 0 || $.trim(newPwd).length == 0 || $.trim(newPwdConfirm).length == 0)　{
    			$("#errorTip").html("输入项不能为空！");
    			return false;
    		} else {
    			if ($.trim(newPwd) != $.trim(newPwdConfirm)) {
    				$("#errorTip").html("新密码与确认密码不同！");
    				return false;
    			} else {
    				// 修改密码
    				var params = {};
    				params["_PK_"] = System.getUser("USER_CODE");
    				params["OLD_PASSWORD"] = oldPwd;
    				params["USER_PASSWORD"] = newPwd;
    				FireFly.doAct("SY_ORG_USER_PASSWD","saveInfo",params).then(function(result){
    					if (result["_MSG_"].indexOf("OK") == 0) {
    						navigator.notification.alert(
    								'密码修改成功,请重新登录!',  		// message
    								function(){
    									navigator.app.exitApp();
    								},'提示', '确定'                   
    						);
    					} else {
    						$("#errorTip").html("密码修改失败，请尝试重新修改！");
    					}
    				});
    			}//end if
    		}//end if
    	});
    }).on("pagebeforeshow", "#pwdEdit",function(){
    	$("#oldPwd").val("");
		$("#newPwd").val("");
		$("#newPwdConfirm").val("");
		$("#errorTip").html("");
    });
    
    
    /**
     * 新闻浏览
     */
    $.mobile.document.on( "pagehide", "#newsview", function(event,ui) {
    	var $target = $(ui.nextPage);
    	if($target.is("#listview")) {//返回至listview页面
    		$(this).find(".ui-title").empty().end()
    			   .find(".ui-content").empty();
    	}
    });
    
    /**
     * 关于
     */
    $.mobile.document.on( "pagebeforeshow", "#about", function() {
    	if (window.localStorage.getItem("isNeedUpdate") ) {
//			 $("<span class='mb-about-new'>new</span>").appendTo("#checknewversion");
		} 
		//设置当前版本号
    	/*
            window.plugins.version.getVersionName(function(version_name) {
			$("#versionName").html("当前版本号："+ version_name);
		});
         */
        var version_name = device.currentVersion;
        $("#versionName").html("当前版本号："+ version_name);
                         
                         
    	$(this).on("vclick", "#checknewversion", function(){
    		 if (window.localStorage.getItem("isNeedUpdate") == "true" ) {
    			 if(confirm("有新版本,是否下载?")){
    				 window.open(FireFlyContextPath + window.localStorage.getItem("filepath"));
    			 }
    		 } else {
    			 $.mobile.loading( "show", {
                     text: "新版本检测中,请稍等...",
                     textVisible: true,
                     textonly: false 
     	         });
    			 // TODO 新版本检测
    		 }
    	 });
    });
    
    /**
     * cardview
     */
    $.mobile.document.on( "pagebeforeshow", "#cardview", function(event,ui) {
    	$.mobile.loading("show");
    	 
    }).on( "pagehide", "#cardview", function(event,ui) {
    	var $target = $(ui.nextPage);
    	if($target.is("#listview,#search")) {//返回至listview或search页面
    		$(this).find(".ui-title").empty().end()
		       	   .find(".ui-content").empty().end()
		       	   .find(".ui-footer").empty();
    	}
    });
    /**
     * listview
     */
    $.mobile.document.on( "pagehide", "#listview", function(event,ui) {
    	var $target = $(ui.nextPage);
    	if($target.is("#mbDesk,#listviewDq")) {//返回至listview页面
    		$(this).find(".ui-title").empty().end()
			       .find(".ui-content").empty();
    	}
    });
});



