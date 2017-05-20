define(['jquery', 'util'],function($, util) {
	var data = [{name:'流量计',value:'1'},{name:'排气阀',value:'2'},{name:'消防栓',value:'3'},{name:'增压站',value:'4'},{name:'阀门',value:'5'},{name:'变材点',value:'6'},{name:'变径点',value:'7'},{name:'拐点',value:'8'},{name:'进户',value:'9'},{name:'排水口',value:'10'}];
	
	data = util.getConfigList("layer");
	var temp = '<li><input type="radio" name="layerType" value="${value}">${name}</li>';
	function load(json) {
		$('#spaceSearch .spatial .search_layer').empty();
		$.each(data, function(i, n) {
			
			$('#spaceSearch .spatial .search_layer').append('<li '+(i == 0 ? 'class="checked"':'')+' target="'+n.value+'">'+n.name+'</li>');
		});
	}
	
	/**
	 * 获取选中图层
	 */
	function getSelectedLayer() {
		var layers = $('#spaceSearch .spatial .search_layer').find('.checked');
		var str = "";
		$.each(layers, function(i, n) {
			if (i == 0) {
				str += $(n).attr('target');
			} else {
				str += ',' + $(n).attr('target');
			}
		});
		return str;
	}
	
	load();
	return {getSelectedLayer:getSelectedLayer};
	
});