/*  1:   */ package com.waternet.gis.controller.deviceData;
/*  2:   */ 
/*  3:   */

import com.lihs.httpBase.page.Page;
import com.waternet.gis.service.deviceData.DeviceDataService;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
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
/* 14:   */ @RequestMapping({"deviceData"})
/* 15:   */ public class DeviceDataController
/* 16:   */ {
/* 17:24 */   private Logger logger = Logger.getLogger(DeviceDataController.class);
/* 18:   */   @Resource
/* 19:   */   private DeviceDataService deviceDataService;
/* 20:   */   
/* 21:   */   @RequestMapping({"getDeviceByConditions"})
/* 22:   */   @ResponseBody
/* 23:   */   public Object listJsonByDeviceTypeConditions(@RequestParam(value="page", defaultValue="1") int pageNumber, @RequestParam(value="rows", defaultValue="15") int pageSize, String[] deviceType, String[] name, String[] sign, String[] value, String[] connection)
/* 24:   */   {
/* 25:50 */     Page<Map<String, Object>> page = new Page();
/* 26:   */     try
/* 27:   */     {
/* 28:54 */       return this.deviceDataService.listJsonByDeviceTypeConditions(pageNumber, pageSize, deviceType, name, sign, value, connection);
/* 29:   */     }
/* 30:   */     catch (Exception e)
/* 31:   */     {
/* 32:57 */       e.printStackTrace();
/* 33:   */     }
/* 34:59 */     return page;
/* 35:   */   }
/* 36:   */ }



/* Location:           D:\apache-tomcat-7.0.72\webapps\webapps170429\water-gis\WEB-INF\classes\

 * Qualified Name:     com.waternet.gis.controller.deviceData.DeviceDataController

 * JD-Core Version:    0.7.0.1

 */