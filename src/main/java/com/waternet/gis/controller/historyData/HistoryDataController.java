/*  1:   */ package com.waternet.gis.controller.historyData;
/*  2:   */ 
/*  3:   */

import com.lihs.httpBase.dto.ResultMap;
import com.waternet.gis.service.historyData.HistoryDataService;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

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
/* 12:   */

/* 13:   */
/* 14:   */ @Controller
/* 15:   */ @RequestMapping({"historyData"})
/* 16:   */ public class HistoryDataController
/* 17:   */ {
/* 18:25 */   private Logger logger = Logger.getLogger(HistoryDataController.class);
/* 19:   */   @Resource
/* 20:   */   private HistoryDataService historyDataService;
/* 21:   */   
/* 22:   */   @RequestMapping({"getHistoryDataByIds"})
/* 23:   */   @ResponseBody
/* 24:   */   private ResultMap<Map<String, List<Map<String, Object>>>> getHistoryData(String[] ids, Timestamp startTime, Timestamp endTime, String[] rtName, String timeUnit, Integer interval)
/* 25:   */     throws Exception
/* 26:   */   {
/* 27:50 */     ResultMap<Map<String, List<Map<String, Object>>>> rsmapMap = new ResultMap();
/* 28:   */     
/* 29:52 */     rsmapMap = this.historyDataService.getHistoryData(ids, startTime, endTime, rtName, timeUnit, interval);
/* 30:53 */     return rsmapMap;
/* 31:   */   }
/* 32:   */ }



/* Location:           D:\apache-tomcat-7.0.72\webapps\webapps170429\water-gis\WEB-INF\classes\

 * Qualified Name:     com.waternet.gis.controller.historyData.HistoryDataController

 * JD-Core Version:    0.7.0.1

 */