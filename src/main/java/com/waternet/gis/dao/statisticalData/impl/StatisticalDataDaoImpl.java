/*  1:   */ package com.waternet.gis.dao.statisticalData.impl;
/*  2:   */ 
/*  3:   */

import com.google.gson.reflect.TypeToken;
import com.lihs.httpBase.dto.ResultMap;
import com.lihs.httpBase.util.convert.HttpParamConvert;
import com.lihs.httpBase.util.http.HttpConnection;
import com.waternet.gis.dao.statisticalData.StatisticalDataDao;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.sql.Timestamp;
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
/* 13:   */

/* 14:   */
/* 15:   */ @Repository("statisticalDataDao")
/* 16:   */ public class StatisticalDataDaoImpl
/* 17:   */   implements StatisticalDataDao
/* 18:   */ {
/* 19:   */   @Resource(name="getHistoryDataByIds")
/* 20:   */   private HttpConnection<ResultMap<Map<String, List<Map<String, Object>>>>> getByIds;
/* 21:   */   
/* 22:   */   public ResultMap<Map<String, List<Map<String, Object>>>> getStaByIds(String[] id, Timestamp startTime, Timestamp endTime, String inv, String timeUnit, String feature)
/* 23:   */   {
/* 24:27 */     Map<String, Object> params = new HashMap();
/* 25:28 */     params.put("ids", id);
/* 26:29 */     params.put("startTime", startTime);
/* 27:30 */     params.put("endTime", endTime);
/* 28:31 */     params.put("interval", inv);
/* 29:32 */     params.put("timeUnit", timeUnit);
/* 30:33 */     params.put("rtName", feature);
/* 31:   */     
/* 32:   */ 
/* 33:36 */     ResultMap<Map<String, List<Map<String, Object>>>> map = (ResultMap)this.getByIds.getHttpConnection(HttpParamConvert.newInstance().convertToHttpParams(params), new TypeToken() {}.getType());
/* 34:37 */     return map;
/* 35:   */   }
/* 36:   */ }



/* Location:           D:\apache-tomcat-7.0.72\webapps\webapps170429\water-gis\WEB-INF\classes\

 * Qualified Name:     com.waternet.gis.dao.statisticalData.impl.StatisticalDataDaoImpl

 * JD-Core Version:    0.7.0.1

 */