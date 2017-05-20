define(['jquery', "window/window","eventStack"],function($, window,eventStack) {
	
	var obj = {
		init : function(id) {
			
			
			eventStack.add({
				"id":id,
				"destroy":function(){
					require('layerbar/iframeModel').closeWindow();
				},
				"init":function(){
					require('layerbar/iframeModel').showDialogWithIframe('scada/rightmonitor','测点数据','this');
				}
			})//添加关闭功能
			.addRule({"id":id,"open":[id,'baselayer','countylayer','pipelayer','stationlayer','monitorlayer']})//制定规则
		}
	}
	return obj;
});