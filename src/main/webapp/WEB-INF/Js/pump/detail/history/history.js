define(['jquery', 'util', 'const' ,'easyui'],function($, util, con) {
	var columns = [];
	var griddata = [];
	var id = con.id;
	
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
	$.each(con.curveAttr,function(i,n){
		columns.push($.extend({},{width:(390/con.curveAttr.length)},n));
	});
	var conf = $.extend({},util.easyuiGrid,{columns:[columns], fit:true, fitColumns: true, toolbar:'.commonQueryParamsPenel'});
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
		util.executeAjaxUrlForResult(con.historyurl, {"data":{ids:id,startTime:stv,endTime:etv,timeUnit:"minute",interval:"1",rtName:con.rtdAttr},async:false}, function(data) {
			$('#historyGrid').datagrid('loaded');
			if(data.data != null) {
				if(data.data[id].length > 0) {
					$('#historyGrid').datagrid('loadData',data.data[id]);
					con.griddata = data.data[id];
					con.startTime = stv;
					con.endTime = etv;
				} else {
					$('#historyGrid').datagrid('loadData',[]);
					$('#historyGrid').datagrid('appendRow', { 'startTime': '<div id="nodata"  style="text-align:left; padding-left:230px; padding-top:100px; padding-bottom:90px; color:red">没有相关记录！</div>' }).datagrid('mergeCells', { index: 0, field: 'startTime', colspan: (con.rtdAttr.length+1)});
				}
			} else {
				$('#historyGrid').datagrid('loadData',[]);
				$('#historyGrid').datagrid('appendRow', { 'startTime': '<div id="nodata"  style="text-align:left; padding-left:230px; padding-top:100px; padding-bottom:90px; color:red">没有相关记录！</div>' }).datagrid('mergeCells', { index: 0, field: 'startTime', colspan: (con.rtdAttr.length+1)});
			}
			
		});
	});
	
	$(qbtn).click();
});