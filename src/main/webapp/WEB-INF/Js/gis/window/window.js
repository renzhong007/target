define(['jquery',"easyui"],function($) {
	//打开窗体没有iframe 在gis页面写好div和里面的内容
	$.fn.showDialog = function(config){
		config = $.extend({
			title:'',
			onclose:function(){
				
			}
		},config);
		$($(this)).css({"display":"none","position":"absolute","right":"205px","top":"86px"}).show().draggable({ 
			handle:'.panel-box-header' 
		}); ;
		$(".panel-box-header-title",this).html(config.title);
		var _this = this
		$(".panel-tool-close",this).click(function(){
			$(_this).closeDialog();
			config.onclose();
		})
		
	};
	
	//关闭没有iframe 在gis页面写好div和里面的内容
	$.fn.closeDialog = function(config){
		config = $.extend({
			title:'',
			onclose:function(){
				
			}
		},config);
		$(this).css({"display":"none","position":"absolute","right":"205px","top":"86px"}).hide();
		config.onclose();
	};
	//打开窗体含iframe
	//	$.showDialogWithIframe = function(src,title){
	//		$("#win").find("iframe").attr("src",src);
	//		$("#win").window({    
	//    	    width:430,    
	//    	    height:500,
	//    	    left:$(window).width()-633,
	//    	    top:'85px',
	//    	    title:title
	//    	});
	//	};
	
	

	
	//打开窗体含iframe-综合信息 add by lui 2016-3-7
//	$.showDialogWithIframeZhxx = function(){
//		
//		var option = {border:false,url:"realTimeData/getByCid?cid=2&rtName=OUTFLOW&rtName=OUTFLOW2&rtName=OUTFLOWSUMT&rtName=OUTFLOWSUMT2&rtName=OUT_PRESS&rtName=OUT_CL&staticName=SHORT",rownumbers:true};
//		option.loadFilter = function(data) {
//			return {total:data.data.length, rows:data.data};
//		}
//		
//		option.frozenColumns = [[{"title":"名称","field":"SHORT",width:32}]];
//		option.columns = [[
//			{"title":"出口流量m3/h","field":"OUTFLOW",width:81,formatter:function(value,row,index) {
//				var v1,v2;
//				if(row.OUTFLOW==null) {v1=0;}else{v1=row.OUTFLOW;}
//				if(row.OUTFLOW2==null){v2=0}else{v2=row.OUTFLOW2;}
//				return (v1-0)+(v2-0);
//			}  }, //OUTFLOW+OUTFLOW2
//			{"title":"日供水量m3/h","field":"OUTFLOWSUMT",width:81,formatter:function(value,row,index) {
//				var v1,v2;
//				if(row.OUTFLOWSUMT==null) {v1=0;}else{v1=row.OUTFLOWSUMT;}
//				if(row.OUTFLOWSUMT2==null){v2=0}else{v2=row.OUTFLOWSUMT2;}
//				return (v1-0)+(v2-0);
//			} } , //OUTFLOWSUMT  OUTFLOWSUMT2
//			{"title":"出口压力MPa","field":"OUT_PRESS",width:80} ,
//			{"title":"余氯mg/L","field":"OUT_CL",width:58} 
//		]];
//		 
//		 //数据行点击事件 20150701lui
//		option.onClickRow = function(index, row) {
//			//	alert(row.id);
//		 	showDialogWithIframeDetailWin(row.id,row.name);
//		//	alert(index);
//		//	alert(row.ID);
//		//	 parent.document.getElementById("areaID").value=row.ID;
//		//	 var child = parent.document.getElementById("ifra2").contentWindow;//mainFrame这个id是父页面iframe的id 
//		//	 child.initRealTimeGrid(row.ID);//获取子页面中的document对象； 
//		//	 child.initHistoryGrid(row.ID);
//		}
//		 
//		
//	//	option = $.extend({}, easyuiGrid, option);
//		
//		$("#zhxxgrid").datagrid(option);
//		
//		
//		
//		//--------水泵状态
//		
//		var optionPump = {border:false,url:"realTimeData/getStationPumpState?cid=2&rtName=PRUN",rownumbers:true};
//		optionPump.loadFilter = function(data) {
//			return {total:data.data.length, rows:data.data};
//		}
//		
//		optionPump.frozenColumns = [[{"title":"名称","field":"pName",width:65,height:60}]];
//		optionPump.columns = [[                       
//			{"title":"水泵运行状态","field":"1",width:267,height:60,formatter:
//				function(value,row,index) { 
//					if (!$.isEmptyObject(row)) {
//						// return row.objs.name+" "+ row.objs.PRUN;
//						var pumpState="";
//						for(var i =0 ;i<row.objs.length;i++) {
//							//pumpState = pumpState+"---"+row.objs[i].PRUN;
//							if(row.objs[i].PRUN=="1"){ 
//								pumpState = pumpState+ 	"<span class='pumpStatus station-state-1' title='"+ row.objs[i].name+"' commonpanel='"+ row.objs[i].id+"'></span>";
//							}
//								
//							else{
//								pumpState = pumpState+ 	"<span class='pumpStatus station-state-0' title='"+ row.objs[i].name+"' commonpanel='"+ row.objs[i].id+"'></span>";
//							}
//						//	return "<img title='正常:"+row.NormalRate+"%异常:"+row.AbnormalRate+"%不确定:"+row.UncertaintyRate+"%' src='Images/TubeBurst/yellow.png' height='16' width='16'>"
//						//	<span class="pumpStatus station-state-0" title="水泵1" commonpanel="77"></span>
//						}
//						return pumpState;
//						//<span class="pumpStatus station-state-0" title="水泵3" commonpanel="79"></span>
//					}
//					
//				}  
//			} 
//		]];
//		 
//		 //数据行点击事件 20150701lui
//		optionPump.onClickRow = function(index, row) {
//		 	alert(row.id);
//		//	alert(index);
//		//	alert(row.ID);
//		//	 parent.document.getElementById("areaID").value=row.ID;
//		//	 var child = parent.document.getElementById("ifra2").contentWindow;//mainFrame这个id是父页面iframe的id 
//		//	 child.initRealTimeGrid(row.ID);//获取子页面中的document对象； 
//		//	 child.initHistoryGrid(row.ID);
//		}
//		 
//		
//	//	option = $.extend({}, easyuiGrid, option);
//		
//		$("#pumpStateGrid").datagrid(optionPump);
//		
//		 
//		$("#zhxx").window({    
//    	    width:360,    
//    	    height:430,
//    	   // left:$(window).width()-603,
//    	    left:10,
//    	    top:'63px',
//    	    title:'&nbsp;&nbsp;&nbsp;综合数据'
//    	});
//	};
	

	//打开窗体含iframe--泵站,水泵细节 add by lui 2016-3-7
  function showDialogWithIframeDetailWin (id,name){
		$("#detailWin").find("iframe").attr("src","./stationdetail?id="+id);
		$("#detailWin").window({    
    	    width:400,    
    	    height:500,
    	    left:$(window).width()-603,
    	    top:'85px',
    	    title:name
    	});
	} 
	
	//关闭窗体没有iframe
	$.closeDialog = function(){
		$(this).window("close");
	}
	//关闭窗体含iframe
	$.closeDialogWithIframe = function(){
		$("#win").window("close");
	}
//	initCurve($('#statsChart'));
	function initCurve(panel){
		/**/$(panel).window({
			 width:'100%',    
	    	    height:245,
	    	    left:'0px',//$(window).width()-1203,
	    	    top:$(document).height()-245,
	    	    title:'供水曲线',
//	    	    onResize: function (width,height) {
//                    var stab = $('#Teacher_tab').tabs('getSelected');
//                    var actWidth = width; if (width > 38) { actWidth = width - 38; }
//                    stab.width(actWidth);
//                }
	    	    onClose:function() {
	    	    $(".stats").removeClass("active")
	    	    }
		});
	}
	
	function window(options) {
		var $window = $('<div id="cmWindow">');
		$('body').append($window);
		var ops = $.extend({} , options);
		ops.onClose = function() {
			if (ops.onClose) {
				ops.onClose();
				$window.window('destroy');
			}
		}
		return $window.window(ops);
	}
	
	/**
	 * 使用iframe的原始窗口，没有header
	 */
	function origWindow(option) {
		var op = {
			width:200,
			height:200,
			center:true
		}
		
		option = $.extend({}, op, option);
		
		var id = 'origWindow' + parseInt(Math.random()*1000000);
		var $window = $('<div id="'+id+'">');
		$('body').append($window);
		if (option.src.indexOf('?') > -1) {
			option.src = option.src + '&window='+id;
		} else {
			option.src = option.src + '?window='+id;
		}
		$window.append('<iframe src="'+option.src+'" width="100%" height="100%" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no" allowtransparency="yes"></iframe>');
		setOrigWindowHeader(option, $window);
		setOrigWindowCenter(option, $window);
		return $window;
	}
	
	/**
	 * 设置窗口高度
	 */
	function setOrigWindowHeader(option, $window) {
		if (option.width && option.height) {
			$window.css('width', option.width + "px");
			$window.css('height', option.height + "px");
		}
	}
	
	/**
	 *  设置窗口居中
	 */
	function setOrigWindowCenter(option, $window) {
		if (option.center) {
			$window.css('position', 'absolute');
			$window.css('top', '50%');
			$window.css('left', '50%');
			$window.css('margin-top', '-' + (option.height/2) + 'px');
			$window.css('margin-left', '-' + (option.width/2) + 'px');
		}
	}
	return {initCurve:initCurve, window:window, origWindow:origWindow};
});