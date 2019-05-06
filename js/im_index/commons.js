var domain = {
	
	// read: "http://localhost:8080"
	read: "http://139.199.89.116:8080"

}

var config = {
	
	url: {
		"get_article_new": domain.read + "/article/new", // 获得最新的5篇文章
		"get_article_update": domain.read + "/article/update", // 获得最新的5篇文章
		"get_article_category": domain.read + "/article/category", // 获得最近更新的10个分类
		"get_article_page": domain.read + "/article/page", // 分页获取
		"get_article_one": domain.read + "/article/get/" // 获取一篇文章
	}
	
}

var tokenv = 1232;

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
	var uid = sessionStorage.getItem("tokenUid");
	if(uid == null) {
		// alert("未登录")
	}
}

function test() {
	alert("sdfs")
}

function openPage() {
	
}

// 页面跳转
// 用户a->首页
function userHome() {
	window.location.href = "home.html";
}