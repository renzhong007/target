define(['layerbar/topic/situation/situation'],function(situation) {
	var isinit = true;
	
	/**
	 * 判断回调完成之后是否马上初始化
	 */
	if (isinit) {
		$('[model="layerbar/topic/situation/situation"]').click();
	}
	
	setInterval(function() {
			situation.updateZhxx();
		}, 1 * 60 * 1000);
	
	return {};
})