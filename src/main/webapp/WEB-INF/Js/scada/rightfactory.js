var stations;
$(function() {
	initTabs();
	initRealTimeGrid();
	stations = initStatColumns();
});
//初始化实时数据列表
function initRealTimeGrid() {
	var option = {border:false,url:"../../water-scada/action/RealTime/factory/getRealTimeData",rownumbers:true};
	option.loadFilter = function(data) {
		var dataarr = [];
		var datamap = {};
		//处理相同名称的数据合并
		$.each(data.data, function(i, n) {
			if (n.NAME in datamap) {
				datamap[n.NAME] = $.extend(datamap[n.NAME],n);
			} else {
				datamap[n.NAME] = n;
			}
		});
		for (var name in datamap) {
			dataarr.push(datamap[name]);
		}
		
		return {total:dataarr.length, rows:dataarr};
	}
	option.frozenColumns = [[{"title":"名称","field":"NAME",width:80}]];
	option.columns = [[
		{"title":"出口压力(MPa)","field":"NPRESSURE",width:100},
		{"title":"出口余氯(mg/L)","field":"OUTPUTCHLORINE",width:100},
		{"title":"出口浊度","field":"OUTPUTTURBIDITY",width:100},
		{"title":"出口流量(m3/h)","field":"OUTPUTFLOW",width:100},
		{"title":"出口PH","field":"OUTPH",width:100}
	]];
	option.onSelect = function(index, row) {
		if (row.LONGITUDE && row.LATITUDE &&"0" != row.LONGITUDE && "0" != row.LATITUDE) {
			self.parent.f2net.window.locateWithXY(row.LONGITUDE,row.LATITUDE);
			self.parent.f2net.window.setLevel(10);
			//console.log(row.LONGITUDE+","+row.LATITUDE);
		} else {
			alert("该水厂没有关联经纬度，请联系管理员进行修改！");
		}
		
	}
	option = $.extend({}, easyuiGrid, option);
	
	$("#rtgrid").datagrid(option);
}
//初始化历史数据列表
function initHistoryGrid() {
	initStationChoose();
	var option = {border:false,url:"",rownumbers:true};
	option.loadFilter = function(data) {
		return {total:data.data.length, rows:data.data};
	}
	option.frozenColumns = [[{"title":"名称","field":"NAME",width:80},{"title":"时间","field":"REPORTTIME",width:150}]];
	option.columns = [[
		{"title":"出口压力(MPa)","field":"NPRESSURE",width:100},
		{"title":"出口余氯(mg/L)","field":"OUTPUTCHLORINE",width:100},
		{"title":"出口浊度","field":"OUTPUTTURBIDITY",width:100},
		{"title":"出口流量(m3/h)","field":"OUTPUTFLOW",width:100},
		{"title":"出口PH","field":"OUTPH",width:100}
		
	]];
	option = $.extend({}, easyuiGrid, option);
	
	$("#hisgrid").datagrid(option);
	
}

function initStationChoose() {
	$("#stationid").empty();
	$.each(stations, function(i, n) {
		$("#stationid").append("<option value='"+n.ID+"'>"+n.NAME+"</option>");
	});
	
}

//初始化统计数据列表
function initStatGrid() {
	var option = {border:false,url:"",rownumbers:true};
	option.loadFilter = function(data) {
		return {total:data.data.length, rows:data.data};
	}
	option.frozenColumns = [[{"title":"时间","field":"REPORTTIME",width:150}]];
	var cols = stations;
	option.columns = [[]];
	$.each(cols, function(i, n) {
		option.columns[0].push({title:n.NAME, field:n.NAME});
	});
	option = $.extend({}, easyuiGrid, option);
	
	$("#statgrid").datagrid(option);
}
//初始化统计列
function initStatColumns() {
	var columns;
	executeAjaxUrl("../../water-scada/action/Device/get?tid=17&pid=-1", {async:false}, function(data) {
		columns = data;
	});
	return columns;
}


//绑定li
function initTabs() {
	$("div.nav>ul").on("click", "li", function(e) {
		var $tli = $(e.currentTarget);
		var $ul = $(e.delegateTarget);
		var $lis = $ul.children();
		var index = $lis.index($tli);
		$tli.siblings().removeClass("active");
		$tli.addClass("active");
		$(".iframe>.content").hide();
		var $content = $(".iframe>.content:eq("+index+")");
		$content.show();
		
		if ($tli.attr("target") == "his") {
			if (undefined ==$("#hisgrid").attr("class") || $("#hisgrid").attr("class").indexOf("datagrid") == -1) {
				initHistoryGrid();
				initCustomTimeChoose("#histimechose");
			}
		} else if ($tli.attr("target") == "stat") {
			if (undefined ==$("#statgrid").attr("class") || $("#statgrid").attr("class").indexOf("datagrid") == -1) {
				initStatGrid();
				initCustomTimeChoose("#stattimechose");
			}
		}
	});
}

function initCustomTimeChoose(expression) {
	//事件选择器
	$(expression).on("change", function(e) {
		var $ct = $(e.currentTarget);
		var $timechoose = $ct.parent().next();
		var $contentgrid = $ct.parent().parent().parent().next();
		var $tb = $($contentgrid.find("table.datagrid-f"));
		if ("custom" == $ct.val()) {
			$timechoose.show();
			$contentgrid.css("top","61px");
			$tb.datagrid("resize");
		} else {
			$timechoose.hide();
			$contentgrid.attr("style","");
			$tb.datagrid("resize");
		}
	});
}

