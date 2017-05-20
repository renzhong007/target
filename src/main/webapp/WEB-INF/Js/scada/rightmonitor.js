var monitors;
var columns = [];
var hisColumns = [];
var x;
var y;
var due = 60 * 1000 * 60;
var rtatts=["NPRESSURE", "NMARKDATA", "FLOW"];
var stationType;
//格式化方法集合
var formatter = {
		fixt:function(value, row, index) {
			var f = parseFloat(value + "");
			return f.toFixed(3);
		},
		fixo:function(value, row, index) {
			var f = parseFloat(value + "");
			return f.toFixed(1);
		},
		fixz:function(value, row, index) {
			var f = parseFloat(value + "");
			return f.toFixed(0);
		},
		overdue:function(value, row, index) {
			var timeName='REPORTTIME';
			if ('startTime' in row) {
				timeName = 'startTime';
			}
			var str = row[timeName];
			str = str.replace(/-/g,"/");
			var date = new Date(str );
			var now = new Date();
			if ((now.getTime() - date.getTime()) > due) {
				return '<span style="color:#ccc">'+value+'</span>';
			} else {
				return value;
			}
		}
}
$(function() {
	// 获取XY的属性名称
	x = getConfig("monitorX");
	y = getConfig("monitorY");
	
	stationType = getConfigList("gis_stationTypeConfig");
	
	var queryTypes = getConfigList("queryType");
	setMonitorQueryType(queryTypes);
	
	changeQueryTypeHis();
	//获取表头配置文件
	columns = initColumns("gisTopicMonitorGrid");
	hisColumns = initColumns("gisMonitorGridHis");
	//初始化tab页
	initTabs();
	initRealTimeGrid();
	monitors = initMonitorColumns();
	
	queryRealTime();
});
//////////////////////////实时数据操作方法//////////////////////////////////



// 获取表头配置文件
function initColumns(type) {
	var gridcolumns = [];
	executeAjaxUrlForResult("configlist/list", {data:{type:type}, async:false}, function(data) {
		$.each(data.data, function(i, n) {
			var c = {"title":n.name,"field":n.value,width:100};
			var funcnames = [];
			if (n.remark) {
				var str = n.remark.split(",");
				if (str.length > 0) {
					for (var i=0; i < str.length; i++) {
						if (str[i] in formatter) {
							funcnames.push(str[i]);
						}
					}
				}
			}
			c.formatter = function (value, row, index) {
				if (value) {
					$.each(funcnames, function(i, n) {
						value = formatter[n](value, row, index);
					});
					return value;
				}
				
			}
			gridcolumns.push(c);
			
		});
	});
	return gridcolumns;
}


//初始化实时数据列表
function initRealTimeGrid() {
	
	
	var option = {border:false,rownumbers:true};
	option.loadFilter = function(data) {
//		var dataarr = [];
//		var datamap = {};
		//处理相同名称的数据合并
//		$.each(data.data, function(i, n) {
//			if (n.NAME in datamap) {
//				datamap[n.NAME] = $.extend(datamap[n.NAME],n);
//			} else {
//				datamap[n.NAME] = n;
//			}
//		});
//		for (var name in datamap) {
//			dataarr.push(datamap[name]);
//		}
//		
		return {total:data.length, rows:data};
	}
	option.frozenColumns = [[{"title":"名称","field":"name",width:200}]];
	option.columns = [[
	]];
	if (columns.length > 0) {
		option.columns = [columns];
	}
	
	option.onSelect = function(index, row) {
		if (row.longitude_84 && row.latitude_84 &&"0" != row.longitude_84 && "0" != row.latitude_84) {
			self.parent.f2net.window.locateWithXY(row.longitude_84,row.latitude_84);
			//console.log(row[x]+","+row[y]);
			self.parent.f2net.window.setLevel(15);
		} else {
			alert("该监测点没有关联经纬度，请联系管理员进行修改！");
		}
	}
	option = $.extend({}, easyuiGrid, option);
	
	$("#rtgrid").datagrid(option);
}

var monitorIds = [];

/**
 * 格式化id
 */
function parseIds() {
	var paramsIds = "";
	$.each(monitorIds, function(i, n) {
		if (i==0) {
			paramsIds += "id="+n;
		} else {
			paramsIds += "&id="+n
		}
	});
	return paramsIds;
}

/**
 * 查询实时数据对象id
 */
function queryIdsRTD() {
	monitorIds = [];
	var arr = queryIds($("#queryType").val());
	$.each(arr, function(i, n) {
		monitorIds.push(n.id);
		
	});
}



