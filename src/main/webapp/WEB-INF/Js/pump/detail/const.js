/**
 * 通用面板面板常量
 */
define(['jquery', 'util', 'easyui',],function($, util) {
	var panelStarttime = "";
	var panelEndtime = "";
	panelStarttime = util.getConfig("panelStarttime");
	panelEndtime = util.getConfig("panelEndtime");
	
	var startTime = "2015-12-09 00:00:00";
	var endTime = "2015-12-09 23:59:59";
	
	if (panelStarttime && panelEndtime) {
		startTime = panelStarttime;
		endTime = panelEndtime;
	} else {
		var date = new Date();
		startTime = util.timeStamp2String(new Date(), "yyyy-MM-dd 00:00:00");
		endTime = util.timeStamp2String(new Date(), "yyyy-MM-dd HH:mm:ss");
	}
	var cid = util.GetQueryString('cid');
	
	//实时数据属性
	var tempRtd = util.getConfigList("rtdAttr_"+cid);
	var rtdTitle = [];
	$.each(tempRtd, function(i, n) {
		var rtd = {"title":n.value,"field":n.name,"remark":n.remark};
		rtdTitle.push(rtd);
	});
	
	var id = util.GetQueryString('id');
	
	//静态属性
	var staticAttr = util.getConfigList("staticAttr_"+cid);
	
	var rtdTime= {"title":"时间","field":"startTime","width":150};
	var rtdAttr = [];

	var tempCurveAttr = util.getConfigList("curveAttr_"+cid);
	var curveAttr = [];
	$.each(tempCurveAttr, function(i, n) {
		var curve = {"title":n.value,"field":n.name,"unit":n.remark};
		rtdAttr.push(n.name);
		curveAttr.push(curve);
	});
	
	var historyurl = 'historyData/getHistoryDataByIds';
	var griddata;
	initData();
	function initData() {
		util.executeAjaxUrlForResult(historyurl, {"data":{ids:id,startTime:startTime,endTime:endTime,timeUnit:"minute",interval:"15",rtName:rtdAttr}, async:false}, function(data) {
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