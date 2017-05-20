var id = GetQueryString("id");
var startTime = GetQueryString("startTime");
var endTime = GetQueryString("endTime");
var rtdAttr = [];
var inv = GetQueryString("inv");
var num = GetQueryString("num");
var model = GetQueryString("model");
var pointType = GetQueryString("pointType");
var data = [];
var c = GetQueryString("c");
var tid = GetQueryString("tid");
var layername = GetQueryString("layername");
var layervalue = GetQueryString("layervalue");
var formate = "HH:mm";
var featureMap = {};
var tickInv = 10;
var objs = {};

var type = GetQueryString("type");
$(function() {
	var featureConfig = getConfigList(c);
	featureMap = tranFeature(featureConfig);
	if (!type) type = "his";
	if (type == "his") {
		initHistoryData();
	} else if (type="stat") {
		objs = initObjs(tid);
		initStaticData();
		
	}
	
	drawChart();
});

function tranFeature(featureConfig) {
	var obj = {};
	$.each(featureConfig, function(i, n) {
		obj[n.value] = n;
		rtdAttr.push(n.value);
		setSelect(n);
	});
	return obj;
}
//初始化下拉菜单
function setSelect(obj) {
	$("#feature").append("<option value='"+obj.value+"'>"+obj.name+"</option>");
}

//获取数据
function initHistoryData() {
	var params = {ids:id, startTime:startTime, endTime:endTime, rtName:rtdAttr, timeUnit:inv, interval:num, model:model};
	executeAjaxUrlForResult("historyData/getHistoryDataByIds", {data:params, async:false}, function(result) {
		data = result.data[id];
	});
}

//获取数据
function initStaticData() {
	var idarr = [];
	for (var id in objs) {
		idarr.push(id);
	}
	
	var params = {startTime:startTime, endTime:endTime, feature:$("#feature").val(),id:idarr, inv:inv, num:num};
	executeAjaxUrlForResult("Statistical/getStaByIds", {data:params, async:false}, function(result) {
		data = result.data;
	});
}

//绘制曲线
function drawChart() {
	var cate = generalCategories();
	var option = {xAxis:{categories:cate, tickInterval: 3},series:[], title:{}, yAxis:[]};
	
	if (type=="his") {
		var obj = generalChartData(data, $("#feature").val(), inv, num);
		obj.type = "line";
		obj.name = featureMap[$("#feature").val()].name;
		option.series.push(obj);
	} else if (type == "stat") {
		initStaticData();
		for (var name in objs) {
			if (name == "startTime") continue;
			var obj = generalChartData(data, name, inv, num);
			obj.type = "line";
			obj.name = objs[name];
			option.series.push(obj);
		}
	}
	
	option.title.text = featureMap[$("#feature").val()].name;
	
	var yobj = {min: 0, title: {text: featureMap[$("#feature").val()].name}};
	option.yAxis.push(yobj);
	//console.log(option);
	initChart("#singleChart", option);
}

//totalCount: xAxis的节点总数
//tickCount: TickInterval最多不超过tickCount数，默认是7
function getTickInterval(totalCount, tickCount) {
 tickCount = tickCount || 7;
 return totalCount > tickCount ? ~~ ((totalCount + tickCount - totalCount % tickCount) / tickCount): null
}

//根据时间生成X坐标
function generalCategories() {
	var cate = [];
	var timeName = 'REPORTTIME';
	if ('startTime' in data[0] ) {
		timeName = 'startTime';
	}
	
	var st = toDate(startTime);
	if (data[data.length - 1][timeName]) {
		st = toDate(data[data.length - 1][timeName]);
	}
	
	var et = toDate(endTime);
	if (data[0][timeName]) {
		et = toDate(data[0][timeName]);
	}
	
	while( st.getTime() <= et.getTime() ) {
		cate.push(timeStamp2String(st, formate));
		var intervel = getBase(inv) * num;
		st = dateAdd(intervel, st);
	}
//	traTime(inv, num, function(time) {
//		cate.push(timeStamp2String(time, formate));
//	});
	return cate;
}

/**
 * 根据参数遍历时间，并每次
 */
function traTime(inv, num, callback) {
	var timeName = 'REPORTTIME';
	if ('startTime' in data[0] ) {
		timeName = 'startTime';
	} 
	
	var st = toDate(startTime);
	if (data[data.length - 1][timeName]) {
		st = toDate(data[data.length - 1][timeName])
	}
	var et = toDate(endTime);
	while( st.getTime() < et.getTime() ) {
		callback(st);
		var base = getBase(inv);
		st = dateAdd(base * num, st);
	}
}
/**
 * 根据间隔时间单位获取毫秒数
 * @param formate
 * @returns {Number}
 */
function getBase(formate) {
	if (formate == "mi") {
		return 1000 * 60;
	} else if (formate == "h") {
		return 1000 * 60 * 60;
	} else if (formate == "HOUR") {
		return 1000 * 60 * 60;
	} else if (formate == "MINUTE") {
		return 1000 * 60;
	}
}

//匹配曲线数据
function generalChartData(data, key, inv, num) {
	var obj = {};
	obj.type = 'line';
	obj.name="压力";
	obj.data = [];
	var timeName = 'REPORTTIME';
	if ('startTime' in data[0] ) {
		timeName = 'startTime';
	}
	
	$.each(data.reverse(), function(i, n) {
		if(n[key]) {
			obj.data.push(parseFloat(n[key]));
		} else {
			obj.data.push(null);
		}
	});
	
	data.reverse();
//	var index = 0;
//	traTime(inv, num, function(st) {
//		
//		while (mergeData(st,obj) == 2) {
//			index++;
//		}
//		
//	});
//	
//	function mergeData(st,obj) {
//		var row = data[index];
//		if (!row) {
//			obj.data.push(null);
//			return 0 ; 
//		}
//		var dt = toDate(data[index][timeName]);
//		if (row[key]) {
//			
//			if (timeStamp2String(st, formate) == timeStamp2String(dt, formate)) {
//				obj.data.push(parseFloat(row[key]));
//				return 1;
//			} else if ( (dt.getTime() - st.getTime()) > (getBase(inv) * (num - 0.0001)) ) {
//				obj.data.push(null);
//				return 0;
//			}
//			return 2;
//		} else {
//			if ( (dt.getTime() - st.getTime()) > (getBase(inv) * (num - 0.01)) ) {
//				obj.data.push(null);
//				return 0;
//			} else {
//				return 2;
//			}
//		}
//	}
	//console.log(obj.data);
	return obj;
	
}



//初始化统计对象
function initObjs(tid) {
	var columns = {};
	if (layervalue && layername) {
		executeAjaxUrlForResult("device/listDeviceByAttr?name="+layername+"&value="+layervalue+"&deviceType=3", {async:false}, function(data) {
			$.each(data.data, function(i, n) {
				columns[n.id] = n.name;
			})
		});
	} else {
		var stationIdArr = [];
		var deviceTypes = tid.split(",");
		$.each(deviceTypes, function(i, n) {
			executeAjaxUrlForResult("device/listDeviceByDeviceType?deviceType="+n, {async:false}, function(data) {
				if (data.success) {
					for (var i=0; i< data.data.length; i++) {
						stationIdArr.push(parseInt(data.data[i].id)+"");
					}
				}
			});
		});
		
		executeAjaxUrlForResult("deviceAttr/list", {data:{id:stationIdArr},async:false}, function(data) {
			if (data.success) {
				$.each(data.data, function(i, n) {
					columns[n.id] = n.name;
				});
			}
		});
	}
	
	return columns;
}

