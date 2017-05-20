$(function(){
	$("#mainWest").parent().css({"overflow":"visible"});
	//$("a",this).next("ul").show();
	$(".sidebar-menu").on("mouseover","li",function(e){
		$("a",this).next("ul").show();
		
	}).on("mouseout","li",function(e){
		$("a",this).next("ul").hide();
		
	});
	$(".sidebar-menu").on("mouseoff","a.menu-link",function(){
		top.window.index.newPage($("span",this).html(),encodeURI($(this).attr("src")));
	});
	
$(".prompt").click(function(event){
		
		if ($(event.target).hasClass("toggle")) {
			if($(this).attr("checked")=='checked'){
				$(".prompt").removeAttr("checked");
				$(".triangle_top",this).hide();
				$(".dropdown-menu",this).slideUp();
			}else{
				$(".prompt").removeAttr("checked");
				$(".prompt .dropdown-menu").hide();
				$(".prompt .triangle_top").hide();
				$(this).attr("checked","checked");
				$(".dropdown-menu",this).slideDown();
				$(".triangle_top",this).show()
			}
		} else {
			console.log("ad");
		}
		
	});
})




