define(['jquery', 'util'],function($, util) {
	var data = [{"title":"dfd","attrs":[{"title":"高程1","value":"2333"},{"title":"高程2","value":"6666"},{"title":"高程3","value":"23333333"}],"x":"120.5343655","y":"32.24215482"},{"title":"南环路","attrs":[{"title":"高程1","value":"2333"},{"title":"高程2","value":"6666"},{"title":"高程3","value":"23333333"}],"x":"121.1036284","y":"32.17373509"},{"title":"掘兵线","attrs":[{"title":"高程1","value":"2333"},{"title":"高程2","value":"6666"},{"title":"高程3","value":"23333333"}],"x":"121.1226335","y":"32.17370114"}];
	function load(json) {
		$("#search-content .nano-content table").empty();
//		$.template('resultContent', temp);
		json = json||data
		f2net.window.clearTempLayer('PoiLayer');
		$.each(json, function(i, n) {
			if (!n.id) {
				n.id = util.randomChar(13);
			}
			var $tbody = $('<tbody class="border" target="'+n.id+'"><tr><td rowspan="4" ><div href="javascript:void(0);" class="content-icon " id="no'+(i+1)+'"></div></td><td class="content-title">'+n.title+'</td></tr></tbody>');
			$.each(n.attrs, function(i1, n1) {
				$tbody.append('<tr><td>'+n1.title+'：'+n1.value+'</td></tr>');
			});
			$('#search-content .nano-content table').append($tbody);
			
			if(n.geometry) {//显示管线结果
				f2net.window.addPointGraphic('PoiLayer',n.id,'{"id":"'+n.id+'"}',n.geometry.paths[0][0][0],n.geometry.paths[0][0][1],'Poi'+(i+1),'');
			} else {
				f2net.window.addPointGraphic('PoiLayer',n.id,'{"id":"'+n.id+'"}',n.x,n.y,'Poi'+(i+1),'');
			}
			
			$tbody.on('click', function(event) {
				if(n.geometry) {//显示管线结果
					var xys = [];
					$.each(n.geometry.paths[0], function(i, n1) {
						xys.push({x:n1[0],y:n1[1]});
					});
					var id = Math.random();
					f2net.window.clickGraphic(n.id);
					f2net.window.addLineGraphic('PoiLayer',id,'{"id":'+id+',"model":"gisquery/gisquery"}',JSON.stringify(xys),'QueryBufferLineGra','');
				} else {
					f2net.window.clickGraphic(n.id);
				}
			});
			
			$tbody.mouseover(function(event) {
				f2net.window.mouseOnGraphic(n.id);
			});
			
			$tbody.mouseout(function(event) {
				f2net.window.mouseOutGraphic(n.id);
			});
		});
		
//		$.tmpl('resultContent',json ).appendTo('#search-content .nano-content table'); 
	}
	function setData(dataarr) {
		//console.log(dataarr);
		data = dataarr;
	}
	
	function getDataById(id) {
		var d;
		$.each(data, function(i, n) {
			if (id == n.id) {
				d= n;
				return false;
			}
		});
		return d;
	}
	
    
	return {
    	setData:setData,
    	load:load,
    	getDataById:getDataById
	};
});