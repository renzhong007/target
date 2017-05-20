define(['jquery', "window/window","eventStack","search/search","util"],function($, window,eventStack,search,util) {
	
	var detailWindow;
	
	function openDetailWindow(id) {
		if (detailWindow) detailWindow.remove();
		detailWindow = window.origWindow({
			src:'stationdetail?id='+id+'&from=grid',
			width:740,
			height:500
		});
	}
	
	function showCommonDetailPanel(id) {
		$('#pumpIframe').remove();
		var url = "pumpdetail?window=pumpIframe&from=grid&cid=5&id="+id;
		var iframe = $("<iframe id='pumpIframe' src='" + url + "' style='position:absolute;width:740px;height:500px;border:1px solid #ccc;z-index:20;'></iframe>");
		$('body').append(iframe);
		$("#pumpIframe").css("left", screen.width / 2 - 270 + "px");
		$("#pumpIframe").css("top", screen.height/2 - 350 + "px");
	}
	
	//根据name属性，将name相同的行合并，同时合并fields中包含的属性
	function mergeCellByName(dom, fields) {
		var rows = $(dom).datagrid("getRows");
		var nameUniq = {};
		$.each(rows, function(i, n) {
			if(n.name in nameUniq) {
				$.each(fields, function(index, field) {
					$(dom).datagrid("mergeCells", {
						index: parseInt(nameUniq[n.name]),
						field: field,
						rowspan: i - parseInt(nameUniq[n.name]) + 1,
						colspan: null
					});
				});
			} else {
				nameUniq[n.name] = i;
			}
		});
	}
	
	function updateZhxx() {
		var stationData = [];
		$.each(stationType, function(index, n) {
			util.executeAjaxUrlForResult(tempUrl+n.value, {data:{}, async: false}, function(result) {//rtName:queryRtName, staticName:queryStaticName
				if(result.data.length > 0) {
					$.merge(stationData, result.data);
				}
			});
		});
		$.each(ids, function(index, n) {
				util.executeAjaxUrlForResult(tempUrl2+n, {data:{}, async: false}, function(result) {//rtName:queryRtName, staticName:queryStaticName
					if(result.data.length > 0) {
						$.merge(stationData, result.data);
					}
				});
				});
		var data = formatterStationData(stationData, fields);
		$("#zhxxgrid").datagrid("loadData", data);
		
		var pumpData = [];
		$.each(stationType, function(index, n) {
			if(n.value != "17") {
				util.executeAjaxUrlForResult(pumpUrl+n.value, {data:{rtName:"runState"}, async: false}, function(result) {
					if(result.data.length > 0) {
						$.merge(pumpData, result.data);
					}
				});
			}
		});
		$("#pumpStateGrid").datagrid("loadData", pumpData);
		
	}
	
	function formatterStationData(stationData) {
		var data = [];
		var isAdd = false;
		$.each(stationData, function(i, station) {
			var tempdata = {};
			for(var name in station) {
				if(name.indexOf("2") != -1) {
					var str = name.split("2");
					tempdata[str[0]] = station[name];
					isAdd = true;
				}
				if($.inArray(name, fields) != -1) {
					tempdata[name] = station[name];
				}
			}
			data.push(station);
			if(isAdd) {
				station.pipe = "东侧";
				tempdata.pipe = "西侧";
				data.push(tempdata);
				isAdd = false;
			}
		});
		return data;
	}
	
	var tempUrl = "realTimeData/getByCid?cid=";
	var tempUrl2 = "realTimeData/getByIds?id=";
	var queryRtName;
	var queryStaticName;
	var stationType;
	var fields;
	var pumpUrl = "realTimeData/getStationPumpState?cid=";
	var ids=[];
				ids.push(120);
				ids.push(121);
				ids.push(122);
				ids.push(123);
				ids.push(124);
				ids.push(125);
	
	var obj = {
			init:function(id) {
				queryRtName = [];
				queryStaticName = [];
				$.each(util.getConfigList("gis_zhxx_rtd"), function(i, n) {
					queryRtName.push(n.value);
				});
				$.each(util.getConfigList("gis_zhxx_static"), function(i, n) {
					queryStaticName.push(n.value);
				});
				var stationData = [];
				
				stationType = util.getConfigList("gis_stationTypeConfig");
				$.each(stationType, function(index, n) {
					util.executeAjaxUrlForResult(tempUrl+n.value, {data:{}, async: false}, function(result) {//rtName:queryRtName, staticName:queryStaticName
						if(result.data.length > 0) {
							$.merge(stationData, result.data);
						}
					});
				});
				$.each(ids, function(index, n) {
				util.executeAjaxUrlForResult(tempUrl2+n, {data:{}, async: false}, function(result) {//rtName:queryRtName, staticName:queryStaticName
					if(result.data.length > 0) {
						$.merge(stationData, result.data);
					}
				});
				});
				var option = {border:false,rownumbers:false};//"realTimeData/getByCid?cid=2&rtName=OUTFLOW&rtName=OUTFLOW2&rtName=OUTFLOWSUMT&rtName=OUTFLOWSUMT2&rtName=OUT_PRESS&rtName=OUT_CL&staticName=SHORT"
//				option.loadFilter = function(data) {
//					return {total:data.data.length, rows:data.data};
//				}
				
				option.frozenColumns = [[
				    {"title":"名称","field":"name",width:100,halign:'center',styler:function(value,row,index){return 'text-align:center;';}},
				  //  {"title":"管道","field":"pipe",width:40}  
				]];//67
				option.columns = [[
//					{"title":"出口流量m3/h","field":"outInstantFlow",width:85,formatter:function(value,row,index) {
//						var v1,v2;
//						if(row.outInstantFlow==null) {v1=0;}else{v1=row.outInstantFlow;}
//						if(row.outInstantFlow2==null){v2=0}else{v2=row.outInstantFlow2;}
//						return parseFloat((v1-0)+(v2-0)).toFixed(2);
//					}  }, //OUTFLOW+OUTFLOW2
//					{"title":"累计供水量m3","field":"outAccumulatedFlow",width:85,formatter:function(value,row,index) {
//						var v1,v2;
//						if(row.outAccumulatedFlow==null) {v1=0;}else{v1=row.outAccumulatedFlow;}
//						if(row.outAccumulatedFlow2==null){v2=0}else{v2=row.outAccumulatedFlow2;}
//						return (v1-0)+(v2-0);
//					} } , //OUTFLOWSUMT  OUTFLOWSUMT2
				   // {"title":"出口流量m3/h","field":"OUTFLOW",width:85},
					//{"title":"出口压力MPa","field":"OUT_PRESS",width:85},
					//{"title":"日供水量m3","field":"OUTFLOWSUMT",width:63} 
					{"title":"小时供水量m³","field":"accumulatedFlowHour",width:85},
					//{"title":"日供水量m³","field":"outAccumulatedFlowToday",width:85},
					{"title":"出厂压力MPa","field":"outPressure",width:85},
					{"title":"累计流量m³","field":"accumulatedFlow",width:63}
					
				]];
				 
				 //数据行点击事件 20150701lui
				option.onClickRow = function(index, row) {
					$("#zhxxgrid").datagrid("unselectAll");
					var rows = $("#zhxxgrid").datagrid("getRows");
					$.each(rows, function(i, n) {
						if(n.id == row.id) {
							var rowIndex = $("#zhxxgrid").datagrid("getRowIndex", n);
							$("#zhxxgrid").datagrid("selectRow", rowIndex);
						}
					});
					openDetailWindow(row.id);
				}
				
				option.onLoadSuccess = function(data) {
					mergeCellByName("#zhxxgrid", fields);
				}
				
				$("#zhxxgrid").datagrid(option);
				
				//获取需要合并的属性名
				fields = [];
				$.each(util.getConfigList("gis_mergeCellRules"), function(i, config) {
					fields.push(config.value);
				});
				
				var data = formatterStationData(stationData, fields);
				$("#zhxxgrid").datagrid("loadData", data);
				
				//--------水泵状态
				
				var pumpData = [];
				$.each(stationType, function(index, n) {
					if(n.value != "17") {
						util.executeAjaxUrlForResult(pumpUrl+n.value, {data:{rtName:"runState"}, async: false}, function(result) {
							if(result.data.length > 0) {
								$.merge(pumpData, result.data);
							}
						});
					}
				});
				var optionPump = {border:false,rownumbers:true};
//				optionPump.loadFilter = function(data) {
//					return {total:data.data.length, rows:data.data};
//				}
				
				optionPump.frozenColumns = [[{"title":"名称","field":"pName",width:100,height:60}]];
				optionPump.columns = [[                       
					{"title":"水泵运行状态","field":"1",width:246,height:60,formatter:
						function(value,row,index) { 
							if (!$.isEmptyObject(row)) {
								// return row.objs.name+" "+ row.objs.PRUN;
								var pumpState="";
								for(var i =0 ;i<row.objs.length;i++) {
									//pumpState = pumpState+"---"+row.objs[i].PRUN;
									if(row.objs[i].runState=="1"){ 
										pumpState = pumpState+ 	"<span class='pumpStatus station-state-1' title='"+ row.objs[i].name+"' pumpid='"+row.objs[i].id+"'></span>";
									}
//									onclick='require(\"layerbar/topic/situation/situation\").openDetailWindow(\"" + row.objs[i].id + "\");'
									else{
										pumpState = pumpState+ 	"<span class='pumpStatus station-state-0' title='"+ row.objs[i].name+"' pumpid='"+row.objs[i].id+"'></span>";
									}
								//	return "<img title='正常:"+row.NormalRate+"%异常:"+row.AbnormalRate+"%不确定:"+row.UncertaintyRate+"%' src='Images/TubeBurst/yellow.png' height='16' width='16'>"
								//	<span class="pumpStatus station-state-0" title="水泵1" commonpanel="77"></span>
								}
								return pumpState;
								//<span class="pumpStatus station-state-0" title="水泵3" commonpanel="79"></span>
							}
							
						}  
					} 
				]];
				 
				 //数据行点击事件 20150701lui
				optionPump.onClickRow = function(index, row) {
//				 	alert(row.id);
				//	alert(index);
				//	alert(row.ID);
				//	 parent.document.getElementById("areaID").value=row.ID;
				//	 var child = parent.document.getElementById("ifra2").contentWindow;//mainFrame这个id是父页面iframe的id 
				//	 child.initRealTimeGrid(row.ID);//获取子页面中的document对象； 
				//	 child.initHistoryGrid(row.ID);
				}
				optionPump.onLoadSuccess = function(data) {
					var panel = $('#pumpStateGrid').datagrid('getPanel');
					panel.on("click", "span.pumpStatus", function(event) {
						var pumpid = $(event.currentTarget).attr("pumpid");
						showCommonDetailPanel(pumpid);
					});
				}
				$("#pumpStateGrid").datagrid(optionPump);
				$("#pumpStateGrid").datagrid("loadData", pumpData);
				
				$("#zhxx").window({    
		    	    width:375,    
		    	    height:410,
		    	   // left:$(window).width()-603,
		    	    left:10,
		    	    top:'63px',
		    	    title:'&nbsp;&nbsp;&nbsp;综合数据'
		    	});
				
				eventStack.add({
					"id":id,
					"destroy":function(){
						$("#zhxx").window('close');
					},
					"init":function(){
						$("#zhxx").window('open');
						if($("#searchmodel").hasClass("open")){
							search.search();
						}
						if($("#space-button").hasClass("open")){
							search.spaceSearch();
						}
					}
				})//添加关闭功能
				.addRule({"id":id,"open":[id,'baselayer','countylayer','pipelayer','stationlayer','monitorlayer']})//制定规则
				.applyRule();//应用规则
			},
			
			openDetailWindow:openDetailWindow,
			
			updateZhxx:updateZhxx
	}
	
	return obj;
	
});