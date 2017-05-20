var stations;
var stationType;
$(function() {
	stationType = getConfigList("gis_stationTypeConfig");
	initTabs();
	initRealTimeGrid();
	stations = initStatColumns();
});

//初始化实时数据列表
function initRealTimeGrid() {
	var stationData = [];
	var tempUrl = "realTimeData/getByCid?cid=";
	$.each(stationType, function(index, n) {
		executeAjaxUrlForResult(tempUrl+n.value, {data:{}, async: false}, function(result) {
			if(result.data.length > 0) {
				$.merge(stationData, result.data);
			}
		});
	});
	var option = {border:false,rownumbers:true};//,url:"realTimeData/getByCid?cid=2"
	option.loadFilter = function(data) {
		if(data.length > 0) {
			var dataarr = [];
			var datamap = {};
			//处理相同名称的数据合并
			$.each(data, function(i, n) {
				if (n.name in datamap) {
					datamap[n.name] = $.extend(datamap[n.name],n);
				} else {
					datamap[n.name] = n;
				}
			});
			for (var name in datamap) {
				dataarr.push(datamap[name]);
			}
			return {total:dataarr.length, rows:dataarr};
		} else {
			return {total:0, rows:[]};
		}
	}
	option.frozenColumns = [];//[{"title":"名称","field":"NAME",width:80}]
	option.columns = [];
	executeAjaxUrlForResult("configlist/list", {data:{type:"gis_scada_rightStationTitle_frozenCol"}, async:false}, function(data) {
		var frozenCols = [];
		$.each(data.data, function(i, n) {
			var frozen = {"title":n.name,"field":n.value,width:80};
			frozenCols.push(frozen);
		});
		option.frozenColumns.push(frozenCols);
	});
	
	executeAjaxUrlForResult("configlist/list", {data:{type:"gis_scada_rightStationTitle"},async:false}, function(data) {
		var columns = [];
		$.each(data.data, function(i, n) {
			var col;
//			if(n.dependency == "2" || n.dependency == 2) {
//				col = {"title":n.name + ((n.remark!=null && n.remark!=undefined)?("("+n.remark+")"):""), "field":n.value, width:120, formatter:function(value, row, index) {
//					var attrValue = 0;
//					if(row[n.value] != null) {
//						attrValue += parseFloat(row[n.value]);
//					}
//					if(row[n.value+n.dependency] != null) {
//						attrValue += parseFloat(row[n.value+n.dependency]);
//					}
//					return parseFloat(attrValue).toFixed(2);
//				}};
//			} else {
				col = {"title":n.name + ((n.remark!=null && n.remark!=undefined)?("("+n.remark+")"):""), "field":n.value, width:120};
//			}
			columns.push(col);
		});
		option.columns.push(columns);
	});
	
//	option.columns = [[
//		{"title":"出水压力(MPa)","field":"OUT_PRESS",width:100},
//		{"title":"进水压力(MPa)","field":"INT_PRESS",width:100},
//		{"title":"进水余氯(mg/L)","field":"INT_CL",width:100},
//		{"title":"出水余氯(mg/L)","field":"OUT_CL",width:100},
//		{"title":"进水浊度","field":"INT_NTU",width:100},
//		{"title":"出水浊度","field":"OUT_NTU",width:100},
//		{"title":"进水流量(m3/h)","field":"INTFLOW",width:100},
//		{"title":"出水流量(m3/h)","field":"OUTFLOW",width:100}
//	]];
	option.onSelect = function(index, row) {
		if (row.longitude_84 && row.latitude_84 &&"0" != row.longitude_84 && "0" != row.latitude_84) {
			self.parent.f2net.window.locateWithXY(row.longitude_84,row.latitude_84);
			//console.log(row.LONGITUDE+","+row.LATITUDE);
			self.parent.f2net.window.setLevel(13);
		} else {
			alert("该泵站没有关联经纬度，请联系管理员进行修改！");
		}
	}
	option.onLoadSuccess = function(data) {
		return data.rows;
	}
	option = $.extend({}, easyuiGrid, option);
	
	$("#rtgrid").datagrid(option);
	
	$("#rtgrid").datagrid("loadData", stationData);
}
//初始化历史数据列表
function initHistoryGrid() {
	initStationChoose();
	var option = {border:false,url:"",rownumbers:true};
	option.loadFilter = function(data) {
		if (data.success) {
			for (var key in data.data) {
				var d = data.data[key];
				return {total:d.length, rows:d};
			}
		}
		return {total:0, rows:[]};
	}
	option.frozenColumns = [];
	executeAjaxUrlForResult("configlist/list", {data:{type:"gis_scada_stationHistoryTitle_frozenCol"},async:false}, function(data) {
		var frozenCols = [];
		$.each(data.data, function(i, n) {
			var frozen = {"title":n.name,"field":n.value,width:150};
			frozenCols.push(frozen);
		});
		option.frozenColumns.push(frozenCols);
	});
	
	option.columns = [];
	executeAjaxUrlForResult("configlist/list", {data:{type:"gis_scada_stationHistoryTitle"},async:false}, function(data) {
		var columns = [];
		$.each(data.data, function(i, n) {
			var col;
//			if(n.dependency == "2" || n.dependency == 2) {
//				col = {"title":n.name + ((n.remark!=null && n.remark!=undefined)?("("+n.remark+")"):""), "field":n.value, width:120, formatter:function(value, row, index) {
//					var attrValue = 0;
//					if(row[n.value] != null) {
//						attrValue += parseFloat(row[n.value]);
//					}
//					if(row[n.value+n.dependency] != null) {
//						attrValue += parseFloat(row[n.value+n.dependency]);
//					}
//					return parseFloat(attrValue).toFixed(2);
//				}};
//			} else {
				col = {"title":n.name + ((n.remark!=null && n.remark!=undefined)?("("+n.remark+")"):""), "field":n.value, width:120};
//			}
			columns.push(col);
		});
		option.columns.push(columns);
	});
	
//	option.frozenColumns = [[{"title":"时间","field":"startTime",width:150}]];
//	option.columns = [[
//		{"title":"出水压力(MPa)","field":"OUT_PRESS",width:100},
//		{"title":"进水压力(MPa)","field":"INT_PRESS",width:100},
//		{"title":"进水余氯(mg/L)","field":"INT_CL",width:100},
//		{"title":"出水余氯(mg/L)","field":"OUT_CL",width:100},
//		{"title":"进水浊度","field":"INT_NTU",width:100},
//		{"title":"出水浊度","field":"OUT_NTU",width:100},
//		{"title":"进水流量(m3/h)","field":"INTFLOW",width:100},
//		{"title":"出水流量(m3/h)","field":"OUTFLOW",width:100}
//		
//	]];
	option = $.extend({}, easyuiGrid, option);
	
	$("#hisgrid").datagrid(option);
	
}

