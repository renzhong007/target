define(['jquery', 'util', 'const' ,'easyui'],function($, util, con) {
	var id=con.id;
	var div=$('#warn');
	initWarningData(div,id);
	//初始化列表
	function initWarningData(tab,objid){
		tab.html('');
		var table = $("<table>");
		tab.append(table);
//		var aa = [];
		table.datagrid({    
		    url:'../../water-warn/warningData/alarmData/getWarningDataById?deviceId='+objid,    
		    columns:[[    
		        {field:'chName',title:'属性名',},   
		        {field:'lastWarningValue',title:'告警值',},    
		        {field:'alarmTypeName',title:'告警类型',},  
		        {field:'limitValue',title:'门限值',},    
		        {field:'alarmLevel',title:'告警等级',},
		        {field:'lastWarningTime',title:'最后告警时间',}
		        ]]    
		});  

		
		
	}
	
//	alarmTypeName
//	chName
//	alarmTypeName: "下限"
//		lastWarningValue: "0.301"
//			limitValue: "0.3"
//				alarmLevel: 2
//	 lastWarningTime

	
	
	
	return {initWarningData:initWarningData};
	
});