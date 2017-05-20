define(['jquery', "window/window","eventStack"],function($, window,eventStack) {
	var obj = {
		init : function(id) {
			eventStack.add({
				"id":id,
				"destroy":function(){
					var layername = $('#'+id).attr('layer');
					f2net.window.setLayerServiceVisible(layername,false);
					
				},
				"init":function(){
					var layername = $('#'+id).attr('layer');
					f2net.window.setLayerServiceVisible(layername,true);
				}
			})//添加关闭功能
			.addRule({"id":id,"open":['ALL']})//制定规则
		}
	}
	return obj;
});