/*  1:   */ package com.waternet.gis.service.historyData.impl;
/*  2:   */ 
/*  3:   */

import com.lihs.httpBase.dto.ResultMap;
import com.waternet.gis.dao.historyData.HistoryDataDao;
import com.waternet.gis.service.historyData.HistoryDataService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.sql.Timestamp;
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
/* 12:   */ @Service("historyDataService")
/* 13:   */ public class HistoryDataServiceImpl
/* 14:   */   implements HistoryDataService
/* 15:   */ {
/* 16:   */   @Resource
/* 17:   */   private HistoryDataDao historyDataDao;
/* 18:   */   
/* 19:   */   public ResultMap<Map<String, List<Map<String, Object>>>> getHistoryData(String[] ids, Timestamp startTime, Timestamp endTime, String[] rtName, String timeUnit, Integer interval)
/* 20:   */   {
/* 21:29 */     ResultMap<Map<String, List<Map<String, Object>>>> rsmapMap = new ResultMap();
/* 22:   */     
/* 23:31 */     rsmapMap = this.historyDataDao.getHistoryData(ids, startTime, endTime, rtName, timeUnit, interval);
/* 24:32 */     return rsmapMap;
/* 25:   */   }
/* 26:   */ }



/* Location:           D:\apache-tomcat-7.0.72\webapps\webapps170429\water-gis\WEB-INF\classes\

 * Qualified Name:     com.waternet.gis.service.historyData.impl.HistoryDataServiceImpl

 * JD-Core Version:    0.7.0.1

 */