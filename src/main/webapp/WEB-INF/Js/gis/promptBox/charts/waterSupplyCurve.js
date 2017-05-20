define(['jquery','util','highcharts','schedulechart'],function($,util,highcharts,schedulechart) {
waterSupplyCurve(1);

function waterSupplyCurve(id){
	var fn = {
			config : {
				"tabsEx" : "#stats",
				"tabs" : [
//					{"title":"曲线展示"},
//					{"title":"曲线配置"},
				],
				"initIndex" : "0",
				"Chart" : {
					titleText:"出口流量",
					unit: "方/时",
					legendshow:false,
					dataLabelE: false,
					exportable:false,
					SeriesType:"line",
					plValue:2000,
					tickInterval:5,
					step:10,
					yAxisX:7,
					staggerLines:1,
					spacingLeft:0,
					categories: ['7:00', '8:00', '9:00', '10:00', '11:00','12:00','13:00', '14:00', '15:00', '16:00', '17:00','18:00','19:00','20:00','21:00'],
					plotOptions:1,
					series: []
				},
				"chartWidth" : "100%",
				"chartHeight" : "200px",
				"chartData" : [
				     {'id':id,'rtdName':'outflow','data':[100,110,101,90,200,300,180,100,100,100,100,100,100,100,100]},
				],
				"state":"",
				"rtdTitles":[
						{"title":"出水压力","rtattdef":"OUT_PRESS","unit":"MPa"},
						{"title":"出水余氯","rtattdef":"OUT_CL","unit":"mg/L"},
						{"title":"出水浊度","rtattdef":"OUT_NTU","unit":"NTU"},
						{"title":"出水流量","rtattdef":"OUTFLOW","unit":"m3/h"}
				],
				"params" : {
					"startTime":"2015-07-22 18:00:00",
					"endTime":"2015-07-23 18:00:00",
					"timeUnit":"minute",
					"interval":15,
//					"model":"orig",
				},
				"picid":"",
				"type":"left",
			},
			init : function(picid) {
				fn.config.picid = picid;
//				$.each(fn.config.tabs, function(i,n){
//					$(fn.config.tabsEx).append("<div title='" + n.title + "'></div>");
//				});
//				$(fn.config.tabsEx).tabs({
//					border:true,
//					fit:true,
//					tabWidth:80,
//					onSelect : function(title, index){
//						var tempTab = $(fn.config.tabsEx).tabs('getTab',index);
////						fn.initTabType(fn.config.picid,tempTab,index);
//					},
//				});
//				
//				for(var i=0; i < fn.config.tabs.length; i++) {
//					var tab = $(fn.config.tabsEx).tabs('getTab',i);
//					fn.initTabType(picid,tab,i);
//				}
				fn.initTabType(picid, $(fn.config.tabsEx),'0');
			},
			
			tabSelected : function(tab, index) {
				
			},
			initTabType : function(picid, tab, index) {
				tab.html('');
				if("0" == index) {
					var height = fn.config.chartHeight.replace("px","");
					var chartContainer = $('<div class="leftChartContainer" style="margin:auto;display:table;width:280px">');
					var chartDiv = $('<div class="chartDiv"  ></div>');//style="height:' + (height*(fn.config.chartData.length) + 40) + 'px;"
					var chartUl = $('<ul class="chartUl">');
					chartDiv.append(chartUl);
					chartContainer.append(chartDiv);
					tab.append(chartContainer);
					fn.initAttr(picid, chartUl);
				} else if("2" == index) {
					var table = $('<table id="dg">');
					tab.append(table);
					var columns = fn.config.grid.columns;
					var conf = $.extend({},easyuiGrid,{columns:columns,fit:true});
					table.datagrid(conf);
					fn.refreshGridData(table);
				} else if("1" == index) {
					var optionContainer = $('<div class="optionContainer">');
					tab.append(optionContainer);
					fn.initSelector(picid,optionContainer);
				}
			},
			initAttr : function(picid, ul) {
				var height=$('#leftLayout').height();
				var chartHeightString=(fn.config.chartHeight).split('p');
				var chartHeight=parseInt(chartHeightString[0]);
				var chartNum=Math.floor(height/chartHeight);
				 util.executeAjaxUrlForResult("configCharts/list", {data:{picid:picid,type:"left"},async:false}, function(data) {
					$.each(data.rows, function(i,n){
//						if(i<chartNum){
						if(fn.config.type == n.type) {
							var rtdTitle = {};
							rtdTitle.title = n.title;
							rtdTitle.rtattdef = n.rtattdef;
							rtdTitle.unit = n.unit;
							fn.initChartContainer(n.objid, rtdTitle, ul, n);
//						}
						}
					});
				});
			},
			initChartContainer : function(id, rtdTitle, ul, obj) {
				var li = $('<li id="' + rtdTitle.rtattdef + id + '">');
				var dom = $('<div style="width:' + fn.config.chartWidth + ';height:' + fn.config.chartHeight + ';">');
				li.append(dom);
				ul.append(li);
				fn.config.params = fn.initTime(fn.config.params);
				var params = $.extend(fn.config.params,{"ids":id,"rtName":rtdTitle.rtattdef});
				
				if (obj.model == 'static') {
					params.startTime = obj.starttime;
					params.endTime = obj.endtime;
				}
				
				var Chart = fn.config.Chart;
				util.executeAjaxUrlForResult("historyData/getHistoryDataByIds", {"data":params,"async":false}, function(data) {
					Chart = fn.initChartParams(Chart, data.data[id], rtdTitle);
					fn.drawChart(Chart,dom);
				});
			},
			initTime : function(param) {
				var dd = new Date();
				param.startTime = util.getCurentDate();
				param.endTime = util.timeStamp2String(dd, "yyyy-MM-dd HH:mm:ss");
				return param;
			},
			initChartParams : function(ChartData,data,obj) {
				var temp_categories = [];
				var hhh;
				ChartData.titleText = obj.title;
				ChartData.unit = obj.unit;
				$.each(data,function(i,n){
					hhh = n.startTime.substr(11,2);
					mins=n.startTime.substr(14,2);
					temp_categories.push(hhh + ":"+mins);
				});
				var temph = parseInt(hhh);
//				if( temph < 24) {
//					for(temph;temph<=23;temph++) {
//						(temph<10)?"0"+temph:temph;
//						temp_categories.push(temph + "时");
//					}
//				}
				ChartData.categories = temp_categories;
				ChartData.series= [];
				var s = {name:obj.title, data:[], color:"#FF0000",zIndex:30}
				$.each(data,function(i1,n1){
					s.data.push(parseFloat(n1[obj.rtattdef]));
				});
				temph = parseInt(hhh);
				if( temph < 24) {
					for(temph;temph<=23;temph++) {
						s.data.push(null);
					}
				}
				ChartData.series.push(s);
				
				return ChartData;
			},
			drawChart : function(Chart, dom) {
				schedulechart.initChart(dom, {}, Chart);
			},
			refreshGridData : function(table) {
//			executeAjaxUrlForResult(fn.config.grid.url, {"async":false}, function(data) {
//					fn.config.grid.data = data;
//					table.datagrid('loadData',fn.config.grid.data);
//				});
			},
	};
	
	fn.init(id);
}
})