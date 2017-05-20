/*  1:   */ package com.waternet.gis.controller.scada;
/*  2:   */ 
/*  3:   */

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/*  4:   */
/*  5:   */

/*  6:   */
/*  7:   */ @Controller
/*  8:   */ @RequestMapping({"scada"})
/*  9:   */ public class ScadaController
/* 10:   */ {
/* 11:   */   @RequestMapping({"rightdevice"})
/* 12:   */   public ModelAndView rightdevice()
/* 13:   */   {
/* 14:13 */     ModelAndView mView = new ModelAndView("scada/rightdevice");
/* 15:14 */     return mView;
/* 16:   */   }
/* 17:   */   
/* 18:   */   @RequestMapping({"rightfactory"})
/* 19:   */   public ModelAndView rightfactory()
/* 20:   */   {
/* 21:18 */     ModelAndView mView = new ModelAndView("scada/rightfactory");
/* 22:19 */     return mView;
/* 23:   */   }
/* 24:   */   
/* 25:   */   @RequestMapping({"rightmonitor"})
/* 26:   */   public ModelAndView rightmonitor()
/* 27:   */   {
/* 28:23 */     ModelAndView mView = new ModelAndView("scada/rightmonitor");
/* 29:24 */     return mView;
/* 30:   */   }
/* 31:   */   
/* 32:   */   @RequestMapping({"rightstation"})
/* 33:   */   public ModelAndView rightstation()
/* 34:   */   {
/* 35:28 */     ModelAndView mView = new ModelAndView("scada/rightstation");
/* 36:29 */     return mView;
/* 37:   */   }
/* 38:   */   
/* 39:   */   @RequestMapping({"commonSingleFeatureChart"})
/* 40:   */   public ModelAndView commonSingleFeatureChart()
/* 41:   */   {
/* 42:34 */     ModelAndView mView = new ModelAndView("scada/commonSingleFeatureChart");
/* 43:35 */     return mView;
/* 44:   */   }
/* 45:   */ }



/* Location:           D:\apache-tomcat-7.0.72\webapps\webapps170429\water-gis\WEB-INF\classes\

 * Qualified Name:     com.waternet.gis.controller.scada.ScadaController

 * JD-Core Version:    0.7.0.1

 */