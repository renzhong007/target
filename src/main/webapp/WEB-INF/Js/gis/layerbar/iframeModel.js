define(['jquery'],function($) {
	
	return {
		showDialogWithIframe : function(src,title,_this) {	
			$("#layerbar >article.special a").removeClass("active");				
//						$("_this").addClass("active");
						$("#win").find("iframe").attr("src",src);
						$("#win").window({    
				    	 //   width:430,    
							width:1030, 
				    	    //height:500,
							height:500,
				    	   // left:$(window).width()-633,
				    	    left:$(window).width()-1233,
				    	    top:'85px',
				    	    title:title
				    	});
					
		},
		closeWindow : function() {
			$("#win").window('close');
		}
	};

});




