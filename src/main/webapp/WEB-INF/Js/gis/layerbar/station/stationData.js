define(['layerbar/station/defaultData','eventStack','util'],function(requestDefaultData,eventStack,util) {
	var id = [];  //泵站id 23,24,25,26,27,28
	$.each(util.getConfigList("gis_stationTypeConfig"), function(i, n) {
		util.executeAjaxUrlForResult("device/listDeviceByDeviceType", {data:{deviceType: n.value}, async: false}, function(result) {
			$.each(result.data, function(index, idValue) {
				id.push(parseInt(idValue.id) + "");
			});
		});
	});
//	var keyPoints = [];
//	$.each(util.getConfigList("gis_keyPointConfig"), function(i, n) {
//		keyPoints.push(n.value);
//	});
//	var ids = util.getConfigList("gis_initStationId");
//	$.each(ids, function(i, n) {
//		id.push(n.value);
//	});
//	var pointId=[150,151,152,153,154,155,156,157,158,159,160,208];//掘兵路
	var name=[];//实时字段名  'OUT_PRESS','OUTFLOW'
	var attrs = util.getConfigList("gis_initStationAttr");
//	var pointName=['pressure','instantFlow'];
	var config={
		option:[{
				"url":"realTimeData/getByIds?id="+id+"&rtName="+name,
				"param":{},
				"layername":"",
				"x":"longitude_84",
				"y":"latitude_84",
				"gisToolTypeProperty":"value",
				"name":"name",
				"values":[
			  	    {"name":"outPressure","time":"startTime","title":"压力",formatter:"fixt","dependency":"1"},
			  	    {"name":"outPressure2","time":"startTime","title":"压力2",formatter:"fixt","dependency":"1"},
			  	    {"name":"outInstantFlow","time":"startTime","title":"流量",formatter:"fixo","dependency":"1"},
			  	    {"name":"outInstantFlow2","time":"startTime","title":"流量2",formatter:"fixo","dependency":"1"}
			  	],
				"layers":[
					{"name":"RDSWStationPointLayer","gra":"StationPointGra","id":"Station1","visible":true}
				]
			}
//			{
//				"url":"realTimeData/getByIds?id="+keyPoints,
//				"param":{},
//				"layername":"",
//				"x":"longitude_84",
//				"y":"latitude_84",
//				"gisToolTypeProperty":"value",
//				"name":"name",
//				"values":[
//			  	    {"name":"pressure","time":"startTime","title":"压力",formatter:"fixt"}
//			  	],
//				"layers":[
//					{"name":"TaiDaStationPointLayer","gra":"TaiDaStationPointGra","id":"TaiDaMonitor","visible":true}
//				]
//			}
		]
	}
	config.option[0].values = [];
	$.each(attrs, function(i, n) {
		name.push(n.value);
		config.option[0].values.push({"name":n.value,"time":"startTime","title":n.name,formatter:n.remark,"dependency":n.dependency});
	});
	
	function updateLayer() {
		//确认图层的可视情况.layers
		$.each(config.option,function(i,n){
			try{
				$.each(n.layers||[],function(i1,n1){
					if (n1["visible"]) {
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
		updateLayer:updateLayer,
		init: function(id) {
			eventStack.add({
				"id":id,
				"destroy":function(){
					$.each(config.option[0].layers, function(i, n) {
						f2net.window.setLayerServiceVisible(n.name,false);
					});
					
				},
				"init":function(){
					$.each(config.option[0].layers, function(i, n) {
						f2net.window.setLayerServiceVisible(n.name,true);
					});
				}
			})//添加关闭功能
			.addRule({"id":id,"open":['ALL']})//制定规则
		}
	}
	return obj;
});