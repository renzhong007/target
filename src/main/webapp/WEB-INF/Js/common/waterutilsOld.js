	
	//IE中trim函数的兼容性
	String.prototype.trim=function(){return this.replace(/(^\s*)|(\s*$)/g,"");}


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
		return timeStamp2String(now, 'yyyy-MM-dd HH:mm:ss');
	    
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


	//获取配置
	function getConfig(name) {
		var value;
		executeAjaxUrlForResult("configUniq/list", {data:{name:name}, async:false}, function(data) {
			if (data.total == 1) {
				value = data.rows[0].value;
			}
		});
		return value;
	}

	function getConfigList(type) {
		var tempdata ;
		//初始化配置
		executeAjaxUrlForResult("configlist/list", {data:{type:type},async:false}, function(data) {
			tempdata = data.data;
		});
		return tempdata;
	}
	
	/**
	 * 生成随机字符串
	 */
	function randomChar(num)  {
		var  x="0123456789qwertyuioplkjhgfdsazxcvbnm";
		var  tmp="";
		var timestamp = new Date().getTime();
		for(var  i=0;i< num;i++)  {
			tmp  +=  x.charAt(Math.ceil(Math.random()*100000000)%x.length);
		}
		return tmp;
	}


