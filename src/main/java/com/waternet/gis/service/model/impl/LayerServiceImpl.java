/*  1:   */ package com.waternet.gis.service.model.impl;
/*  2:   */ 
/*  3:   */

import com.lihs.httpBase.page.Page;
import com.waternet.gis.dao.model.LayerDao;
import com.waternet.gis.pojo.LayerBean;
import com.waternet.gis.service.model.LayerService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.HashMap;

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

/* 14:   */
/* 15:   */ @Service
/* 16:   */ public class LayerServiceImpl
/* 17:   */   implements LayerService
/* 18:   */ {
/* 19:   */   @Resource
/* 20:   */   private LayerDao layerDao;
/* 21:   */   
/* 22:   */   public Page<LayerBean> list(Integer pageNumber, Integer pageSize, String type, String level, String query, Timestamp startTime, Timestamp endTime, String status)
/* 23:   */     throws Exception
/* 24:   */   {
/* 25:26 */     DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
/* 26:27 */     Page<LayerBean> page = new Page();
/* 27:28 */     page.setPageNumber(pageNumber.intValue());
/* 28:29 */     page.setPageSize(pageSize.intValue());
/* 29:30 */     page.setParams(new HashMap());
/* 30:31 */     if ((type != null) && (!"".equals(query))) {
/* 31:32 */       page.getParams().put("type", type);
/* 32:   */     }
/* 33:35 */     if ((level != null) && (!"".equals(query))) {
/* 34:36 */       page.getParams().put("level", level);
/* 35:   */     }
/* 36:39 */     if ((query != null) && (!"".equals(query))) {
/* 37:40 */       page.getParams().put("query", query);
/* 38:   */     }
/* 39:43 */     if ((startTime != null) && (endTime != null))
/* 40:   */     {
/* 41:44 */       page.getParams().put("startTime", df.format(startTime));
/* 42:45 */       page.getParams().put("endTime", df.format(endTime));
/* 43:   */     }
/* 44:48 */     if ((status != null) && (!"".equals(query))) {
/* 45:49 */       page.getParams().put("status", status);
/* 46:   */     }
/* 47:52 */     return this.layerDao.listLayer(page);
/* 48:   */   }
/* 49:   */ }



/* Location:           D:\apache-tomcat-7.0.72\webapps\webapps170429\water-gis\WEB-INF\classes\

 * Qualified Name:     com.waternet.gis.service.model.impl.LayerServiceImpl

 * JD-Core Version:    0.7.0.1

 */