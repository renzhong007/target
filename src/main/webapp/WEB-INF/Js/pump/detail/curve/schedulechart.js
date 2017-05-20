define(['jquery','highcharts'],function($,highcharts) {
	function initChart(expression,tempoption,param) {
		var option = {
				chart: {
					type: param.SeriesType==null?"spline":param.SeriesType,
					marginTop: 25,
			        marginLeft: 50,
			        marginRight: 30,
			        height:param.height,
			        backgroundColor: null,//图表区背景色
			        plotShadow: false,
//			        spacingLeft: 10,
			        spacingLeft: param.spacingLeft==null?10:param.spacingLeft,
			        borderColor: '#000000',
					borderWidth: 0,
					className: 'dark-container',
					plotBackgroundColor: 'rgba(13, 13, 13, .01)',//主图表区背景色，即X轴与Y轴围成的区域的背景色
					plotBorderColor: '#E9E9E9',
					plotBorderWidth: 2
				},
			    title: {
			        text: param.titleText,
			        align:'center',
			        verticalAlign: 'top',
			        style: {
						font: 'bold 13px "Trebuchet MS", Verdana, sans-serif'
			        },
			    	y:6
			    },
			    colors : [ 
			             '#ff7f50', '#0066cc', '#da70d6', '#32cd32', '#6495ed', 
			             '#ff69b4', '#ba55d3', '#cd5c5c', '#ffa500', '#40e0d0', 
			             '#1e90ff', '#ff6347', '#7b68ee', '#00fa9a', '#ffd700', 
			             '#6b8e23', '#ff00ff', '#3cb371', '#b8860b', '#30e0e0' 
			         ],
			    xAxis: {
			    	labels: {	//设置X轴各分类名称的样式style
			            style:{
			    			color:"#333"
			    			
			    		},
			    		step:param.step,//步阶
						staggerLines:1,//交错显示
						y:20
			    	},
			    	gridLineWidth: 0,
			    	tickInterval:param.tickInterval==null?1:param.tickInterval,
			        tickmarkPlacement: 'on',//刻度点位置
			    	lineWidth: 1,//基线宽度
			    	categories: param.categories//X轴分类名称
			    },
			    yAxis: {
//					max:param.max,//最小值
//					min:param.min,//最大值
					title:{//标题
						text:'',//标题名称param.unit
						align:'high',//对齐方式，顶部对齐
//						    offset: 0,
//						    rotation: 0,//角度
//						    y: -15,//标题偏移
						x: param.yAxisX==null ? 0 : param.yAxisX,
					    style: {
					    	color: "#333"
					    }
					},
					lineWidth: 0,//基线（轴线）宽度
					gridLineWidth: 1,//网格(竖线)宽度
					gridLineDashStyle: 'Solid',//竖线类型、虚线
					gridLineColor:'#c0c0c0',//网格（竖线）颜色
					labels: {//Y轴坐标标签
//						    formatter: function() {//回调函数，用于格式化输出提示框的显示内容
//						        return this.value;
//						    },
						format: '{value} ',//使纵坐标9K变为9000
					    style:{
							color:"#333"
						}
					},
					plotLines:param.plotLines
			    },
			    tooltip: {
			    	enabled:true,
			    	valueSuffix:param.unit,//y值后缀
			        crosshairs: true,
			        shared: true
			    },
			    plotOptions: {
			        spline: {
			            marker: {
			                radius: 4,
			                lineColor: '#666666',
			                lineWidth: 1
			            }
			        },
			        line: {//折线图
						cursor:'pointer',
						connectNulls:true,
						dataLabels:{
							enabled:param.dataLabelE,
							formatter: function() {
			                	return this.y + param.unit;
			            	}
						},
						marker: {//图例说明上的标志
							enabled:false,
			                radius: 2,
			                lineColor: '#c0c0c0',
			                lineWidth: 1
			            }
					},
			        series: {
			        	connectNulls:true,
			        	lineWidth: 1
			        }
			    },
			    legend: {
			        layout: 'horizontal',
			        align: 'center',
			        verticalAlign: 'bottom',
			        borderWidth: 0,
			        backgroundColor: '#fff',
			    	borderColor:'#fff',
			    	enabled: param.legendshow,//是否显示图例
			    	y:10
			    },
			    series: param.series,
			    credits:{
					enabled:false
				}
			};
		$.extend(option,tempoption);
		$(expression).highcharts(option);
		}
					
	return {initChart:initChart	}
	
})				