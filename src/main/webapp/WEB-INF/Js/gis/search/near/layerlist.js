define(['jquery', 'util', 'search/const'],function($, util, con) {
	var data = [{name:'流量计',value:'1'},{name:'排气阀',value:'2'},{name:'消防栓',value:'3'},{name:'增压站',value:'4'},{name:'阀门',value:'5'},{name:'变材点',value:'6'},{name:'变径点',value:'7'},{name:'拐点',value:'8'},{name:'进户',value:'9'},{name:'排水口',value:'10'}];
	
	data = con.layers;
	
	/**
	 * 获取选中图层
	 */
	function getSelectedLayer() {
		var layers = data;
		var ls = [];
		$.each(layers, function(i, n) {
			ls.push(n.remark); //ls = n.remark
		});
		return ls;
	}
	
	return {getSelectedLayer:getSelectedLayer};
	
});