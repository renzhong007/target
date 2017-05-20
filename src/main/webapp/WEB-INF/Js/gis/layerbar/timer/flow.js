define(['jquery', 'util'], function($, util) {
  
	function flowData(){
		
		var cid = [];  //泵站id
		$.each(util.getConfigList("gis_stationFlowConfig"), function(i, n) {
			cid.push(n.value);
		});
		var rtName=[];//实时字段名 'OUTFLOWSUM','OUTFLOWSUM2','OUTFLOWSUM3','OUTFLOWSUMT','OUTFLOWSUMT2'
		var rtName1=[];
		var rtName2=[];
		
		var dayFlowConfig = util.getConfigList("gis_promptBox_dayFlow");
		//allFlowConfig改為總瞬時流量
		var allFlowConfig = util.getConfigList("gis_promptBox_allFlow");
		var yesdayFlowConfig = util.getConfigList("gis_promptBox_yesdayFlow");
		
		if(dayFlowConfig.length > 0) {
			$.each(dayFlowConfig, function(index, config) {
				rtName.push(config.value);
			});
		}
		if(allFlowConfig.length > 0) {
			$.each(allFlowConfig, function(index, config) {
				rtName1.push(config.value);
			});
		}
		
		if(yesdayFlowConfig.length > 0) {
			$.each(yesdayFlowConfig, function(index, config) {
				rtName2.push(config.value);
			});
		}
		
	//	​http://localhost:8080/water-gis/realTimeData/getByCid?cid=2&rtName=OUTFLOWSUM&rtName=OUTFLOWSUM2&rtName=OUTFLOWSUM3&rtName=OUTFLOWSUMT&rtName=OUTFLOWSUMT2&staticName=NAME
	//		总供水量(相加)：OUTFLOWSUM,OUTFLOWSUM2，OUTFLOWSUM3
	//		今日累计供水量(相加)：OUTFLOWSUMT,OUTFLOWSUMT
		//var spanHour = document.getElementById("timeHour");   //这是获取显示时间的小时span
	//	var spanMinute = document.getElementById("timeMinute");   //这是获取显示时间的分钟span
		//   spanHour.innerHTML = hour ;
		//    spanMinute.innerHTML = min ;
		var ids = [];
		var allFlowValue = 0;
		var dayFlowValue = 0;
		var yesdayFlowValue = 0;

		var yesterday=new Date(); 
		//测试用时间
		//yesterday= "Wed Sep 07 2016 09:50:52 GMT+0800 (中国标准时间)";
		//yesterday.replace(/-/g,"/");
		yesterday.setDate(yesterday.getDate()-55); 
		var yesterdarY=yesterday.getFullYear();		
		if(yesterday.getMonth()+1<10){
			var yesterdayM='0'+(yesterday.getMonth()+1);
		}else{
			var yesterdayM=yesterday.getMonth()+1;
		}
		
		if(yesterday.getDate()<10){
			var yesterdayD='0'+yesterday.getDate();
		}else{
			var yesterdayD=yesterday.getDate();
		}
			
	//	var yesStartTime=yesterdarY+'-'+yesterdayM+'-'+yesterdayD+' '+'23:44:00';
	//	var yesEndTime=yesterdarY+'-'+yesterdayM+'-'+yesterdayD+' '+'23:59:00';
		//测试用
		var yesStartTime=yesterdarY+'-'+yesterdayM+'-'+yesterdayD+' '+'03:38:00';
		var yesEndTime=yesterdarY+'-'+yesterdayM+'-'+yesterdayD+' '+'03:42:00';

//		var now = new Date();
//		yesterday=now.addDays(-1);//加减日期操作
//		var yesStartTime=yesterday.Format("yyyy-MM-dd")+' '+'23:44:00';
//		var yesEndTime=yesterday.Format("yyyy-MM-dd")+' '+'23:59:00';
		
		$.each(cid, function(i, n) {
//			util.executeAjaxUrlForResult("device/listDeviceByDeviceType", {data:{deviceType: n}, async: false}, function(result) {
//				$.each(result.data, function(index, value) {
//					ids.push(parseInt(value.id) + "");
//				});
//			});
			util.executeAjaxUrlForResult("realTimeData/getByCid", {data:{cid: n}, async: false}, function(result) {
				$.each(result.data, function(index, station) {
					$.each(allFlowConfig, function(i1, n1) {
						if(station[n1.value] != undefined && station[n1.value] != null) {
							allFlowValue = parseFloat(allFlowValue) + parseFloat(station[n1.value]);
						}
					});
					$.each(dayFlowConfig,function(i1,n1){
						if(station[n1.value] != undefined && station[n1.value] != null) {
							dayFlowValue= parseFloat(allFlowValue) + parseFloat(station[n1.value]);
						}
					});
				});
			});

			$("#allFlow").text(parseFloat(allFlowValue).toFixed(2)+"m3");
			$("#dayFlow").text(parseFloat(dayFlowValue).toFixed(2)+"m3");
			
			util.executeAjaxUrlForResult("historyData/getHistoryDataByIds", {data:{ids: n, startTime:yesStartTime, endTime:yesEndTime, rtName:'OUTFLOWSUMT',timeUnit:'mi',interval:1}, async: false}, function(result) {
				if(result.data[1]==undefined){
					yesdayFlowValue='0'
				}else{
					$.each(result.data[1], function(index, station) {
						$.each(yesdayFlowConfig, function(i1, n1) {
							if(station[n1.value] != undefined && station[n1.value] != null) {
								yesdayFlowValue = parseFloat(station[n1.value]);
							}
						});
					});
				}
					
			});
		});
		$("#yesterdayFlow").text(parseFloat(yesdayFlowValue).toFixed(2)+"m3");
		var startTime, endTime;
		var date = new Date();
		var timestr = util.getConfig("gis_timer_todayTotalFlowDate");
		if(timestr) {
			timestr = timestr.replace(/-/g,"/");
			startTime = new Date(timestr);
			date.setDate(startTime.getDate());
			date.setMonth(startTime.getMonth());
			endTime = util.timeStamp2String(date, "yyyy-MM-dd HH:mm:ss");
			startTime = util.timeStamp2String(startTime, "yyyy-MM-dd 00:00:00");
		} else {
			startTime = util.timeStamp2String(date, "yyyy-MM-dd 00:00:00");
			endTime = util.timeStamp2String(date, "yyyy-MM-dd HH:mm:ss");
		}
		var zeroData = 0;
		var endData = 0;
//		var dayFlowValue = 0;
//		util.executeAjaxUrlForResult("historyData/getHistoryDataByIds", {data:{ids:ids, startTime:startTime, endTime:endTime, rtName:rtName, timeUnit:"minute", interval:"15"}, async: false}, function(result) {
//			$.each(ids, function(i, id) {
//				//由于泰达没有今日总流量的属性，因此需要手动计算，计算方式为获取当前时刻总累计流量(allFlowValue)，减去当天0时的总累计流量，得到的差值就是今日累计流量
//				var hData = result.data[id];
//				var startFlowData = hData[hData.length - 1];
//				var endFlowData = hData[0];
//				$.each(rtName, function(i1, attr) {
//					if(startFlowData[attr] != undefined && startFlowData[attr] != null) {
//						zeroData = parseFloat(zeroData) + parseFloat(startFlowData[attr]);
//					}
//					if(endFlowData[attr] != undefined && endFlowData[attr] != null) {
//						endData = parseFloat(endData) + parseFloat(endFlowData[attr]);
//					}
//				});
//			});
//			dayFlowValue = endData - zeroData;
//		});
		
		
		
		
		
//		$.ajax({  // realTimeData/getByCid?cid=2&rtName=OUTFLOWSUM&rtName=OUTFLOWSUM2&rtName=OUTFLOWSUM3&rtName=OUTFLOWSUMT&rtName=OUTFLOWSUMT2&staticName=NAME
//    		
//			
//			url:"realTimeData/getByCid?cid="+cid+"&rtName="+rtName+"&staticName=name",
//    		success:function(data){
////    		 var allFlow = document.getElementById("allFlow");   //这是获取显示总供水量的h5
////    		 var dayFlow = document.getElementById("dayFlow");   //这是获取显示日供水量的h4
//
//    		   var allFlowValue=0,dayFlowValue=0;
//		 
////    				console.info("树->"+roots[i].deviceId);
//    				$(data.data).each(function(i,e){
////    					console.info("设->"+this.deviceId);
//    					/*
//    					if(this.deviceId==roots[i].deviceId&&this.useState==0){
////    						console.info("取id"+roots[i].id);
//    						var node = $('#tree').tree('find', roots[i].id);
//    						$('#tree').tree('check', node.target);
//    					}
//    					
//    					*/
////    				var	OUTFLOWSUM,OUTFLOWSUM2,OUTFLOWSUM3;
////    				var OUTFLOWSUMT,OUTFLOWSUMT2;
////    					if(e.OUTFLOWSUM==null) {OUTFLOWSUM=0;}else{OUTFLOWSUM=e.OUTFLOWSUM;}
////    					if(e.OUTFLOWSUM2==null){OUTFLOWSUM2=0}else{OUTFLOWSUM2=e.OUTFLOWSUM2;}
////    					if(e.OUTFLOWSUM3==null){OUTFLOWSUM3=0}else{OUTFLOWSUM3=e.OUTFLOWSUM3;}
////    					
////    					if(e.OUTFLOWSUMT==null){OUTFLOWSUMT=0}else{OUTFLOWSUMT=e.OUTFLOWSUMT;}
////    					if(e.OUTFLOWSUMT2==null){OUTFLOWSUMT2=0}else{OUTFLOWSUMT2=e.OUTFLOWSUMT2;}
////    					
////    					allFlowValue=allFlowValue+(OUTFLOWSUM-0)+(OUTFLOWSUM2-0)+(OUTFLOWSUM3-0);
////    					dayFlowValue=dayFlowValue+(OUTFLOWSUMT-0)+(OUTFLOWSUMT2-0); 
//    					
//    					for(var i=0; i<dayFlowConfig.length; i++) {
//    						var attrName = dayFlowConfig[i].value;
//    						if(e[attrName] != undefined && e[attrName] != null) {
//    							dayFlowValue = parseFloat(dayFlowValue) + parseFloat(e[attrName]);
//    						}
//    					}
//    					
//    					for(var i=0; i<allFlowConfig.length; i++) {
//    						var attrName = allFlowConfig[i].value;
//    						if(e[attrName] != undefined && e[attrName] != null) {
//    							allFlowValue = parseFloat(allFlowValue) + parseFloat(e[attrName]);
//    						}
//    					}
//    					
//    				});
//    				$("#allFlow").text(parseFloat(allFlowValue).toFixed(2)+"m3");
//    				$("#dayFlow").text(parseFloat(dayFlowValue).toFixed(2)+"m3");
//    		}
//    	}); 
	}
 
	return flowData;
});