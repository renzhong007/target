define(['jquery','nanoscroller','eventStack'],function($,nanoscroller,eventStack) {
	//给tab页编码
	   $("#layerbar>header li").each(function(index){
		   $(this).attr("index",index);
	   });
	   //点击头部的时候，内容页进行切换
       $("#layerbar>header li").click(function(){
    	   $("#layerbar>header li").removeClass("active");
    	   $(this).addClass("active");
    	   $("#layerbar> article").removeClass("active");
    	   $($("#layerbar> article")[$(this).attr("index")]).addClass("active");
    	   $("#layerbar .nano").nanoScroller();
       });
       //点击图层手风琴菜单
       //图层
       $("#layerbar >article.layer nav a").click(function(){
    	   if($(this).hasClass("active")){
    		   $(this).removeClass("active");
    		   if (!eventStack.contain($(this).attr('id'))) {
    			   require($(this).attr('model')).init($(this).attr('id'));
    		   }
    		   eventStack.applyRule($(this).attr('id'));
    		   eventStack.clearOne($(this).attr('id'));//删除当前菜单点中后的效果
    		   //取消显示图层
    		   f2net.window.setTempLayerVisible(this.id,false);
    	   }else{
    		   $(this).addClass("active");
    		   if (!eventStack.contain($(this).attr('id'))) {
    			   require($(this).attr('model')).init($(this).attr('id'));
    		   }
    		   eventStack.applyRule($(this).attr('id'));
    		   eventStack.init($(this).attr('id'));//应用规则;
    		   //显示图层方法
    		   f2net.window.setTempLayerVisible(this.id,true);
    	   }
       });
       //点击专题图手风琴菜单
       //专题图
        $("#layerbar >article.special nav a").click(function(){
    		if($(this).hasClass("active")){
        		$(this).removeClass("active");
        		if (!eventStack.contain($(this).attr('id'))) {
     			   require($(this).attr('model')).init($(this).attr('id'));
     		   }
     		   eventStack.applyRule($(this).attr('id'));
        		eventStack.clearOne($(this).attr('id'));//删除当前菜单点中后的效果
    		}else{
    			$("#layerbar >article.special a").removeClass("active");
    			
    			if (!eventStack.contain($(this).attr('id'))) {
    				
    				require($(this).attr('model')).init($(this).attr('id'));
      		   }
    		   eventStack.applyRule($(this).attr('id'));
      		   eventStack.init($(this).attr('id'));
        		$(this).addClass("active");
    		}
    		
    		
    		
    		
    		
    		
//    		if($(this).html()=="综合数据"){$.showDialogWithIframeZhxx();}//综合数据
	    	//else if($(this).html()=="泵站数据"){$.fn.showDialog();}  //泵站数据
	    	//else{
	    	//	$.showDialogWithIframe();// 水泵数据
	    	//	}
       });
       //页面更新就显示综合数据面板
       //
       //右侧图层面板切换
       var toggle = function(){
		   if($("#layerbar .header .toggle").hasClass("open")){
			   try{
				   $('#win').window("close"); 
			   }catch(e){
				   
			   }
			   $("#layerbar").animate({"right":"-200px"},800,function(){
				   $("#layerbar #toggle-button").show();
			   });
			   $("#layerbar .header .toggle").removeClass("open");
		   }else{
			   $("#layerbar #toggle-button").hide();
			   $("#layerbar").animate({"right":"0px"},800);
			   $("#layerbar .header .toggle").addClass("open");
		   }
	   }
       //第二层绑定事件
//	   $(".has-children .second-menu").click(function(){
//		   var flag=false;
//		   if($(".has-children .second-menu-ul").css("display")==none){
//			   alert("show");
//			   $(".has-children .second-menu-ul").css("display","block");  
//			   flag=false;
//		   }
//		   else
//		   {
//			   alert("hide");
//			   $(".has-children .second-menu-ul").css("display","none"); 
//			   flag=true;
//		   }
//		   //$(this).parent().find('.second-menu-ul').toggle();
//	   });
	   //第三层事件
	   $(".has-children .third-menu").click(function(){

			   $(this).parent().find('.third-menu-ul').toggle();
	   });
	   //右侧图层面板切换 绑定事件
	   $("#layerbar .header .toggle,#layerbar #toggle-button").click(function(){
		   toggle();
	   });	   

	   $("#layerbar article.layer .panel-body li").click(function(){
		   if($("div",this).hasClass("checked")){
			   $("div",this).removeClass("checked").css();
		   }else{
			   $("div",this).addClass("checked");
		   }
	   });
	   /**
	    * 需要优先初始化专题图中的require Module
	    * 
	    */
	   var arr = [
	              'layerbar/topic/situation/init', 
	              'layerbar/iframeModel', 
	              'layerbar/topic/stationdata/stationdata',
	              'layerbar/topic/monitordata/monitordata',
	              'layerbar/layer/baselayer',
				  'layerbar/layer/arcgissinglelayer'
	   ];
	   require(arr);
	   
	   var obj
         
});