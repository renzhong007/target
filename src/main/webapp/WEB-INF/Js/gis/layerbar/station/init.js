define(['layerbar/station/stationData','layerbar/timer/timer','layerbar/timer/flow'],function(stationData,showTime,showFlow) {
	//加载地图上泵站小面板图层
	stationData.updateLayer();  
	var updateLayerTimer = setInterval(function() {	 
		stationData.updateLayer();
 		}, 1 * 60 * 1000);
	
	showTime(); //显示当前时间
	showFlow();//显示当前流量
	
	//定时刷新页面时间,流量值,间隔1分钟
	setInterval(function() {	 
		showTime(); //显示当前时间
		showFlow();//显示当前流量
 		}, 1 * 60 * 1000);
	
	
	//定时刷新页面流量数据,间隔3分钟
	//setInterval(function() {		
	//	showFlow();
 	//	}, 1 * 60 * 3000);
	return {};
});