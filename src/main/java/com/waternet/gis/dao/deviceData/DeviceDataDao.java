package com.waternet.gis.dao.deviceData;

import com.lihs.httpBase.page.Page;

import java.util.Map;

public abstract interface DeviceDataDao
{
  public abstract Page<Map<String, Object>> listJsonByDeviceTypeConditions(int paramInt1, int paramInt2, String[] paramArrayOfString1, String[] paramArrayOfString2, String[] paramArrayOfString3, String[] paramArrayOfString4, String[] paramArrayOfString5);
}



/* Location:           D:\apache-tomcat-7.0.72\webapps\webapps170429\water-gis\WEB-INF\classes\

 * Qualified Name:     com.waternet.gis.dao.deviceData.DeviceDataDao

 * JD-Core Version:    0.7.0.1

 */