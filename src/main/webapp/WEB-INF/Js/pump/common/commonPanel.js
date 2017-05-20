

var _commonPanel = new commonPanel();
function commonPanel() {
	var fn = {
		config : {
			temp:{},
			"objid":"0",
			"model":"h",
			"state":"2",
			"waterTabBtn":{},
			"tabs":[
			    {"id":"1","title":"属性","initFunc":"initProperties", type:"tempGisObj,gisObj,waterObj"},
				{"id":"2","title":"现场图",type:"tempGisObj,gisObj,waterObj"},
				{"id":"3","title":"历史数据","initFunc":"initDataProcess",type:"waterObj"},
				{"id":"4","title":"图表分析","initFunc":"initDataChart",type:"waterObj"},
				{"id":"5","title":"报警","initFunc":"initWarnData",type:"waterObj"}
			],
			"rtdTitle":[
				{"title":"出水压力","field":"OUT_PRESS"},
				{"title":"进水压力","field":"INT_PRESS"},
				{"title":"进水余氯","field":"INT_CL"},
				{"title":"出水余氯","field":"OUT_CL"},
				{"title":"进水浊度","field":"INT_NTU"},
				{"title":"出水浊度","field":"OUT_NTU"},
				{"title":"进水流量","field":"INTFLOW"},
				{"title":"出水流量","field":"OUTFLOW"}
			],
			"rtdTime":{"title":"时间","field":"REPORTTIME","width":150},  
			"warnTitle":[
				{"title":"时间","field":"REPORTTIME","width":150},  
				{"title":"告警对象","field":"INT_PRESS"},
				{"title":"对象类型","field":"OUT_PRESS"},
				{"title":"告警类型","field":"INT_CL"},
				{"title":"告警值","field":"OUT_CL"},
				{"title":"告警阀值","field":"INT_NTU"}
			],
			"queryParamsPanel":".commonQueryParamsPenel",
			"data":{},
			"griddata":{},
			"startTime" : "2015-03-16 18:00:00",
			"endTime" : "2015-03-17 18:00:00",
			"processModel" :"today",
			"rtdAttrUrl":"action/Device/getRtdAttr",
			defaultParams:{
				"startTime":"2015-03-16 00:00:00",
				"endTime":"2015-03-17 00:00:00",
				"inv":"mi",
				"num":"15",
				"rtdAttr":["INT_PRESS","OUT_PRESS","INT_CL","OUT_CL","INT_NTU","OUT_NTU","INTFLOW","OUTFLOW","INTFLOWSUM","OUTFLOWSUM","INTFLOWSUMT","OUTFLOWSUMT","INPUTPH","OUTPH","RESERVEOUTPUTFLOW","OUTFLOWSUM2","OUTFLOWSUMT2","OUTFLOWSUM3","DDSUM","TANK_CL","CLZY_PRESS","OUTFLOW2","NPRESSURE","NMARKDATA"],
				"model":"orig"
			},
			chartDataRequest:{
				
			},
			chartConfig : {
				step:10
			},
			gisObjAttrMapper : [
			    {field:"SUBTYPE",title:"供水类型"},
			    {field:"D_S",title:"管径"},
			    {field:"MATERIAL",title:"管材"},
			    {field:"CON_TYPE",title:"连接方式"},
			    {field:"COV_TYPE",title:"埋设方式"},
			    {field:"USE",title:"用途"},
			    {field:"USETYPE",title:"使用类型"},
			    {field:"CEN_DEEP",title:"管中心埋深"},
			    {field:"WORK_STATS",title:"工作状态"},
			    {field:"FINISH_ID",title:"竣工日期"},
			    {field:"LANE_WAY",title:"街道"}
			],
			gisObjAttr : {},
			gisObjId : "USID",
			panelType: "gisObj" //水务设备对象 waterObj gis对象 gisObj
			
		},
		init : function (config) {
			if ('h' == config.model) {
				var cop = $('.commonObjPanel');
				//新增tab页节点
				var tabDiv = $('<div style="position: absolute; top: 0; bottom: 0;">');
				cop.append(tabDiv);
				
				var tools = [];
				var objids = {};
				
				$.each(detailConfig, function(i,n) {
					objids[n.value] = n.remark;
				});
				if (config.objid in objids) {
					var tool = {
						iconCls:'',
						text:"综合概况",
						handler:function(){
							var pageUrl = "../water-scada/Html/Station/NewScada.jsp?o=1&t=1&pictype="+objids[config.objid]+"&id="+fn.config.objid;
							location.href = pageUrl;
							fn.hideCommonPanel();
							$('#win').window('close');
							
						}
					}
					tools.push(tool);
					
				}
				
				
				tabDiv.tabs({    
				    border:true,
				    fit:true,
				    onSelect : function(title,index){
				    	var temptab = tabDiv.tabs('getTab',config.tabs[index].title);
				    	if ('' == $(temptab).html()) {
				    		if (undefined != config.tabs[index].initFunc) {
				    			fn[config.tabs[index].initFunc](temptab);
							}
				    	}
				    	
				    },
				    tools:tools
				});  
				
				
				//遍历tab并根据面板类型显示
				$.each(config.tabs,function(i,n){
					if (n.type.indexOf(fn.config.panelType) > -1) {
						tabDiv.tabs('add',{    
						    title:n.title,    
						    content:''
						});
					}
					
				});
				
				tabDiv.tabs('select',0);
				if ("waterObj" == fn.config.panelType) {
					fn.initTool(tabDiv);
				}
				
			}
		},
		//初始化属性面板
		initProperties : function(tab) {
			if ("waterObj" == fn.config.panelType) {
				fn.initWaterObjProperties(tab);
			} else if ("gisObj" == fn.config.panelType) {
				fn.initGisObjProperties(tab);
			} else if ("tempGisObj" == fn.config.panelType) {
				fn.initTmepGisObjProperties(tab);
			} 
		},
		initGisObjProperties : function(tab) {
			tab.html('');
			var table = $("<table>");
			tab.append(table);
			var objarr = [];
			$.each(fn.config.gisObjAttrMapper, function(i, n) {
				objarr.push({name:n.title, value:fn.config.gisObjAttr[n.field]});
			})
			
			table.propertygrid({    
			    data: objarr,    
			    showGroup: true,    
			    scrollbarSize: 0,
			    fit:true
			});
		},
		initTmepGisObjProperties : function(tab) {
			tab.html('');
			var table = $("<table>");
			tab.append(table);
			var objarr = [];
			$.each(fn.config.temp[fn.config.temp["_title"]], function(i, n) {
				objarr.push({name:n.title, value:fn.config.gisObjAttr[n.field]});
			})
			
			table.propertygrid({    
			    data: objarr,
			    showHeader:false,
			    showGroup: true,    
			    scrollbarSize: 0,
			    fit:true
			});
		},
		//初始化水务设备面板
		initWaterObjProperties : function(tab) {
			tab.html('');
			var table = $("<table>");
			tab.append(table);
			var aa = [];
			table.propertygrid({    
			    data: aa,  
			    border:false,
			    showGroup: true,    
			    scrollbarSize: 0,
			    fit:true
			});
			executeAjaxUrlForResult('action/RealTime/getRealTimeDataById', {"data":{"id":fn.config.objid},async:false}, function(result0) {
				$.each(result0.data, function(i0,n0) {
					if(n0.ID == fn.config.objid) {
						$.each(fn.config.rtdTitle, function(i,n1) {
							var p0 = {};
							p0.name = n1.title;
							p0.value = new Number(n0[n1.field]);
							p0.group = "实时数据";
							p0.editor = "text";
							aa.push(p0);
						});
					}
				});
				$(table).propertygrid('loadData',aa);
			});
			executeUrl('action/Device/getObj?id='+fn.config.objid,'get',function(result)  {
				var obj = result[0];
				$('#win').window('setTitle', obj.pName);
				var LONGITUDE;
				var LATITUDE;
				$.each(obj.objs,function(i,n){
					var p = {};
					if (null != n) {
						p.name = n.chname;
						p.value = n.value;
						p.group = "静态属性";//obj.pName;
						p.objid = obj.pid_bus;
						p.editor = "text";
						aa.push(p);
						if (p.name=="LONGITUDE" && p.value!="0") {
							LONGITUDE = p.value;
						} else if(p.name=="LATITUDE" && p.value!="0") {
							LATITUDE = p.value;
						}
					}
				});
				//点击水厂，令地图居中至相应位置
				var t = ['39','40','42','43','46','69','102','130713'];
				if(t.indexOf(fn.config.objid+'') != -1) {
					if(LONGITUDE!="0" && LATITUDE!="0" && undefined!=LONGITUDE && undefined!=LATITUDE) {
						f2net.window.locateWithXY(LONGITUDE,LATITUDE);
						f2net.window.setLevel(10);
					}
				}
				$(table).propertygrid('loadData',aa);
			});
//			$(table).propertygrid('loadData',aa);
			
			
		},
		//初始化过程数据
		initDataProcess:function (tab) {
			
			var dg = $("<table>");
			tab.append(dg);
			var columns = [];
			columns.push(fn.config.rtdTime);
			$.each(fn.config.rtdTitle,function(i,n){
				columns.push($.extend({},{width:"80"},n));
			});
			var conf = $.extend({},easyuiGrid,{columns:[columns],toolbar:'.commonQueryParamsPenel'});
			dg.datagrid(conf);
			
			//初始化检索框
			var qbtn = fn.initDataProcessChoose(tab);
			$(qbtn).on('click',function(event) {
				var temp_qpp = $(qbtn).parent();
				var st = $("#qpStartTime");
				var stv = $(st).datetimebox('getValue') + ":00";
				var et = $("#qpEndTime");
				var etv = $(et).datetimebox('getValue') + ":00";
				
				var url = 'action/History/getHistoryDataByInv';
				dg.datagrid('loading');
				executeAjaxUrlForResult(url, {"data":{id:fn.config.objid,startTime:stv,endTime:etv,inv:"mi",num:"15",model:"orig",rtdAttr:fn.config.defaultParams.rtdAttr},"async":false}, function(data) {
					dg.datagrid('loaded');
					dg.datagrid('loadData',data.data);
					fn.config.data = data.data;
				});
//				var url = 'action/History/getHistoryDataByInv?id='+fn.config.objid+'&startTime='+stv+'&endTime='+etv;
//				dg.datagrid('loading');
//				executeUrl(url,'get',function(data){
//					//重新加载表格数据
//					dg.datagrid('loaded');
//					dg.datagrid('loadData',data);
//					
//				});
				////console.log(url);
			});
			//
			dg.datagrid('loadData',fn.config.griddata);
		},
		//初始化过程数据选择框
		initDataProcessChoose :function (tab) {
			var qpp = $(fn.config.queryParamsPanel);
			var st = $("#qpStartTime");
			$(st).datetimebox({
				value:fn.config.startTime,
			    required: true,    
			    showSeconds: false 
			});  
			var et = $("#qpEndTime");
			$(et).datetimebox({  
				value:fn.config.endTime,
			    required: true,    
			    showSeconds: false 
			});  
			return qpp.find('.qpbtn');
		},
		//初始化数据图标
		initDataChart : function (tab) {
			tab.html('');
			var div = $("<div style='width:100%;height:100%;position:relative'>");
			tab.append(div);
			//选择条件
			var qpp = $("<div style='width:100%;height:30px;'>");
			
			div.append(qpp);
			//图表
			var chartPanel = $("<div id='ChartData' style='width:100%;position:absolute;top:30px;bottom:0;'>");
			div.append(chartPanel);
			var ChartData = {
				titleText:fn.config.rtdTitle[0].title,
				unit: fn.config.rtdTitle[0].unit,
				legendshow:false,
				dataLabelE: false,
				exportable:false,
				SeriesType:"line",
				plValue:2000,
				tickInterval:5,
				step:fn.config.chartConfig.step,
				staggerLines:1,
				categories: ['7:00', '8:00', '9:00', '10:00', '11:00','12:00','7:00', '8:00', '9:00', '10:00', '11:00','12:00','13:00','14:00','15:00'],
				//categories: ['7:00', '8:00', '9:00', '10:00', '11:00','12:00','7:00', '8:00', '9:00', '10:00', '11:00','12:00'],
				series: [
					{name:'东海大桥', data:[1500.5, null, 3155, 2134,1000,1000,1000, 1616, 0, 0, 0, 3155, 2134, 1616, 1200],  color:"#FF0000",zIndex:30}
				],
			};
			
			//编辑对象
			var key = [fn.config.rtdTitle[0]];
			fn.createChartByChange(ChartData, key);
			
			//切换
			fn.config.waterTabBtn = new WaterTabBtn(qpp,fn.config.rtdTitle,{
				textField:"title",
				selected:"0",
				rowCount : 5,
				singleWidth : "90px",
				leftRightBtnTop : "-10px",
				contentLeft : "21px",
				exeMethod : function(obj){
					ChartData.titleText=obj.title;
					ChartData.unit = obj.unit;
					fn.createChartByChange(ChartData, [obj]);
				}
			})
			
		},
		createChartByChange : function (ChartData,key) {
			var temp_categories = [];
			//判断是否有数据
			if (fn.config.data.length == 0) {
				$('#ChartData').html("<div style='margin:50px auto; max-width: 100px;'>暂无数据！<div>");
				return;
			}
			
			var t0,t1,t2;
			$.each(fn.config.data,function(i,n){
				t0 = n.REPORTTIME.split(" ");
				t1 = t0[1].split(":");
				t2 = t1[0]+":"+t1[1];
				temp_categories.push(t2);
			});
			var tem = parseInt(t1[0]);
			var temMin = parseInt(t1[1]);
			if(tem < 24) {
				for(tem; tem <= 23; tem++) {
					if(temMin == 0 || temMin == 15 || temMin == 30) {
						temMin += 15;
						t2 = tem + ":" + temMin;
						temp_categories.push(t2);
						tem--;
					} else if(temMin == 45) {
						if(tem == 23) {
							
						} else {
							temMin = 0;
							t2 = tem + ":00";
							temp_categories.push(t2);
						}
					}
				}
			}
//			//console.log(temp_categories);
			
			ChartData.categories = temp_categories;
			ChartData.series= [];
			$.each(key,function(i,n){
				var s = {name:n.title, data:[], color:"#FF0000",zIndex:30}
				$.each(fn.config.data,function(i1,n1){
					if(undefined == n1[n.field] || 0==n1[n.field] || "0"==n1[n.field]) {
						s.data.push(null);
//						//console.log("-> " + n1[n.field]);
					} else {
						s.data.push(parseFloat(n1[n.field]));
					}
				});
				tem = parseInt(t1[0]);
				temMin = parseInt(t1[1]);
				for(tem; tem <= 23; tem++) {
					if(temMin == 0 || temMin == 15 || temMin == 30) {
						temMin += 15;
						s.data.push(null);
						tem--;
					} else if(temMin == 45) {
						if(tem == 23) {
							
						} else {
							temMin = 0;
							s.data.push(null);
						}
					}
				}
				
				ChartData.series.push(s);
			});
			
			initChart('#ChartData', {}, ChartData);
			
		},
		//初始化告警列表
		initWarnData:function (tab) {
			var dg = $("<table>");
			tab.append(dg);
			var columns = []
			$.each(fn.config.warnTitle,function(i,n){
				columns.push($.extend({},n,{width:"80"}));
			});
			var conf = $.extend({},easyuiGrid,{columns:[columns]});
			dg.datagrid(conf);
			
		},
		//显示
		showCommonPanel : function() {
			function showPanel() {
				$('.commonObjPanel').show();
				$('#win').window('open');
				$('.commonQueryParamsPenel').show();
				fn.init(fn.config);
			}
			
			if ($('.commonObjPanel').is(":hidden")) {
				if ("waterObj" == fn.config.panelType) {
					fn.initWaterObjData(showPanel);
				} else if ("gisObj" == fn.config.panelType) {
					showPanel();
				} else if ("tempGisObj" == fn.config.panelType) {
					showPanel();
				}
				
			}
			
		},
		//初始化水务设备过程线
		initWaterObjData : function(always) {
			fn.config.data = [];
			fn.config.griddata = [];
			fn.initStartEndTime();
			var params = $.extend({},fn.config.defaultParams);
			params.id = fn.config.objid;
			params.startTime = fn.config.startTime;
			params.endTime = fn.config.endTime;
			executeAjaxUrl('action/History/getHistoryDataByInv',{data:params},function(data){
				fn.config.data = data;
				fn.config.griddata = data;
			},function(){},function(){
				always();
			});
		},
		//隐藏
		hideCommonPanel:function () {
			$('.commonObjPanel').hide();
			$('.commonObjPanel').html('');
			$("tr[commonPanel="+fn.config.objid+"]").removeClass("highlighting");
			//删除 .commonObjPanel 后一个节点
			$('.commonObjPanel').next().remove();
			if($('body').find("div.commonQueryParamsPenel").length == 0) {
				$('.commonObjPanel').after('<div class="commonQueryParamsPenel" style="display: none;"><span>开始时间</span>：<input id="qpStartTime" style="width:155px;"><span>结束时间</span>：<input id="qpEndTime" style="width:155px;"><button class="qpbtn" style="width:60px;">查询</button></div>');
			}
			
		},
		//初始化时间格式
		initStartEndTime : function() {
			//初始化时间带代码
			if (panelStarttime && panelEndtime) {
				fn.config.startTime = panelStarttime;
				fn.config.endTime = panelEndtime;
			} else {
				var date = new Date();
				fn.config.startTime = getCurentDate() + " 00:00:00";
				fn.config.endTime = timeStamp2String(new Date(), "yyyy-MM-dd HH:mm:ss");
			}
		},
		//初始化实时数据列
		initRtdColumn : function() {
			//获取实时数据集合
			executeAjaxUrl(fn.config.rtdAttrUrl,{"data":{"id":fn.config.objid,state:fn.config.state},"async":false},function(data){
				fn.config.rtdTitle = [];
				$('#win').window('setTitle', data[0].pName);
				var rtattr = [];
				$.each(data[0].objs,function(i,n){
					fn.config.rtdTitle.push({"title":n.chname,"field":n.enname,"unit":n.unit});
					rtattr.push(n.enname);
				});
				fn.config.defaultParams.rtdAttr = rtattr;
			});
		},
		initTool : function(tabs) {
//			var arr = ["23","24","25","26"];
//			var index = $.inArray(fn.config.objid,arr);
//			if (index > -1) {
//				var tool = [
//						{
//							iconCls:'',
//							text:"综合概况",
//							handler:function(){
//								//跳转
//								window.location.href = "Html/Station/StationInfo.jsp?id="+fn.config.objid;
//							}
//						},
//				];
//				tabs.tabs({tools:tool});
//			}
		},
		initWindowEvent : function() {
			$("#win").window({
				onBeforeClose : function() {
					$("tr[commonPanel="+fn.config.objid+"]").removeClass("highlighting");
				}
			});
		}
	}
	
	this.show = function(id) {
		fn.config.panelType = "waterObj";
		if (id != fn.config.objid) {
			fn.hideCommonPanel();
		}
		$.extend(fn.config,{"objid":id});
		fn.initRtdColumn();
		fn.showCommonPanel();
		
		
	}
	this.showByGisObj = function(obj) {
		fn.showCommonPanel();
		$("#win").window("close");
		fn.config.gisObjAttr = obj;
		fn.config.panelType = "gisObj";
		fn.showCommonPanel();
	}
	this.setTitle = function(title) {
		$('#win').window('setTitle', title);
	}
	
	this.setTempObj = function(name, obj) {
		fn.config.temp[name] = obj;
		fn.config.temp["_title"] = name;
	}
	
	this.showByCustomGisObj = function(obj, mappername) {
		fn.config.temp["_title"] = mappername;
		fn.showCommonPanel();
		$("#win").window("close");
		fn.config.gisObjAttr = obj;
		fn.config.panelType = "tempGisObj";
		fn.showCommonPanel();
	}
	
	this.hide = function() {
		fn.hideCommonPanel();
	}
	fn.initWindowEvent();
}

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

var detailConfig = [];
var panelStarttime = "";
var panelEndtime = "";
$(function(){
	detailConfig = getConfigList("pointDetailConfig");
	panelStarttime = getConfig("panelStarttime");
	panelEndtime = getConfig("panelEndtime");
	$("body").on("click","[commonPanel]",function(event){
		var id = $(event.currentTarget).attr("commonPanel");
		_commonPanel.show(id);
		$('#win').window('setTitle', $(event.currentTarget).attr("title"));
		if("highlighting" == $(event.currentTarget).attr("class")) {
			$(event.currentTarget).removeClass("highlighting");
		} else {
			$(event.currentTarget).addClass("highlighting").siblings().removeClass("highlighting");
		}
	});
});
