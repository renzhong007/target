/*  1:   */ package com.waternet.gis.dao.model.impl;
/*  2:   */ 
/*  3:   */

import com.google.gson.reflect.TypeToken;
import com.lihs.httpBase.dto.ResultMap;
import com.lihs.httpBase.page.Page;
import com.lihs.httpBase.util.convert.HttpParamConvert;
import com.lihs.httpBase.util.http.HttpConnection;
import com.waternet.gis.dao.model.LayerDao;
import com.waternet.gis.pojo.LayerBean;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;

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
/* 14:   */ @Repository
/* 15:   */ public class LayerDaoImpl
/* 16:   */   implements LayerDao
/* 17:   */ {
/* 18:18 */   Logger logger = Logger.getLogger(LayerDaoImpl.class);
/* 19:   */   @Resource(name="listLayer")
/* 20:   */   private HttpConnection<ResultMap<Page<LayerBean>>> listLayer;
/* 21:   */   
/* 22:   */   public Page<LayerBean> listLayer(Page<LayerBean> page)
/* 23:   */     throws Exception
/* 24:   */   {
/* 25:31 */     ResultMap<Page<LayerBean>> eventlist = (ResultMap)this.listLayer.getHttpConnection(HttpParamConvert.newInstance().convertToHttpParams(page), new TypeToken() {}.getType());
/* 26:32 */     if (eventlist.isSuccess()) {
/* 27:33 */       return (Page)eventlist.getData();
/* 28:   */     }
/* 29:35 */     return new Page();
/* 30:   */   }
/* 31:   */ }



/* Location:           D:\apache-tomcat-7.0.72\webapps\webapps170429\water-gis\WEB-INF\classes\

 * Qualified Name:     com.waternet.gis.dao.model.impl.LayerDaoImpl

 * JD-Core Version:    0.7.0.1

 */