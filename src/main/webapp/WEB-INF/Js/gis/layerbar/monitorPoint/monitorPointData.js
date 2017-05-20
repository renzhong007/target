define(['layerbar/monitorPoint/defaultData','eventStack','util'],function(requestDefaultData,eventStack,util) {
	var pointId = [];//掘兵路   150,151,152,153,154,155,156,157,158,159,160,208
	util.executeAjaxUrlForResult("device/listDeviceByDeviceType", {data:{deviceType: "20"},async: false}, function(result) {
		$.each(result.data, function(i, n) {
			pointId.push(parseInt(n.id));
		});
	});
	util.executeAjaxUrlForResult("device/listDeviceByDeviceType", {data:{deviceType: "12"},async: false}, function(result) {
		$.each(result.data, function(i, n) {
			pointId.push(parseInt(n.id));
		});
	});
	
	var pointName=[];
	var attrs = util.getConfigList("gis_initPointAttr");
	$.each(attrs, function(i, n) {
		pointName.push(n.value);
	});
	var keyPoints = [];
	$.each(util.getConfigList("gis_keyPointConfig"), function(i, n) {
		keyPoints.push(n.value);
	});
	var config={
			option:[
				{
					"url":"realTimeData/getByIds?id="+pointId+"&rtName="+pointName,
					"param":{},
					"layername":"",
					"x":"longitude_84",
					"y":"latitude_84",
					"gisToolTypeProperty":"value",
					"name":"name",
					"values":[
				  	    {"name":"pressure","time":"startTime","title":"压力",formatter:"fixt"}
			//	  	    {"name":"instantFlow","time":"startTime","title":"流量",formatter:"fixo"}
				  	],
					"layers":[
						{"name":"RDSWMonitorPointLayer","gra":"MonitorPoint","id":"Monitor2","visible":true}
					]
				},
				{
					"url":"realTimeData/getByIds?id="+keyPoints,
					"param":{},
					"layername":"",
					"x":"longitude_84",
					"y":"latitude_84",
					"gisToolTypeProperty":"value",
					"name":"name",
					"values":[
				  	    {"name":"pressure","time":"startTime","title":"压力",formatter:"fixt"}
				  	],
					"layers":[
						{"name":"TaiDaStationPointLayer","gra":"TaiDaStationPointGra","id":"TaiDaMonitor","visible":true}
					]
				}
	]
	}
	config.option[0].values = [];
	
	$.each(attrs, function(i, n) {
		config.option[0].values.push({"name":n.value,"time":"startTime","title":n.name,formatter:n.remark,"dependency":n.dependency});
	});
	
	function updateMonitorLayer() {
		//确认图层的可视情况.layers
		$.each(config.option,function(i,n){
			try{
				$.each(n.layers,function(i1,n1){
					if ("visible" in n1) {
						if (!n1.visible){
							f2net.window.setTempLayerVisible(n1.name,false);
						}
					}
					requestDefaultData(n);
				})
			}catch(e){
				
			}
		})
	}
	var obj = {
		updateMonitorLayer:updateMonitorLayer,
		init: function(id) {
			eventStack.add({
				"id":id,
				"destroy":function(){
					$.each(config.option, function(i, n) {
						f2net.window.setLayerServiceVisible(n.layers[0].name,false);
					});
					
				},
				"init":function(){
					$.each(config.option, function(i, n) {
						f2net.window.setLayerServiceVisible(n.layers[0].name,true);
					});
				}
			})//添加关闭功能
			.addRule({"id":id,"open":['ALL']})//制定规则
		}
	}
	return obj;
});