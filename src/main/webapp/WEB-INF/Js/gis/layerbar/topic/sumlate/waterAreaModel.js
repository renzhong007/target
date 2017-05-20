//供水分区
define(['jquery', 'layerbar/topic/sumlate/const', 'layerbar/topic/sumlate/sumlate',"window/window","eventStack", 'layerbar/topic/sumlate/const'],function($, con, sumlate,window,eventStack, con) {
	return {init:function(id) {
//		$("#search-content .nano-content table").empty();
//		f2net.window.clearTempLayer('PoiLayer');
//		sumlate.analysis(con.configLayer.waterArea);
		/**
		 * 将模块注册到事件栈中
		 */
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
				$("#netModel").showDialog({title:'供水分区'});
				$("#search-content .nano-content table").empty();
				f2net.window.clearTempLayer('PoiLayer');
				sumlate.analysis(con.configLayer.waterArea);
				sumlate.getLegend(con.legend_waterArea);
			}
		})//添加关闭功能
		.addRule({"id":id,"open":[id,'baselayer','countylayer','pipelayer','stationlayer','monitorlayer']})//制定规则
		.applyRule();//应用规则
	}};
	
});