define(['layerbar/monitorPoint/monitorPointData'],function (monitorPointData){
	
	monitorPointData.updateMonitorLayer();
	
	var updateLayerTimer = setInterval(function() {	 
		monitorPointData.updateMonitorLayer();
 		}, 1* 60 * 1000);
	
});

