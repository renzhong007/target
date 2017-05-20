var stations;

var deviceconfig = {
	deviceType : [
	    {id:"5", text:"水泵"},
	    {id:"4", text:"清水池"},
	    {id:"6", text:"进线柜"} 
	],
	"5" : [
	    {field: "STATUS", title: "水泵状态"},
	    {field: "FLOW(m3/h)", title: "进水流量"},
	    {field: "OUTPUTFLOW(m3/h)", title: "出口流量"},
	    {field: "OUTPUTCHLORINE(mg/L)", title: "出口余氯"},
	    {field: "INPUTCHLORINE(mg/L)", title: "进口余氯"},
	    {field: "OUTPUTTURBIDITY", title: "出口浊度"},
	    {field: "OUTPUTTURBIDITY", title: "进口浊度"},
	    {field: "SSB_OUTPRE(MPa)", title: "出口压力"},
	    {field: "SSB_INTPRE(MPa)", title: "进口压力"},
	    {field: "VOLTAGE(V)", title: "电压"},
	    {field: "SSBC(A)", title: "电流"},
	    {field: "POWER", title: "功率"},
	    {field: "SSBEP", title: "电度"},
	    {field: "SSB_RUNTIME", title: "累计运行时间"}
	],
	"4" : [
	    {field: "HEIGHT(m)", title: "高度"},
	    {field: "TANK_LEVEL(m)", title: "液位"}
	    
	],
	"6" : [
	    {field: "JXEP", title: "电度"},
	    {field: "POWER", title: "功率"},
	    {field: "JXV(V)", title: "电压"},
	    {field: "JXC(A)", title: "电流"},
	    {field: "JXG_UA(V)", title: "A相电压"},
	    {field: "JXVB(V)", title: "B相电压"},
	    {field: "JXVC(V)", title: "C相电压"}
	    
	]
};
$(function() {
	stations = initStatColumns();
	initTabs();
	initRealTimeGrid();
	
});
//初始化实时数据列表
function initRealTimeGrid() {
	initStationChoose("#rtstation");
	initDevice("#deviceChoose", "#rtgrid");
	var option = {border:false,url:"",rownumbers:true};
	option.loadFilter = function(data) {
		return {total:data.data.length, rows:data.data};
	}
	option.frozenColumns = [[{"title":"名称","field":"NAME",width:80}]];
	option.columns = [deviceconfig["5"]];
	option = $.extend({}, easyuiGrid, option);
	
	$("#rtgrid").datagrid(option);
	
}

function initDevice(deviceExp, gridExp, stationExp, deviceIdExp) {
	$(deviceExp).empty();
	$.each(deviceconfig.deviceType, function(i, n) {
		$(deviceExp).append("<option value='"+n.id+"'>"+n.text+"</option>")
	});
	$(deviceExp).on("change", function(e) {
		var ops = $(gridExp).datagrid("options");
		if (deviceIdExp) {
			executeAjaxUrl("../../water-scada/action/Device/get?tid="+$(deviceExp).val()+"&pid="+$(stationExp).val(), {async: false}, function(data) {
				$(deviceIdExp).empty();
				$.each(data, function(i, n) {
					$(deviceIdExp).append("<option value='"+n.ID+"'>"+n.NAME+"</option>");
				})
			});
		}
		
		if ("#statgrid" == gridExp) {
			queryDeviceColumnsAndFeature();
			return;
		}
		ops.queryParams.tid=$(deviceExp).val();
		$(gridExp).datagrid({columns:[deviceconfig[$(deviceExp).val()]],queryParams:ops.queryParams});
		
	});
	if (stationExp) {
		executeAjaxUrl("../../water-scada/action/Device/get?tid="+$(deviceExp).val()+"&pid="+$(stationExp).val(), {async: false}, function(data) {
			$(deviceIdExp).empty();
			$.each(data, function(i, n) {
				$(deviceIdExp).append("<option value='"+n.ID+"'>"+n.NAME+"</option>");
			})
		});
	}
}

