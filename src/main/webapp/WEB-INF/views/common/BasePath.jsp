<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<base href="<%=basePath %>" />
<!-- 通用的css 引用 -->
<!-- <link rel="stylesheet" type="text/css" href="Css/common/iconfont/iconfont.css" /> -->
<link rel="stylesheet" type="text/css" href="Css/common/common.css" />
<!-- <link rel="stylesheet" type="text/css" href="Css/common/icon.css" /> -->
<!-- 通用js引用 -->
<!-- <script type="text/javascript" src="Js/common/waterutils.js"></script> -->

<!-- jquery 引用 -->
<!-- <script type="text/javascript" src="Plugins/jquery/jquery-1.10.1.js"></script> -->