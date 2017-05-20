<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Date"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="wn" tagdir="/WEB-INF/tags"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html>
<head>
<meta  http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link href="Css/common/common.css" type="text/css" rel="stylesheet" />

<link href="Css/gis/search/search.css" type="text/css" rel="stylesheet" />
<link href="Css/gis/viewcard/viewcard.css" type="text/css" rel="stylesheet" />
<link href="Css/gis/layerbar/layerbar.css" type="text/css" rel="stylesheet" />
<link href="Css/gis/toolbar/toolbar.css" type="text/css" rel="stylesheet" />
<link href="Css/gis/promptBox/promptBox.css" type="text/css" rel="stylesheet" />
<link href="Plugins/bootstrap/css/bootstrap.css" type="text/css" rel="stylesheet" />
<link rel="stylesheet" href="Plugins/nanoscroller/css/nanoscroller.css">
<link rel="stylesheet" type="text/css" href="Plugins/easyui/themes/bootstrap/easyui.css">
<link rel="stylesheet" href="Plugins/accordion/css/style.css"> <!-- Resource style -->
<!-- panel面板样式 -->
<link rel="stylesheet" type="text/css" href="Plugins/panel/css/panel.css">
<!-- 实时模型面板样式 -->
<link href="Css/gis/sumlate/sumlate.css" type="text/css" rel="stylesheet" />

<script type="text/javascript" data-main="Js/gis/index.js" src="Plugins/requireJs/require-2.1.11.js"></script>
<script type="text/javascript" src="Plugins/jquery/jquery-1.10.1.js"></script>

<script type="text/javascript" src="Js/common/waterutilsWarn.js"></script>
<script type="text/javascript" src="Plugins/easyui/commonWarn.js"></script>
<script type="text/javascript" src="Js/common/waterutilsOld.js"></script>
<script type="text/javascript" src="Js/gis/gis.js"></script>
<!--[if IE]>
		<script type="text/javascript" src="Js/common/json2.js"></script>
		<script src="http://libs.useso.com/js/html5shiv/3.7/html5shiv.min.js"></script>
	<![endif]-->
<title>GIS一体化平台</title>
</head>
<body>
    <div id="mainCenter" data-options="region:'center',border:false" style="overflow:hidden"  >
    	<!-- 地图 -->
		<wn:mainGis showJs="false" src="../rdsw-f2net/f2net/Main.html"></wn:mainGis>
		<!-- 搜索框  -->
		<div id="searchmodel" style="">
			<div id="searchboxBg">
				<div id="searchbox" class="clearfix">
					<button id="type-button" class="button" data-title="" data-tooltip="1">
						<div class="type-select">
							
						</div>
					</button>
					<div id="searchbox-container">
						<div id="sole-searchbox-content" class="searchbox-content">
							<input id="sole-input" class="searchbox-content-common" type="text" name="word" autocomplete="off" maxlength="256" placeholder="输入所在道路查询" value="">
							<div class="input-clear" title="清空" style="display: none;"></div>
							<div id="space-button" class="searchbox-content-button right-button loading-button" data-title="路线" data-tooltip="2">
							</div>
						</div>
					</div>
					<button id="search-button" class="button" data-title="搜索" data-tooltip="1"><span></span></button>
				</div>
				<div id="spaceSearch">
					<header>
						<nav>
							<ul><li id="position" class="checked">坐标定位</li><li id="space">空间查询</li><li id="near">附近查询</li></ul>
							<button id="spaceSearch_close"></button>
						</nav>
					</header>
					<section>
						<div class="checked location">
							<ul>
								<li>经度 X：</li>
								<li><input name="x"></li>
							</ul>
							<ul>
								<li>纬度 Y：</li>
								<li><input name="y"></li>
								<li class="locationbutton" style="margin-top: 16px;">定位</li>
							</ul>
						</div>
						<div class="spatial">
							<ul>
								<li>图层:</li>
								<li>
									<ul class="search_layer">
<%-- 										<c:forEach items="${spaceSearchConfigList }" var="spaceSearchConfig"> --%>
<%-- 											<li <c:if test="${spaceSearchConfig.isinit eq '1' }">class="checked"</c:if> >${spaceSearchConfig.name }</li> --%>
<%-- 										</c:forEach> --%>
										<li class="checked">流量计</li>
										<li>排气阀</li>
										<li>消防栓</li>
										<li>增压站</li>
										<li>阀门</li>
										<li>变材点</li>
										<li>变径点</li>
										<li>管线<li>
										<li>排水口</li>
									</ul>
								</li>
								<br></br>
								<br></br>
								<li>方式:</li>
								<li>
									<ul class="search_way">
										<c:forEach items="${waySearchConfigList }" var="waySearchConfig">
											<li target="${waySearchConfig.value }" <c:if test="${waySearchConfig.isinit eq '1' }">class="checked"</c:if> >${waySearchConfig.name }</li>
										</c:forEach>
