require.config({
    paths: {
	 	jquery : '../../Plugins/jquery/jquery-1.10.1',
	 	easyui : "../../Plugins/easyui/jquery.easyui.min",
	 	eventStack : 'layerbar/eventStack',
	 	template : '../../Plugins/jquery/jquery.tmpl',
	 	toolbar : 'toolbar/toolbar',
	 	toolbar : 'toolbar/toolbar',
	 	util: '../common/waterutils',
	 	nanoscroller :'../../Plugins/nanoscroller/js/jquery.nanoscroller',
	 	highcharts:'../../Plugins/chart/highcharts',
	 	schedulechart:'../../Plugins/chart/schedulechart',
	 	gis:'gis'
	}, 
	 shim : {  
	     bootstrap : {  
	         deps : ['jquery']
	     }  ,
	 	easyui: ['jquery'],
	 	template:['jquery'],
	 	util:['jquery'],
	 	highcharts: {
	 	      exports: "Highcharts",
	 	      deps: ["jquery"]
	 	    },
	 	gis:["gis"]
	}
});
require(['init']);
require(['easyui']);
require(['../../Plugins/accordion/js/main']);
//if (document.getElementsByTagName('html')[0].className.indexOf('lte-ie9') != -1) {
//	
//}else {
//	require(['html5']); 
//}
//require(['nanoscroller']);
