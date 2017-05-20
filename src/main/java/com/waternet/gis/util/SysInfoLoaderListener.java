/*  1:   */ package com.waternet.gis.util;
/*  2:   */ 
/*  3:   */

import com.lihs.httpBase.service.BaseService;
import org.springframework.web.context.ContextLoader;
import org.springframework.web.context.ContextLoaderListener;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import javax.servlet.ServletContextEvent;

/*  4:   */
/*  5:   */
/*  6:   */
/*  7:   */
/*  8:   */
/*  9:   */

/* 10:   */
/* 11:   */ public class SysInfoLoaderListener
/* 12:   */   extends ContextLoaderListener
/* 13:   */ {
/* 14:   */   public void contextDestroyed(ServletContextEvent event)
/* 15:   */   {
/* 16:17 */     super.contextDestroyed(event);
/* 17:   */   }
/* 18:   */   
/* 19:   */   public void contextInitialized(ServletContextEvent event)
/* 20:   */   {
/* 21:23 */     super.contextInitialized(event);
/* 22:24 */     System.out.println("spring加载完毕,开始加载select框集合");
/* 23:   */     try
/* 24:   */     {
/* 25:26 */       WebApplicationContext wac = WebApplicationContextUtils.getWebApplicationContext(event.getServletContext());
/* 26:27 */       BaseService baseService = (BaseService)wac.getBean("baseService");
/* 27:28 */       baseService.init();
/* 28:29 */       System.out.println("加载select框集合完毕");
/* 29:   */     }
/* 30:   */     catch (Exception e)
/* 31:   */     {
/* 32:31 */       e.printStackTrace();
/* 33:   */     }
/* 34:   */   }
/* 35:   */   
/* 36:   */   @Deprecated
/* 37:   */   protected ContextLoader createContextLoader()
/* 38:   */   {
/* 39:39 */     return super.createContextLoader();
/* 40:   */   }
/* 41:   */   
/* 42:   */   @Deprecated
/* 43:   */   public ContextLoader getContextLoader()
/* 44:   */   {
/* 45:46 */     return super.getContextLoader();
/* 46:   */   }
/* 47:   */ }



/* Location:           D:\apache-tomcat-7.0.72\webapps\webapps170429\water-gis\WEB-INF\classes\

 * Qualified Name:     com.waternet.gis.util.SysInfoLoaderListener

 * JD-Core Version:    0.7.0.1

 */