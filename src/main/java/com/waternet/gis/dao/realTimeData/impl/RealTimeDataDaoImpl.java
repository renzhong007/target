/*  1:   */ package com.waternet.gis.dao.realTimeData.impl;
/*  2:   */ 
/*  3:   */

import com.google.gson.reflect.TypeToken;
import com.lihs.httpBase.util.convert.HttpParamConvert;
import com.lihs.httpBase.util.http.HttpConnection;
import com.waternet.gis.dao.realTimeData.RealTimeDataDao;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/*  4:   */
/*  5:   */
/*  6:   */
/*  7:   */
/*  8:   */
/*  9:   */
/* 10:   */
/* 11:   */

/* 12:   */
/* 13:   */ @Repository("realTimeDataDao")
/* 14:   */ public class RealTimeDataDaoImpl
/* 15:   */   implements RealTimeDataDao
/* 16:   */ {
/* 17:   */   @Resource(name="getRealTimeDataByIds")
/* 18:   */   private HttpConnection<Map<String, List<Map<String, Object>>>> getRealTimeDataByIds;
/* 19:   */   
/* 20:   */   public Map<String, List<Map<String, Object>>> getRealTimeData(String[] id, String[] name)
/* 21:   */   {
/* 22:29 */     Map<String, Object> paraMap = new HashMap();
/* 23:30 */     paraMap.put("id", id);
/* 24:34 */     if (name != null) {
/* 25:35 */       paraMap.put("name", name);
/* 26:   */     }
/* 27:37 */     return (Map)this.getRealTimeDataByIds.getHttpConnection(HttpParamConvert.newInstance().convertToHttpParams(paraMap), new TypeToken() {}.getType());
/* 28:   */   }
/* 29:   */ }



/* Location:           D:\apache-tomcat-7.0.72\webapps\webapps170429\water-gis\WEB-INF\classes\

 * Qualified Name:     com.waternet.gis.dao.realTimeData.impl.RealTimeDataDaoImpl

 * JD-Core Version:    0.7.0.1

 */