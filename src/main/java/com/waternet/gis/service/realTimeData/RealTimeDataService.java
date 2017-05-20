package com.waternet.gis.service.realTimeData;

import java.util.List;
import java.util.Map;

public abstract interface RealTimeDataService
{
  public abstract List<Map<String, Object>> getRealTimeData(String[] paramArrayOfString1, String[] paramArrayOfString2, String[] paramArrayOfString3)
    throws Exception;
  
  public abstract List<Map<String, Object>> getRealTimeByCid(String paramString, String[] paramArrayOfString1, String[] paramArrayOfString2)
    throws Exception;
  
  public abstract List<Map<String, Object>> getRealTimeStationPumpState(String paramString, String[] paramArrayOfString1, String[] paramArrayOfString2)
    throws Exception;
}


/* Location:           D:\apache-tomcat-7.0.72\webapps\webapps170429\water-gis\WEB-INF\classes\
 * Qualified Name:     com.waternet.gis.service.realTimeData.RealTimeDataService
 * JD-Core Version:    0.7.0.1
 */