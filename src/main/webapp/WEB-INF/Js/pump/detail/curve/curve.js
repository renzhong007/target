define(['jquery', 'util', 'const' , '../../common/waterTabBtn','../../common/schedulechart'],function($, util, con, WaterTabBtn,schedulechart) {
	
	//编辑对象
	var key = con.curveAttr[0];
	
	var ChartData = {
			titleText:"",
			unit: "",
			height:200,
			legendshow:true,
			dataLabelE: false,
			exportable:false,
			SeriesType:"line",
			plValue:2000,
			tickInterval:5,
			step:4,
			staggerLines:1,
			categories: [],
			series: []
	};
	
	if (!con.griddata) {
		con.initData();
	}
	
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
	ChartData.titleText = key.title + "(" + key.unit + ")";
	ChartData.series=[];
	var curvedata={name:key.title, data:[], zIndex:30};
	
	var value = {};
	$.each(temp_categories, function(i, n) {
		value[n] = null;
	});
	
	isIndexOfExist();
	//判断indexOf方法是否存在，如果不存在则创建该方法
	function isIndexOfExist() {
		if (!Array.prototype.indexOf)
		{
		  Array.prototype.indexOf = function(elt /*, from*/)
		  {
		    var len = this.length >>> 0;
		    var from = Number(arguments[1]) || 0;
		    from = (from < 0)
		         ? Math.ceil(from)
		         : Math.floor(from);
		    if (from < 0)
		      from += len;
		    for (; from < len; from++)
		    {
		      if (from in this &&
		          this[from] === elt)
		        return from;
		    }
		    return -1;
		  };
		}
	}
	
	if(con.griddata != null) {
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
//			if(temp_categories.indexOf(t2) != -1) {
//				if(n[key.field] != null) {
//					value[t2] = parseFloat(n[key.field]);
//				}
//			};
		});
	}
	$.each(value,function(i,n){
		curvedata.data.push(n);
	});
	ChartData.series.push(curvedata);
	var deltaTime = (util.toDate(con.endTime) - util.toDate(con.startTime)) / 86340000;
	ChartData.tickInterval = 5 + Math.ceil(deltaTime);
	ChartData.step = 4 + Math.floor(deltaTime);
	schedulechart.initChart('#curve', {}, ChartData);
	
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
			
			if(con.griddata != null) {
				$.each(con.griddata,function(i,n){
					var t0 = n.startTime.split(" ");
					var t1 = t0[1].split(":");
					var t2 = t1[0]+":"+t1[1];
					var t3 = t0[0].split("-");
					var detailDate = t3[2]+"日"+t2;
					
					if(temp_categories.indexOf(detailDate) != -1) {
						if(n[obj.field] != null) {
							value[detailDate] = parseFloat(n[obj.field]);
						}
					};
//					if(temp_categories.indexOf(t2) != -1) {
//						if(n[key.field] != null) {
//							value[t2] = parseFloat(n[obj.field]);
//						}
//					};
				});
			}
			$.each(value,function(i,n){
				curvedata.data.push(n);
			})
			ChartData.series.push(curvedata);
			schedulechart.initChart('#curve', {}, ChartData);
		}
	});
	
});