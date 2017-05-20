 
$(function() { 
    $('.widget-expand-button-icon').on('click', function(event) {
    	//console.log('viewcard');
    	if ($('#viewcard').is(':hidden')) {
    		$('#viewcard').show();
    		$('#viewcard').css('height', '140px');
    		$('#viewcard-strip').addClass('widget-runway-tray-open'); 
    	}else{
    		$('#viewcard').hide(); 
    	 	$('#viewcard-strip').removeClass('widget-runway-tray-open');
    	}
    });
});