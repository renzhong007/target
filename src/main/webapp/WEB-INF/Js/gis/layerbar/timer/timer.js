define(['jquery', 'util'], function($, util) {
	function showTime(){
	//	alert("test");
		
		
		
//		var spanHour = document.getElementById("timeHour");   //这是获取显示时间的小时span
//		var spanMinute = document.getElementById("timeMinute");   //这是获取显示时间的分钟span
//	    var date = new Date();
//	    var year = date.getFullYear();
//	    var month = date.getMonth()+1;      //月从0开始计数，所以要加1
//	    if(month< 10)
//	    	month = "0"+month;
//	    var day = date.getDate();                //date.getDay()是获得星期几，getDate()才是日期
//	    var hour = date.getHours();
//	    if(hour < 10)
//	        hour = "0"+hour;
//	    var min = date.getMinutes();
//	    if(min < 10)
//	        min = "0"+min;
//	    var sec = date.getSeconds();
//	    if(sec < 10)
//	        sec = "0"+sec;
//	    // lab.innerHTML = year+"-"+month+"-"+day+"    "+hour+":"+min+":"+sec;
//	    spanHour.innerHTML = hour ;
//	    spanMinute.innerHTML = min ; 
		
		

		
		var cid = [];  //泵站id
		$.each(util.getConfigList("gis_stationFlowConfig"), function(i, n) {
			cid.push(n.value);
		});
		var rtName=[];//实时字段名 'OUTFLOWSUM','OUTFLOWSUM2','OUTFLOWSUM3','OUTFLOWSUMT','OUTFLOWSUMT2'
		var dayFlowConfig = util.getConfigList("gis_promptBox_dayFlow");
		var allFlowConfig = util.getConfigList("gis_promptBox_allFlow");
		if(dayFlowConfig.length > 0) {
			$.each(dayFlowConfig, function(index, config) {
				rtName.push(config.value);
			});
		}
		if(allFlowConfig.length > 0) {
			$.each(allFlowConfig, function(index, config) {
				rtName.push(config.value);
			});
		}
//		​http://localhost:8080/water-gis/realTimeData/getByCid?cid=2&rtName=OUTFLOWSUM&rtName=OUTFLOWSUM2&rtName=OUTFLOWSUM3&rtName=OUTFLOWSUMT&rtName=OUTFLOWSUMT2&staticName=NAME	
		
		$.ajax({  // realTimeData/getByCid?cid=2&rtName=OUTFLOWSUM&rtName=OUTFLOWSUM2&rtName=OUTFLOWSUM3&rtName=OUTFLOWSUMT&rtName=OUTFLOWSUMT2&staticName=NAME
			
			url:"realTimeData/getByCid?cid="+cid+"&rtName="+rtName+"&staticName=name",
    		success:function(data){

    		   var time="";
//    		   var time1="";
//    		   var time2="";
    		   var hour="";
			   var minute="";
    				$(data.data).each(function(i,e){
    					if(e.startTime==null) {
    						time="00:00";
    					} else {
    						time=e.startTime;    //e.startTime 例"2016-03-24 00:00:00"
    						var times=time.split(' ');  //将其按照空格切割 times[0]为"2016-03-24" ;times[1]为"00:00:00"
    						hour=times[1].split(':')[0];  //继续将times[1]按照"；"切割
    						minute=times[1].split(':')[1];
//    						time1=times[1];
//    						time2=times[2];
//    						var times2[]=times[2].split(":");
//    						hour=timer2[1];
//    						minute=timer2[2];
    						//alert("test1");
    						//alert(e.STARTTIME);
    						
    						//salert(times);
    					
    					}
    					
    				});
					var oDate = new Date(); //实例一个时间对象；
                  hour= oDate.getHours(); //获取系统时，
                   minute=oDate.getMinutes(); //分
    				
    				$("#timeHour").text(hour);
    				$("#timeMinute").text(minute);
			}
		});
    				
	}
                 
                    //鄂尔多斯时间改为当前时间
				 var oDate = new Date(); //实例一个时间对象；
           var hour= oDate.getHours(); //获取系统时，
            var minute=oDate.getMinutes(); //分
            if(hour<10){
              	 hour='0'+hour;
               }
   			if( minute<10){           	 
              	 minute='0'+minute;
               }
			$("#timeHour").text(hour);
			$("#timeMinute").text(minute);
	return showTime;
});