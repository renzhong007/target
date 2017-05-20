define(['jquery', "window/window","eventStack"],function($, window,eventStack) {
	var maplayer = ['MapService0','MapService1'];
	var obj = {
		init : function(id) {
			eventStack.add({
				"id":id,
				"destroy":function(){
					$.each(maplayer, function(i, n) {
						f2net.window.setLayerServiceVisible(n,false);
					});
					
				},
				"init":function(){
					$.each(maplayer, function(i, n) {
						f2net.window.setLayerServiceVisible(n,true);
					});
				}
			})//添加关闭功能
			.addRule({"id":id,"open":['ALL']})//制定规则
		},
		maplayer : maplayer
	}
	return obj;
});