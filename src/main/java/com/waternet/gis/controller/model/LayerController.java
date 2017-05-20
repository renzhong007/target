/*  1:   */ package com.waternet.gis.controller.model;
/*  2:   */ 
/*  3:   */

import com.lihs.httpBase.page.Page;
import com.waternet.gis.pojo.LayerBean;
import com.waternet.gis.service.model.LayerService;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.sql.Timestamp;

/*  4:   */
/*  5:   */
/*  6:   */
/*  7:   */
/*  8:   */
/*  9:   */
/* 10:   */
/* 11:   */
/* 12:   */

/* 13:   */
/* 14:   */ @Controller
/* 15:   */ @RequestMapping({"layer"})
/* 16:   */ public class LayerController
/* 17:   */ {
/* 18:21 */   private Logger logger = Logger.getLogger(LayerController.class);
/* 19:   */   @Resource
/* 20:   */   private LayerService layerService;
/* 21:   */   
/* 22:   */   @RequestMapping({"list"})
/* 23:   */   @ResponseBody
/* 24:   */   public Page<LayerBean> list(@RequestParam(value="page", defaultValue="1") int pageNumber, @RequestParam(value="rows", defaultValue="15") int pageSize, String type, String level, String query, Timestamp startTime, Timestamp endTime, String status)
/* 25:   */     throws Exception
/* 26:   */   {
/* 27:32 */     return this.layerService.list(Integer.valueOf(pageNumber), Integer.valueOf(pageSize), type, level, query, startTime, endTime, status);
/* 28:   */   }
/* 29:   */ }



/* Location:           D:\apache-tomcat-7.0.72\webapps\webapps170429\water-gis\WEB-INF\classes\

 * Qualified Name:     com.waternet.gis.controller.model.LayerController

 * JD-Core Version:    0.7.0.1

 */