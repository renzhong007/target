/*  1:   */ package com.waternet.gis.dao.historyData.impl;
/*  2:   */ 
/*  3:   */

import com.google.gson.reflect.TypeToken;
import com.lihs.httpBase.dto.ResultMap;
import com.lihs.httpBase.util.convert.HttpParamConvert;
import com.lihs.httpBase.util.http.HttpConnection;
import com.waternet.gis.dao.historyData.HistoryDataDao;
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
/* 15:   */ @Repository("historyDataDao")
/* 16:   */ public class HistoryDataDaoImpl
/* 17:   */   implements HistoryDataDao
/* 18:   */ {
/* 19:   */   @Resource(name="getHistoryDataByIds")
/* 20:   */   private HttpConnection<ResultMap<Map<String, List<Map<String, Object>>>>> getHistoryDataByIds;
/* 21:   */   
/* 22:   */   public ResultMap<Map<String, List<Map<String, Object>>>> getHistoryData(String[] ids, Timestamp startTime, Timestamp endTime, String[] rtName, String timeUnit, Integer interval)
/* 23:   */   {
/* 24:30 */     Map<String, Object> paraMap = new HashMap();
/* 25:31 */     paraMap.put("ids", ids);
/* 26:32 */     paraMap.put("startTime", startTime);
/* 27:33 */     paraMap.put("endTime", endTime);
/* 28:34 */     paraMap.put("rtName", rtName);
/* 29:35 */     paraMap.put("timeUnit", timeUnit);
/* 30:36 */     paraMap.put("interval", interval);
/* 31:   */     
/* 32:38 */     return (ResultMap)this.getHistoryDataByIds.getHttpConnection(HttpParamConvert.newInstance().convertToHttpParams(paraMap), new TypeToken() {}.getType());
/* 33:   */   }
/* 34:   */ }



/* Location:           D:\apache-tomcat-7.0.72\webapps\webapps170429\water-gis\WEB-INF\classes\

 * Qualified Name:     com.waternet.gis.dao.historyData.impl.HistoryDataDaoImpl

 * JD-Core Version:    0.7.0.1

 */