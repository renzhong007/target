define(['jquery', 'util', 'easyui'],function($, util) {
	function WaterTabBtn(dom,data,config) {
		var fn = {
			config:{
				title:"",
				width:"100%",
				height:"30px",
				singleWidth:"",
				singleHeight:"",
				contentLeft : "30px",
				leftRightBtnTop : "",
				fontSize: "15",
				rowCount : 6,
				page : 1,
				dom:{},
				data : [],
				selected:"",
				exeMethod : function(){},
				arr : data,
				textField:"name"
			},
			init : function() {
				var parentdiv = $(fn.config.dom);
				var div = $("<div class='waterTabBtn'>");
				parentdiv.append(div);
				fn.refreshPage(div);
			},
			refreshPage : function(div) {
				div.html("");
				//中间box
				var centerdiv = $("<div class='boxConC' style='"+("" != fn.config.contentLeft ? "left:"+fn.config.contentLeft +";": "")+"'>");
				var ul = $("<ul>");
				$.each(fn.config.arr,function(i,n){
					if (i >= ((fn.config.page-1)*fn.config.rowCount) && i < ((fn.config.page)*fn.config.rowCount)) {
						var liheight = fn.config.height.replace("px", "");
						var li = $("<li target='"+i+"' style='height:"+(liheight-4)+"px;line-height:"+(liheight-4)+"px;margin-top:2px;"+("" != fn.config.singleWidth ? "width:"+fn.config.singleWidth +";": "")+"' ><a style='height:"+(liheight-4)+"px;font-size:"+fn.config.fontSize+"px;'>"+n[fn.config.textField]+"</a></li>");
						if ((i+"") == fn.config.selected) {
							$(li).addClass("active");
						}
						ul.append(li);
					}
					
				});
				centerdiv.append(ul);
				centerdiv.on("click","li",function(event) {
					var obj = fn.config.arr[$(event.currentTarget).attr("target")];
					$(event.currentTarget).addClass("active");
					fn.config.selected = $(event.currentTarget).attr("target") + "";
					$(event.currentTarget).siblings().removeClass("active");
					fn.config.exeMethod(obj);
				})
				
				//左右两侧
				var right = $("<div class='boxConRight'>");
				var rightC = $("<div class='boxConR' id='cityBoxBtnR' onmouseover='this.className='boxConRHov'' onmouseout='this.className='boxConR'' >");
				
				right.append(rightC);
				if (fn.config.page <= parseInt(fn.config.arr.length/fn.config.rowCount)) {
					rightC.show();
					rightC.on("click",function(event){
						fn.config.page ++;
						fn.refreshPage(div);
					});
				} else {
					rightC.hide();
				}
				
				
				
				var left = $("<div class='boxConLeft'>");
				var leftC =$("<div class='boxConL' id='cityBoxBtnL' onmouseover='this.className='boxConLHov'' onmouseout='this.className='boxConL'' >");
				left.append(leftC);
				if (fn.config.page > 1) {
					leftC.show();
					leftC.on("click",function(event){
						fn.config.page --;
						fn.refreshPage(div);
					});
				} else {
					leftC.hide();
				}
				
				
				if ("" != fn.config.leftRightBtnTop) {
					rightC.css("top",fn.config.leftRightBtnTop);
					leftC.css("top",fn.config.leftRightBtnTop);
				}
				
				//标题名称
				if ("" != fn.config.title) {
					var title = $("<div class='boxConTitle' style='position: absolute; width: 100px; height: 30px; line-height: 30px; text-align: right;'>");
					title.append("<strong>"+fn.config.title+"</strong>");
					div.append(title);
				}
				
				div.append(centerdiv);
				div.append(right);
				div.append(left);
			}
			
		}
		if (undefined != config) {
			$.extend(fn.config,config);
		}
		
		fn.config.dom = dom;
		fn.init();
		
		this.getNowSelect = function() {
			return fn.config.arr[parseInt(fn.config.selected)];
		}
	}
	
	return WaterTabBtn;
	
});
