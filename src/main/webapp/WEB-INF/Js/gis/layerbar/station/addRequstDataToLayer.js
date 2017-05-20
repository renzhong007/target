define(function() {
	function addRequstDataToLayer(n, result) {
		//清空图层
		$.each(n.layers,function(ilayer,nlayer){
			try{
				f2net.window.clearTempLayer(nlayer.name||'');
			}catch(e){
				
			}
		});
		var arr = {};
		$.each(result.data,function(i1,n1){
			var obj = n1;
			var name;
			if(n1.name!=undefined){
				name=n1.name;
			}
//			else if (n1.name!=undefined){
//				name=n1.name;				
//			}
			
			if(!arr[name]) { //进行强制处理，重复的项只取第一个
				arr[name] = true;
			
				obj.value ="";
				$.each(n.values,function(ivalue,nvalue){
					var v = (null == obj[nvalue.name] ? '' :obj[nvalue.name]);
//					if(nvalue.dependency != "") {
//						v = parseFloat(v) + parseFloat(null==obj[nvalue.name+"2"] || undefined==obj[nvalue.name+"2"] ? '0' :obj[nvalue.name+"2"]);
//					}
					
					if (v) {
						v = formatter[nvalue.formatter](v);
					}
					obj.value += '\n '+nvalue.title+'  ' + v +'  '+ (null == obj[nvalue.time] ? '' :obj[nvalue.time].substring(11,16));
					
				});
				$.each(n.layers,function(ilayer,nlayer){
					try{
						f2net.window.addPointGraphic(nlayer.name,nlayer.id+obj.id,JSON.stringify(obj),obj[n.x],obj[n.y],nlayer.gra,'');
					}catch(e){
						
					}
//					try{
//					f2net.window.addPointGraphic(nlayer.name,nlayer.id+obj.id,JSON.stringify(obj),obj[n.x],obj[n.y],nlayer.gra,'');
//					}catch(e){
//						
//					}
				});
			}
		});
	}
	var formatter = {
			fixt:function(value, row, index) {
				var f = parseFloat(value + "");
				return f.toFixed(3);
			},
			fixo:function(value, row, index) {
				var f = parseFloat(value + "");
				return f.toFixed(1);
			},
			fixz:function(value, row, index) {
				var f = parseFloat(value + "");
				return f.toFixed(0);
			},
			overdue:function(value, row, index) {
				var str = row.startTime;
				str = str.replace(/-/g,"/");
				var date = new Date(str );
				var now = new Date();
				if ((now.getTime() - date.getTime()) > due) {
					return '<span style="color:#ccc">'+value+'</span>';
				} else {
					return value;
				}
			}
	}
	return addRequstDataToLayer;
});