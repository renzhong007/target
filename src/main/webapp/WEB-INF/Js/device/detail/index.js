require.config({
    paths: {
 	jquery : '../../../Plugins/jquery/jquery-1.10.1',
 	easyui : "../../../Plugins/easyui/jquery.easyui.min",
 	easyuiZh : "../../../Plugins/easyui/easyui-lang-zh_CN",
 	util: '../../common/waterutils',
 	nanoscroller :'../../../Plugins/nanoscroller/js/jquery.nanoscroller',
 	tabpage:'../../../Plugins/tabs/js/tab',
 	panelBox:'../../../Plugins/panel/js/panel'
	}, 
	 shim : {  
	     bootstrap : {  
	         deps : ['jquery']
	     }  ,
	 	easyui: ['jquery'],
	 	template:['jquery'],
	 	util:['jquery']
	}
});
//require(['easyui']);
require(['tabpage']);
require(['panelBox']);
require(['detail']);

