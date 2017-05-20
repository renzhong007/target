define(['jquery', 'easyui' , 'easyuiZj','panelBox','tabpage', 'util'],function($,easyui,easyuiZj,panelBox,tabpage, util) {
        var obj = {};
        
        var from = util.GetQueryString('from');
        if (!from) from ='gis';
        
        
        if (from == 'gis') {
        	if (self.parent.parent.require('gisquery/gisquery')) {
            	self.parent.parent.require('gisquery/gisquery').preventRemote = true;
            	panelBox.close(function(){
            		self.parent.closeinfowindow();
            	});
            }
        } else if (from == 'grid') {
        	panelBox.close(function(){
        		var window = util.GetQueryString('window');
        		self.parent.$('#'+window).remove();
        	});
        }
        
        
        $.parser.parse();
        
        
    	
        $.fn.propertygrid.defaults.columns[0][0].title = "属性名"; // 对应Name
        $.fn.propertygrid.defaults.columns[0][1].title = "属性值"; // 对应Value
		
		var tabModel = ['property/property','history/history', 'curve/curve'];
        
        //var tabModel = ['property/property', 'deviceimage/image', 'history/history', 'curve/curve','warning/warning'];
//        $('#tt').tabs({    
//            border:false, 
//            fit:true,
//            onSelect:function(title, index){    
//            	require([tabModel[index]]);
//            }    
//        }); 
        //初始化模块列表
        tabpage.onSelect(function(index){
        	require([tabModel[index]]);
        })
        require([tabModel[0]]);
       
        return obj;
    }
);