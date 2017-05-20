define(['jquery', 'util'],function($, util) {
	
	var formateFunc = "";
//	var attrNamesForPipe = [
//	    {name:"本点号", value:"本点号"},
//	    {name:"上点号", value:"上点号"},
//	    {name:"埋深", value:"埋深"},
//	    {name:"管径", value:"管径"},
//	    {name:"口径", value:"口径"},
//	    {name:"管材 ", value:"管材"},
//	    {name:"所在位置", value:"所在位置"},
//	    {name:"建设年份", value:"建设年份"},
//	    {name:"管长", value:"管长"},
//	    {name:"管径分类", value:"管径分类"}
//	];
	
	var tempPipe = util.getConfigList("gis_gisquery_pipe");
	var attrNamesForPipe = [];
	$.each(tempPipe, function(i, n) {
		var attr = {};
		attr.name = n.name;
		attr.value = n.value;
		attrNamesForPipe.push(attr);
	});
	var tempPoint = util.getConfigList("gis_gisquery_point");
	var attrNamesForPoint = [];
	$.each(tempPoint, function(i, n) {
		var attr = {};
		attr.name = n.name;
		attr.value = n.value;
		attrNamesForPoint.push(attr);
	});
//	var attrNamesForPoint = [
//	    {name:"本点号", value:"本点号"},
//	    {name:"类型", value:"点类型"},
//	    {name:"埋深", value:"埋深"},
//	    {name:"地面标高", value:"地面标高"},
//	    {name:"管顶标高", value:"管顶标高"}
//	];
	
	var highLevelLayer = [];//高优先级图层  [18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,41,1,9,4];
	$.each(util.getConfigList("gis_highLevelLayer"), function(i, n) {
		highLevelLayer.push(n.value);
	});
	var nowObj = {};
	
	var preventRemote = false;
	function setData(objs) {
		if (preventRemote) {
			preventRemote = false;
			return;
		}
		f2net.window.clearTempLayer('BufferLayer');
		
		var objs = JSON.parse(objs);
		var obj;
		var id;
		$.each(objs, function(i, n) {
			if ($.inArray(n.layerId, highLevelLayer) > -1) {
				obj = n;
				return false;
			}
		});
		if (!obj) obj = objs[0]
		if (obj.geometry.paths) {
			id = addLineGraphic(obj);
		} else {
			id = addPointGraphic(obj);
		}
//		warnRipplePointGra
		f2net.window.clickGraphic(id);
	}
	
	function addLineGraphic(obj) {
		var xys = [];
		$.each(obj.geometry.paths[0], function(i, n) {
			xys.push({x:n[0],y:n[1]});
		});
		var id = Math.random();
		$.each(obj.geometry.paths[0], function(i, n) {
			xys.push({x:n[0],y:n[1]});
		});
		f2net.window.addLineGraphic('BufferLayer',id,'{"id":'+id+',"model":"gisquery/gisquery"}',JSON.stringify(xys),'QueryBufferLineGra','');
		newObj = formatPipeObj(obj);
		return id;
	}
	
	function addPointGraphic(obj) {
		var id = Math.random();
		f2net.window.addPointGraphic('BufferLayer',id,'{"id":'+id+',"model":"gisquery/gisquery"}',obj.geometry.x,obj.geometry.y,'warnRipplePointGra','');
		newObj = formatPointObj(obj);
		return id;
	}
	
	//格式化线对象
	function formatPipeObj(obj) {
		var obj1 = {};
		obj1.title = obj.layerName;
		obj1.geometry = {x:obj.geometry.paths[0][0][0],y:obj.geometry.paths[0][0][1]};
		obj1.attrs = []; 
		$.each(attrNamesForPipe, function(i1, n1) {
			$.each(obj.Attributes, function(i, n){
				
				if (n1.value == i) {
					obj1.attrs.push({name:n1.name, value:n});
					return false;
				}
			});
			
		});
		return obj1;
	}
	
	//格式化点对象
	function formatPointObj(obj) {
		var obj1 = {};
		obj1.title = obj.layerName;
		obj1.geometry = {x:obj.geometry.x,y:obj.geometry.y};
		obj1.attrs = []; 
		$.each(attrNamesForPoint, function(i1, n1) {
			$.each(obj.Attributes, function(i, n){
				
				if (n1.value == i) {
					obj1.attrs.push({name:n1.name, value:n});
					return false;
				}
			});
			
		});
		return obj1;
	}
	
	//获取对象
	function getDataById(id) {
		return newObj;
	}
	
	return {setData:setData,getDataById:getDataById,preventRemote:preventRemote};
});