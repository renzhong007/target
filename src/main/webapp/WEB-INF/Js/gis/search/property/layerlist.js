define(['jquery', 'util'],function($, util) {
	var data = [{name:'流量计',value:'1'},{name:'排气阀',value:'2'},{name:'消防栓',value:'3'},{name:'增压站',value:'4'},{name:'阀门',value:'5'},{name:'变材点',value:'6'},{name:'变径点',value:'7'},{name:'拐点',value:'8'},{name:'进户',value:'9'},{name:'排水口',value:'10'}];
	var temp = '<li><div><input type="radio" name="layerType" value="${value}" ${checked} style="margin:2px 0 0;position:absolute;"><span class="radioOpt" style="padding-left:15px;">${name}</span></div></li>';
	function load(json) {
		$('#search_layer ul').empty();
		$.template('search_type', temp);
		json = json||data
		$.tmpl('search_type',json ).appendTo('#search_layer ul'); 
	}
	
	/**
	 * 获取选中图层
	 */
	function getSelectedLayer() {
		return $('#search_layer').find('input:checked').val();
	}
	
	var data = util.getConfigList("layer");
	if (data[0]) {
		data[0].checked = "checked=\"checked\""
	}
	load();
	return {getSelectedLayer:getSelectedLayer};
	
});