require.config({
    paths: {
 	jquery : '../../../Plugins/jquery/jquery-1.10.1',
 	easyui : "../../../Plugins/easyui/jquery.easyui.min",
 	easyuiZj : "../../../Plugins/easyui/easyui-lang-zh_CN",
 	util: '../../common/waterutils',
 	nanoscroller :'../../../Plugins/nanoscroller/js/jquery.nanoscroller',
	highcharts:'../../../Plugins/chart/highcharts',
 	tabpage:'../../../Plugins/tabs/js/tab',
 	panelBox:'../../../Plugins/panel/js/panel'
    }, 
	 shim : {  
		 easyuiZj : ['easyui'],
	     bootstrap : {  
	         deps : ['jquery']
	     }  ,
	 	easyui: ['jquery'],
	 	template:['jquery'],
	 	util:['jquery']
	}
});
require(['detail']);
