define(['jquery', 'util', 'const' ,'easyui','panelBox'],function($, util, con,easyui,panelBox) {
	
	var rtdTitle = con.rtdTitle;
	var id = con.id;
	
	
	initProperty($('#attr'), id);
    //初始化模块列表
	function initProperty(tab, objid) {
		//初始化水务设备面板
		tab.html('');
		var table = $("<table>");
		tab.append(table);
		var aa = [];
		table.propertygrid({    
		    data: aa,  
		    border:false,
		    showGroup: true,    
		    scrollbarSize: 0,
		    fit:true
		});
		util.executeAjaxUrlForResult('realTimeData/getByIds', {"data":{"id":objid},async:false}, function(result0) {
			$.each(result0.data, function(i0,n0) {
				if(n0.id == objid) {
					$.each(rtdTitle, function(i,n1) {
						var p0 = {};
						p0.name = n1.title;
						p0.value = new Number(n0[n1.field]);
						if (n0[n1.field]) {
							if (n0[n1.field].indexOf(".") > -1) {
								p0.value = parseFloat(n0[n1.field]);
							} else {
								if (isNaN(parseInt(n0[n1.field]))) {
									p0.value = n0[n1.field];
								} else {
									p0.value = parseInt(n0[n1.field]);
								}
								
							}
							
//							if (p0.value > 20000 && n1.field == 'FLOW') {
//								p0.value = "";
//							}
						} else {
							p0.value = "";
						}
						p0.group = "实时数据";
						p0.editor = "text";
						aa.push(p0);
					});
				}
			});
			$(table).propertygrid('loadData',aa);
		});
		//获取静态数据
		util.executeAjaxUrlForResult('deviceAttr/list', {data:{id:objid}},function(result)  {
			var obj = result.data[0];
			//泵站与监测点数据名称字段大小写不同  NAME name
			panelBox.setTitle(obj.name);
			for (var name in obj) {
				
				if (name in con.staticAttr) {
					var p = {};
					p.name = con.staticAttr[name].value;
					p.value = obj[name];
					p.group = "静态属性";//obj.pName;
//					p.objid = obj.pid_bus;
					aa.push(p);
				}
			}
			$(table).propertygrid('loadData',aa);
		});
	}
        
        
    return {initProperty:initProperty};
});