function initStationChoose() {
	$("#stationid").empty();
	$.each(stations, function(i, n) {
		$("#stationid").append("<option value='"+n.id+"'>"+n.name+"</option>");
	});
}

//初始化统计数据列表
function initStatGrid() {
	$("#feature").html("");
	executeAjaxUrlForResult("configlist/list", {data:{type:"gis_scada_stationStatFeature"},async:false}, function(data) {
		$.each(data.data, function(i, n) {
			var selection = $("<option value='" + n.value + "'>" + n.name + "</option>");
			$("#feature").append(selection);
		});
	});
	
	var option = {border:false, rownumbers:true};
	option.loadFilter = function(data) {
		if(data.data.length > 0) {
			return {total:data.data.length, rows:data.data};
		} else {
			return {total:0, rows:[]};
		}
	}
	option.frozenColumns = [[{"title":"时间","field":"startTime",width:150}]];
	var cols = stations;
	option.columns = [[]];
	$.each(cols, function(i, n) {
		option.columns[0].push({title:n.name, field:n.id});
	});
	option = $.extend({}, easyuiGrid, option);
	
	$("#statgrid").datagrid(option);
	
	$("#statgrid").datagrid("loadData", {data:[]});
}
var stationIdArr= [];
//初始化统计列
function initStatColumns() {
	var columns;
	$.each(stationType, function(i, n) {
		executeAjaxUrlForResult("device/listDeviceByDeviceType?deviceType="+n.value, {async:false}, function(data) {
			if (data.success) {
				for (var i=0; i< data.data.length; i++) {
					stationIdArr.push(parseInt(data.data[i].id)+"");
				}
			}
		});
	});
	
	executeAjaxUrlForResult("deviceAttr/list", {data:{id:stationIdArr},async:false}, function(data) {
		if (data.success) {
			columns = data.data;
			$.each(columns, function(i, n) {
				n.id = parseInt(n.id)+"";
			})
		}
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
				initCustomTimeChoose("#histimechose", '#hisstartTime', '#hisendTime');
			}
		} else if ($tli.attr("target") == "stat") {
			if (undefined ==$("#statgrid").attr("class") || $("#statgrid").attr("class").indexOf("datagrid") == -1) {
				initStatGrid();
				initCustomTimeChoose("#stattimechose", '#statstartTime', '#statendTime');
			}
		}
	});
}

