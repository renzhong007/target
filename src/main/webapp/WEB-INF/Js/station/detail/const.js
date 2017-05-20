/**
 * 通用面板面板常量
 */
define(['jquery', 'util', 'easyui',],function($, util) {
	var panelStarttime = "";
	var panelEndtime = "";
	//panelStarttime = util.getConfig("panelStarttime");
	//panelEndtime = util.getConfig("panelEndtime");
	

	
	if (panelStarttime && panelEndtime) {
		startTime = panelStarttime;
		endTime = panelEndtime;
	} else {
		var date = new Date();
		startTime = util.timeStamp2String(new Date(), "yyyy-MM-dd") + " 00:00:00";
		endTime = util.timeStamp2String(new Date(), "yyyy-MM-dd HH:mm:ss");
	}
	//测试时间
	//var startTime = "2016-11-18 00:00:00";
	//var endTime = "2016-11-18 23:59:59";
	//实时数据属性
	var rtdTitle = [];
	var rtdAttr = [];
	var curveAttr = [];
	util.executeAjaxUrlForResult("deviceClass/getRtdList", {data:{cid: "2"}, async: false}, function(result) {
		$.each(result.data, function(i, n) {
			rtdTitle.push({"title":n.chname,"field":n.enname});
			rtdAttr.push(n.enname);
			if(n.chname.indexOf("累计") == -1) {
				curveAttr.push({"title":n.chname,"field":n.enname,"unit":(null!=n.unit?n.unit:"")});
			}
		});
	});
	
//	var rtdTitle = [
//        {"title":"出水压力","field":"OUT_PRESS"},
//		{"title":"进水压力","field":"INT_PRESS"},
//		{"title":"进水余氯","field":"INT_CL"},
//		{"title":"出水余氯","field":"OUT_CL"},
//		{"title":"进水浊度","field":"INT_NTU"},
//		{"title":"出水浊度","field":"OUT_NTU"},
//		{"title":"进水流量","field":"INTFLOW"},
//		{"title":"出水流量","field":"OUTFLOW"},
//		{"title":"复线流量","field":"OUTFLOW2"}
//	];
	var id = util.GetQueryString('id');
	
//	var stationId = [23,24,25,26,27,28];  //泵站id
//	var pointId=[150,151,152,153,154,155,156,157,158,159,160,208];//掘兵路
	//静态属性
//	var staticAttr = {
//			LATITUDE:{value:"纬度"},
//			LONGITUDE:{value:"经度"},
//			SHORT:{value:"简称"},
//			INTERVAL:{value:"时间间隔"},
//			ADDRESS:{value:"地址"}
//	}
	var staticAttr = {};
	util.executeAjaxUrlForResult("deviceClass/list", {data:{cid: "2"}, async: false}, function(result) {
		$.each(result.data, function(i, n) {
			$(staticAttr).attr(n.enname, {value: n.chname}); 
		});
	});
	var rtdTime= {"title":"时间","field":"startTime","width":150};
//	var rtdAttr = ["INT_PRESS","OUT_PRESS","INT_CL","OUT_CL","INT_NTU","OUT_NTU","INTFLOW","OUTFLOW","INTFLOWSUM","OUTFLOWSUM","INTFLOWSUMT","OUTFLOWSUMT","INPUTPH","OUTPH","RESERVEOUTPUTFLOW","OUTFLOWSUM2","OUTFLOWSUMT2","OUTFLOWSUM3","DDSUM","TANK_CL","CLZY_PRESS","OUTFLOW2","NPRESSURE","NMARKDATA"];
//	var curveAttr = [
//		{"title":"出水压力","field":"OUT_PRESS","unit":"MPa"},
//		{"title":"进水压力","field":"INT_PRESS","unit":"MPa"},
//		{"title":"进水余氯","field":"INT_CL","unit":"mg/L"},
//		{"title":"出水余氯","field":"OUT_CL","unit":"mg/L"},
//		{"title":"进水浊度","field":"INT_NTU","unit":"NTU"},
//		{"title":"出水浊度","field":"OUT_NTU","unit":"NTU"},
//		{"title":"进水流量","field":"INTFLOW","unit":"m3/h"},
//		//没有出口流量?
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