/**
 * 查询实时数据
 */
function queryRealTime() {
	$("#rtgrid").datagrid("loading");
	queryIdsRTD();
	
	if (monitorIds.length > 0) {
		executeAjaxUrlForResult("realTimeData/getByIds", {data:parseIds()}, function(result) {
			var arr = queryIds($("#queryType").val());
			$.each(arr, function(i, n) {
				$.each(result.data, function(i, result) {
				if(result.id==n.id){
					result.name=n.name;
				}			
				});	
			});
			$("#rtgrid").datagrid("loaded");
			$("#rtgrid").datagrid("loadData",result.data);
			
		});
	} else {
		$("#rtgrid").datagrid("loaded");
		$("#rtgrid").datagrid("loadData",[]);
		
	}
	
}

//////////////////////////实时数据操作方法结束//////////////////////////////////
//////////////////////////历史数据操作方法开始//////////////////////////////////
var hischarturl = "";
//初始化历史数据列表
function initHistoryGrid() {
//	initStationChoose();
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
	option.frozenColumns = [[{"title":"时间","field":"startTime",width:150}]];
	option.columns = [[
		{"title":"压力(MPa)","field":"NPRESSURE",width:100},
		{"title":"流量(m3/h)","field":"FLOW",width:100},
		{"title":"累计流量(m3)","field":"NMARKDATA",width:100}
	]];
	if (hisColumns.length > 0) {
		option.columns = [hisColumns];
	}
	option = $.extend({}, easyuiGrid, option);
	
	$("#hisgrid").datagrid(option);
	
}

function initStationChoose() {
	$("#monitor").empty();
	$.each(monitors, function(i, n) {
		$("#monitor").append("<option value='"+n.ID+"'>"+n.NAME+"</option>");
	});
	
}
//查询历史数据
function queryHis() {
	var params = {ids:$("#monitor").val()};
	if ("custom" == $("#histimechose").val()) {
		params.startTime = $("#hisstartTime").datetimebox("getValue") + ":00";
		params.endTime = $("#hisendTime").datetimebox("getValue") + ":00";
	} else {
		formateDate($("#histimechose").val(),params);
	}
	
//	params.rtdAttr = rtatts;
	var url = setHisInv($("#hisinv").val(), params);
	
	hischarturl = "scada/commonSingleFeatureChart?id="+$("#monitor").val()+"&startTime="+params.startTime+"&endTime="+params.endTime+"&inv="+params.timeUnit+"&num="+params.interval+"&model="+params.model+"&c=rightMonitorHisCharts";
	$("#hisgrid").datagrid({url:url+"?_="+Math.random()+setRtName(),queryParams:params});
	$("#hisButton").removeAttr("disabled");
}

function setRtName() {
	var name = "";
	var ops = $("#hisgrid").datagrid('options');
	$.each(ops.columns[0], function(i, n) {
		name+= "&rtName="+n.field;
	});
	return name;
}

//打开图表页面
function openHisChart() {
	
	var iframewindow = self.parent.require('window/window').window({
		width:560,    
	    height:430,
	    left:$(self.parent.top.window).width()-1197,
	    top:'85px',
	    title:'&nbsp;&nbsp;&nbsp;统计图表'
	});
	$(iframewindow).css("overflow", "hidden");
	$(iframewindow).append('<iframe width="100%" height="100%" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no" allowtransparency="yes" src="'+hischarturl+'"></iframe>');
}

/**
 * 修改查询类别获取对象信息
 */
