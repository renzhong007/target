/*  1:   */ package com.waternet.gis.interceptors;
/*  2:   */ 
/*  3:   */ import com.lihs.httpBase.interceptors.HttpConnectionFilter;

/*  4:   */
/*  5:   */ public class HttpConnectionAddSystemNameFilter
/*  6:   */   implements HttpConnectionFilter
/*  7:   */ {
/*  8:   */   public String doParamFilter(String param)
/*  9:   */   {
/* 10:18 */     param = param + "&systemName=water-gis";
/* 11:19 */     return param;
/* 12:   */   }
/* 13:   */ }



/* Location:           D:\apache-tomcat-7.0.72\webapps\webapps170429\water-gis\WEB-INF\classes\

 * Qualified Name:     com.waternet.gis.interceptors.HttpConnectionAddSystemNameFilter

 * JD-Core Version:    0.7.0.1

 */