<!-- 										<li class="searchbutton">绘制</li> -->
										<li target="EXTENT" class="checked">框选</li>
										<li target="CIRCLE">圆选</li>
										<li target="POLYGON">多边形</li>
										<li class="searchbutton">绘制</li>
									</ul>
								</li>
							</ul>
						</div>
						<div class="nearby">
							<ul>
								<li>经度:</li><li><input name="x1"></li>
								<li>经度:</li><li><input name="y1"></li>
								<li>周边:</li><li><input style="width: 170px;" id="rangeText" value="1000">(米)</li>
							</ul>
							<ul>
								<li class="locationbutton">定位</li>
								<li class="searchbutton">查询</li>
							</ul>
						</div>
					</section>
				</div>
				<button id="toggle-button" class="" data-tooltip="1"><span></span></button>
			</div>
			
			
			
			<div id = "search-content">
				<div class="select-content-type">
					<form id="search_layer">
						<ul>
						</ul>
					</form>
				</div>
				<div class="nano" style="position:absolute;bottom:0px;top:0px;left:0px;height:inherit;">
					<div class="nano-content">
						<table>
						</table>
					</div>
				</div>
			</div>
			<div id="search-page" >
				查询结果：<span id="searchCount"></span>条&nbsp;&nbsp;&nbsp;共<span id="totalPage"></span>页&nbsp;&nbsp;&nbsp;当前为第<span id="currentPage"></span>页&nbsp;&nbsp;<button class="pre" id="prebutton"></button><button class="next" id="nextbutton"></button>
			</div>
		</div>
		
		<!--提示框  -->
		<div class="promptBox" id="promptBox">
			
			<ul>
<!-- 			右侧面板的隐藏 -->
				<li id="promptBoxDate" class="date"  style=""> 
					<span id="timeHour" style="font-size: 34px;text-align: left;margin-left: 1px;line-height: 65px;position:absolute;left:0px;">00</span>
					<span style="font-size: 34px;text-align: left;line-height: 56px;margin-left:3px;position:absolute;left:50px;">:</span>
					<span id="timeMinute" style="font-size: 34px;    text-align: left;     line-height: 65px;position:absolute;left:76px;">00</span>
				</li>
				<li id="promptBoxStats" class="stats active"  style="" id="">
				</li>
             <!--   <li id="promptBoxYesterday" class="color1 today">
					<h4>昨日供水量</h4>
					<p><h5 id="yesterdayFlow">0.0m3</h5></p>
				</li>-->
				<li id="promptBoxToday" class="color1 today">
					<h4>今日供水量</h4>
					<p><h5 id="dayFlow">0.0m3</h5></p>
				</li>
				<!--<li id="promptBoxTotal" class="color3 total" style="">
					<h4>总瞬时供水量</h4>
					<p><h5 id="allFlow">0.0m3</h5></p>
				</li> -->
				<li id="promptBoxFlowDirection" class="direction">
					<h5>动态</h5><h5>供水图</h5>
				</li>
			</ul>
		</div>
		<!-- 展示供水流向视频 -->
		<div id="flowDirection" style="display: none">
