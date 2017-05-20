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

<script type="text/javascript" src="Plugins/jquery/jquery-1.10.1.js"></script>
<!-- easyui框架 -->
<link rel="stylesheet" type="text/css" href="Plugins/easyui/themes/bootstrap/easyui.css">
<link rel="stylesheet" type="text/css" href="Plugins/panel/css/panel.css">
<link rel="stylesheet" type="text/css" href="Plugins/tabs/css/tab.css">
<link rel="stylesheet" type="text/css" href="Css/common/waterTabBtn.css">

<script type="text/javascript" data-main="Js/monitorPoint/detail/index.js" src="Plugins/requireJs/require-2.1.11.js"></script>
<style type="text/css">
html {height: 100%;}
body {margin: 0; padding: 0; height: 100%;}
.commonQueryParamsPenel {}
#curveTab {height: 30px;}
</style>

<title>监测点详情</title>
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
						<li class="">历史数据</li>
						<li>曲线</li>
						<!--<li class="">告警</li>-->
					</ul>
				</header>
				<section>
					<article class="active">
						<div id="attr" style="height: 100%;width:100%">
		       		
		      		 	</div> 
					</article>
					<!--<article class="">
						<div id="pic" style="height: 100%;width:100%">
		       		
		      		 	</div> 
					</article>-->
					<article class="">
						<div class="commonQueryParamsPenel" style="display: none;">
							<span>开始时间</span>：
							<input id="qpStartTime" style="width:155px;">
							<span>结束时间</span>：
							<input id="qpEndTime" style="width:155px;">
							<button class="qpbtn" style="width:60px;">查询</button>
						</div>
						<div id="historyGrid" style="width:100%">
		       		
		      		 	</div> 
					</article>
					<article class="">
						<div id="curveTab" style="width:100%">
		       		
		      		 	</div> 
		      		 	<div id="curve" style="height:83%;width:100%">
		        	
		        		</div>
					</article>
					<!--<article class="">
						<div id="warn" style="height: 100%;">
		       		
		      		 	</div> 
					</article>-->
				</section>
			</article>
		</div>
	</div>










	<!-- <div id="win"  style="width:100%;height:100%;" > 
		<div id="tt" >   
		    <div title="对象属性" style="height: 100%;">   
		       	<div id="attr" style="height: 100%;">
		       		
		       	</div> 
		    </div>   
		    <div title="现场图" >   
		        <div id="pic">
		        	
		        </div> 
		    </div>
		    <div title="历史数据" >   
		        <div id="history" style="height: 100%;">
		        	<div class="commonQueryParamsPenel" style="display: none;">
						<span>开始时间</span>：
						<input id="qpStartTime" style="width:155px;">
						<span>结束时间</span>：
						<input id="qpEndTime" style="width:155px;">
						<button class="qpbtn" style="width:60px;">查询</button>
					</div>
					<div id="historyGrid" style="height: 100%;">
					</div>
		        </div> 
		        
		    </div> 
		    <div title="曲线" >
		    	<div id="curveTab">
		    		
		    	</div>
		        <div id="curve" style="height:95%">
		        	
		        </div>
		    </div>   
		    <div title="告警" >   
		        <div id="warn">
		        	
		        </div>
		    </div> 
		</div> 
	</div>
	 -->
</body>
</html>