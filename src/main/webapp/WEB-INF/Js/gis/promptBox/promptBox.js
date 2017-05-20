define(['jquery','window/window'],function($,funcs) {
	$("#promptBoxYesterday,#promptBoxToday,#promptBoxTotal,#promptBoxDate").click(function(){
		if($("#promptBoxToday").hasClass("open")){
			$("#promptBoxToday").removeClass("open").animate({"right":"8px"},800);//整体移动了83px
			$("#promptBoxYesterday").removeClass("open").animate({"right":"8px"},800);//整体移动了83px
			$("#promptBoxDate").animate({"right":"215px"},800);
			
			$("#promptBoxTotal").animate({"right":"8px"},800);
			$("#promptBoxStats").animate({"right":"133px"},800);
		}else{
			//去掉动态图全部减80 
			$("#promptBoxToday").addClass("open").animate({"right":"180px"},800);
			$("#promptBoxYesterday").addClass("open").animate({"right":"409px"},800);
			$("#promptBoxDate").animate({"right":"320px"},800);
	
			$("#promptBoxTotal").animate({"right":"163px"},800);
			$("#promptBoxStats").animate({"right":"83px"},800);
		}
		
	});
	$("#promptBox>ul>li.stats").click(function(){
//		var funcs = require('easyui');
//		$("#statsChart").window({
//			width:'1000px',    
//    	    height:140,
//    	    left:'0px',//$(window).width()-1203,
//    	    top:$(document).height()-140,
//    	    title:'',
////	    	onResize: function (width,height) {
////                 var stab = $('#Teacher_tab').tabs('getSelected');
////                 var actWidth = width; if (width > 38) { actWidth = width - 38; }
////                 stab.width(actWidth);
////             },
//    	    onClose:function() {
//    	    	$(".stats").removeClass("active")
//    	    }
//		});
		if($('.stats').attr('class').indexOf('active')!=-1){
			$('.stats').removeClass('active');
			$('.bottom').hide(500);
			}
//			$('#statsChart').window('close');}
		else{
			$('.stats').addClass('active');
			$('.bottom').show(500);
//			setTimeout(function(){
//				$('.stats').removeClass('active');
//				$('.bottom').hide(500);
//                },10*1000);
//			$('#statsChart').window('open');
		}
		
		//easyui open close fangfa 
		
//		var funcs = require('window/window');

		//现在写死在window里面  写在这里会出现加载页面后再次点击供水曲线按钮显示两个标题栏
//		require(['promptBox/charts/bottomBar']);//waterSupplyCurve
		
		
	});
	
	var width = $(document).width();
	var height = $(document).height();
	$('#flowDirection').css("height", "650px");
	$('#flowDirection').css("width", "650px"); //视频的宽高比为 29:35
	$('#flowDirection').css("top", "100px");
	//$('#flowDirection').css("margin-left", -((height*29/35)*2/5)+"px");
	$('#flowDirection').css("margin-left", "-250px");
	$('#flowVideo').css("height", "650px");
	$('#flowVideo').css("width", "650px");	
	//$('#flowVideo').css("width", 550*($('#flowVideo')[0].videoWidth)/($('#flowVideo')[0].videoHeight)+"px");	
	$("#promptBox>ul>li.direction").click(function(){
		if($('#flowDirection').hasClass("open")) {
			$('#flowDirection').removeClass("open");
			$('#flowDirection').hide();
			$('#flowVideo')[0].pause();
			$('#flowVideo')[0].currentTime = 0;
		} else {
			$('#flowDirection').addClass("open");
			$('#flowDirection').show();
//			$('#flowVideo')[0].height = $('#flowVideo')[0].height * 2;
			$('#flowVideo')[0].play();
		}
	});
	
	$("#promptBoxDate").click();
//	funcs.initCurve($('#statsChart'));
	require(['promptBox/charts/bottomBar']);
	//隐藏24小时曲线
	//$('.stats').removeClass('active');
	//$('.bottom').hide(500);
	//$('#promptBox>ul>li.stats').click();
//	setTimeout(function(){
//		$('.stats').removeClass('active');
//		$('.bottom').hide(500);
//        },10*1000);
})