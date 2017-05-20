/*  1:   */ package com.waternet.gis.util;
/*  2:   */ 
/*  3:   */ import com.fasterxml.jackson.databind.ObjectMapper;

/*  4:   */
/*  5:   */ public class JacksonMapper
/*  6:   */ {
/*  7:19 */   private static final ObjectMapper objectMapper = new ObjectMapper();
/*  8:   */   
/*  9:   */   public static ObjectMapper getInstance()
/* 10:   */   {
/* 11:32 */     return objectMapper;
/* 12:   */   }
/* 13:   */ }



/* Location:           D:\apache-tomcat-7.0.72\webapps\webapps170429\water-gis\WEB-INF\classes\

 * Qualified Name:     com.waternet.gis.util.JacksonMapper

 * JD-Core Version:    0.7.0.1

 */