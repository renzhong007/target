define(['layerbar/station/addRequstDataToLayer'],function(addRequstDataToLayer) {
	/**
	 * 默认数据请求
	 * @param n
	 */
	function requestDefaultData(n) {
		$.get(n.url+"&_="+new Date().getTime(),n.param,function(result){
			
			if (result.success) {
				addRequstDataToLayer(n, result);
			} else {
				alert(result.message);
			}
			
			
		},'json');
	}
	return requestDefaultData;
});