<!-- 			<video id="flowVideo" src="Video/flow.mp4" width="700" height="500" style="top:0px;" controls loop="loop"> -->
<video id="flowVideo" src="Video/flow.mp4"  style="top:0px;" controls loop="loop">
<!-- 				<source src="Video/flow.mp4" type="video/mp4" /> -->
				您的浏览器不支持播放
			</video>
		</div>

		<!-- 工具栏  -->
		<div id="toolbar" class=" container" style="width:30px;background: none;padding:0px">
				<div class="row">
					<div id="zoomIn" class="col-md-12 ">
						<div class="left_icon"></div>
						<div class="left_title"><i></i>地图放大</div>
					</div>
				</div>
				<div class="row">
					<div id="zoomOut" class="col-md-12 ">
						<div class="left_icon"></div>
						<div class="left_title"><i></i>地图缩小</div>
					</div>
				</div>
				<div id="" class="row">
					<div id="measure" class="col-md-12 ">
						<div class="left_icon"></div>
						<div class="left_title"><i></i>地图测量</div>
						<div class="row floatBox" width="86" style="width:86px;height:102px;padding:10px 10px;">
							<div class="col-md-12"  style="width:66px;height: 34px;">
								<div id="measuredistance" class="row toolBtn distance" style="height: 34px;">
									<i></i>测距
								</div>
								<div id="measurearea" class="row toolBtn space" style="height: 34px;">
									<i></i>面积
								</div>
								<div id="cleanout" class="row toolBtn rollback" style="height: 34px;">
									<i></i>还原
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="row">
					<div id="tool" class="col-md-12">
						<div class="left_icon"></div>
						<div class="left_title"><i></i>地图工具</div>
						<div class="row floatBox" width="86" style="width:86px;height:102px;padding:10px 10px;">
							<div class="col-md-12"  style="width:66px;height: 34px;">
								<div id="moveMap" class="row toolBtn hand" style="height: 34px;">
									<i></i>平移
								</div>
								<div  id="fullMap" class="row toolBtn whole" style="height: 34px;">
									<i></i>全图
								</div>
								<div id="resetMap" class="row toolBtn rollback" style="height: 34px;">
									<i></i>还原
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="row">
					<div id="baseMap" class="col-md-12 ">
						<div class="left_icon"> </div>
						<div class="left_title"><i></i>底图切换</div>
						<div class="row floatBox" width="298" style="width:298px;height:80px;padding:10px;">
							<div class="col-md-12"  >
								<div class="row" style="height:60px;width:278px;">
									<div id="normalMap" class="maplayer">
										<span>二维图</span>
									</div>
									<div  id="satellite" class="maplayer">
										<span>卫星</span>
									</div>
									<div  id="panorama" class="maplayer">
										<span>地形</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="row">
					<div id="mapLegend" class="col-md-12 ">
						<div class="left_icon"> </div>
						<div class="left_title"><i></i>地图图例</div>
						<div class="row floatBox" width="405" style="width:410px;height:455px;padding:2px;z-index: 9999;border-style:solid; border-width:1px; border-color:#cccccc;">
							<div class="col-md-12"  >
								<div class="row" style="height:450px;width:400px;">
									<img src="<%=basePath %>Images/gis/legend-TaiDa.jpg">
								</div>
							</div>
						</div>
					</div>
				</div>
				</div>
		
		<!-- 图层面板 --> 
		<div id="layerbar" >
			<button id="toggle-button" class="" data-tooltip="1"><span></span></button>
			<header class="header pad-0">
				<nav >
					<div class="toggle">
					</div>
					<ul class="tabs">
						<li class=""><a href="javascript:void(0)">图层</a></li>
						<li class="active"><a href="javascript:void(0)">专题图</a></li>
					</ul>
				</nav>
			</header>
			<article class="article tabs-content  layer nano" >
				<nav class="nano-content">
					<article class="htmleaf-container">
						<ul class="cd-accordion-menu animated">
							<c:forEach items="${gisConfigList }" var="config">
								<c:if test="${config.parentid eq '1'}">
									<li class="has-children">
										<input class="second-menu" type="checkbox" name ="group-1${config.sort }" id="group-1${config.sort }">
										<label for="group-1${config.sort }">${config.name }</label>
											<c:if test="${fn:length(config.children) gt 0}">
												<ul class="second-menu-ul" style="display:${config.remark } ">
													<c:forEach items="${config.children }" var="secondConfig">
														<li><a id="${secondConfig.code }" href="#0" class="active" layer="${secondConfig.layer }" model="${secondConfig.model }">${secondConfig.name }</a></li>
													</c:forEach>
												</ul>
											</c:if>
									</li>
								</c:if>
							</c:forEach>
							
