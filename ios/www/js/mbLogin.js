function checkVersion(callback) {
	$.mobile.loading( "show", {
           text: "检测更新中……",
           textVisible: true,
           textonly: false 
     });
	var url = UpdateServerPath + "androidVersion.xml";
	$.ajax({
		url:url,
		dataType:"xml",
		data:"rand =" + Math.random()
	}).done(function(data) {
		var $data = $(data);
		var versionCode = $data.find("versionCode").text();  //获取新版本号
		var filePath = $data.find("filepath").text();		 //获取文件路径
		var isForcible = $data.find("isForcible").text();	 //是否强制更新 string
		//获取当前app版本号
		window.plugins.version.getVersionCode(function(version_code) {
	        if (version_code != versionCode) {//如果不同，则提示升级
	        	//记录isNeedUpdate,newVersion,filepath用于在about页面手动升级
//	        	window.localStorage.setItem("isNeedUpdate",true);
	        	
	        	window.localStorage.setItem("filepath",filePath);
	        	if (isForcible == "true") {
	        		navigator.notification.alert(
		    				"有新版本需要更新！",
		    				function(){
		    					FileHelper.download(UpdateServerPath + filePath, filePath,true);
		    				},
		    		"更新提示", "确定"); 
	        	} else {
	        		navigator.notification.confirm(
	        	            '有新版本可更新，要更新吗？',
	        	            function(index){
	        	            	if(index==2){
	        	            		FileHelper.download(UpdateServerPath + filePath, filePath,true);
	        	            	} else {
	        	            		callback();
	        	            	}
	        	            },            
	        	            '更新提示', ['取消','确定']          
	        	    );
	        	}
	        } else {
	        	//绑定登录
	        	callback();
	        } 
	    },errorHandler.blankErrorHandler);
	})
	.fail(errorHandler.connect)
	.always(function(){
		$.mobile.loading( "hide" );
	});
}
 
/**
 * showUdid 显示设备唯一标识
 */
function showUdid() {
    
    var udid = device.udid;
    
    alert(udid);
}


/**
 * 初始化登录页面
 */
function loginInit_mb() {
	$(".content","#login").show();
	$("#USER_PWD,#USER_CODE").on("focus",function(){
		$(this).val("");
		$(this).prev("label").hide();
	}).on("blur",function(){
		var value = $(this).val();
		if(!value){
			$(this).prev("label").show();
		}
	});
    //给按钮绑定事件
    $("#btnLogin").on("vclick", function(event) {
    	event.preventDefault();
		event.stopImmediatePropagation();
    	doLogin();
    });
    
}
/**
 * 登录页面登录按钮click方法
 */
function doLogin() {
	//获取udid
	var udid = device.udid;
    if(udid){
	    var username = $("#USER_CODE").val();
	    var pwd = $("#USER_PWD").val();
        //pwd = "123456";
	    if(username){
            LogMgr.login(username, "",pwd,"name", 2);
        }else {
            LogMgr.login(udid,"noDevice", pwd,"key", 2);
        }       
    }
    
}
/**
 * 系统登录验证管理类
 * @param {} id
 * @param {} pswds
 */
var LogMgr ={
    login : function(id, uuid, pswds, type, cmpyCode) {
        var msg = "正在进行登录验证，请稍候...";
        $.mobile.loading( "show", {
                         text: "正在登录……",
                         textVisible: true,
                         textonly: false
                         });
        $("#msg").html(msg);
        if (pswds.length == 0) {
            $("#USER_PWD").focus();
            msg = "密码不能为空，请输入";
            $("#msg").html(msg);
            return;
        }
            FireFly.login(id, pswds, cmpyCode, type,{"uuid":uuid}).then(function(result){
                var rtnMsg = result[UIConst.RTN_MSG];
                if (StringUtils.startWith(rtnMsg, UIConst.RTN_OK)) {
                    //桌面系统交互RTN_MSG
                    msg = "验证通过，正准备进入系统......";
                    //记住用户名和密码
                    $("#msg").css("color","green");
                    $("#msg").html(msg);
                    LogMgr.initUserParameter(result);
                    $.mobile.changePage("#mbDesk");
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
        },
    initUserParameter : function(result){
        var data = result["orgVar"];

        var userCode  = data["@USER_CODE@"],
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
        System.setUser("CMPY_CODE", "2");
        System.setUser("JIAN_CODES", jianCode);
        System.setUser("ROOT_MENU_ID",result["MOBILE_ROOT_MENU_ID"]);
        FireFly.doAct("SY_COMM_CONFIG","getVars").then(function(varResult){
                                                       System.setVars(varResult["confVar"]);
                                                       System.setVars(varResult["orgVar"]);
                                                       //System.setVars(JSON.parse(varResult["sysParams"]));
                                                       });
    }
    
    
};
