define(['jquery', 'util', 'const' , '../../../common/waterTabBtn','../../../../Plugins/chart/schedulechart'],function($, util, con, WaterTabBtn,schedulechart) {
	
	//图表
//	var ChartData = {
//		titleText:fn.config.rtdTitle[0].title,
//		unit: fn.config.rtdTitle[0].unit,
//		legendshow:false,
//		dataLabelE: false,
//		exportable:false,
//		SeriesType:"line",
//		plValue:2000,
//		tickInterval:5,
//		step:fn.config.chartConfig.step,
//		staggerLines:1,
//		categories: ['7:00', '8:00', '9:00', '10:00', '11:00','12:00','7:00', '8:00', '9:00', '10:00', '11:00','12:00','13:00','14:00','15:00'],
//		//categories: ['7:00', '8:00', '9:00', '10:00', '11:00','12:00','7:00', '8:00', '9:00', '10:00', '11:00','12:00'],
//		series: [
//			{name:'东海大桥', data:[1500.5, null, 3155, 2134,1000,1000,1000, 1616, 0, 0, 0, 3155, 2134, 1616, 1200],  color:"#FF0000",zIndex:30}
//		],
//	};
	
	//编辑对象
	var key = con.curveAttr[0];
//	fn.createChartByChange(ChartData, key);
	
	//切换
	var waterTabBtn = new WaterTabBtn($('#curveTab'),con.curveAttr,{
		textField:"title",
		selected:"0",
		rowCount : 5,
		singleWidth : "90px",
		leftRightBtnTop : "-10px",
		contentLeft : "21px",
		exeMethod : function(obj){
			$("#curve").html("");
			ChartData.titleText=obj.title+"("+obj.unit+")";
			ChartData.series=[];
			var deltaTime = (util.toDate(con.endTime) - util.toDate(con.startTime)) / 86340000;
			ChartData.tickInterval = 5 + Math.ceil(deltaTime);
			ChartData.step = 4 + Math.floor(deltaTime);
			
			var curvedata={name:obj.title,data:[],zIndex:30};
			
			temp_categories = generalCategories(con);
			ChartData.categories = temp_categories;
			
			value = {};
			$.each(temp_categories, function(i, n) {
				value[n] = null;
			});
			
			$.each(con.griddata,function(i,n){
				var t0 = n.startTime.split(" ");
				var t1 = t0[1].split(":");
				var t2 = t1[0]+":"+t1[1];
				
//				if(temp_categories.indexOf(t2) != -1) {
//					value[t2] = parseFloat(n[obj.field]);
//				};
				var t3 = t0[0].split("-");
				var detailDate = t3[2]+"日"+t2;
				
				if(temp_categories.indexOf(detailDate) != -1) {
					if(n[obj.field] != null) {
						value[detailDate] = parseFloat(n[obj.field]);
					}
				};
				 
			});
			$.each(value,function(i,n){
				curvedata.data.push(n);
			})
			ChartData.series.push(curvedata);
			schedulechart.initChart('#curve', {}, ChartData);
			
//			ChartData.unit = obj.unit;
//			fn.createChartByChange(ChartData, [obj]);
		}
	});
	
	
	if (!con.griddata) {
		con.initData();
	}
	var ChartData = {
			titleText:"",
			unit: "",
//			categories: ['7:00', '8:00', '9:00', '10:00', '11:00','12:00','7:00', '8:00', '9:00', '10:00', '11:00','12:00','13:00','14:00','15:00'],
			hieght:200,
			legendshow:true,
			dataLabelE: false,
			exportable:false,
			SeriesType:"line",//line
			plValue:2000,
			tickInterval:5,
			step:4,
			staggerLines:1,
			categories: [],
			series: []
	};
//	var temp_categories = [];
//	for (var i=0; i < 24; i++) {
//		var str = "";
//		if (i < 10) {
//			str = "0"+i+":";
//		} else {
//			str = i+":";
//		}
//		temp_categories.push(str + "00");
//		temp_categories.push(str + "15");
//		temp_categories.push(str + "30");
//		temp_categories.push(str + "45");
//	}
	function generalCategories(con) {
		var cate = [];
		var timeName = 'startTime';
		var data = con.griddata;
		var st = util.toDate(con.startTime);
		if (data[data.length - 1][timeName]) {
			st = util.toDate(data[data.length - 1][timeName]);
		}
		
		var et = util.toDate(con.endTime);
		if (data[0][timeName]) {
			et = util.toDate(data[0][timeName]);
		}
		
		while( st.getTime() <= et.getTime() ) {
			cate.push(util.timeStamp2String(st, "dd日HH:mm"));
			var intervel = util.getBase("mi") * 15;
			st = util.dateAdd(intervel, st);
		}
		return cate;
	}
	
	var temp_categories = generalCategories(con);
	
	ChartData.categories = temp_categories;
	$("#curve").html("");
	ChartData.titleText=key.title+(key.unit!=''?('('+key.unit+')'):'');//'流量(m3/h)'
	ChartData.series=[];
	var curvedata={name:key.title,data:[],zIndex:30};
	
	var value = {};
	$.each(temp_categories, function(i, n) {
		value[n] = null;
	});
	
	$.each(con.griddata,function(i,n){
		var t0 = n.startTime.split(" ");
		var t1 = t0[1].split(":");
		var t2 = t1[0]+":"+t1[1];
		
		var t3 = t0[0].split("-");
		var detailDate = t3[2]+"日"+t2;
		
		if(temp_categories.indexOf(detailDate) != -1) {
			if(n[key.field] != null) {
				value[detailDate] = parseFloat(n[key.field]);
			}
		};
//		if(temp_categories.indexOf(t2) != -1) {
//			value[t2] = parseFloat(n[key.field]);
//		};
			
	});
	$.each(value,function(i,n){
		curvedata.data.push(n);
	})
	ChartData.series.push(curvedata);
	var deltaTime = (util.toDate(con.endTime) - util.toDate(con.startTime)) / 86340000;
	ChartData.tickInterval = 5 + Math.ceil(deltaTime);
	ChartData.step = 4 + Math.floor(deltaTime);
	schedulechart.initChart('#curve', {}, ChartData);
	
});