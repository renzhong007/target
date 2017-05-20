define(['jquery','util'],function($, util) {
	
	var colors = ['#000000','#8000ff','#0000ff','#00ffff','#00ff00','#ffff00','#ff8000','#ff0000'].reverse();
	var pipeDiameterRange = [600, 1000];
	var layerMapper = {};
	var gisModelType = [];
	var gisModelValueAreaMapper = {};
	var gisModelLayerRequestUrl = "";
	var legendWaterArea = {};


	//格式化图层配置
	function formatterLayer(arr) {
		var map = {};
		$.each(arr, function(i, n) {
			if (n.parentModel in map) {
				map[n.parentModel].push({"name":n.name,"layer":n.type,"id":n.layername,"value":n.value,"tooltip":n.tooltip});
			} else {
				map[n.parentModel] = [{"name":n.name,"layer":n.type,"id":n.layername,"value":n.value,"tooltip":n.tooltip}];
			}
		});
		return map;
	}
	//格式化值域
	function formatterModelValueArea(arr) { 
		var map = {};
		$.each(arr, function(i, n) {
			if (n.dependency in map) {
				if (n.name) {
					map[n.dependency].legend += "," + n.name;
				}
				
				map[n.dependency].color.push(n.value);
			} else {
				map[n.dependency] = {};
				map[n.dependency].legend = n.name;
				map[n.dependency].color = [n.value];
			}
		});
		return map;
	}
	//合并配置项
	function mergeModelConfig(mainArr, lm, mvc) {
		var map = {};
		$.each(mainArr, function(i, n) {
			map[n.value] = {title:n.name};
			map[n.value][n.value] = true;
			if (layerMapper[n.id]) {
				map[n.value].layer = layerMapper[n.id];
			}
			
			if (gisModelValueAreaMapper[n.id]) {
				map[n.value].legend = gisModelValueAreaMapper[n.id].legend;
				map[n.value].color = gisModelValueAreaMapper[n.id].color;
			}
		});
		return map;
	}

	//格式化管网分级配置
	function formatterPipeDiameterRangeConfig(arr) {
		var temparr = [];
		$.each(arr, function(i, n) {
			temparr.push(parseInt(n.value));
		});
		return temparr;
	}
	//格式化图例
	function formatterLegendWaterArea(arr) {
		var map = {
			title:"供水分区",area:[]
		}
		$.each(arr, function(i, n) {
			map.area.push({color:n.value, text:n.name});
		});
		return map;
	}

	//var colors = ['#000000','#8000ff','#0000ff','#00ffff','#000000','#ffff00','#ff8000','#ffffff'].reverse();

	//以下是图例配置区间
	/**
	 * 7个数字标识不同的8个区间
	 * <100 温饱 
	 * 100~200 小康
	 * 200~400 
	 * 400~800  
	 * 800~1600  
	 * 1600~3200 
	 * 3200~6400  
	 * >6400  
	*/
	var simple = "12800,6400,3200,1600,800,400,200,100";
	//legend_waterArea = {"title":"供水分区","area":[{"color":colors[7],"text":"石门水厂"},{"color":colors[6],"text":"西村水厂"},{"color":colors[5],"text":"江村二厂A"},{"color":colors[4],"text":"南洲水厂"},{"color":colors[3],"text":"江村一厂B"},{"color":colors[2],"text":"西洲水厂"},{"color":colors[1],"text":"新塘水厂"},{"color":colors[0],"text":"江村二厂B"}]};
	legend_waterArea = {"title":"供水分区","area":[{"color":"#00FF00","text":"石门水厂"},{"color":"#FFFF00","text":"西村水厂"},{"color":"#000000","text":"江村二厂A"},{"color":"#9933FF","text":"南洲水厂"},{"color":"#FF6666","text":"江村一厂B"},{"color":"#FF0000","text":"西洲水厂"},{"color":"#0000FF","text":"新塘水厂"},{"color":"#000000","text":"江村二厂B"}]};

	//供水分区全部都是0的点和线表示的颜色
	pointNullColor = ['#ffffff'];
	lineNullColor = ['#ffffff'];
	/**
	 * 管线图层显示配置
	 */
	var configLayer = {
			'pressureValue':{
				'layer':[
			         {"name":"NodePressure","layer":"管点","id":"PointLayer","value":"pressure","tooltip":"自由水头:"},
			         {"name":"PipePressure","layer":"管线","id":"PipeLayer","value":"pressureValue","tooltip":"自由水头:"}
			    ],
			    'legend':'10,15,20,25,30,35,40,50',
			    color : ["#7CFC00","#FFA500","#DEB887","#8B00FF", "#FFFF00", "#CCFF00", "#00FFFF","#4169FF","#FF0000"],
			    'title':'自由水头（米）'
			},
			'slValue':{
				'layer':[
			         {"name":"NodeSl","layer":"管点","id":"PointLayer","value":"sl","tooltip":"水龄:"},
			         {"name":"PipeSl","layer":"管线","id":"PipeLayer","value":"sl","tooltip":"水龄:"}
				],
				'legend':'1,3,6,12,18,24,48',
				color : ["#FF0000","#FFA500","#DEB887","#8B00FF","#FFFF00","#CCFF00","#00FFFF","#0000FF"],
				'title':'水龄（小时）'
			},
			'waterArea':{
				'layer':[
			         {"name":"PipeZone","layer":"管线","id":"PipeLayer","value":"waterArea","tooltip":"sm,石门水厂;xc,西村水厂;jc2_A,江村二厂A;nz,南洲水厂;jc1_B,江村一厂B;xz,西洲水厂;xt,新塘水厂;jc2_B,江村二厂B"},
			         {"name":"NodeZone","layer":"管点","id":"PointLayer","value":"zone","tooltip":"sm,石门水厂;xc,西村水厂;jc2_A,江村二厂A;nz,南洲水厂;jc1_B,江村一厂B;xz,西洲水厂;xt,新塘水厂;jc2_B,江村二厂B"}
				],
				'legend':'sm,xc,jc2_A,nz,jc1_B,xz,xt,jc2_B',
				color : ["#00FF00","#FFFF00","#000000","#9933FF","#FF6666","#FF0000","#0000FF","#000000"],
				'title':'',
				waterArea:true
			},
			'headValue':{
				'layer':[
			         {"name":"NodeHead","layer":"管点","id":"PointLayer","value":'head',"tooltip":"总水头:"},
			         {"name":"PipeHead","layer":"管线","id":"PipeLayer","value":'headValue',"tooltip":"总水头:"}
				],
				 'legend':'20,30,35,40,50,60,70',
				color : ["#00FF7F","#2E8B57","#0000FF","#8B00FF", "#FF9912", "#FF4500", "#FF00FF","#FF0000"],
				'title':'总水头（米）'
			},
			'velocity':{
				'layer':[{"name":"PipeVel","layer":"管线","id":"PipeLayer","value":"vel","tooltip":"流速:"}],
				'legend':'0.1,0.3,0.5,0.8,1,1.2,1.5,2',
				color : ["#FF0000","#FFA500","#DEB887","#8B00FF","#FFFF00","#CCFF00","#00FFFF","#4169FF","#0000FF"],
				'title':'流速'
			},
			'slope':{
				'layer':[{"name":"PipeSlope","layer":"管线","id":"PipeLayer","value":"slope","tooltip":"坡降:"}],
				'legend':'0.5,1,2,3,5,8,10',
				color : ["#FF0000","#FFA500","#DEB887","#8B00FF","#FFFF00","#CCFF00","#00FFFF","#0000FF"],
				'title':'坡降（‰）'
			},
			'director':{
				'layer':[{"name":"PipeDir","layer":"管线","id":"DirectoryPointLayer","value":"director","tooltip":"流向:"}],
				'legend':'0.1,0.2,0.4,0.6,0.8,1,2,2.5',
				'title':''
			},
			'flow':{
				'layer':[{"name":"PipeFlow","layer":"管线","id":"PipeLayer","value":"flow","tooltip":"流量:"}],
				'legend':'100,500,1000,2000,3000,5000,8000,10000,15000',
				color : ["#FF0000","#FFA500","#DEB887","#8B00FF","#FFFF00","#CCFF00","#00FFFF","#4169FF","#0000FF","#00008B"],
				'title':'流量'
			},
			'clValue':{
				'layer':[
				         {"name":"NodeCl","layer":"管点","id":"PointLayer","value":'clValue',"tooltip":"余氯:"},
				         {"name":"PipeCl","layer":"管线","id":"PipeLayer","value":'cl',"tooltip":"余氯:"}
					],
				'legend':'0.05,0.1,0.2,0.4,0.6,0.8,1',
				color : ["#FF0000","#FFA500","#DEB887","#8B00FF","#FFFF00","#CCFF00","#00FFFF","#0000FF"],
				'title':'余氯'
			},
			'cl':{
				'layer':[
				         {"name":"NodeCl","layer":"管点","id":"PointLayer","value":'clValue',"tooltip":"余氯:"},
				         {"name":"PipeCl","layer":"管线","id":"PipeLayer","value":'cl',"tooltip":"余氯:"}
					],
					'legend':'0.05,0.1,0.2,0.4,0.6,0.8,1',
					color : ["#FF0000","#FFA500","#DEB887","#8B00FF","#FFFF00","#CCFF00","#00FFFF","#0000FF"],
				'title':'余氯'
			}
			
//			,
//			'pressurePoly':{
//				'layer':[{"name":"Node","layer":"等值面","id":"RDSWWaterPressureIsonlinePolygonLayer","value":"pressureValue"}],
//				'legend':'',
//				'title':''
//			}
	};


	/**
	 * 智能分析页面左侧边栏的子节点配置
	 */
	var configli = {'slifx':
						[
	                         {'value':'pressureValue','name':'显示自由水头'},
	                         {'value':'headValue','name':'显示总水头'},
	                         {'name':'显示流量','value':'flow'},
	                         {'name':'显示流速','value':'velocity'},
	                         {'name':'显示坡降','value':'slope'}
//	                         {'name':'显示流向','value':'director'}
//	                         {'name':'显示等值面','value':'pressurePoly'}
	                    ]
					};



	//获取图例方法，把区间和颜色胶合成json
	var getLegendJson = function(title,areas){
		var arr = areas.split(",", "8");
		arr = arr.reverse();
		var rs = new Array();

		$.each(colors,function(i,n){
			var obj = new Object();
			obj.color = n;
			if(i == 0){
				obj.text = '&gt;' + arr[i+1];
			}else if((i+1) == arr.length){
				obj.text = '&lt;' + arr[i];
			}else{
				obj.text = arr[i+1] + "~" + arr[i];
			}
			rs.push(obj);
		});
		var rsobj = new Object();
		rsobj.title = title;
		rsobj.area = rs;
		return rsobj;
	}

	//获取图例方法，把区间和颜色胶合成json
	var getLegendJsonByConfig = function(title,areas, confcolors){
		
		
		var arr = areas.split(",");
		arr = arr.reverse();
		var rs = new Array();
		var colortemp;
		if (confcolors) {
			var ct = $.extend([], confcolors);
			colortemp = ct.reverse();
		} else {
			colortemp = colors;
		}
		$.each(colortemp,function(i,n){
			var obj = new Object();
			obj.color = n;
			if(i == 0){
				obj.text = '&gt;' + arr[i];
			}else if((i+1) == colortemp.length){
				obj.text = '&lt;' + arr[i-1];
			}else{
				obj.text = arr[i] + "~" + arr[i-1];
			}
			rs.push(obj);
		});
		var rsobj = new Object();
		rsobj.title = title;
		rsobj.area = rs;
		return rsobj;
	}

	/**
	 * 
	 * 左边图层栏默认图层管理
	 * 配置格式为JSON
	 * name：表示图层名称  show：标识默认是否显示 label：表示选线上的说明 MainLayer：表示是否是底图 layerList：表示当前图层有多少个layer
	 * 
	 */
	DefaultLayerConfig = 
	[
		{
		  'name':'MapService0',
		  'show':true,
		  'label':'底图',
		  'mainLayer':true,
		  'layerList':['MapService0','MapService1']
		},
		{
		  'name':'RDSWDirectorPipeLyaer',
		  'show':false,
		  'label':'流向',
		  'mainLayer':false,
		  'layerList':['DirectoryPointLayer']
		}
	]
	//初始化模块
	gisModelLayerRequestUrl = util.getConfig("gisModelLayerRequestUrl");
	
	var pipeDiameterRangeConfig = util.getConfigList("pipeDiameterRange");
	pipeDiameterRange = formatterPipeDiameterRangeConfig(pipeDiameterRangeConfig);
	
	gisModelType = util.getConfigList("gisModelType");
	var layers = [];
	util.executeAjaxUrlForResult("layer/list", {async:false}, function(result) {
		layers = result.rows;
	});
	layerMapper = formatterLayer(layers);
	var gisModelValueArea = util.getConfigList("gisModelValueArea");//饼状图的图例显示
	gisModelValueAreaMapper = formatterModelValueArea(gisModelValueArea);
	
	configLayer = mergeModelConfig(gisModelType, layerMapper, gisModelValueAreaMapper);
	
	var legendWaterArea = util.getConfigList("legendWaterArea");
	legend_waterArea = formatterLegendWaterArea(legendWaterArea);

	return {configLayer:configLayer,layers:layers, DefaultLayerConfig:DefaultLayerConfig, pipeDiameterRange:pipeDiameterRange,getLegendJsonByConfig:getLegendJsonByConfig,legend_waterArea:legend_waterArea}
});