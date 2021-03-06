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
<title>右侧边栏泵站查询</title>
<base href="<%=basePath %>" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link rel="stylesheet" type="text/css" href="Css/common/common.css" />
<link rel="stylesheet" type="text/css" href="Css/common/icon.css" />
<link rel="stylesheet" type="text/css" href="Css/scada/rp.css" />
<link rel="stylesheet" type="text/css" href="Icon/glyphicon/glyphicon.css" />

<link rel="stylesheet" type="text/css" href="Plugins/easyui/themes/metro/easyui.css">
<script type="text/javascript" src="Plugins/jquery/jquery-1.10.1.js"></script>
<script type="text/javascript" src="Js/common/waterutilsOld.js"></script>
<script type="text/javascript" src="Plugins/easyui/jquery.easyui.min.js"></script>
<script type="text/javascript" src="Plugins/easyui/easyui-lang-zh_CN.js"></script>
<script type="text/javascript" src="Js/common/easyuiCommon.js"></script>
<script type="text/javascript" src="Js/scada/rightmonitor.js"></script>
</head>
<body style="overflow: hidden;" onselectstart="return false;">
	<div class="aside iframe">
		<div class="nav">
			<ul>
				<li class="active" target="rt"><a>实时数据</a></li>
				<li target="his"><a>历史数据</a></li>
				<li target="stat"><a>统计数据</a></li>
			</ul>
		</div>
		<div id="realtime" class="content">
			<div class="tools">
				<form id="realtimeform">
					<div>
						<label>查询类别</label>
						<select id="queryType" onchange="queryRealTime();">
						</select>
<!-- 						<button type="button" onclick="">查询</button> -->
					</div>
				</form>
			</div>
			<div id="realtimecontent" class="content">
				<table id="rtgrid"></table>
			</div>
			
		</div>
		<div id="history" class="content hide">
			<div class="tools">
				<form id="hisform">
					<div>
						<label>查询类别</label>
						<select id="queryTypeHis" style="width:80px;" onchange="changeQueryTypeHis()">
						</select>
						<label>测点</label>
						<select id="monitor" name="id" style="min-width: 160px;" >
							<option value="23">供水中心</option>
							<option value="24">岔河泵站</option>
						</select>
					</div>
					<div>
						
						<label>时间选择</label>
						<select id="histimechose">
							<option value="now">今天</option>
							<option value="yet24H">过去24小时</option>
							<option value="yet6H-now">昨天6时到现在</option>
							<option value="yet">昨天一天</option>
							<option value="todayyet">前天一天</option>
							<option value="custom">自定义时间</option>
						</select>
						<label>间隔</label>
						<select id="hisinv">
							<option value="5m">5分钟</option>
							<option value="15m">15分钟</option>
							<option value="1h">1小时</option>
						</select>
						<button type="button" onclick="queryHis();">查询</button>
					</div>
					<div class="customtime hide">
						<label>时间选择</label>
						<input class="easyui-datetimebox" name="startTime" id="hisstartTime" data-options="showSeconds:false" value="2016-05-16 00:00:00" style="width:150px">  
						<label>至</label>
						<input class="easyui-datetimebox" name="endTime" id="hisendTime" data-options="showSeconds:false" value="2016-05-17 00:00:00" style="width:150px">
					</div>
				</form>
			</div>
			<div id="hiscontent" class="content" style="top: 61px;">
				<table id="hisgrid"></table>
			</div>
			<div class="footer">
				<button id="hisButton" onclick="openHisChart();" disabled="disabled">图表</button>
			</div>
		</div>
		<div id="statistical" class="content hide">
			<div class="tools">
				<form id="statform">
					<div>
						<label>查询类型</label>
						<select id="queryTypeStat" onchange="changeQueryTypeStat();" >
						</select>
						<label>要素</label>
						<select id="feature" name="feature">
							<option value="pressure">压力值</option>
							<option value="instantFlow">流量</option>
						</select>
					</div>
					<div>
						<label>时间选择</label>
						<select id="stattimechose">
							<option value="now">今天</option>
							<option value="yet24H">过去24小时</option>
							<option value="yet6H-now">昨天6时到现在</option>
							<option value="yet">昨天一天</option>
							<option value="todayyet">前天一天</option>
							<option value="custom">自定义时间</option>
						</select>
						<label>间隔</label>
						<select id="staInv">
<!-- 							<option>原始数据</option> -->
							<option value="5-MINUTE">5分钟</option>
							<option value="15-MINUTE">15分钟</option>
							<option value="1-HOUR">1小时</option>
						</select>
						<button type="button" onclick="queryStat();">查询</button>
					</div>
					<div class="customtime hide">
						<label>时间选择</label>
						<input class="easyui-datetimebox" name="startTime" id="statstartTime" data-options="showSeconds:false" value="2016-05-16 00:00:00" style="width:150px">  
						<label>至</label>
						<input class="easyui-datetimebox" name="endTime" id="statendTime" data-options="showSeconds:false" value="2016-05-17 00:00:00" style="width:150px">
					</div>
				</form>
			</div>
			<div id="statcontent" class="content" style="top: 61px;">
				<table id="statgrid"></table>
			</div>
			<footer class="footer">
				<button id="statButton" onclick="openStaChart();" disabled="disabled">图表</button>
			</footer>
		</div>
	</div>
</body>
</html>