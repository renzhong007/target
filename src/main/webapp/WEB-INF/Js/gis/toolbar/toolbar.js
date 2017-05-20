define(['jquery'],function($) {
	var defaults = {
			left:$("#toolbar").css("left")
	};
	var config = {
			
	}
	var position = function(){
		var temp = $.extend({},defaults,config) ;
		$("#toolbar").animate({"left":temp.left},"slow");
	};
	
	
	//鼠标点击面板移出
	$("#toolbar>.row>div>div.left_icon").click(function(){
		if($(this).parent().find(".floatBox:visible").length==0){
			$("#toolbar .floatBox").hide();
			$("#toolbar .unbindClick").show();
			var w = $(this).parent().find(".floatBox").attr("width");
			$(this).parent().find(".floatBox").width(0).show().animate({width: w},"slow");
		}else{
			$("#toolbar .floatBox").hide();
			$("#toolbar .unbindClick").show();
		}
	}).hover(function(){
		$(this).parent().find(".left_title").show();
	},function(){
		$(this).parent().find(".left_title").hide();
	});
	$("#toolbar>.row>div>div.unbindClick").unbind("click");
//	$(document).click (function (e)
//    {
//        e = e || window.event;
//        if ($(e.target).parent().parent().parent()[0] != $ ("#toolbar")[0])
//        {
//        	$("#toolbar .floatBox").hide();
//        }
//    });

	/****************地图功能******************/
	
	//地图放大
	$("#toolbar #zoomIn").click(function(){
	//	 f2net.window.toolbarMethod("zoomin");
		var layerLevel = f2net.window.getlevelnow();//获取当前层级(0-18) 
		if(layerLevel<18){
		f2net.window.setLevel(layerLevel+1);
		}
	})
	//地图缩小
	$("#toolbar #zoomOut").click(function(){
		// f2net.window.toolbarMethod("zoomout");
		var layerLevel = f2net.window.getlevelnow();//获取当前层级(0-18) 
		if(layerLevel>0){
		f2net.window.setLevel(layerLevel-1);
		}
	})
	
	//测距
	$("#toolbar #measuredistance").click(function(){
	   f2net.window.toolbarMethod("measuredistance"); 
	})
	//面积
	$("#toolbar #measurearea").click(function(){
	   f2net.window.toolbarMethod("measurearea"); 
	})
	//面积
	$("#toolbar #cleanout,#toggle-button").click(function(){
	   f2net.window.toolbarMethod("cleanout"); 
	})
	
	//平移
	$("#toolbar #moveMap").click(function(){
		// alert("xx");
		 f2net.window.toolbarMethod("pan");
	})
	
	//全图
	$("#toolbar #fullMap").click(function(){
	//	 alert("xx1");
		 f2net.window.toolbarMethod("initialExtent");
	})
	
	//还原
	$("#toolbar #resetMap").click(function(){
		 f2net.window.toolbarMethod('cleanout');
	})
	
	
	erw_Flag = true;
	dix_Flag = false;
	weix_Flag = false;
	//二维图
	$("#toolbar #normalMap").click(function(){
		//alert("xx");
		if(erw_Flag==false){
			f2net.window.setLayerServiceVisible('MapService0',true);
			f2net.window.setLayerServiceVisible('RreliefMap',false);
			f2net.window.setLayerServiceVisible('SatelliteMap',false);
		//	$("#dtDiv span").removeClass("sel");
		//	$('#ewtService span').addClass("sel");
			erw_Flag = true;
			dix_Flag = false;
			weix_Flag = false;
		}
	})
	//卫星图
	$("#toolbar #satellite").click(function(){
		//alert("xx2");
	//	$("#dtDiv span").removeClass("sel");
		if(weix_Flag==false){
			f2net.window.setLayerServiceVisible('MapService0',false);
			f2net.window.setLayerServiceVisible('RreliefMap',false);
			f2net.window.setLayerServiceVisible('SatelliteMap',true);
	//		$('#wxtService span').addClass("sel");
			erw_Flag = false;
			dix_Flag= false;
			weix_Flag = true;
		}else{
			f2net.window.setLayerServiceVisible('MapService0',true);
			f2net.window.setLayerServiceVisible('RreliefMap',false);
			f2net.window.setLayerServiceVisible('SatelliteMap',false);
	//		$('#ewtService span').addClass("sel");
			erw_Flag = true;
			dix_Flag = false;
			weix_Flag = false;
		}
	})
	//地形图
	$("#toolbar #panorama").click(function(){
	//	alert("xx3");
	//	$("#dtDiv span").removeClass("sel");
		if(dix_Flag==false){
			f2net.window.setLayerServiceVisible('MapService0',false);
			f2net.window.setLayerServiceVisible('RreliefMap',true);
			f2net.window.setLayerServiceVisible('SatelliteMap',false);
		//	$('#dxtService span').addClass("sel");
			erw_Flag = false;
			dix_Flag = true;
			weix_Flag = false;
		}else{
			f2net.window.setLayerServiceVisible('MapService0',true);
			f2net.window.setLayerServiceVisible('RreliefMap',false);
			f2net.window.setLayerServiceVisible('SatelliteMap',false);
		//	$('#ewtService span').addClass("sel");
			erw_Flag = true;
			dix_Flag = false;
			weix_Flag = false;
		}
	})
	return {
		'position':position,
		"config" : config
	};
})
