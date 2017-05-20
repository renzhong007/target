define(['jquery', 'easyui' , 'easyuiZj','panelBox','tabpage'],function($,easyui,easyuiZj,panelBox,tabpage) {
        var obj = {};
 
        panelBox.close(function(){
    		self.parent.closeinfowindow();
    	})
        $.fn.propertygrid.defaults.columns[0][0].title = "属性名"; // 对应Name
        $.fn.propertygrid.defaults.columns[0][1].title = "属性值"; // 对应Value
        
       // var tabModel = ['property/property', 'deviceimage/image', 'history/history', 'curve/curve','warning/warning'];
	   var tabModel = ['property/property', 'history/history', 'curve/curve'];
//        $('#tt').tabs({    
//            border:false, 
//            fit:true,
//            onSelect:function(title, index){    
//            	require([tabModel[index]]);
//            }    
//        }); 
        tabpage.onSelect(function(index){
        	require([tabModel[index]]);
        })
        require([tabModel[0]]);
        //初始化模块列表
        return obj;
    }
);