//初始化历史数据列表
function initHistoryGrid() {
	initStationChoose("#hisstation");
	initCustomTimeChoose("#histimechoose");
	initDevice("#hisdevice", "#hisgrid", "#hisstation", "#hisdeviceid");
	var option = {border:false,url:"",rownumbers:true};
	option.loadFilter = function(data) {
		return {total:data.data.length, rows:data.data};
	}
	option.frozenColumns = [[
//	                         {"title":"名称","field":"NAME",width:80},
	                         {"title":"时间","field":"REPORTTIME",width:150}
	                         ]];
	option = $.extend({}, easyuiGrid, option);
	
	$("#hisgrid").datagrid(option);
	
}

function initStationChoose(expression) {
	$(expression).empty();
	$.each(stations, function(i, n) {
		$(expression).append("<option value='"+n.ID+"'>"+n.NAME+"</option>");
	});
}

//初始化统计数据列表
function initStatGrid() {
	initStationChoose("#statstation");
	initCustomTimeChoose("#stattimechose");
	initDevice("#statdevice", "#statgrid", "#statstation");
	var option = {border:false,url:"",rownumbers:true};
	option.loadFilter = function(data) {
		return {total:data.data.length, rows:data.data};
	}
	option.frozenColumns = [[{"title":"时间","field":"REPORTTIME",width:150}]];
	var cols = stations;
	option.columns = [[]];
	option = $.extend({}, easyuiGrid, option);
	
	$("#statgrid").datagrid(option);
	queryDeviceColumnsAndFeature();
}
//初始化统计列
function initStatColumns() {
	var columns;
	executeAjaxUrl("../../water-scada/action/Device/get?tid=2&pid=-1", {async:false}, function(data) {
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
				
			}
		} else if ($tli.attr("target") == "stat") {
			if (undefined ==$("#statgrid").attr("class") || $("#statgrid").attr("class").indexOf("datagrid") == -1) {
				initStatGrid();
				
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
			$contentgrid.css("top","91px");
			$tb.datagrid("resize");
		} else {
			$timechoose.hide();
			$contentgrid.css("top","61px");
			$tb.datagrid("resize");
		}
	});
}

//查询实时数据
function queryRtd() {
	var params = {parentid:$("#rtstation").val(),tid:$("#deviceChoose").val()};
	$("#rtgrid").datagrid({url:"../../water-scada/action/RealTime/getRealTimeDataByParent",queryParams:params});
}
//查询历史数据
function queryHis() {
	var params = {id:$("#hisdeviceid").val()};
	if ("custom" == $("#histimechoose").val()) {
		params.startTime = $("#hisstartTime").datetimebox("getValue") + ":00";
		params.endTime = $("#hisendTime").datetimebox("getValue") + ":00";
	} else {
		formateDate($("#histimechoose").val(),params);
	}
	$("#hisgrid").datagrid({url:"../../water-scada/action/History/eletric/getHistoryData",queryParams:params});
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
	$("#statgrid").datagrid({url:"../../water-scada/action/Statistical/"+$("#statdevice").val()+"/getStatisticalData",queryParams:params});
}

//查询设备
function queryDeviceColumnsAndFeature() {
	$("#feature").empty();
	$.each(deviceconfig[$("#statdevice").val()], function(i, n) {
		$("#feature").append("<option value='"+n.field+"'>"+n.title+"</option>");
	});
	
	executeAjaxUrl("../../water-scada/action/Device/get?tid="+$("#statdevice").val()+"&pid="+$("#statstation").val(), {async: false}, function(data) {
		var columns = [[]];
		$.each(data, function(i, n) {
			
			columns[0].push({field:n.NAME, title: n.NAME});
		})
		$("#statgrid").datagrid({columns:columns});
	});
}

//改变值就自动加载
function onChangeLoad(obj, pname, gridExp) {
	var ops = $(gridExp).datagrid("options");
	ops.queryParams[pname] = $(obj).val();
	$(gridExp).datagrid({queryParams:ops.queryParams});
}
//根据设备类型改变要素  - 统计模块
function onChangeFeature(obj, target) {
	var arr = deviceconfig[$(obj).val()];
	$(target).empty();
	$.each(arr, function(i, n) {
		
		$(target).append("<option value='"+n.field+"'>"+n.title+"</option>");
	});
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