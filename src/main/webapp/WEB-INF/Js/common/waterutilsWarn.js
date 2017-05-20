//IE中trim函数的兼容性
String.prototype.trim=function(){return this.replace(/(^\s*)|(\s*$)/g,"");}
/**
 * 执行一定规则下的ajax
 * @param url
 * @param method
 * @param func
 */
function executeUrl (url,method,func) {
	if ('get' == method) {
		$.get(url,function(result){
			if (result.errorCode == 0) {
				func(result.data);
			} else {
			}
		},'json');
	}
}

/**
 * 执行一定规则下的ajax
 * @param url
 * @param method
 * @param func
 */
function executeAjaxUrl (url,setting,done,fail,always) {
	setting.url = url;
	setting.traditional = true;
	$.ajax(setting)
	.done(function(result){
		if (undefined != done) {
			if (result.errorCode == 0) {
				done(result.data);
			} else {
			}
		}
	})
	.fail(function(jqXHR, textStatus){
		if (undefined != fail) {
			fail(jqXHR, textStatus);
		}
	})
	.always(function(){
		if (undefined != always) {
			always();
		}
	})
	
}

/**
 * 执行一定规则下的ajax
 * @param url
 * @param method
 * @param func
 */
function executeAjaxUrlForResult (url,setting,done,fail,always) {
	setting.url = url;
	setting.traditional = true;
	$.ajax(setting)
	.done(function(result){
		if (undefined != done) {
			done(result);
		}
	})
	.fail(function(jqXHR, textStatus){
		if (undefined != fail) {
			fail(jqXHR, textStatus);
		}
	})
	.always(function(){
		if (undefined != always) {
			always();
		}
	})
	
}

/**
 * js获取url参数
 * @param name
 * @returns
 */
function GetQueryString(name) {
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  decodeURI(r[2]); return null;
}

/**
 * 2015-10-10 00:00:00 转date
 * @param str
 */
function toDate(str) {
	str =  str.replace(/-/g,"/");
	var oDate1 = new Date(str);
	return oDate1;
}

function dateAdd(num, date) {
	var v = date.valueOf();
	v += num;
	return new Date(v);
}

//把时间转换成字符串
function timeStamp2String(datetime,formate){

	var year = datetime.getFullYear();
	var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
	var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
	var hour = datetime.getHours()< 10 ? "0" + datetime.getHours() : datetime.getHours();
	var minute = datetime.getMinutes()< 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
	var second = datetime.getSeconds()< 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
	var str = formate;
	str = str.replace("yyyy",year);
	str = str.replace("MM",month);
	str = str.replace("dd",date);
	str = str.replace("HH",hour);
	str = str.replace("mm",minute);
	str = str.replace("ss",second);
	return str;
}

/**
 * js获取当前时间
 * @returns {String}
 */
function getCurentDate()
{ 
	var now = new Date();
	return getDate(now);
    
}

function getDate(now) {
	var year = now.getFullYear();       //年
    var month = now.getMonth() + 1;     //月
    var day = now.getDate();            //日
   
    var clock = year + "-";
   
    if(month < 10)
        clock += "0";
   
    clock += month + "-";
   
    if(day < 10)
        clock += "0";
       
    clock += day ;
   
    return(clock); 
}

function addDate(num) {
	var now = new Date();
	var v = now.valueOf();
	v = v + num;
	return getDate(new Date(v));
}





var easyuiGrid ={
	title:'',
	nowrap: true,
	border:true,
	striped: true,				
	sortName: 'id',
	sortOrder: 'desc',
	remoteSort: true,
	editable: false,
	singleSelect : true,
	idField:'name',
	loadMsg:'读取数据中',
	frozenColumns:[[
	]],
	fit: true,				
	columns:[[
		{field:'name',title:'方法中文名',width:100},    
        {field:'packageName',title:'包名',width:250},    
        {field:'methodName',title:'方法名',width:150},
        {field:'returnName',title:'返回名称',width:100},
        {field:'type',title:'类型',width:100},
        {field:'remark',title:'注释',width:100}
	]],
	pagination:false,
	rownumbers:false,
	pageList: [20, 40, 60, 80],
    pageSize:20
};

var baseOption = {
    title : {
        text: '对象曲线',
    },
    tooltip : {
        trigger: 'axis'
    },
    calculable : true,
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            data : ['周一','周二','周三','周四','周五','周六','周日']
        }
    ],
    yAxis : [
        {
            type : 'value',
        }
    ],
    series : [
        {
            name:'最高气温',
            type:'line',
            data:[11, 11, 15, 13, 12, 13, 10]
        },
        {
            name:'最低气温',
            type:'line',
            data:[1, -2, 2, 5, 3, 2, 0]
        }
    ]
};

var initEchart = function(){
	// 路径配置
	require.config({
	    paths:{ 
	    	'echarts' : '../../Plugins/echart/dist'
	    }
	});
	// 使用
	require(
	    [
	        'echarts',
	        'echarts/chart/bar', // 使用柱状图就加载bar模块，按需加载
	        'echarts/chart/line'
	    ],
	    function (ec) {
	    	initAngular();
	    }
	);
}

//获取配置
function getConfig(name) {
	var value;
	executeAjaxUrlForResult("action/configuniq", {data:{name:name}, async:false}, function(data) {
		value = data.value;
	});
	return value;
}

function getConfigList(type) {
	var tempdata ;
	//初始化配置
	executeAjaxUrlForResult("action/config", {data:{type:type},async:false}, function(data) {
		tempdata = data;
	});
	return tempdata;
}

