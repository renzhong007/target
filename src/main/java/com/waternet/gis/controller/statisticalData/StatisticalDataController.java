/*  1:   */ package com.waternet.gis.controller.statisticalData;
/*  2:   */ 
/*  3:   */

import com.lihs.httpBase.dto.ResultMap;
import com.waternet.gis.service.statisticalData.StatisticalDataService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.sql.Timestamp;
import java.util.ArrayList;
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
/* 15:   */ @Controller
/* 16:   */ @RequestMapping({"Statistical"})
/* 17:   */ public class StatisticalDataController
/* 18:   */ {
/* 19:   */   @Resource
/* 20:   */   private StatisticalDataService statisticalDataService;
/* 21:   */   
/* 22:   */   @RequestMapping({"/getStaByIds"})
/* 23:   */   @ResponseBody
/* 24:   */   public Object getStaById(String[] id, String feature, Timestamp startTime, Timestamp endTime, String inv, String num, HttpServletRequest request)
/* 25:   */   {
/* 26:35 */     if (id == null) {
/* 27:36 */       id = request.getParameterValues("id[]");
/* 28:   */     }
/* 29:38 */     ResultMap<List<Map<String, Object>>> result = new ResultMap();
/* 30:   */     try
/* 31:   */     {
/* 32:41 */       List<Map<String, Object>> list = this.statisticalDataService.getStaByIds(id, feature, startTime, endTime, inv, num);
/* 33:42 */       if (list.isEmpty())
/* 34:   */       {
/* 35:43 */         result.setSuccess(false);
/* 36:44 */         result.setMessage("无数据！");
/* 37:45 */         result.setData(new ArrayList());
/* 38:   */       }
/* 39:   */       else
/* 40:   */       {
/* 41:47 */         result.setSuccess(true);
/* 42:48 */         result.setMessage("查询数据成功！");
/* 43:49 */         result.setData(list);
/* 44:   */       }
/* 45:   */     }
/* 46:   */     catch (Exception e)
/* 47:   */     {
/* 48:52 */       result.setSuccess(false);
/* 49:53 */       result.setMessage("查询数据失败！");
/* 50:54 */       result.setData(new ArrayList());
/* 51:55 */       e.printStackTrace();
/* 52:   */     }
/* 53:57 */     return result;
/* 54:   */   }
/* 55:   */ }



/* Location:           D:\apache-tomcat-7.0.72\webapps\webapps170429\water-gis\WEB-INF\classes\

 * Qualified Name:     com.waternet.gis.controller.statisticalData.StatisticalDataController

 * JD-Core Version:    0.7.0.1

 */