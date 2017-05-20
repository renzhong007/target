package com.waternet.gis.dao.realTimeData;

import java.util.List;
import java.util.Map;

public abstract interface RealTimeDataDao
{
  public abstract Map<String, List<Map<String, Object>>> getRealTimeData(String[] paramArrayOfString1, String[] paramArrayOfString2);
}


/* Location:           D:\apache-tomcat-7.0.72\webapps\webapps170429\water-gis\WEB-INF\classes\
 * Qualified Name:     com.waternet.gis.dao.realTimeData.RealTimeDataDao
 * JD-Core Version:    0.7.0.1
 */