function initCustomTimeChoose(expression, st, et) {
	//事件选择器
	$(expression).on("change", function(e) {
		var $ct = $(e.currentTarget);
		var $timechoose = $ct.parent().next();
		var $contentgrid = $ct.parent().parent().parent().next();
		var $tb = $($contentgrid.find("table.datagrid-f"));
		if ("custom" == $ct.val()) {
			$timechoose.show();
			
			initStEtTime(st, et)
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
	var params = {ids:$("#stationid").val()};
	if ("custom" == $("#histimechose").val()) {
		params.startTime = $("#hisstartTime").datetimebox("getValue") + ":00";
		params.endTime = $("#hisendTime").datetimebox("getValue") + ":00";
	} else {
		formateDate($("#histimechose").val(),params);
	}
	var url = setHisInv($("#hisinv").val(), params);
	hischarturl = "scada/commonSingleFeatureChart?id="+$("#stationid").val()+"&startTime="+params.startTime+"&endTime="+params.endTime+"&inv="+params.timeUnit+"&num="+params.interval+"&model="+params.model+"&c=rightStationHisCharts";
	$("#hisgrid").datagrid({url:url+"?_="+Math.random()+setRtName(),queryParams:params});
	$("#hisButton").removeAttr("disabled");
}

function setRtName() {
	var name = "";
	executeAjaxUrlForResult("deviceClass/getRtdList", {data:{cid:"2"},async:false}, function(data) {
		if (data.success) {
			$.each(data.data, function(i, n) {
				name+= "&rtName="+n.enname;
			});
		}
	});
	return name;
}

function setHisInv(value, params) {
	if (value == "orig") {
		return "historyData/getHistoryDataByIds";
	} else if (value == "5m") {
		params.timeUnit = "MINUTE";
		params.interval = 5;
		params.model = "orig";
		return "historyData/getHistoryDataByIds";
	} else if (value == "15m") {
		params.timeUnit = "MINUTE";
		params.interval = 15;
		params.model = "orig";
		return "historyData/getHistoryDataByIds";
	} else if (value == "1h") {
		params.timeUnit = "HOUR";
		params.interval = 1;
		params.model = "orig";
		return "historyData/getHistoryDataByIds";
	}
}
//查询统计数据
function queryStat() {
	var inv = $("#staInv").val().split("-");
	var params = {feature:$("#feature").val(),id:stationIdArr, inv:inv[1], num:inv[0]};
	if ("custom" == $("#stattimechose").val()) {
		params.startTime = $("#statstartTime").datetimebox("getValue") + ":00";
		params.endTime = $("#statendTime").datetimebox("getValue") + ":00";
	} else {
		formateDate($("#stattimechose").val(),params);
	}
	stacharturl = "scada/commonSingleFeatureChart?startTime="+params.startTime+"&endTime="+params.endTime+"&inv="+inv[1]+"&num="+inv[0]+"&type=stat&c=rightStationHisCharts&pointType=station";
	var temp = "&tid=";
	$.each(stationType, function(i, n) {
		temp += n.value;
		if(i != (stationType.length - 1)) {
			temp += ",";
		}
	});
	stacharturl += temp;
	$("#statgrid").datagrid({url:"Statistical/getStaByIds",queryParams:params});
	$("#statButton").removeAttr("disabled");
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

//初始化自定义时间
function initStEtTime(st, et) {
	var now = new Date();
	var nowstr = timeStamp2String(now, 'yyyy-MM-dd 00:00:00');
	var tomorrowstr = timeStamp2String(now, 'yyyy-MM-dd 23:59:59');
	$(st).datetimebox('setValue', nowstr);
	$(et).datetimebox('setValue', tomorrowstr);
}

//////////生成图表///////////
var hischarturl = "";

//打开图表页面
function openHisChart() {
	
	var iframewindow = self.parent.require('window/window').window({
		width:560,    
	    height:440,
	    left:$(self.parent.top.window).width()-1197,
	    top:'85px',
	    title:'&nbsp;&nbsp;&nbsp;统计图表',
	    style:{'overflow':'hidden'}
	});
	$(iframewindow).css("overflow","hidden");
	$(iframewindow).append('<iframe width="100%" height="100%" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no" allowtransparency="yes" src="'+hischarturl+'"></iframe>');
}


var stacharturl = "";
//打开图表页面
function openStaChart() {
	
	var iframewindow = self.parent.require('window/window').window({
		width:560,    
	    height:430,
	    left:$(self.parent.top.window).width()-1197,
	    top:'85px',
	    title:'&nbsp;&nbsp;&nbsp;统计图表'
	});
	$(iframewindow).css("overflow","hidden");
	$(iframewindow).append('<iframe width="100%" height="100%" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no" allowtransparency="yes" src="'+stacharturl+'"></iframe>');
	
//	self.parent.cw.open();
//	self.parent.cw.resize(550,400);
//	self.parent.cw.setTitle("统计图表");
//	self.parent.cw.setIframe(stacharturl);
	
}