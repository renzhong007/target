
function commonWin(idExp) {
	var fn = {
		config : {
			id : idExp,
			iframe : "#winIframe",
			attrs : undefined,
			form : undefined,
			option : {
				title : "title",
				name : "name",
				type : "type",
				col : 2
				
			}
		},
		init : function (arr, submitFunc, closeFunc, title,option) {
			
			fn.config.attrs = arr;
			
			var op = $.extend(fn.config.option, option);
			
			op.onBeforeClose = function() {
				self.parent.f2net.window.clearTempLayer("ShowTempLayer");
			}
			var fs = $(fn.config.id).find("fieldset");
			//添加resize居中
			
			$(fn.config.id).window("setTitle",title);
			var width = op.col*310;
			var height = (Math.ceil(arr.length / op.col))*30 + 40 +50;
			$(fn.config.id).window('resize',{ width: width, height: height });
			$(fn.config.id).window("center");


			//初始化html
			fn.initHtml(fs, arr, op);
			
			//初始化绑定事件
			fn.initBindEvent(submitFunc, closeFunc);
			
			
		},
		//自定义初始化
		initByCustom : function() {
			//初始化绑定事件
			fn.initBindEvent(submitFunc, closeFunc);
		},
		//初始化html
		initHtml : function(fs, arr, option) {
			
			
			
			$(fs).html("");
			$(fs).append("<legend>基本信息</legend>");
			var count = 1;
			var content = "";
			var endstr = "";
			
			$.each(arr, function(i,n) {
				if (1==count) {
					content = "<div style='margin: 0 0 5px 0;'>";
				}
				content += "<label style='width: 100px; display: inline-block; text-align: right; margin-right: 10px;'>"+n[option.title]+"</label><input name='"+n[option.name]+"' class='"+n[option.type]+"' style='width:138px;' />";
				if (count >= option.col) {
					content += "</div>";
					$(fs).append(content);
					content = "";
					count = 1;
					endstr = "";
				} else {
					count++;
					endstr = "</div>";
				}
			});
			if ("" != endstr) {
				content += endstr;
				$(fs).append(content);
			}
			
			$.parser.parse(fn.config.id);
		},
		//初始化绑定事件
		initBindEvent : function(submitFunc,closeFunc) {
			//删除所有绑定事件
			$($(fn.config.id).find(".btn-ok")).unbind();
			$($(fn.config.id).find(".btn-cancle")).unbind();
			//绑定事件
			$($(fn.config.id).find(".btn-ok")).on("click",function(event){
				submitFunc();
			});
			
			$($(fn.config.id).find(".btn-cancle")).on("click",function(event){
				closeFunc();
			});
		},
		open : function () {
			$(fn.config.id).window("open");
			
        	var form = $(fn.config.id).find("form");
        	$(form).form("clear");
        	fn.config.form = form;
        	return form;
		},
		close : function() {
			$(fn.config.id).window("close");
		},
		setIframe : function(src) {
			$winframe = $(fn.config.iframe);
			$winframe.attr("src",src);
		},
		resize : function(width, height) {
			$(fn.config.id).window('resize',{ width: width, height: height });
			$(fn.config.id).window("center");
		},
		fill : function(obj) {
			var name = fn.config.option.name;
			var type = fn.config.option.type;
			var form = fn.config.form;
			$.each(fn.config.attrs, function(i,n){
    			$($(form).find("[name='"+n[name]+"']")).parent().prev()[n[type].replace("easyui-","")]("setValue",obj[n[name]]);
    		});
		}
	};
	
	this.init = function (arr, submitFunc, closeFunc, title, config) {
		fn.init(arr, submitFunc, closeFunc, title, config);
	};
	this.fill = function (obj) {
		fn.fill(obj);
	}
	this.setIframe = function(src) {
		fn.setIframe(src);
	}
	this.open = function () {
		return fn.open();
	} 
	this.close = function () {
		return fn.close();
	} 
	this.resize = function(width, height) {
		return fn.resize(width, height);
	}
	this.setTitle = function(title) {
		$(fn.config.id).window("setTitle",title);
	}
}