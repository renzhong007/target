define(['jquery', 'util','search/near/layerlist', 'search/property/resultlist'],function($, util, layerlist, rslist) {
	var contentMapper = util.getConfigList("gisResultAttrPanelMapper");
	var pageNumber = 0;
	var pageSize = 10;
	var totalSize = 0;
	var nowPageNumber = 0;
	var data = [];
	var titleName = "类型";
	//titleName = util.getConfig("gis_searchTitle");
	var currentPageData = [];
	
	
	/**
	 * 查询方法
	 */
	function query() {
		
		var range = parseInt($('#rangeText').val());
		if (range) {
			var layers = layerlist.getSelectedLayer();
			f2net.window.BufferAllFromMapClick(range, "PipeService", JSON.stringify(layers), "self.parent.require('search/near/query').setData");
		} else {
			alert("请输入正确的周边范围！");
		}
		
	}
	
	/**
	 * 设置数据
	 */
	function setData(obj) {
		//console.log(obj);
		var tempobj = JSON.parse(obj);
		
		data = tempobj;
		totalSize = data.length;
		var lastpage = Math.ceil(totalSize / pageSize);
		$("span#searchCount").text(totalSize);
		$("span#totalPage").text(lastpage);
		rslist.setData(getFirstPage());
		rslist.load();
	}
	
	/**
	 * 获取第一页数据
	 */
	function getFirstPage() {
	
		return getPage(1);
	}
	
	/**
	 * 获取下一页数据
	 */
	function getNextPage() {
		if(nowPageNumber==Math.ceil(totalSize / pageSize))
			{
				return getLastPage();
			}		
		else{
			return getPage(nowPageNumber+1);
		}
		
	}
	
	/**
	 * 获取前一页数据
	 */
	function getPrevPage() {
		if(nowPageNumber==1)
			{
				return getFirstPage();
			}
			
		else{
				return getPage(nowPageNumber-1);
		}
		
	}
	
	/**
	 * 获取最后一页数据
	 */
	function getLastPage() {
		var lastpage = Math.ceil(totalSize / pageSize);
		return getPage(lastpage);
	}
	
	/**
	 * 获取获取第N页
	 */
	function getPage(num) {
		var arr = [];
		if (isIllegalPageNumber(num)) return arr;
		$("span#currentPage").text(num);
		for (var i = (num-1)*pageSize; i < totalSize && i < num*pageSize; i++) {
			var obj = {};
			if($('#sole-input').val()=='测压点'){
				titleName='测压点名称';
			}else{
				titleName='类型';
			}
			obj.title = data[i].Attributes[titleName];
			obj.id = util.randomChar(13);
			obj.attrs = [];
			$.each(contentMapper, function(index,n) {
				if (n.value in data[i].Attributes) {
					obj.attrs.push({title:n.name,value: data[i].Attributes[n.value],name: n.name});
				}
			});
			if(data[i].geometry.paths) {
				obj.geometry = {"paths": []};
				$.each(data[i].geometry.paths, function(i, n) {
					var temp1 = [];
					$.each(n, function(i1, n1) {
						var temp2 = [];
						temp2.push(n1[0]);
						temp2.push(n1[1]);
						temp1.push(temp2);
					});
					obj.geometry.paths.push(temp1);
				});
			} else {
				obj.x = data[i].geometry.x;
				obj.y = data[i].geometry.y;
			}
			arr.push(obj);
		}
		nowPageNumber = num;
		currentPageData = arr;
		return arr;
	}
	
	/**
	 * 判断页数是否超过最大页数
	 */
	function isIllegalPageNumber(num) {
		var totalpage = totalSize / pageSize;
		if ((num - 1) > totalpage) {
			return true;
		} else if (num < 1) {
			return true;
		} else {
			return false;
		}
	}
	
	function getDataById(id) {
		var d;
		$.each(currentPageData, function(i, n) {
			if (id == n.id) {
				d= n;
				return false;
			}
		});
		return d;
	}
	
	return {
		setData:setData, 
		query:query, 
		getFirstPage:getFirstPage, 
		getLastPage:getLastPage,
		getNextPage:getNextPage,
		getPrevPage:getPrevPage,
		getPage:getPage,
		getDataById:getDataById,
		totalSize:totalSize,
		pageNumber:pageNumber,
		pageSize:pageSize,
		nowPageNumber:nowPageNumber
	};
	
	
});