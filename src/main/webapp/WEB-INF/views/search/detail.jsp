<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<head>
<base href="<%=basePath %>" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<!-- easyui框架 -->
<link rel="stylesheet" type="text/css" href="Plugins/easyui/themes/bootstrap/easyui.css">
<link rel="stylesheet" type="text/css" href="Plugins/panel/css/panel.css">
<link rel="stylesheet" type="text/css" href="Plugins/tabs/css/tab.css">
<script type="text/javascript" data-main="Js/device/detail/index.js" src="Plugins/requireJs/require-2.1.11.js"></script>

<style type="text/css">
html {height: 100%;}
body {margin: 0; padding: 0; height: 100%;}
</style>

<title>设备详情</title>
<!--[if IE]>
	<script type="text/javascript" src="Js/common/html5.min.js"></script>
<![endif]-->
</head>
<body>
	<div class="panel-box">
		<div class="panel-box-header">
			<div class="panel-box-header-title"></div>
			<div class="panel-box-header-tool">
				<a href="javascript:void(0)" class="panel-tool-close"></a>
			</div>
		</div>
		<div class="panel-box-container">
			<article class="tabpage">
				<header>
					<ul>
						<li class="active">对象属性</li>
						<!--<li>现场图</li>-->
					</ul>
				</header>
				<section>
					<article class="active">
						<div id="attr" style="height: 100%;">
		       		
		      		 	</div> 
					</article>
					<article>
						<img src="Images/station/station.jpg" style="width: 100%; height: 100%;">
					</article>
				</section>
			</article>
		</div>
	</div>
</body>
</html>