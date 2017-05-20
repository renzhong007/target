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

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<base href="<%=basePath %>" />
<!-- 通用的css 引用 -->
<link rel="stylesheet" type="text/css" href="Css/common/common.css" />
<link rel="stylesheet" type="text/css" href="Css/common/icon.css" />
<!-- 通用js引用 -->
<!-- jquery 引用 -->
<script type="text/javascript" src="Plugins/jquery/jquery-1.10.1.js"></script>
<link rel="stylesheet" type="text/css" href="Plugins/easyui/themes/bootstrap/easyui.css">
<link rel="stylesheet" type="text/css" href="Css/common/all.css">
<link rel="stylesheet" type="text/css" href="Css/common/default.css">
<link rel="stylesheet" type="text/css" href="Css/common/layout.css">
<link rel="stylesheet" type="text/css" href="Css/menu/menu.css" />
<script type="text/javascript" src="Plugins/easyui/jquery.min.js"></script>
<script type="text/javascript" src="Plugins/easyui/jquery.easyui.min.js"></script>
<script type="text/javascript" src="Js/common/commonWin.js"></script>

<script type="text/javascript" src="Js/common/waterutilsWarn.js"></script>
<script type="text/javascript" src="Plugins/easyui/commonWarn.js"></script>
<script type="text/javascript" src="Plugins/easyui/common.js"></script>
<script type="text/javascript" src="../water-warn/Js/warningInfor/warnInfor.js"></script>
<link rel="stylesheet" type="text/css" href="../water-warn/Css/dyulcss/dyul.css">
<!--  <script type="text/javascript" src="Js/menu/menu-new.js"></script>-->
<script type="text/javascript" src="Js/menu/menu-new.js"></script>



<title>GIS一体化平台</title>
</head>
<body class="easyui-layout" >
	<c:set var="classify" value="classify=${fn:split(param.classify,';')[0]}"></c:set>
	<c:if test="${classify=='classify='||classify=='' }">
		<c:set var="classify" value="classify=1"></c:set>
	</c:if>
	<c:set var="contextPath" value="${pageContext.request.contextPath}"></c:set>
	<div id="mainNorth" data-options="region:'north',split:false,border:false" style="height:50px;" >
		<div id="Top">
		  <!-- <div class="user">
		  </div> -->
		  <div class="Toolbar1">
		    <div class="CentreBox">
		     	<img alt="" src="Images/common/title.png"> 
		     	<div class="UserInfo">
		     		<!-- <div class="prompt" >
		     			<img src="Images/menu/Mail.png"  width="35" height="25" style="margin:0px 10px;">
		     			<div class="message">3</div>
		     			<img class="triangle_top" src="Images/menu/triangle_top.png"/>
		     			<div class="dropdown-menu">
		     				<h5>提示信息</h5>
		     			</div>
		     		</div> -->
		     		<div class="prompt toggle"  >
		     			<img class="toggle" src="Images/menu/Bell.png"  width="25" height="25" style="margin:0px 10px;">
		     			<div class="message toggle" id="message1"></div>
		     			<img class="triangle_top" src="Images/menu/triangle_top.png"/>
		     			<div class="dropdown-menu" id="prompt">
		     				<h5>告警信息</h5>
		     				 <ul class="dropdown-list" >		
		     				</ul> 
						</div>
		     		</div>
		       		<a href="#" style="text-decoration: underline;">
		       			<img src="Images/menu/People.png" class="" width="26" height="26" style="margin:0px 0px 0px 10px;">
		       			<span>${userBean.name }</span>
		       		</a>
		       		<a href="javascript:void(0)" class="log-out waves-effect waves-button waves-classic">
		                 <a href="http://110.18.60.194:10865/cas/logout?service=http://110.18.60.194:10847/water-center/"><img src="Images/menu/logout.png" class="logout"></a>
		            </a>
		     	 </div>
		     	 <div class="systemInfo">
		     	 	
		     		<c:forEach items="${functionMenuList}" var="functionMenu">
		     			<c:forEach items="${functionMenu.children}" var="functionMenu">
		     				<c:if test="${classify!='classify='&&fn:contains(functionMenu.url,classify)}">
		   						<c:forEach items="${functionMenu.children}" var="functionMenu">
		   							<c:if test="${functionMenu.name!='APP下载'&&functionMenu.name!='智慧水务大平台'}">
			   							<div <c:if test="${fn:contains(functionMenu.url,contextPath)}">class="checked"</c:if> >
			   								<a href="${functionMenu.url}" <c:if test="${functionMenu.url eq 'javascript:void(0);'}">style="color:#ccc;"</c:if>>${functionMenu.name}</a>
			   							</div>
		   							</c:if>
		   						</c:forEach>
		   					</c:if>
		   					<c:if test="${functionMenu.name=='智慧水务大平台'}">
	   							<div >
	   								<a href="${functionMenu.url}">首页</a>
	   							</div>
   							</c:if>
	   					</c:forEach>
   					</c:forEach>
		     	</div>
		    </div>
		  </div>
		</div>
	</div>
 
	<div id="mainCenter" data-options="region:'center',border:false" style="overflow:hidden"  >
    		<iframe id="main" name="main" frameborder="0"  src="gis" style="width:100%;height:100%;"></iframe>
   	</div>
    	
	       
	</div>
	<div id="win" class="easyui-window" title="添加设备" onselectstart="return false;"  data-options="iconCls:'icon-save',modal:true,closed:true">
		<iframe id="winIframe"  width="100%" height="100%" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no" allowtransparency="yes"></iframe>   
	</div>  
</body>
	
</html>'