define(['jquery', 'util', 'const' ,'easyui'],function($, util, con) {
	var columns = [];
	var griddata = [];
	var ids = con.id;
	
	function initDataProcessChoose() {
		var qpp = $('.commonQueryParamsPenel');
		var st = $("#qpStartTime");
		$(st).datetimebox({
			value:con.startTime,
		    required: true,    
		    showSeconds: false 
		});  
		var et = $("#qpEndTime");
		$(et).datetimebox({  
			value:con.endTime,
		    required: true,    
		    showSeconds: false 
		});  
		return qpp.find('.qpbtn');
	}
	
	columns.push(con.rtdTime);
	$.each(con.rtdTitle,function(i,n){
		columns.push($.extend({},{width:"80"},n));
	});
	var conf = $.extend({},util.easyuiGrid,{columns:[columns], fit:true,toolbar:'.commonQueryParamsPenel'});
	$('#historyGrid').datagrid(conf);
	
	//初始化检索框
	var qbtn = initDataProcessChoose();
	
	$(qbtn).on('click',function(event) {
		var temp_qpp = $(qbtn).parent();
		var st = $("#qpStartTime");
		var stv = $(st).datetimebox('getValue') + ":00";
		var et = $("#qpEndTime");
		var etv = $(et).datetimebox('getValue') + ":00";
		
		
		$('#historyGrid').datagrid('loading');
		util.executeAjaxUrlForResult(con.historyurl, {"data":{ids:ids,startTime:stv,endTime:etv,timeUnit:"minute",interval:"15",rtName:con.rtdAttr},"async":false}, function(data) {
			$('#historyGrid').datagrid('loaded');
			$('#historyGrid').datagrid('loadData',data.data[ids]);
			con.griddata = data.data[ids];
			con.startTime = stv;
			con.endTime = etv;
		});
		//console.log(con.historyurl);
	});
	
	$(qbtn).click();
});