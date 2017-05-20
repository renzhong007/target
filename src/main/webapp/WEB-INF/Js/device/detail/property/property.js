define(['jquery', 'util'],function($, util) {
	var id = util.GetQueryString('id');
	var model = util.GetQueryString('model');
	
	var data;
	if (model) {
		data = self.parent.parent.require(model).getDataById(id);
	} else {
		data = self.parent.parent.require('search/property/resultlist').getDataById(id);
	}
	
	$('#attr').propertygrid({    
	    data: data.attrs,
	    showHeader: true,
	    showGroup: false,    
	    scrollbarSize: 5
	});
    return {};
});