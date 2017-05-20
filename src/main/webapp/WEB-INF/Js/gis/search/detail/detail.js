$(function() {
	var data = {detail:[{name:"高程1", value:"111"},{name:"高程1", value:"111"},{name:"高程1", value:"111"}]};
	
	$('#attr').propertygrid({    
	    data: data.detail,
	    showHeader:false,
	    showGroup: true,    
	    scrollbarSize: 0
	});
});