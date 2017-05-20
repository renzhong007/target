define(['jquery', 'util', 'easyui', 'panelBox'],function($, util,easyui,panelbox) {
        var obj = {};
        var id = util.GetQueryString('id');
        var model = util.GetQueryString('model');
        
    	var data;
    	if (model) {
    		data = self.parent.parent.require(model).getDataById(id);
    	} else {
    		data = self.parent.parent.require('search/property/resultlist').getDataById(id);
    	}
    	
    	panelbox.setTitle(data.title);
    	panelbox.close(function(){
    		self.parent.closeinfowindow();
    	});
    	
    	$.fn.propertygrid.defaults.columns[0][0].title = "属性名"; // 对应Name
        $.fn.propertygrid.defaults.columns[0][1].title = "属性值"; // 对应Value
    	
//    	$('#win').window({
//    		fit:true,
//    		draggable:false,
//    		onClose:function() {
//    			self.parent.closeinfowindow();
//    		},
//    		title:data.title
//    	});
    	
//    	$('#tt').tabs({    
//            border:false, 
//            fit:true,
//        }); 
        //初始化模块列表
        require(['property/property']);
        return obj;
    }
);