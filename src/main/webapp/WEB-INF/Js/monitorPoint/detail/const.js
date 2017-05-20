define(['jquery', 'util', 'easyui',],function($, util) {
//	var startTime = "2015-11-11 00:00:00";
//	var endTime = "2015-11-12 00:00:00";
	var panelStarttime = "";
	var panelEndtime = "";
	panelStarttime = util.getConfig("panelStarttime");
	panelEndtime = util.getConfig("panelEndtime");
	
	var datetime = new Date(); 
		var year = datetime.getFullYear();
		var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
		var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
		panelStarttime = year+"-"+month+"-"+date+" 00:00:00";
	    panelEndtime=year+"-"+month+"-"+date+" 23:59:59"
	var startTime = "2016-05-13 00:00:00";
	var endTime = "2016-05-14 00:00:00";
	
	if (panelStarttime && panelEndtime) {
		startTime = panelStarttime;
		endTime = panelEndtime;
	} else {
		var date = new Date();
		startTime = util.timeStamp2String(new Date(), "yyyy-MM-dd") + " 00:00:00";
		endTime = util.timeStamp2String(new Date(), "yyyy-MM-dd HH:mm:ss");
	}
	//实时数据属性
	var rtdTitle = [];
	var rtdAttr = [];
	var curveAttr = [];
	util.executeAjaxUrlForResult("deviceClass/getRtdList", {data:{cid: "20"}, async: false}, function(result) {
		$.each(result.data, function(i, n) {
			rtdTitle.push({"title":n.chname,"field":n.enname});
			rtdAttr.push(n.enname);
			curveAttr.push({"title":n.chname,"field":n.enname,"unit":(null!=n.unit?n.unit:"")});
		});
	});
	
//	var rtdTitle = [
//        {"title":"累积工作时间","field":"accumulatedTime"},
//		{"title":"故障状态","field":"faultState"},
//		{"title":"流量","field":"instantFlow"},
//		{"title":"压力","field":"pressure"},
//		{"title":"正累积流量","field":"forwardCumulativeFlow"},
//		{"title":"负累积流量","field":"reverseCummulativeFlow"},
//		{"title":"累计流量","field":"accumulatedFlow"},
//	];
	var id = util.GetQueryString('id');
	
//	var staticAttr = {
//			simNum:{value:"sim卡号"},
//			name:{value:"名称"},
//			longitude_84:{value:"经度"},
//			latitude_84:{value:"纬度"},
//			deviceElevation:{value:"设备高程"},
//			levelType:{value:"层级类别"}
//	}
	var staticAttr = {};
	util.executeAjaxUrlForResult("deviceClass/list", {data:{cid: "3"}, async: false}, function(result) {
		$.each(result.data, function(i, n) {
			$(staticAttr).attr(n.enname, {value: n.chname}); 
		});
	});
	var rtdTime= {"title":"时间","field":"startTime","width":150};
//	var rtdAttr = ["accumulatedTime","faultState","instantFlow","pressure","forwardCumulativeFlow","reverseCummulativeFlow","accumulatedFlow","NMARKDATA"];
//	var curveAttr = [
////		{"title":"累积工作时间","field":"accumulatedTime"},
////		{"title":"故障状态","field":"faultState"},
//		{"title":"流量","field":"instantFlow","unit":"m3/h"},
//		{"title":"压力","field":"pressure","unit":"MPa"},
//		{"title":"正累积流量","field":"forwardCumulativeFlow","unit":"m3"},
//		{"title":"负累积流量","field":"reverseCummulativeFlow","unit":"m3"},
//		{"title":"累积流量","field":"accumulatedFlow","unit":"m3"},
//	];
	var historyurl = 'historyData/getHistoryDataByIds';
	var griddata;
	initData();
	function initData() {
		util.executeAjaxUrlForResult(historyurl, {"data":{ids:id,startTime:startTime,endTime:endTime,timeUnit:"minute",interval:"15",rtName:rtdAttr},"async":false}, function(data) {
			griddata = data.data[id];
		});
	}
	
	return {
		rtdTitle:rtdTitle,
		id:id,
		staticAttr:staticAttr,
		rtdTime:rtdTime,
		griddata:griddata,
		curveAttr : curveAttr,
		startTime:startTime,
		endTime:endTime,
		historyurl:historyurl,
		initData:initData,
		rtdAttr:rtdAttr
	};
})