<!-- 							<li class="has-children"> -->
<!-- 								<input class="second-menu" type="checkbox" name ="group-11" id="group-11"> -->
<!-- 								<label for="group-11">基础图层</label> -->
<!-- 					      		<ul class="second-menu-ul" style="display:none "> -->
<!-- 					      			<li><a id="baselayer" href="#0" class="active" model="layerbar/layer/baselayer">底图</a></li> -->
<!-- 					      			<li><a id="countylayer" href="#0" class="active" layer="RangeService" model="layerbar/layer/arcgissinglelayer">行政区域</a></li> -->
<!-- 					      		</ul> -->
<!-- 							</li> -->
<!-- 							<li class="has-children"> -->
<!-- 								<input class="second-menu" type="checkbox" name ="group-12" id="group-12"> -->
<!-- 								<label for="group-12">设备</label> -->
<!-- 					      		<ul class="second-menu-ul" style="display:none "> -->
<!-- 					      			<li><a id="pipelayer" href="#0" class="active" layer="PipeService" model="layerbar/layer/arcgissinglelayer">管线</a></li> -->
<!-- 					      			<li><a id="stationlayer" href="#0" class="active" model="layerbar/station/stationData">泵站</a></li> -->
<!-- 									<li><a id="monitorlayer" href="#0" class="active" model="layerbar/monitorPoint/monitorPointData">监测点</a></li> -->
<!-- 					      		</ul> -->
<!-- 							</li> -->
							
							<!-- <li class="has-children">
								<input type="checkbox" name ="group-3" id="group-3" checked>
								<label for="group-3">设备</label>
					      		<ul id="mode3">
					      			<li><a href="#0" class="active" id="RDSWMonitorPointLayer">流向</a></li>
					      			
					      		</ul>
							</li> -->
						</ul> <!-- cd-accordion-menu -->
						 
					</article>
				</nav>
			</article>
			<article class="article active tabs-content special">
				<nav>
					<article class="htmleaf-container">
						<ul class="cd-accordion-menu ">
							<c:forEach items="${gisConfigList }" var="config">
								<c:if test="${config.parentid eq '2'}">
									<li class="has-children" <c:if test="${config.name eq '实时模型' }">onclick="require(['layerbar/topic/sumlate/init'])"</c:if> >
										<input class="second-menu" type="checkbox" name ="group-2${config.sort }" id="group-2${config.sort }">
										<label for="group-2${config.sort }">${config.name }</label>
										<c:if test="${fn:length(config.children) gt 0}">
											<ul class="second-menu-ul" style="display:${config.remark };" >
												<c:forEach items="${config.children }" var="secondConfig">
													<c:choose>
														<c:when test="${fn:length(secondConfig.children) gt 0}">
															<li class="has-children">
																<input class="third-menu" type="checkbox" name ="sub-group-2${config.sort }${secondConfig.sort }" id="sub-group-2${config.sort }${secondConfig.sort }">
																<label for="sub-group-2${config.sort }${secondConfig.sort }">${secondConfig.name }</label>
																<ul class="third-menu-ul" >
																	<c:forEach items="${secondConfig.children }" var="thirdConfig">
																		<li><a id="${thirdConfig.code }" href="#0" model="${thirdConfig.model }" >${thirdConfig.name }</a></li>
																	</c:forEach>
																</ul>
															</li>
														</c:when>
														<c:otherwise>
															<li><a id="${secondConfig.code }" href="#0" model="${secondConfig.model }" >${secondConfig.name }</a></li>
														</c:otherwise>
													</c:choose>
												</c:forEach>
											</ul>
										</c:if>
									
								</c:if>
							</c:forEach>
							
