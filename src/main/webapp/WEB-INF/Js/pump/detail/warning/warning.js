define(['jquery', 'util', 'const' ,'easyui'],function($, util, con) {
	var id=con.id;
	var div=$('#warn');
	initWarningData(div,id);
	//初始化列表
	function initWarningData(tab,objid){
		tab.html('');
		var table = $("<table></table>");
		tab.append(table);
//		var aa = [];
		table.datagrid({    
		    url:'../../water-warn/warningData/alarmData/getWarningDataById?deviceId='+objid,    
		    columns:[[    
		        {field:'chName',title:'属性名',width:'15%'},   
		        {field:'lastWarningValue',title:'告警值',width:'15%'},    
		        {field:'alarmTypeName',title:'告警类型',width:'15%'},  
		        {field:'limitValue',title:'门限值',width:'15%'},    
		        {field:'alarmLevel',title:'告警等级',width:'15%'},
		        {field:'lastWarningTime',title:'最后告警时间',width:'25%'}
		        ]],
		        
		    onLoadSuccess : function(data) {
		    	if(data.rows.length == 0) {
		    		$(table).datagrid("appendRow", { 'chName': '<div id="warnDataNone"  style="text-align:left; padding-left:230px; padding-top:100px; padding-bottom:90px; color:red">没有相关记录！</div>' }).datagrid('mergeCells', { index: 0, field: 'chName', colspan: 6});
		    		$(table).datagrid('getPanel').removeClass('lines-both lines-no lines-right lines-bottom');
		    	}
		    }
		});  
	}
	return {initWarningData:initWarningData};
});