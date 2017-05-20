/*  1:   */ package com.waternet.gis.dao.deviceData.impl;
/*  2:   */ 
/*  3:   */

import com.google.gson.reflect.TypeToken;
import com.lihs.httpBase.page.Page;
import com.lihs.httpBase.util.convert.HttpParamConvert;
import com.lihs.httpBase.util.http.HttpConnection;
import com.waternet.gis.dao.deviceData.DeviceDataDao;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.util.HashMap;
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
/* 13:   */ @Repository("deviceDataDao")
/* 14:   */ public class DeviceDataDaoImpl
/* 15:   */   implements DeviceDataDao
/* 16:   */ {
/* 17:   */   @Resource(name="getDeviceDataByConditions")
/* 18:   */   private HttpConnection<Page<Map<String, Object>>> getDeviceDataByConditions;
/* 19:   */   
/* 20:   */   public Page<Map<String, Object>> listJsonByDeviceTypeConditions(int pageNumber, int pageSize, String[] deviceType, String[] name, String[] sign, String[] value, String[] connection)
/* 21:   */   {
/* 22:29 */     Map<String, Object> paraMap = new HashMap();
/* 23:30 */     paraMap.put("page", Integer.valueOf(pageNumber));
/* 24:31 */     paraMap.put("rows", Integer.valueOf(pageSize));
/* 25:32 */     paraMap.put("deviceType", deviceType);
/* 26:33 */     if (name != null) {
/* 27:   */       try
/* 28:   */       {
/* 29:35 */         paraMap.put("name", name);
/* 30:36 */         paraMap.put("sign", sign);
/* 31:37 */         paraMap.put("value", value);
/* 32:38 */         paraMap.put("connection", connection);
/* 33:   */       }
/* 34:   */       catch (Exception e)
/* 35:   */       {
/* 36:40 */         e.printStackTrace();
/* 37:   */       }
/* 38:   */     }
/* 39:47 */     return (Page)this.getDeviceDataByConditions.getHttpConnection(HttpParamConvert.newInstance().convertToHttpParams(paraMap), new TypeToken() {}.getType());
/* 40:   */   }
/* 41:   */ }



/* Location:           D:\apache-tomcat-7.0.72\webapps\webapps170429\water-gis\WEB-INF\classes\

 * Qualified Name:     com.waternet.gis.dao.deviceData.impl.DeviceDataDaoImpl

 * JD-Core Version:    0.7.0.1

 */