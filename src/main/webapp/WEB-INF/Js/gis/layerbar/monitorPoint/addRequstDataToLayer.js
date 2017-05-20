define(function() {
	function addRequstDataToLayer(n, result) {
		//清空图层
		$.each(n.layers,function(ilayer,nlayer){
			f2net.window.clearTempLayer(nlayer.name);
		});
		var arr = {};
		$.each(result.data,function(i1,n1){
			var obj = n1;
			var name;
//			if(n1.NAME!=undefined){
//			name=n1.NAME;
//			}
//			else 
			if (n1.name!=undefined){
				name=n1.name;	
				if(!arr[name]) { //进行强制处理，重复的项只取第一个
					arr[name] = true;
				
					obj.value =" "+ n.layername+" " +obj[n.name];
					$.each(n.values,function(ivalue,nvalue){
						var v = (null == obj[nvalue.name] ? '' :obj[nvalue.name]);
						if (v) {
							v = formatter[nvalue.formatter](v);
							//测点tip中的压力值和流量值的加入
							obj.value += '\n '+nvalue.title+'  ' + v +' '+ (null == obj[nvalue.time] ? '' :obj[nvalue.time].substring(11,16));
						}
					});
					$.each(n.layers,function(ilayer,nlayer){

						f2net.window.addPointGraphic(nlayer.name,nlayer.id+obj.id,JSON.stringify(obj),obj[n.x],obj[n.y],nlayer.gra,'');
					});
				}
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