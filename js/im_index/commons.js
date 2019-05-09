
/// ---------------- 功能函数部分 ---------------
// 时间转化格式
function getMyDate(str) {
	var oDate = new Date(str),
		oYear = oDate.getFullYear(),
		oMonth = oDate.getMonth() + 1,
		oDay = oDate.getDate(),
		oHour = oDate.getHours(),
		oMin = oDate.getMinutes(),
		oSen = oDate.getSeconds(),
		oTime = oYear + '-' + getzf(oMonth) + '-' + getzf(oDay) + ' ' + getzf(oHour) + ':' + getzf(oMin) + ':' + getzf(oSen); //最后拼接时间  
	return oTime;
};
//补0
function getzf(num) {
	if (parseInt(num) < 10) {
		num = '0' + num;
	}
	return num;
}

// 时间月天
function getMyDateMD(str) {
	var oDate = new Date(str),
		oMonth = oDate.getMonth() + 1,
		oDay = oDate.getDate(),
		oTime = getzf(oMonth) + '-' + getzf(oDay); //最后拼接时间  
	return oTime;
};

// 获取路径参数 客服id
function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}

// 验证是否登录
function checkLogin() {
	// localStorage.clear();
	var aid = localStorage.getItem("aid");
	// alert(aid)
	if(aid == null) {
		alert("未登录")
		window.location.href = "login.html";
	}
}

// 检测是否是对应的角色使用的页面
function checkRole(userRole) {
	var role = localStorage.getItem("role");
	if (userRole != role) {
		// alert("当前的登录的角色没有权限使用这个界面")
		if(role == 0) {
			window.location.href = "http://127.0.0.1:5500/html/home.html";
		}
		if(role == 1) {
			window.location.href = "http://127.0.0.1:5500/html/service-chat.html";
		}
		if(role == 2) {
			window.location.href = "http://127.0.0.1:5500/html/shopkeeper.html";
		}
		if(role == 3) {
			window.location.href = "http://127.0.0.1:5500/html/admin.html";
		}
	}
}

// 退出
function logout() {
	// alert("退出")
	var account = localStorage.getItem("account");
	checkLogin();

	var logout = "http://localhost:8080/user/logout?account=" + account;
	$.post(logout,  function (result) {
		// 退出成功
		if (result.code == 0) {
			localStorage.clear();
			alert("退出成功")
		}
		// alert(result.msg);		
	});
	
}

