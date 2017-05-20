define(['jquery','util','highcharts','schedulechart'],function($,util,highcharts,schedulechart) {
	var bottomBarFlowIds = [];
	var bottomBarFlowRtdAttr = [];
	var bottomBarNowDate = new Date();
	
	
	//隐藏底部面板方法
	function hideBottomPanel() {
		if($(".bottom-panel").css('bottom') == '0px'){
			$(".bottom-panel").css('bottom','-159px');
			$("#bar .bottom-cont-div div").removeClass().addClass("tab-btn-down-up");
		}else if($(".bottom-panel").css('bottom') == '-159px'){
			$(".bottom-panel").css('bottom','0px');
			$("#bar .bottom-cont-div div").removeClass().addClass("tab-btn-down-down");
		}
	}
	
	/*
	 * start:底部曲线放大缩小按钮功能    by_zhc
	 */
	$("#bottombutton").click(function(){
		if($("#bottombutton i").attr("class")=="glyphicon glyphicon-chevron-up"){
			//$(".bottom").css({height:650});
			$(".bottom").css({height:300});
			$(".bottom").css({"z-index":"9999"});
			$("#bottombutton i").attr("class","glyphicon glyphicon-chevron-down");
		}else if($("#bottombutton i").attr("class")=="glyphicon glyphicon-chevron-down"){
			$(".bottom").css({height:140});
			$(".bottom").css({"z-index":"20"});
			$("#bottombutton i").attr("class","glyphicon glyphicon-chevron-up");
		}
		ChartData.height = $(".bottom").height();
		ChartData.width = $(".bottom").width();
		schedulechart.initChart('#bottomTotalChart', {}, ChartData);//按新的配置显示highchart
	})
	/*
	 * end:底部曲线放大缩小按钮功能    by_zhc
	 */
	
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
	
	//判断开始日期与结束日期是否为同一天
	function isSameDay(startTime, endTime) {
		var tempStart = startTime.split(" ");
		var tempStart1 = tempStart[0].split("-");
		var tempEnd = endTime.split(" ");
		var tempEnd1 = tempEnd[0].split("-");
		return (tempStart1[2] - tempEnd1[2] == 0) ? "t" : "y"; 
	}
	
	
	
	//定义图表的属性
	var ChartData = {
			titleText:"24小时总供水曲线(m^3/h)",
			unit: "",
			height:140,
			legendshow:true,
			dataLabelE: false,
			exportable:false,
			SeriesType:"line",//line
			dashStyle: 'longdash',
			plValue:2000,
			tickInterval:1,
			step:4,
			staggerLines:1,
			categories: [],
			series: [],
			
//			yAxisMin: 0
	};
	
	//获取底部面板过程线总流量
	var getTotalFlow = function() {
		var tmp = new Date();
		tmp.setTime(bottomBarNowDate.getTime());
		
		var dd = new Date();
		dd.setYear(tmp.getFullYear());
		dd.setMonth(tmp.getMonth());
		dd.setDate(tmp.getDate());
		
		/*
		 * start:底部曲线时间段设置    by_zhc
		 */
//		var endTime1 = timeStamp2String(dd, "yyyy-MM-dd HH:mm:ss");
//		if(dd.getHours()<8){
//			dd.setDate(dd.getDate()-1);//如果该时刻为早上八点之前，则开始时间为昨天早上八点；否则为今日八点
//		}
//		var startTime1 = timeStamp2String(dd, "yyyy-MM-dd 08:00:00");//今天时间
//	
//		var endTime0 = timeStamp2String(dd, "yyyy-MM-dd 07:59:59");
//		dd.setDate(dd.getDate()-1);
//		var startTime0 = timeStamp2String(dd, "yyyy-MM-dd 08:00:00");//昨天时间
		/*
		 * start:底部曲线时间段设置    by_zhc
		 */
		
		/*
		 * start:底部曲线时间段设置    by_zlm
		 */
		var endTime1 = timeStamp2String(dd, "yyyy-MM-dd HH:mm:ss");
		var startTime1 = timeStamp2String(dd, "yyyy-MM-dd 00:00:00");//今天时间
		dd.setDate(dd.getDate()-1);
		var endTime0 = timeStamp2String(dd, "yyyy-MM-dd 23:59:59");
		var startTime0 = timeStamp2String(dd, "yyyy-MM-dd 00:00:00");//昨天时间
		/*
		 * start:底部曲线时间段设置    by_zlm
		 */
		
		var ids = bottomBarFlowIds;
		//泰达定制化
		//ids.push("107");
		//ids.push("108");
		ids.push("117");
		var rtdAttr = bottomBarFlowRtdAttr;
		rtdAttr.push("outFlow");
		var tflow={};
		var yflow={};
		
		//定义X轴
		var temp_categories = [];
		
		for (var i=0; i < 24; i++) {
			var str = "";
			if (i < 10) {
				str = "0"+i+":";
			} else {
				str = i+":";
			}
			temp_categories.push(str + "00");
			temp_categories.push(str + "15");
			temp_categories.push(str + "30");
			temp_categories.push(str + "45");
			
		}
		
		/*for (var i=8; i < 24; i++) {
			var str = "";
			if (i < 10) {
				str = "0"+i+":";
			} else {
				str = i+":";
			}
			temp_categories.push(str + "00");
			temp_categories.push(str + "15");
			temp_categories.push(str + "30");
			temp_categories.push(str + "45");
			
		}
		for (var i=0; i < 8; i++) {
			var str = "";
			if (i < 10) {
				str = "0"+i+":";
			} else {
				str = i+":";
			}
			temp_categories.push(str + "00");
			temp_categories.push(str + "15");
			temp_categories.push(str + "30");
			temp_categories.push(str + "45");
			
		}*/
		
		util.executeAjaxUrlForResult("historyData/getHistoryDataByIds", {data:{ids:ids,rtName:rtdAttr,startTime:startTime0,endTime:endTime0,timeUnit:"minute",interval:"15"},async:false}, function(result){
			$("#bottomTotalChart").html("");
			var value = {};
			$.each(temp_categories, function(i, n) {
				value[n] = null;
			});
			
			$.each(result.data,function(i1,n1){
				$.each(n1,function(i,n) {
					var t0 = n.startTime.split(" ");
					var t1 = t0[1].split(":");
					var t2 = t1[0]+":"+t1[1];
					if($.inArray(t2,temp_categories) > -1) {
						$.each(rtdAttr, function(ivalue, nvalue) {
							if(undefined == n[nvalue] || null == n[nvalue]) {
								n[nvalue] = null;
							} else {
								value[t2] += parseFloat(n[nvalue]);
							}
						});
					} 
					if(value[t2]!=null){
						value[t2] = Math.round(value[t2] * 100) / 100;
					}
					
				});
			});
//			for (var name in value) {
//				if (value[name] == 0) {
//					value[name] = null;
//				}
//			}
			
//			$.each(value,function(i1,n1){
////				n1 = parseFloat(n1).toFixed(2);
//				value[i1] = parseFloat(n1).toFixed(2);
//			});
			
			
			ChartData.categories = temp_categories;
			yflow = {name:"昨日流量", data:[],color:"#C1ADE8", zIndex:30};		
			$.each(value,function(i,n){
				yflow.data.push(n);
			});
//			ChartData.series.push(yflow);
		});
		
		config={
				upper:{typeName:"upper",
					attr:"upperLimit",
					name:"上限曲线",
					color:"#ff7f50"
					},
					lower:{typeName:"lower",
						attr:"lowerLimit",
						name:"下限曲线",
						color:"#00ff00"
						}
		};
		
		
		util.executeAjaxUrlForResult("historyData/getHistoryDataByIds", {data:{ids:ids,rtName:rtdAttr,startTime:startTime1,endTime:endTime1,timeUnit:"minute",interval:"15"},async:false}, function(result) {
			var value1 = {};
			$.each(temp_categories, function(i, n) {
				value1[n] = null;
			});
			
			$.each(result.data,function(i,n){
				$.each(n, function(i1,n1) {
					var t0 = n1.startTime.split(" ");
					var t1 = t0[1].split(":");
					var t2 = t1[0]+":"+t1[1];
					
					if($.inArray(t2,temp_categories) > -1) {
						$.each(rtdAttr, function(ivalue, nvalue) {
							if(undefined == n1[nvalue] || null == n1[nvalue]) {
								n1[nvalue] = null;
							} else {
								value1[t2] += parseFloat(n1[nvalue]);
							}
						});
					} 
					if(value1[t2]!=null){
						value1[t2] = Math.round(value1[t2] * 100) / 100;
					}
				});
			});
//			for (var name in value1) {
//				if (value1[name] == 0) {
//					value1[name] = null;
//				}
//			}
			tflow = {name:"今日流量", data:[], color:"#0F557B",zIndex:30};

			/*
			 * start:遍历今日流量数组，获取最大值和最小值，并设置最值点在曲线中的显示by_zhc
			 */
			var minvalue = 9999999;
			var maxvalue = 0;
			
			$.each(value1,function(i1,n1){
				if(n1>maxvalue&&n1!=null)maxvalue=n1;
				if(n1<minvalue&&n1!=null)minvalue=n1;
//				n1 = Math.round(n1 * 100) / 100;
			});
//			minvalue = Math.round(minvalue * 100) / 100;
//			maxvalue = Math.round(maxvalue * 100) / 100;

			
			$.each(value1,function(i1,n1){
				if(n1==maxvalue) {
					n1={
							y: maxvalue,
							color: '#ff0000',
							radius: 4
						}
				}
				if(n1==minvalue){
					n1={
							y: minvalue,
							color: '#ff0000',
							radius: 4
						}
				} 
				tflow.data.push(n1);
			});
			/*
			 * end:遍历今日流量数组，获取最大值和最小值，并设置最值点在曲线中的显示by_zhc
			 */
			
			
			ChartData.series.push(tflow);
			ChartData.series.push(yflow);
			getLimitData(config.upper);
			getLimitData(config.lower);
			schedulechart.initChart('#bottomTotalChart', {}, ChartData);
		});
		
		function getLimitData(params) {
			var limitValue={};
			$.each(temp_categories, function(i, n) {
				limitValue[n] = null;
			});
			//获取下限数据(enName不支持多个传入  需要多次获取)//遍历rtdAttr  需要的属性:OUTFLOW OUTFLOW2
			$.each(rtdAttr,function(i0,n0) {
				util.executeAjaxUrlForResult("statis/getUpperLowerLimit24h", {data:{deviceIds:ids,enName:n0,intType:"mi",interval:"15",typeName:params.typeName},async:false}, function(result){
		//			var value0={};
		//			//初始化value0
		//			$.each(temp_categories, function(i, n) {
		//				value0[n] = 0;
		//			});
					
					//遍历获取到的数据        result.data={[id=23],[id=24]}
		//	23[0]	enName: "OUTFLOW"
		//			id: 23
		//			intType: "mi"
		//			interval: 15
		//			lowerLimit: "232"
		//			timePoint: "1900-01-01 00:00:00"
					$.each(result.data,function(i,n){
						$.each(n, function(i1,n1) {
							var t0 = n1.timePoint.split(" ");
							var t1 = t0[1].split(":");
							var t2 = t1[0]+":"+t1[1];
							if($.inArray(t2,temp_categories) > -1) {//数据时间为坐标轴时间时 
								if(n1[params.attr]==undefined || null == n1[params.attr]){//若数据中不存在该属性时 置null
									n1[params.attr]=null;
								} else {
									limitValue[t2] += parseFloat(n1[params.attr]);
								}
							} 
							if(limitValue[t2]!=null){
								limitValue[t2] = Math.round(limitValue[t2] * 100) / 100;
							}
						});
					});
				});
			});
			var limitDataSeries = {name:params.name, data:[], color:params.color,dashStyle:"Dash",zIndex:30};
			$.each(limitValue,function(i,n){
				limitDataSeries.data.push(n);
			})
			ChartData.series.push(limitDataSeries);
		}	
	};
	
	//鹰眼对面板的操作
	//显示鹰眼时面板的状态
	var showovermap = function(){
		$("#bar").css('right','120px');
		getTotalFlow();
		
	}
	//隐藏鹰眼时面板的状态
	var hideovermap = function(){
		$("#bar").css('right','14px');
		getTotalFlow();
	}
	
	//左侧面板隐藏和显示对底部面板的影响
	var hideleftnavi = function(show){
		if(!show){
			$("#bar").css('left','0px');
			
		}else{
			$("#bar").css('left','249px');
		}
		getTotalFlow();
	}
	
	//将获得的POJO对象根据对应方法转换成数组
	function getValueToArr(arr) {
		var temparr = [];
		$.each(arr, function(i, n) {
			temparr.push(n.value);
		});
		return temparr;
	}
	
	
	var idsdata = util.getConfigList("bottomBarFlowIds");
	bottomBarFlowIds = getValueToArr(idsdata);
	var rtddata = util.getConfigList("bottomBarFlowRtdAttr");
	bottomBarFlowRtdAttr = getValueToArr(rtddata);
	
	var timestr = util.getConfig("bottomBarNowDate");
	if (timestr) {
		timestr = timestr.replace(/-/g,"/");
		bottomBarNowDate = new Date(timestr);
	}
	
	getTotalFlow();
});