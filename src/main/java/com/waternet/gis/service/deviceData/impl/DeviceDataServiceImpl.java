/*  1:   */ package com.waternet.gis.service.deviceData.impl;
/*  2:   */ 
/*  3:   */

import com.lihs.httpBase.page.Page;
import com.waternet.gis.dao.deviceData.DeviceDataDao;
import com.waternet.gis.service.deviceData.DeviceDataService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Map;

/*  4:   */
/*  5:   */
/*  6:   */
/*  7:   */
/*  8:   */

/*  9:   */
/* 10:   */ @Service("deviceDataService")
/* 11:   */ public class DeviceDataServiceImpl
/* 12:   */   implements DeviceDataService
/* 13:   */ {
/* 14:   */   @Resource
/* 15:   */   private DeviceDataDao deviceDataDao;
/* 16:   */   
/* 17:   */   public Page<Map<String, Object>> listJsonByDeviceTypeConditions(int pageNumber, int pageSize, String[] deviceType, String[] name, String[] sign, String[] value, String[] connection)
/* 18:   */   {
/* 19:24 */     return this.deviceDataDao.listJsonByDeviceTypeConditions(pageNumber, pageSize, deviceType, name, sign, value, connection);
/* 20:   */   }
/* 21:   */ }



/* Location:           D:\apache-tomcat-7.0.72\webapps\webapps170429\water-gis\WEB-INF\classes\

 * Qualified Name:     com.waternet.gis.service.deviceData.impl.DeviceDataServiceImpl

 * JD-Core Version:    0.7.0.1

 */