function changeQueryTypeHis() {
	var str = $("#queryTypeHis").val();
	var arr = queryIds(str);
	$("#monitor").empty();
	$.each(arr, function(i, n) {
		$("#monitor").append('<option value="'+n.id+'">'+n.name+'</option>')
	});
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

//////////////////////////历史数据操作方法结束//////////////////////////////////
//////////////////////////统计数据操作方法开始//////////////////////////////////
function changeQueryTypeStat() {
//	var columns = [];
//	var arr = queryIds($("#queryTypeStat").val());
//	$.each(arr, function(i, n) {
//		columns.push({title:n.name, field:n.id});
//	});
//	$("#statgrid").datagrid({columns:[columns]});
	initStatGrid();
}

//初始化统计数据列表
function initStatGrid() {
	$("#feature").html("");
	executeAjaxUrlForResult("configlist/list", {data:{type:"gis_scada_monitorStatFeature"},async:false}, function(data) {
		$.each(data.data, function(i, n) {
			var selection = $("<option value='" + n.value + "'>" + n.name + "</option>");
			$("#feature").append(selection);
		});
	});
	
	var option = {border:false,url:"",rownumbers:true};
	option.loadFilter = function(data) {
		return {total:data.data.length, rows:data.data};
	}
	option.frozenColumns = [[{"title":"时间","field":"startTime",width:150}]];
	var cols = queryIds($("#queryTypeStat").val());
	option.columns = [[]];
	statMonitorIds = [];
	$.each(cols, function(i, n) {
		option.columns[0].push({title:n.name, field:n.id + ""});
		statMonitorIds.push(n.id);
	});
	option = $.extend({}, easyuiGrid, option);
	
	$("#statgrid").datagrid(option);
}


var statMonitorIds = [];
//查询统计数据
function queryStat() {
	
	var paramsSec = $("#queryTypeStat").val().split(",");
	
	var inv = $("#staInv").val().split("-");
	var params = {feature:$("#feature").val(),id:statMonitorIds, inv:inv[1], num:inv[0]};
	if ("custom" == $("#stattimechose").val()) {
		params.startTime = $("#statstartTime").datetimebox("getValue") + ":00";
		params.endTime = $("#statendTime").datetimebox("getValue") + ":00";
	} else {
		formateDate($("#stattimechose").val(),params);
	}
	stacharturl = "scada/commonSingleFeatureChart?startTime="+params.startTime+"&endTime="+params.endTime+"&inv="+inv[1]+"&num="+inv[0]+"&type=stat&c=rightMonitorStaCharts&pointType=monitor&tid=3&layername="+paramsSec[0]+"&layervalue="+paramsSec[1];
	$("#statgrid").datagrid({url:"Statistical/getStaByIds",queryParams:params});
	$("#statButton").removeAttr("disabled");
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
	$(iframewindow).css("overflow", "hidden");
	$(iframewindow).append('<iframe width="100%" height="100%" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no" allowtransparency="yes" src="'+stacharturl+'"></iframe>');
	
}
//////////////////////////统计数据操作方法结束//////////////////////////////////


//////////////////////////通用方法开始//////////////////////////////////
/**
 * 设置查询类别
 */
function setMonitorQueryType(qts) {
	$.each(qts, function(i,n) {
		$("#queryType").append('<option value="'+n.name+','+n.value+'">'+n.value+'</option>');
		$("#queryTypeHis").append('<option value="'+n.name+','+n.value+'">'+n.value+'</option>');
		$("#queryTypeStat").append('<option value="'+n.name+','+n.value+'">'+n.value+'</option>');
		
	});
	
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
				initCustomTimeChoose("#stattimechose", '#statstartTime','#statendTime');
			}
		}
	});
}

//初始化获取监测点
function initMonitorColumns() {
	var columns;
	var stationIdArr=[];
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
				n.ID = n.id;
			})
		}
	});
	return columns;
}

function initCustomTimeChoose(expression, st, et) {
	//时间选择器
	$(expression).on("change", function(e) {
		var $ct = $(e.currentTarget);
		var $timechoose = $ct.parent().next();
		var $contentgrid = $ct.parent().parent().parent().next();
		var $tb = $($contentgrid.find("table.datagrid-f"));
		if ("custom" == $ct.val()) {
			$timechoose.show();
			//初始化时间
			initStEtTime(st, et);
			
			$contentgrid.css("top","91px");
			$tb.datagrid("resize");
		} else {
			$timechoose.hide();
			$contentgrid.css("top","61px");
			$tb.datagrid("resize");
		}
	});
}

//初始化自定义时间
function initStEtTime(st, et) {
	var now = new Date();
	var nowstr = timeStamp2String(now, 'yyyy-MM-dd 00:00:00');
	var tomorrowstr = timeStamp2String(dateAdd(1000 * 60 * 60 * 24, now), 'yyyy-MM-dd 00:00:00');
	$(st).datetimebox('setValue', nowstr);
	$(et).datetimebox('setValue', tomorrowstr);
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

/**
 * 根据类型查询对象
 */
function queryIds(obj) {
	var arr = [];
	var params = obj.split(",");
	executeAjaxUrlForResult("device/listDeviceByAttr", {data:{name:params[0],value:params[1], deviceType:20}, async:false}, function(result) {
		$.each(result.data, function(i, n) {
			arr.push(n);
		});
	});
    executeAjaxUrlForResult("device/listDeviceByAttr", {data:{name:params[0],value:params[1], deviceType:12}, async:false}, function(result) {
		$.each(result.data, function(i, n) {
			arr.push(n);
		});
	});
	return arr;
}

//////////////////////////通用方法结束//////////////////////////////////