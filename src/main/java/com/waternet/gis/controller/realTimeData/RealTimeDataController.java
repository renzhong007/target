/*  1:   */ package com.waternet.gis.controller.realTimeData;
/*  2:   */ 
/*  3:   */

import com.lihs.httpBase.dto.ResultMap;
import com.waternet.gis.service.realTimeData.RealTimeDataService;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
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
/* 13:   */ @Controller
/* 14:   */ @RequestMapping({"realTimeData"})
/* 15:   */ public class RealTimeDataController
/* 16:   */ {
/* 17:28 */   private Logger logger = Logger.getLogger(RealTimeDataController.class);
/* 18:   */   @Resource
/* 19:   */   private RealTimeDataService realTimeDataService;
/* 20:   */   
/* 21:   */   @RequestMapping({"getByIds"})
/* 22:   */   @ResponseBody
/* 23:   */   private ResultMap<List<Map<String, Object>>> getRealTime(String[] id, String[] rtName, String[] staticName)
/* 24:   */     throws Exception
/* 25:   */   {
/* 26:44 */     ResultMap<List<Map<String, Object>>> rsmapMap = new ResultMap();
/* 27:45 */     rsmapMap.setSuccess(true);
/* 28:46 */     rsmapMap.setMessage("");
/* 29:47 */     rsmapMap.setData(this.realTimeDataService.getRealTimeData(id, rtName, staticName));
/* 30:48 */     return rsmapMap;
/* 31:   */   }
/* 32:   */   
/* 33:   */   @RequestMapping({"getByCid"})
/* 34:   */   @ResponseBody
/* 35:   */   private ResultMap<List<Map<String, Object>>> getRealTimeByCid(String cid, String[] rtName, String[] staticName)
/* 36:   */     throws Exception
/* 37:   */   {
/* 38:65 */     ResultMap<List<Map<String, Object>>> rsmapMap = new ResultMap();
/* 39:   */     
/* 40:   */ 
/* 41:   */ 
/* 42:   */ 
/* 43:70 */     rsmapMap.setSuccess(true);
/* 44:71 */     rsmapMap.setMessage("");
/* 45:72 */     rsmapMap.setData(this.realTimeDataService.getRealTimeByCid(cid, rtName, staticName));
/* 46:73 */     return rsmapMap;
/* 47:   */   }
/* 48:   */   
/* 49:   */   @RequestMapping({"getStationPumpState"})
/* 50:   */   @ResponseBody
/* 51:   */   private ResultMap<List<Map<String, Object>>> getRealTimeStationPumpState(String cid, String[] rtName, String[] staticName)
/* 52:   */     throws Exception
/* 53:   */   {
/* 54:87 */     ResultMap<List<Map<String, Object>>> rsmapMap = new ResultMap();
/* 55:88 */     rsmapMap.setSuccess(true);
/* 56:89 */     rsmapMap.setMessage("");
/* 57:90 */     rsmapMap.setData(this.realTimeDataService.getRealTimeStationPumpState(cid, rtName, staticName));
/* 58:91 */     return rsmapMap;
/* 59:   */   }
/* 60:   */ }



/* Location:           D:\apache-tomcat-7.0.72\webapps\webapps170429\water-gis\WEB-INF\classes\

 * Qualified Name:     com.waternet.gis.controller.realTimeData.RealTimeDataController

 * JD-Core Version:    0.7.0.1

 */