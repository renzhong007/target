define(['jquery', 'util', 'const' ,'easyui','panelBox'],function($, util, con,easyui,panelBox) {
	
	var rtdTitle = con.rtdTitle;
	var rtName = [];
	$.each(rtdTitle, function(i, n) {
		rtName.push(n.field);
	});
	var id = con.id;
	
	initProperty($('#attr'), id);
	
    //初始化模块列表
	function initProperty(tab, objid) {
		//初始化水务设备面板
		tab.html('');
		var table = $("<table>");
		tab.append(table);
		var data = [];
		$(table).propertygrid({    
		    border:false,
		    showGroup: true,    
		    scrollbarSize: 0,
		    fit:true
		});
		var NAME;
		util.executeAjaxUrlForResult('realTimeData/getByIds', {"data":{"id":objid, rtName: rtName},async:false}, function(result0) {
			if(result0.data.length > 0) {
				$.each(result0.data, function(i0,n0) {
					if(n0.id == objid) {
						NAME = n0.name;
						$.each(rtdTitle, function(i,n1) {
							var p0 = {};
							if(n1.remark != null && n1.remark != undefined) {
								p0.name = n1.title + "(" + n1.remark + ")";
							} else {
								p0.name = n1.title;
							}
							if(n1.field == "runState") {
								var html = "<div class='infoTab' style='position:relative; top:0;'>";
								html += "<span class='pumpStatus station-state-"+(undefined == n0[n1.field] ? "0" : n0[n1.field])+"'></span>";
								html += "</div>";
								p0.value = html;
							} else {
								p0.value = new Number(n0[n1.field]);
								if (n0[n1.field]) {
									if (n0[n1.field].indexOf(".") > -1) {
										p0.value = parseFloat(n0[n1.field]);
									} else {
										p0.value = parseInt(n0[n1.field]);
									}
								} else {
									p0.value = "";
								}
							}
							p0.group = "实时数据";
							p0.editor = "text";
							data.push(p0);
						});
					}
				});
			}
			$(table).propertygrid('loadData', data);
		});
		util.executeAjaxUrlForResult('deviceAttr/list', {data:{id:objid}}, function(result) {
			if(result.data.length > 0) {
				var obj = result.data[0];
				util.executeAjaxUrlForResult('deviceAttr/list', {data:{id:obj.parentId}}, function(nameResult) {
					if(nameResult.data.length > 0) {
						panelBox.setTitle(nameResult.data[0].name + "_" + NAME);
					} else {
						panelBox.setTitle(NAME);
					}
				});
				for (var name in obj) {
					for (var i=0; i<con.staticAttr.length; i++) {
						var staticAttr = con.staticAttr[i];
						if(name == staticAttr.name) {
							var p = {};
							if(staticAttr.remark != null && staticAttr.remark != undefined && staticAttr.remark != "null" && staticAttr.remark != "") {
								p.name = staticAttr.value + "(" + staticAttr.remark + ")";
							} else {
								p.name = staticAttr.value;
							}
							p.value = obj[name];
							p.group = "静态属性";
							data.push(p);
						}
					}

				}
				
			}
			$(table).propertygrid('loadData', data);
		});
	}
        
        
    return {initProperty:initProperty};
});