function initStatTool() {
	//事件选择器
	$("#histimechose").on("change", function(e) {
		var $ct = $(e.currentTarget);
		if ("custom" == $ct.val()) {
			$("#customtime").show();
			$("#hiscontent").css("top","61px");
			$("#hisgrid").datagrid("resize");
		} else {
			$("#customtime").hide();
			$("#hiscontent").attr("style","");
			$("#hisgrid").datagrid("resize");
		}
	});
}
//查询历史数据
function queryHis() {
	var params = {id:$("#stationid").val()};
	if ("custom" == $("#histimechose").val()) {
		params.startTime = $("#hisstartTime").datetimebox("getValue") + ":00";
		params.endTime = $("#hisendTime").datetimebox("getValue") + ":00";
	} else {
		formateDate($("#histimechose").val(),params);
	}
	$("#hisgrid").datagrid({url:"../../water-scada/action/History/factory/getHistoryData",queryParams:params});
}
//查询统计数据
function queryStat() {
	
	var params = {feature:$("#feature").val()};
	if ("custom" == $("#stattimechose").val()) {
		params.startTime = $("#statstartTime").datetimebox("getValue") + ":00";
		params.endTime = $("#statendTime").datetimebox("getValue") + ":00";
	} else {
		formateDate($("#stattimechose").val(),params);
	}
	$("#statgrid").datagrid({url:"../../water-scada/action/Statistical/factory/getStatisticalData",queryParams:params});
}
//格式化时间选择器中的时间
function formateDate(formate, params) {
	var strs = formate.split("-");
	var now = new Date();
	if (strs.length == 1) {
		if (strs[0] == "yet") {
			var startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate()-1, 0, 0, 0);
			var endTime = new Date(now.getFullYear(), now.getMonth(), now.getDate()-1, 23, 59, 59);
			params.startTime = timeStamp2String(startTime,"yyyy-MM-dd HH:mm:ss");
			params.endTime = timeStamp2String(endTime,"yyyy-MM-dd HH:mm:ss");
			
		} else if (strs[0] == "todayyet") {
			var startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate()-2, 0, 0, 0);
			var endTime = new Date(now.getFullYear(), now.getMonth(), now.getDate()-2, 23, 59, 59);
			params.startTime = timeStamp2String(startTime,"yyyy-MM-dd HH:mm:ss");
			params.endTime = timeStamp2String(endTime,"yyyy-MM-dd HH:mm:ss");
		} else if (strs[0] == "now") {
			var startTime = new Date(now.getFullYear(),now.getMonth(),now.getDate(),0,0,0);
			var endTime = new Date(now.getFullYear(),now.getMonth(),now.getDate(),now.getHours(),now.getMinutes(),now.getSeconds());
			params.startTime = timeStamp2String(startTime,"yyyy-MM-dd HH:mm:ss");
			params.endTime = timeStamp2String(endTime,"yyyy-MM-dd HH:mm:ss");
		} else if (strs[0] == "yet24H") {
			var startTime =  new Date(now.getFullYear(),now.getMonth(),now.getDate()-1,now.getHours(),now.getMinutes(),now.getSeconds());
			var endTime = new Date(now.getFullYear(),now.getMonth(),now.getDate(),now.getHours(),now.getMinutes(),now.getSeconds());
			params.startTime = timeStamp2String(startTime,"yyyy-MM-dd HH:mm:ss");
			params.endTime = timeStamp2String(endTime,"yyyy-MM-dd HH:mm:ss");
		}
	} else if (strs.length == 2) {
		params.startTime = timeStamp2String(formateSectionDate(strs[0]), "yyyy-MM-dd HH:mm:ss");
		params.endTime = timeStamp2String(formateSectionDate(strs[1]), "yyyy-MM-dd HH:mm:ss");
	}
}
//格式化字符串时间，生成时间返回
function formateSectionDate(expression) {
	var now = new Date();
	var hour;
	var minutes;
	if ( "now" == expression ) {
		return now;
	} else if (expression.indexOf("yet") > -1) {
		var ex = expression.replace("yet","");
		while (ex.length > 0) {
			if (ex.indexOf("H") > -1) {
				var h = ex.substring(0,ex.indexOf('H'));
				hour = parseInt(h);
				ex = ex.replace(h+"H","");
			}
		}
		return new Date(now.getFullYear(), now.getMonth(), now.getDate()-1, hour?hour:0, minutes?minutes:0);
	}
}



//把时间转换成字符串
function timeStamp2String(datetime,formate){

	var year = datetime.getFullYear();
	var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
	var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
	var hour = datetime.getHours()< 10 ? "0" + datetime.getHours() : datetime.getHours();
	var minute = datetime.getMinutes()< 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
	var second = datetime.getSeconds()< 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
	var str = formate;
	str = str.replace("yyyy",year);
	str = str.replace("MM",month);
	str = str.replace("dd",date);
	str = str.replace("HH",hour);
	str = str.replace("mm",minute);
	str = str.replace("ss",second);
	return str;
}