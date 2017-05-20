

//地图加载后,初始化地图上的信息
function initMap()
{
	var open=false;
	
//	require(['layerbar/topic/sumlate/init']);
	require(['layerbar/station/init']);
	require(['layerbar/monitorPoint/init']);//初始化监测点图层
	//加载在线模拟
     
     require(['search/property/query']);
     require(['layerbar/station/init']);
     //加载地图点击查询
     require(['gisquery/gisquery']);
     var layerNum = "";//"1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,25,26,27,28,29,30,31,32,41"
     $.each(getConfigList("gis_layerNumber"), function(i, n) {
    	 layerNum = layerNum + "," + n.value;
     });
     f2net.window.BufferByMapClick("PipeService",layerNum,"self.parent.require('gisquery/gisquery').setData","false");
}

function getPumpStationData(){
		var id = [23,24];  //泵站id
		var name=['OUT_PRESS','OUTFLOW'];//实时字段名
		$.ajax({  // realTimeData/getByIds?id=23&id=24&name=OUT_PRESS&name=OUTFLOW  "realTimeData/getByIds?id="+id+"&name="+name,
    		url:"realTimeData/getByIds?id="+id+"&name="+name,
    		success:function(data){
    		 
    			 
//    				console.info("树->"+roots[i].deviceId);
    				$(data).each(function(){
//    					console.info("设->"+this.deviceId);
    					if(this.deviceId==roots[i].deviceId&&this.useState==0){
//    						console.info("取id"+roots[i].id);
    						var node = $('#tree').tree('find', roots[i].id);
    						$('#tree').tree('check', node.target);
    					}
    				});
    		 
    		}
    	});
	}