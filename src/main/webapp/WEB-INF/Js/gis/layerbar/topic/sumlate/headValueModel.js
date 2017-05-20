define(['jquery', 'layerbar/topic/sumlate/const', 'layerbar/topic/sumlate/sumlate',"window/window","eventStack"],function($, con, sumlate,window,eventStack) {
	return {init:function(id) {
//		$("#search-content .nano-content table").empty();
//		f2net.window.clearTempLayer('PoiLayer');
//		sumlate.analysis(con.configLayer.headValue);
		eventStack.add({
			"id":id,
			"destroy":function(){
				$("#netModel").closeDialog({
					onclose:function(){
						sumlate.cleanAnalysis()
					}
				});
				sumlate.cleanAnalysis();
			},
			"init":function(){
				$("#netModel").showDialog({title:'总水头'});
				$("#search-content .nano-content table").empty();
				f2net.window.clearTempLayer('PoiLayer');
				sumlate.analysis(con.configLayer.headValue);
			}
		})//添加关闭功能
		.addRule({"id":id,"open":[id,'baselayer','countylayer','pipelayer','stationlayer','monitorlayer']})//制定规则
		.applyRule();//应用规则
	}};
	
});