<!-- 							<li class="has-children" > -->
<!-- 								<input class="second-menu" type="checkbox" name ="group-21" id="group-21"> -->
<!-- 								<label for="group-21">监测数据</label> -->
<!-- 					      		<ul class="second-menu-ul" style="display:block "> -->
<!-- 					      			<li> -->
<!-- 					      				<a id="situation" href="#0" model="layerbar/topic/situation/situation" >综合数据</a> -->
<!-- 					      			</li> -->
<!-- 									<li> -->
<!-- 										<a href="#0" id="stationdata" model="layerbar/topic/stationdata/stationdata">泵站数据</a>							 -->
<!-- 									</li> -->
<!-- 									<li> -->
<!-- 										<a href="#0" id="monitordata" model="layerbar/topic/monitordata/monitordata">测点数据</a> -->
<!-- 									</li> -->
<!-- 					      		</ul> -->
<!-- 							</li> -->
<!-- 							<li class="has-children" onclick="require(['layerbar/topic/sumlate/init'])"> -->
<!-- 								<input class="second-menu" type="checkbox" name ="group-22" id="group-22"> -->
<!-- 								<label for="group-22">实时模型</label> -->
<!-- 					      		<ul class="second-menu-ul" style="display:none "> -->
<!-- 					      			<li class="has-children"> -->
<!-- 					      				<input class="third-menu" type="checkbox" name ="sub-group-221" id="sub-group-221"> -->
<!-- 										<label for="sub-group-221">水力模型</label> -->
<!-- 										<ul class="third-menu-ul" > -->
<!-- 											<li><a id="pressureModel" href="#0" class="" model="layerbar/topic/sumlate/pressureModel" >自由水头</a></li> -->
<!-- 											<li><a id="headValueModel" href="#0" model="layerbar/topic/sumlate/headValueModel" >总水头</a></li> -->
<!-- 											<li><a id="flowModel" href="#0" model="layerbar/topic/sumlate/flowModel" >流量</a></li> -->
<!-- 											<li><a id="velocityModel" href="#0" model="layerbar/topic/sumlate/velocityModel" >流速</a></li> -->
<!-- 											<li><a id="slopeModel" href="#0" model="layerbar/topic/sumlate/slopeModel" >坡度</a></li> -->
<!-- 										</ul> -->
<!-- 					      			</li> -->
<!-- 					      			<li><a id="slModel" href="#0" model="layerbar/topic/sumlate/slModel" >水龄模型</a></li> -->
<!-- 									<li><a id="clValueModel" href="#0" model="layerbar/topic/sumlate/clValueModel">余氯模型</a></li> -->
<!-- 									<li><a id="waterAreaModel" href="#0" model="layerbar/topic/sumlate/waterAreaModel">供水分区</a></li> -->
<!-- 					      		</ul> -->
<!-- 							</li> -->
				
							<!-- <li>
								<a href="#0" id="ben" onclick="require('layerbar/iframeModel').showDialogWithIframe('http://10.10.28.14:8088/water-scada/Html/scada/rightstation.jsp','泵站数据');">泵站数据</a>							
							</li>
							<li>
								<a href="#0"  id="ce"  onclick="require('layerbar/iframeModel').showDialogWithIframe('http://10.10.28.14:8088/water-scada/Html/scada/rightmonitor.jsp','测点数据');">测点数据</a>
							</li> -->
						</ul> <!-- cd-accordion-menu -->
						 
					</article>
				</nav>
			</article>
		</div>
		
		
		
	</div>	
	<div id="win" title="" onselectstart="return false;"  data-options="iconCls:'icon-save',modal:false" style="position:relative;">
		<iframe id="winIframe"  width="100%" height="100%" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no" allowtransparency="yes" src="" style="position:absolute;top:0px;bottom:0px;left:0px;right:0px"></iframe>   
	</div>

	
		<div id="zhxx" >
<!-- 			<table id="waterorig" data-options="   -->
<!-- 				singleSelect: true, -->
<!-- 				rownumbers: true, -->
<!-- 				showFooter: false"></table> -->
<!-- 			<div id ="lineDiv" style=" BORDER-BOTTOM: 2PX SOLID #BA92F0;"></div> -->
			<table id="zhxxgrid" data-options="singleSelect: false,rownumbers: false,showFooter: false">
			</table>  
			<div id ="lineDiv" style=" BORDER-BOTTOM: 2PX SOLID #1BBC9B;"></div>
			<table id="pumpStateGrid"  
			data-options="  
				singleSelect: true,
				rownumbers: false,
				showFooter: false"
			></table>
		</div> 
<!-- 	<div id="statsChart" title="" onselectstart="return false;"  data-options="iconCls:'icon-save',modal:false" style='overflow:hidden;' >
		
	</div>  -->
	<div class="bottom" style="height:140px;position:absolute;bottom:0px;left:10%;right:10%;border-style:solid; border-width:1px; border-color:#dddddd;">
		<div class="panel-box">
			
			<div class="panel-box-container" style="top:0px;bottom:1px">
				<div class="leftChartContainer" style="margin:auto;display:table;width:100%;">
					<div id="bottomTotalChart"></div>
				</div>
			</div>
		</div>
		<div id="bottombutton" style="position:absolute;right:10px;top:5px;width:30px;height:16px;">
			<i class="glyphicon glyphicon-chevron-up"></i>
		</div>
	</div>
	
	
	
	
	<div id="detailWin" title="" onselectstart="return false;"  data-options="iconCls:'icon-save',modal:false">
		<iframe id="winIframeDetail"  width="100%" height="100%" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no" allowtransparency="yes" src=""></iframe>   
	</div>
	<div id="noHeaderWindow">
		
	</div>
	
	<div id="netModel" style="width:300px;height:500px;right:205px;display: none">
		<div class="panel-box">
			<div class="panel-box-header" style="border-bottom: 2px solid #1BBC9B;height:40px;line-height: 40px;">
				<div class="panel-box-header-title">余氯模型</div>
				<div class="panel-box-header-tool">
					<a href="javascript:void(0)" class="panel-tool-close"></a>
				</div>
			</div>
			<div class="panel-box-container">
				<!-- 时间 -->
				<div id="layerTime">
				</div>
				<!-- 百分比饼图 -->
				<div id="percent" >
				</div>
				<!-- 颜色标示 -->
				<div id="around" style="border-top:2px solid #1BBC9B;">
				</div>
				
			</div>
		</div>
	</div>

</body>

</html>