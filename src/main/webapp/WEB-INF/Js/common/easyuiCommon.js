function dateboxFormat(date){
	var y = date.getFullYear();
	var m = date.getMonth()+1;
	var d = date.getDate();
	return y+'-'+(m<10?'0'+m:m)+'-'+(d<10?'0'+d:d);
};

function datetimeboxFormat(date){
	var y = date.getFullYear();
	var m = date.getMonth()+1;
	var d = date.getDate();
	var h = date.getHours();
	var mi = date.getMinutes();
	var se = date.getSeconds();
	return y+'-'+(m<10?'0'+m:m)+'-'+(d<10?'0'+d:d) + ' ' +(h<10?'0'+h:h)+':' + (mi<10?'0'+mi:mi) + ':' + (se<10?'0'+se:se);
};

$.fn.propertygrid.defaults.columns[0][0].title = "属性名"; // 对应Name
$.fn.propertygrid.defaults.columns[0][1].title = "属性值"; // 对应Value


//绑定tab关闭事件
function tabClose()
{
	/*双击关闭TAB选项卡*/
	$(".tabs-inner").dblclick(function(){
		var subtitle = $(this).children(".tabs-closable").text();
		$('#myTab').tabs('close',subtitle);
	});

	
	$(".tabs-inner").bind('contextmenu',function(e){
		$('#mm').menu('show', {
			left: e.pageX,
			top: e.pageY
		});
		
		var subtitle =$(this).children("span").text();
		$('#mm').data("currtab",subtitle);
		
		return false;
	});
}

//增加或者更新tab
function addTabUpdate(menuid,subtitle,url,icon){
	addTabUpdateByConfig(menuid,subtitle,url,icon);
}

/**
* 增加或者更新tab
* 并绑定add/update方法
* @param menuid
* @param subtitle
* @param url
* @param icon
*/
function addTabUpdateByConfig(menuid,subtitle,url,icon,config){
	var tmpTab = $('#myTab').tabs('getTab',subtitle);
	//判断tab是否存在
	if(tmpTab){
		$('#myTab').tabs('close',subtitle);
	}
	$('#myTab').tabs('add',getTabOption(subtitle,url,config));
	tabClose();
};
/**
* 增加或者更新tab
* 并绑定add/update方法
*/
function addTabUpdateByHtml(menuid,subtitle,url,icon,type){
	var tmpTab = $('#myTab').tabs('getTab',subtitle);
	//判断tab是否存在
	if(tmpTab){
		$('#myTab').tabs('close',subtitle);
	}
	$('#myTab').tabs('add',getTabOptionByHtml(subtitle, url, type));
	tabClose();
};

/**
* 获取tab的option
*/
var getTabOption = function (subtitle,url,config) {
	var option = {
		title:subtitle,
		closable:true,
		href:url,
		closed: true,
		onLoad: function(panel) {
			if (undefined != config) {
				var tables = $('#myTab').tabs('getTab',subtitle);
				if (undefined != config.init) {
					config.init(tables);
				}
				if ('submit' in config) {
					$(tables).find('.faj-enter').click(function(){
						DescSubmit(tables,config.url,config.tabTitle,config.listExpression,config.submit(config));
					});
				} else {
					$(tables).find('.faj-enter').click(function(){
						DescSubmit(tables,config.url,config.tabTitle,config.listExpression);
					});
				}
				
				
				$(tables).find('.faj-cancle').click(function(){
					removeTab(config.tabTitle);
				});
			};
			
		}
	};
	return option;
};

/**
* 获取tab的option
*/
var getTabOptionByHtml = function (subtitle,url,type) {
	var option = {
		title:subtitle,
		closable:true,
		href:url,
		closed: true,
		onLoad: function(panel) {
			var tables = $('#myTab').tabs('getTab',subtitle);
			openGrid(tables, type);
		}
	};
	return option;
};

function removeTab(title){
	var tmpTab = $('#myTab').tabs('getTab',title);
	//判断tab是否存在
	if(tmpTab){
		$('#myTab').tabs('close',title);
	}
}

/**
* 5. 获取一行数据
* @param id：datagrid的ID
* @returns：返回rows
*/
function getRow(id){
	getRowByExpression('#'+id);
}

/**
* 5. 获取一行数据
* @param id：datagrid的ID
* @returns：返回rows
*/
function getRowByExpression(expression){
	var rows = $(expression).datagrid('getSelections');
	if(rows == ""){
		parent.$.messager.alert('警告', '请先选择一条信息!');
		return false;
	}else if(rows.length>1){
		parent.$.messager.alert('警告', '只能选择一条信息!');
		return false;
	}
	return rows;
}

/**
* 6. 获取多行数据
* @param id：datagrid的ID
* @returns：返回rows
*/
function getRows(id){
	return getRowsByExpression("#"+id);
}

/**
* 6. 获取多行数据
* @param id：datagrid的ID
* @returns：返回rows
*/
function getRowsByExpression(expression){
	var rows = $(expression).datagrid('getSelections');
	if(rows == ""){
		parent.$.messager.alert('警告', '请先选择一条信息!');
		return false;
	}
	return rows;
}


/**
* 初始化下拉框
*/
var initCombobox = function(domain,attr,attrvalue,option) {
	$(domain).find('['+attr+'="'+attrvalue+'"]').combobox(option);
};

