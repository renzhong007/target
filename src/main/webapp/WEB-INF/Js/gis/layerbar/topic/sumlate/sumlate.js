define(['jquery', 'layerbar/topic/sumlate/const'],function($, con) {
	var mapvisiable = true;
	var mapname = 'MapService0';
	var mapServiceList = ['MapService0','MapService1'];

	var tempDefaultLayerConfig = null;
	
	var showAnalysis = {};
	
	var diameterObj = {};
	var pathsObj = {};
	var isload = true;
	
	//图层时间
	var layerTime = "";
	//饼图的颜色和text
	var pieInfo = {};
	setDefaultLayerConfig();
	initPipeAndPoint();
	
	function init() {
		analysis(con.configLayer.pressureValue);
	}
	/**
	 * 
	 * 初始化配置
	 * 
	 * 
	 */
	function setDefaultLayerConfig(){
		tempDefaultLayerConfig = new Object();
		$.each(con.DefaultLayerConfig,function(i,n){
			tempDefaultLayerConfig[n.name] = n;
		});
	}
	
	
	/**
	 * 获取实时模拟配置，并追加点到地图上
	 */
	function analysis(obj){
		initcolorByConfig(obj.color);
		getLegend(con.getLegendJsonByConfig(obj.title,obj.legend,obj.color));
		var arr = obj.layer;
		$.each(showAnalysis, function(i, n) {
			if(!tempDefaultLayerConfig[i]){
				f2net.window.setLayerVisible(i,false);
			}
		});
		$(".bg-checkbox").html("");
		$.each(arr,function(i,n){
			
			setCommonLayer(n);
			
			f2net.window.setLayerVisible(n.id,false);
			var st = new Date().getTime();
			
			$.get("analysisresult/list",{type:n.name},function(result){
				setLayerTime(result.rows[0].reporttime);
				var initet = new Date().getTime();
				//console.log(n.name+"请求数据时间："+(initet - st));
				
				var symbolname = "";
				var prefix = "";
				if (n.layer =="管点") {
					symbolname = "Graphic";
					prefix = "node";
				} else if (n.layer =="管线") {
					symbolname = "Graphicline";
					prefix = "pipe";
				}
				var str = obj.legend.split(",");
				var pre;
				
				var graphics = [];
				var symbols = [];
				var tooltips = [];
				$.each(result.rows[0].valuejson, function(resulti, resultn) {
					var flag = false;
					for (var i=0; i < obj.color.length; i++) {
						if (obj.waterArea) {
							if (str[i] == resultn[n.value].maxName) {
								flag = true;
							}
						} else {
							if (i==0) {
								if (parseFloat(str[i]) >= resultn[n.value]) {
									flag = true;
								}
							} else if (i==(obj.color.length-1)) {
								if (pre <= resultn[n.value]) {
									flag = true; 
								}
							} else {
								if (pre < resultn[n.value] && parseFloat(str[i]) >= resultn[n.value]) {
									flag = true;
								}
							}
						}
						if (flag) {
							var dia = diameterObj[resultn.id];
							graphics.push(prefix+resultn.id);
							if (n.layer =="管线") {
								if (dia >= con.pipeDiameterRange[0] && dia < con.pipeDiameterRange[1]) {
									symbols.push(symbolname + "2"+i);
									
									tooltips.push(changetooltip(obj,  n, resultn, prefix));
									return;
								} else if (dia >= con.pipeDiameterRange[1]) {
									symbols.push(symbolname + "3"+i);
									tooltips.push(changetooltip(obj, n, resultn, prefix));
									return;
								}
							} 
							symbols.push(symbolname + i);	
							tooltips.push(changetooltip(obj, n, resultn, prefix));
							return;
						}
						
						pre = parseFloat(str[i]);
						
					} 
//					f2net.window.changetooltip(prefix + resultn.id,resultn.id+'\n'+n.tooltip+resultn[n.value]);
				});
				//给并图填充数据
				if (n.layer =="管线") {
					setContainer(symbols);
				}
				f2net.window.batchChangeSymbolAndToolTip(JSON.stringify(graphics), JSON.stringify(symbols), JSON.stringify(tooltips));
				var addet = new Date().getTime();
				//console.log(n.name+"切换数据时间："+(addet - initet));
				f2net.window.setLayerVisible(n.id,true);
				showAnalysis[n.id]=n.name;
			},'json');
		});
		
		//新增默认图层控制，例如地图、等值面图等等
		setCommonLayer();
		bingClick();
		function changetooltip(obj, n, resultn, prefix) {
			if (obj.waterArea) {
				var tooltiparr0 = n.tooltip.split("|");
				var tooltiparr = tooltiparr0[1].split(";");
				var tooltipstr = resultn.id;
				var wa = resultn[n.value];
				$.each(tooltiparr, function(i, n) {
					var fs = n.split(",");
					tooltipstr += "\n" + fs[1] +":"+wa[fs[0]];
				});
				try {
					return tooltipstr;
				} catch (e) {
					//console.log(prefix + resultn.id + "," +tooltipstr);
				}
			} else {
				try {
					return resultn.id + '\n' + n.tooltip + resultn[n.value]
				} catch (e) {
					//console.log(prefix + resultn.id + "," +resultn.id
					//		+ '\n' + n.tooltip + resultn[n.value]);
				}
			}
		}
	};
	
	function initcolorByConfig(config) {
		try {
			var graphicArray = [ "Graphic", "Graphicline", "Graphicline2",
					"Graphicline3" ];
			$.each(graphicArray, function(i, n) {
				var tempstr = "";
				for (var int = 0; int < config.length; int++) {
					if (int == 0) {
						tempstr += n + int;
					} else {
						tempstr += ","+n + int;
					}
				}
				f2net.window.changeSymbolscolor(tempstr, config.join().replace(new RegExp(/(#)/g), "0x"));
			});
		} catch (e) {
			//console.log(e.message);
		}
	}
	
	
	//新版初始化管线和管点
	function initPipeAndPoint() {
		if (!isload) return;
//		PointLayer
		var pointst = new Date().getTime();
		var pipest = new Date().getTime();
		$.get("analysisresult/list",{type:"NodeXY"},function(result) {
			var pointinitet = new Date().getTime();
//			console.log("管点请求数据时间："+(pointinitet - pointst));
			var arr = [];
			$.each(result.rows[0].valuejson, function(i, n) {
				var obj = {tid:"PointLayer",gid:"node"+n.id,attr:'{"id":"'+n.id+'","type":"point"}',x: n.x,y:n.y,sid:"Graphic0",tt:''};
				arr.push(obj);
//				f2net.window.addPointGraphic("PointLayer", "node"+n.id, '{"id":"'+n.id+'","type":"point"}', n.x, n.y, "Graphic0",'');
			});
			f2net.window.batchAddPointGraphic(JSON.stringify(arr));
			var pointaddet = new Date().getTime();
//			console.log("管点加载数据时间："+(pointaddet - pointinitet));
			
			
		});
		
		$.get("analysisresult/list",{type:"PipeXY"},function(result) {
			var pipeinitet = new Date().getTime();
			var arr = [];
			//console.log("管线请求数据时间："+(pipeinitet - pipest));
			$.each(result.rows[0].valuejson, function(i, n) {
//				f2net.window.addLineGraphic("PipeLayer","pipe"+n.id,'{"id":"'+n.id+'","type":"line"}',JSON.stringify(n.paths),"Graphicline0","");
				var obj = {tid:"PipeLayer",gid:"pipe"+n.id,attr:'{"id":"'+n.id+'","type":"line"}',points:JSON.stringify(n.paths),sid:"Graphicline0",tt:''};
				arr.push(obj);
				diameterObj[n.id] = n.diameter;
				pathsObj[n.id] = n.paths;
			});
			
			f2net.window.batchAddLineGraphic(JSON.stringify(arr));
			var pipeaddet = new Date().getTime();
//			setDirectionLayer(configLayer.director.layer[0]);
			//console.log("管线加载数据时间："+(pipeaddet - pipeinitet));
		});
	}
	
	//控制图层面板
	function setCommonLayer(n) {
		if(undefined != n){
			$(".bg-checkbox").append("<div><label style='padding:10px;'><input name=\""+n.id+"\" type=\"checkbox\" checked=\"true\" />"+n.layer+"</label></div>");
		}else{
			for ( var label in tempDefaultLayerConfig) {
				var n = tempDefaultLayerConfig[label];
				if(n.show){
					$(".bg-checkbox").append("<div><label style='padding:10px;'><input name=\""+n.name+"\" type=\"checkbox\" checked=\""+n.show+"\" />"+n.label+"</label></div>");
				}else{
					$(".bg-checkbox").append("<div><label style='padding:10px;'><input name=\""+n.name+"\" type=\"checkbox\"  />"+n.label+"</label></div>");
				}
				
			}
			
		}
		
	}
	
	function bingClick() {
		//绑定图层控制器事件
		$(".bg-checkbox input[type='checkbox']").click(function(){
			var layername = $(this).attr('name');
			if(layername in tempDefaultLayerConfig){
				mapvisiable = $(this).prop('checked');
				var obj = tempDefaultLayerConfig[layername];
				obj.show = mapvisiable;
				var llist = obj.layerList;
				if(obj.mainLayer){
					
					$.each(llist,function(i,n){
						f2net.window.setLayerServiceVisible(n,mapvisiable);
					});
				}else{
					$.each(llist,function(i,n){
						f2net.window.setLayerVisible(n,mapvisiable);
					});
				}
				
			}else{
				f2net.window.setLayerVisible(layername,$(this).prop('checked'));
			}
			
		});
	}
	
	//生成图例
	function getLegend(obj) {
		pieInfo = {};
		pieInfo = obj;
		$('#percent').html("");
		$('#around').html("");
		if(null == obj){
			return;
		}

		//$('#percent').append('<div class="percent-titile"  ><span>'+pieInfo.title+'百分比(%)</span></div>')
		$('#percent').append('<div class="percent-titile"  ><span>'+pieInfo.title);
		$('#percent').append("<div id='container' style='width:100%;height:200px;'></div>");
		$('#around').append("<div id='up' ><span>"+obj.title+"</span></div>");
		$.each(obj.area,function(i,n){
			$('#around').append("<div class='small'><div class='color' style='background: "+n.color+";'></div><span class='words'>"+n.text+"</span></div>");
		});
		
	};
	
	//填充饼图数据
	function setContainer(symbols){
		var num = [];
		if(pieInfo.area.length==2){
			var temp1 = 0;
			var temp6 = 0;
			for(var j=0;j<symbols.length;j++){
				if(symbols[j][symbols[j].length-1]=='1'){
					temp1++;
				}
				if(symbols[j][symbols[j].length-1]=='6'){
					temp6++;
				}
			}
			num.push(temp1);
			num.push(temp6);
		}else{
			for(var i=0;i<pieInfo.area.length;i++){
				var temp = 0;
				for(var j=0;j<symbols.length;j++){
					if(symbols[j][symbols[j].length-1]==i){
						temp++;
					}
				}
				num.push(temp);
			}
		}
		//console.info(num.length);
		var colors = [];
		var series = '[';
		$.each(pieInfo.area,function(i,n){
			colors.push(n.color);
			if(n.text.indexOf('&gt;')>=0){
				re=new RegExp("&gt;","g");
				series += '[\''+n.text.replace(re,">")+'\','+num.pop()+'],';
			}else if(n.text.indexOf('&lt;')>=0){
				re=new RegExp("&lt;","g");
				series += '[\''+n.text.replace(re,"<")+'\','+num.pop()+'],';
			}else{
				series += '[\''+n.text+'\','+num.pop()+'],';
			}
		});
		series = series.substring(0,series.length-1);
		series += ']';
		var text = eval(series);
		$('#container').highcharts({
	        chart: {
	            type: 'pie',
	            options3d: {
	                enabled: true,
	                alpha: 45,
	                beta: 0
	            }
	        },
	        title: {
	        	text: ''
	        },
	        tooltip: {
	            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
	        },
	        plotOptions: {
	            pie: {
	                allowPointSelect: true,
	                cursor: 'pointer',
	                depth: 35,
	                dataLabels: {
	                    enabled: true,
	                    format: '{point.name}'
	                }
	            }
	        },
	        //饼图颜色设置
			colors:colors,
	        series: [{
	            type: 'pie',
	            name: '占比：',
	            data: text
	        }]
	    });
	}
	
	function setLayerTime(layerTime) {
		$('#layerTime').html("");
		$('#layerTime').append('<span class="layerTime" style="font-size:12px  ;">更新时间:'+layerTime+'</span>');
	}
	function cleanAnalysis() {
		$.each(showAnalysis, function(i, n) {
			f2net.window.setLayerVisible(i,false);
		});
	}
	return {init:init,analysis:analysis,cleanAnalysis:cleanAnalysis,getLegend:getLegend};
});