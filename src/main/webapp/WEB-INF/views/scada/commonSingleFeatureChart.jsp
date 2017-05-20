<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="wn"  tagdir="/WEB-INF/tags"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html>
<head>
<base href="<%=basePath %>" />
<title>通用单要素图表</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<!-- jquery 引用 -->
<script type="text/javascript" src="Plugins/jquery/jquery-1.10.1.js"></script>

<script type="text/javascript" src="Js/common/waterutilsOld.js"></script>
<!-- highchart -->
<script type="text/javascript" src="Plugins/chart/highcharts1.js"></script>
<script type="text/javascript" src="Js/common/chartsBaseConfig.js"></script>

<script type="text/javascript" src="Js/scada/commonSingleFeatureChart.js"></script>

</head>
<body style="overflow: hidden;" onselectstart="return false;">
	<div class="tool" style="height: 30px;">
		<span>要素</span>
		<select id="feature" onchange="drawChart()">
		</select>
	</div>
	<article style="position: absolute; top: 30px; bottom: 0; left: 0; right: 0;">
		<div id="singleChart" style="height: 100%;" style="overflow: hidden;">
		
		</div>
	</article>
</body>
</html>