//设置下拉框
var setCombobox = function(obj,value){
	if(value != 0){
		$(obj).parent().prev().combobox('setValue',value);
	}
};
//设置下拉框 TREE
var setCombotree = function(obj,value){
	if(value != 0){
		$(obj).parent().prev().combotree('setValue',value);
	}
};
//设置日期
var setDatebox = function(obj,value){
	$(obj).parent().prev().datebox('setValue',value.substring(0,10));
};
//设置时间
var setDatetimebox = function(obj,value){
	$(obj).parent().prev().datetimebox('setValue', value);
};
//设置Checkbox
var setCheckBox = function(obj,value){
	$(obj).prop("checked", value);
};

/**
* 13. 在编辑的时候，根据一系列参数，去自动回设INPUT值
* formid 表单id
* start  -- > name属性的开头  例如 tbEmployee.empOthername --> start = tbEmployee
* singlePojo 数据json
* config 配置 相信参考empDesc.js
*/
var setValueByName = function(formid,start,singlePojo,config){
	var form = $("#"+formid);
	var attrs = form.find("[name^='"+start+"']");
	
	$.each(attrs,function(i,n){
		var name = $(n).attr("name");
		var attr = name.replace(start+".","");
//		alert(attr);
		if(attr in singlePojo){
			if(config != null && attr in config){
				var func = eval(config[attr]);
				func(n,singlePojo[attr]);
			}else{
				$(n).val(singlePojo[attr]);
			}
			
		}else{
			//alert(name);
		}
	});
};

/**
* 13. 在编辑的时候，根据一系列参数，去自动回设INPUT值
* formid 表单id
* start  -- > name属性的开头  例如 tbEmployee.empOthername --> start = tbEmployee
* singlePojo 数据json
* config 配置 相信参考empDesc.js
*/
var setValueByName = function(dom,singlePojo,config){
	var form = dom;
	var attrs = form.find("[name]");
	
	$.each(attrs,function(i,n){
		var name = $(n).attr("name");
		var attr = name;
		if(attr in singlePojo){
			if(config != null && attr in config){
				//var func = eval(config[attr]);
				config[attr](n,singlePojo[attr]);
			}else{
				if ('noeasyui' == $(n).attr('class')) {
					$(n).val(singlePojo[attr]);
				} else {
					$(n).parent().prev().textbox('setValue',singlePojo[attr]);
				};
				
			}
			
		}else{
			//alert(name);
		}
	});
};

/**
* 14. 删除单行row
* @param tempList     列表DIV的ID
* @param url          ajax的URL
* @param dataname     ajax的data名
* @param idname       动态取rows的id的key值
*/
function delCommonRowByExpression(tempList,url,dataname,idname){
	var rows = getRowByExpression(tempList);
	if(rows){
		$.messager.confirm('提示', '您确定要删除本条信息吗？', function(result) {
			if(result){
				var id = rows[0][idname];
				
				$.ajax({
					type: "get",
					url: url,
					data : dataname + "=" + id,
					async:false,
					dataType:'json',
					success: function(data, textStatus){
						parent.$.messager.show({title:'信息',msg:'操作成功！',timeout:2000});
						reloadDg(tempList);
						reloadTreeGrid(tempList);
					}
				});
			}
		});
	}
}

/**
* 7. 关闭窗口，并将window里的form的input清空
* @param wid：window的ID
* @param fid：window中的form的ID
*/
function closeWin(wid,fid){
	
	var dom;
	if (typeof(wid) == 'string') {
		dom = '#'+wid;
	} else {
		dom = wid;
	}
	$(dom).window('close');
	if (undefined != fid) {
		$('#' + fid).form('clear');
	} else {
		var forms = $(dom).find('form');
		$(forms).form('clear');
	}
}

var addRowsInDataGrid = function (expression,count){
	//alert(count);
	for (var int = 0; int < count; int++) {
		
		$(expression).datagrid('appendRow',{
			item_id:0
		});
	}
};

var reloadDg = function (expression) {
	$(expression).datagrid('reload');
};

var reloadTreeGrid = function(expression) {
	$(expression).treegrid('reload');
};

var CommonFunc = {
	initMenu : function(panel,menulist,fn) {
		var westpanel = panel;
		var ul = westpanel.find("ul");
		$(ul).empty();
		$(ul).on("mouseenter mouseleave","div",function(event){
			if ("mouseenter" == event.type) {
				$(event.currentTarget).addClass("hover");
			} else if ("mouseleave" == event.type){
				$(event.currentTarget).removeClass("hover");
			}
		});
		//here
		$.each(menulist,function(i,n){
			
			var li = $("<li>");
			var selected = "";
			
			var div = $("<div><a subtitle='"+n.title+"' href='javascript:void(0)'><span class='icon icon-postage'>&nbsp;</span><span class='nav'><span class='nav1'></span>"+n.title+"</span></a></div>");
			li.append(div);
			$(ul).append(li);
			if ("click" in n) {
				$(li).click(function(event){
					var divs = $(ul).find("li div");
					$(divs).removeClass("selected");
					div.addClass("selected");
					fn[n.click](n);
				});
			}
			
			if ("obj" in n) {
				$(li).click(function(event){
					var divs = $(ul).find("li div");
					$(divs).removeClass("selected");
					div.addClass("selected");
					n.install = new n.obj();
				});
			}
			
			if ("undefined" != typeof(fn[n.click]) && i == 0) {
				div.addClass("selected");
				fn[n.click](n);
			}
			
		});
	}
	
}


