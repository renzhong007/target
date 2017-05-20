define(['jquery','toolbar','nanoscroller','template','search/property/property','search/space/space','search/near/near','util'],function($,toolbar,nanoscroller,template,property,space,near,util) {
        var obj = {
        		"searchmodel":{
        			box_shadow: '0 0 20px rgba(0,0,0,0.3)',
        			height:"70px"
        		},
        		"searchboxBg":{
        			background: '#4285F4',
        			space_search_height:"160px",
        			height:"70px"
        		},
        		"toggle_button":{
        			display:'none'
        		},
        		"search_page":{
        			display:'none'
        		},
        		"search_button":{
        			background:"url(Images/gis/search/quantum_search_button-20150825-1x.png) no-repeat 0 0px white",
        			close_background:"url(Images/gis/search/clear-1x-20150504.png) no-repeat 0 0px white"
        		},
        		"search_content":{
        			top:"70px",
        			space_search_top:"160px"
        		},
        		"space_button":{
        			background:"url(Images/gis/search/directions-1x-20150909.png) no-repeat 14px 14px white",
        			search_background:"url(Images/gis/search/quantum_search_button-20150825-1x.png) no-repeat 15px 13px white"
        		},
        		"search_type":{//查询图层分类填充
        			data:getSearchTypeData(),//[{name:'流量计',value:'1','checked':"checked='checked'"},{name:'排气阀',value:'2'},{name:'消防栓',value:'3'},{name:'增压站',value:'4'},{name:'阀门',value:'5'},{name:'变材点',value:'6'},{name:'变径点',value:'7'},{name:'拐点',value:'8'},{name:'进户',value:'9'},{name:'排水口',value:'10'}],
        			temp:'<li><input type="radio" ${checked} name="layerType" value="${value}">${name}</li>',
        			load:function(json){
        				$('#search_layer ul').empty();
        				$.template('search_type', obj.search_type.temp);
        				json = json||obj.search_type.data
        				$.tmpl('search_type',json ).appendTo('#search_layer ul'); 
        			}
        		},
        		//加载结果测试
                //obj.resultContent.load();
        		"resultContent":{//查询结果内容填充
        			temp:'<tbody><tr>'+
						'<td rowspan="4" class="content-icon border">图标</td><td class="content-title">	${title}</td>'+
						'</tr>'+
						'<tr>'+
						'	<td>地面标高：${ground_elevation}</td>'+
						'</tr>'+
						'<tr>'+
						'	<td>埋深：${depth}</td>'+
						'</tr>'+
						'<tr class="border">'+
						'	<td>管顶标高：${elevation}</td>'+
						'</tr></tbody>',
        			data:[{title:'dy316',ground_elevation:'3.441',depth:'0.475',elevation:'0'},{title:'dy316',ground_elevation:'3.441',depth:'0.475',elevation:'0'}],
        			load:function(json){
        				$("#search-content .nano-content table").empty();
        				$.template('resultContent', obj.resultContent.temp);
        				json = json||obj.resultContent.data
        				$.tmpl('resultContent',json ).appendTo('#search-content .nano-content table'); 
        			}
        		},
        		"search_content_nano":function(){
        			if($("#searchmodel #search-content .select-content-type:visible").length>0){
        				$("#search-content .nano").css("top",$("#searchmodel #search-content .select-content-type:visible").css("height"));
        			}else{
        				$("#search-content .nano").css("top","0px");
        			}
        		},
        		getPeripheryPoint:getPeripheryPoint,
        		search:search,
        		spaceSearch:spaceSearch
        		
        };
        //加载搜索图层
//        obj.search_type.load();
       // obj.resultContent.load();
         
        //搜索功能点击之后面板显示功能
//        var search = function(){
        
        function getSearchTypeData() {
        	var temp = util.getConfigList("layer");
        	var layers = [];
        	$.each(temp, function(i, n) {
        		var layer = {};
        		layer.name = n.name;
        		layer.value = (parseInt(n.value) + 1).toString();
        		if(i == 0) {
        			layer.checked = "checked='checked'";
        		}
        		layers.push(layer);
        	});
        	return layers;
        }
		  
        	
        
        function search() {
        	if($("#searchmodel").hasClass("open") ){
        		delete toolbar.config.left;
        		toolbar.position();
	        	$("#searchmodel").css({"box-shadow":"none"}).animate({"height":obj.searchmodel.height},"slow",function(){
	        		$("#searchmodel #search-page,#searchmodel #searchboxBg #toggle-button").hide();
	        		$("#searchmodel #space-button").css("background",obj.space_button.background);
	        		$("#searchmodel #searchboxBg").css("background","none");
		        	$("#searchmodel").removeClass("open");
		        	$("#searchmodel #search-content").hide();
		        	$("#searchmodel #search-content .select-content-type").hide();
		        	$("#search-button span").css("background",obj.search_button.background);
		        	$("#searchmodel #searchbox-container #space-button").removeClass("search");
	        	});
        	}else{
        		toolbar.config.left = "390px";
        		toolbar.position();
        		$("#searchmodel #search-page,#searchmodel #searchboxBg #toggle-button").show();
	        	$("#searchmodel").css({"box-shadow":obj.searchmodel.box_shadow}).animate({"height":"100%"},"slow");
	        	$("#searchmodel #searchboxBg").css("background",obj.searchboxBg.background);
	        	$("#searchmodel  #search-button span").css("background",obj.search_button.close_background);
	        	$("#searchmodel #space-button").css("background",obj.space_button.search_background);
	        	$("#searchmodel").addClass("open");
	        	$("#searchmodel #search-content").show();
	        	$("#searchmodel #search-content .select-content-type").show().css("display","inline-block");
	        	$("#searchmodel #searchbox-container #space-button").addClass("search");
        	}
        	obj.search_content_nano();
        }
        //空间查询功能点击后面板显示功能
       // var spaceSearch = function(){
        function spaceSearch(){
        	if($("#space-button").hasClass("open")){
        		delete toolbar.config.left;
	    		toolbar.position();
	        	$("#searchmodel").css({"box-shadow":"none"}).animate({"height":obj.searchmodel.height},"slow",function(){
	        		$("#searchmodel #search-page,#searchmodel #searchboxBg #toggle-button").hide();
	        		$("#searchmodel #searchboxBg").css("background","none");
	        		$("#search-button span").css("background",obj.search_button.background);
		        	$("#space-button").removeClass("open");
		        	$("#searchmodel #searchboxBg #searchbox").show();
		        	$("#searchmodel #searchboxBg").css("height",obj.searchboxBg.height);
		        	$("#searchmodel #search-content").css("top",obj.search_content.top);
		        	$("#searchmodel #spaceSearch").hide();
		        	$("#searchmodel #search-content").hide();
	        	});
        	}else{
        		$("#searchmodel #search-content .select-content-type").hide();
        		$("#searchmodel #searchboxBg #searchbox").hide();
        		$("#searchmodel #searchboxBg").css("height",obj.searchboxBg.space_search_height);
	        	$("#searchmodel #search-content").css("top",obj.search_content.space_search_top);
	        	toolbar.config.left = "390px";
	    		toolbar.position();
	    		$("#searchmodel #search-page,#searchmodel #searchboxBg #toggle-button").show();
	        	$("#searchmodel").css({"box-shadow":obj.searchmodel.box_shadow}).animate({"height":"100%"},"slow");
	        	$("#searchmodel #searchboxBg").css("background",obj.searchboxBg.background);
	        	$("#searchmodel  #search-button span").css("background",obj.search_button.close_background);
	        	$("#space-button").addClass("open");
	        	$("#searchmodel #spaceSearch").show();
	        	$("#searchmodel #search-content").show();
        	}
        	obj.search_content_nano();
        }
        //搜索面板左移隐藏功能
        var toggleBoard = function(){
        	if($("#toggle-button").hasClass("open")){
        		toolbar.config.left = "390px";
        		toolbar.position();
        		$("#searchmodel").animate({"left": "0"},"slow",function(){
            		$("#searchmodel #toggle-button span").css("backgroundPosition","0px 0px");
            		$("#toggle-button").removeClass("open");
        		});
        	}else{
        		delete toolbar.config.left;
        		toolbar.position();
        		$("#searchmodel").animate({"left": "-380"},"slow",function(){
            		$("#searchmodel #toggle-button span").css("backgroundPosition","-22px 0px");
            		$("#toggle-button").addClass("open");
        		});
        	}
        }
        
        //坐标定位功能
        var coordinateLocation = function(x,y){
        	
        };
        //空间查询功能
        var coordinateLocation = function(x,y){
        	
        };
        //定位获取坐标功能
        var coordinateLocation = function(){
        	return {x:1,y:2}
        };
        //周边搜索功能
        var coordinateLocation = function(x,y,z){
        	//alert("x:"+x+";y:"+y+"z:"+z);
        	//f2net.window.locateWithXY($('#x').val(),$('#y').val());
        	f2net.window.locateWithXY(x,y);
        };
        //高级搜索功能点开，最左边的三
        $("#searchmodel #searchbox #type-button").click(function(){
        	search();
        	$("#zhxx").window('close');
        	$("#situation").removeClass("active");
        });
        
        
        //绑定检索事件
        $('#search-button').on('click', function(event) {
        	search();
        	$("#zhxx").window('close');
        	$("#situation").removeClass("active");
        	var $cont = $('#search-result');
        	var $li = $('<li class="rs-panel">').css('z-index','100')
        	for (var i=0; i < 20; i++) {
        		$li.append('<div>adsfas</div>');
        	}
        	$cont.append($li);
        });
        //input框绑定事件
        $('#sole-input').on('click',function(event){
        	search();
        	$("#zhxx").window('close');
        	$("#situation").removeClass("active");
			
        })
        //空间查询按钮绑定事件
        $("#spaceSearch_close,#space-button").on('click',"",function(){
    		if($("#space-button").hasClass("search")){
        		//此处表示按钮已变成搜索按钮，搜索面板展开了
        	   	property.query();
//        	   	property.load();
        	} else {
        		spaceSearch();
        		$("#zhxx").window('close');
        		$("#situation").removeClass("active");
        		$("#search-content .nano-content table").empty();
        		f2net.window.clearTempLayer('PoiLayer');
        	}
        	
        });
        //翻页键绑定事件
       $("#nextbutton").click(function(){
        	if($("#space-button").hasClass("search")){
        		//此处表示按钮已变成搜索按钮，搜索面板展开了
        	   	property.nextPage();
//        	   	property.load();
        	} 
        	else if($("#space-button").hasClass("open"))
    			{  			
    				if($("#space").hasClass("checked"))
    					{
    					space.nextPage();
    					}
    				else if($("#near").hasClass("checked"))
    					{
    					near.nextPage();
    					}
    			
    			}
       })
        $("#prebutton").click(function(){
        	if($("#space-button").hasClass("search")){
        		//此处表示按钮已变成搜索按钮，搜索面板展开了

        	   	property.prevPage();
//        	   	property.load();
        	} 
        	else if($("#space-button").hasClass("open"))
			{
			
				if($("#space").hasClass("checked"))
					{
					space.prevPage();
					}
				else if($("#near").hasClass("checked"))
					{
					near.prevPage();
					}
			
			}
       })
        //搜索面板隐藏按钮绑定事件
        $("#toggle-button").click(function(){
        	toggleBoard();
        });
        //placeholder事件添加
       jQuery('[placeholder]').focus(function() {
    	   var input = jQuery(this);
    	   if (input.val() == input.attr('placeholder')) {
    	     input.val('');
    	     input.css('color','#000');
    	     input.removeClass('placeholder');
    	   }
    	 }).blur(function() {
    	   var input = jQuery(this);
    	   if (input.val() == '' || input.val() == input.attr('placeholder')) {
    	     input.addClass('placeholder');
    	     input.css('color','#eee');
    	     input.val(input.attr('placeholder'));
    	   }
    	 }).blur().parents('form').submit(function() {
    	   jQuery(this).find('[placeholder]').each(function() {
    	     var input = jQuery(this);
    	     if (input.val() == input.attr('placeholder')) {
    	       input.val('');
    	     }
    	   })
    	 });
        //空间搜索切换
        $("#spaceSearch >header> nav >ul >li").each(function(index){
        	$(this).attr("index",index);
        });
        
        var queryInitArr = ['','search/space/space','search/near/near'];
        $("#spaceSearch >header> nav >ul >li").click(function(){
        	$("#spaceSearch >header> nav >ul>li").removeClass("checked");
        	$(this).addClass("checked");
        	var index = $(this).attr("index");
        	$("#spaceSearch section div").removeClass("checked");
        	$($("#spaceSearch section div")[index]).addClass("checked");
        	if (queryInitArr[index]) {
        		require([queryInitArr[index]]);
        	}
        	$("#search-content .nano-content table").empty();
    		f2net.window.clearTempLayer('PoiLayer');
        });
        //空间查询 图层多选
        $("#spaceSearch .search_layer").on('click', 'li', function(event){
        	if($(event.currentTarget).hasClass("checked")){
        		$(event.currentTarget).removeClass("checked");
        	}else{
        		$(event.currentTarget).addClass("checked");
        	}
        });
        //空间查询 方式选择
        $("#spaceSearch .search_way li").click(function(){
        	if($(this).hasClass('searchbutton')){
        		$(this).addClass("checked");
        	}else{
        		$("#spaceSearch .search_way li").removeClass("checked");
        		$(this).addClass("checked");
        	}    	
        });
        //坐标定位
        $("#spaceSearch section div.location .locationbutton").click(function(){
        	var x = $("#spaceSearch section div.location input[name='x']").val()
        	var y = $("#spaceSearch section div.location input[name='y']").val()
        	coordinateLocation(x,y);
        });
        
        //定位获取坐标功能
        $("#spaceSearch section div.nearby .locationbutton").click(function(){
 			f2net.window.MapClickForXY('self.parent.require("search/search").getPeripheryPoint');
        });

        //附近查询点击之后的操作
		function getPeripheryPoint(x,y) { 
        	 $("#spaceSearch section div.nearby input[name='x1']").attr("value",x);
        	 $("#spaceSearch section div.nearby input[name='y1']").attr("value",y);
 
		}
	
        //定位获取坐标功能
//        $("#spaceSearch section div.nearby .searchbutton").click(function(){
//        	 obj.resultContent.load(); //lui test2016-3-2
//        });
        $("#searchmodel .nano").nanoScroller();
        return obj;
    }
);