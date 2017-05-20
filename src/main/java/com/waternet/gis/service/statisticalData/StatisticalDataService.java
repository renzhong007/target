package com.waternet.gis.service.statisticalData;

import java.sql.Timestamp;
import java.util.List;
import java.util.Map;

public abstract interface StatisticalDataService
{
  public abstract List<Map<String, Object>> getStaByIds(String[] paramArrayOfString, String paramString1, Timestamp paramTimestamp1, Timestamp paramTimestamp2, String paramString2, String paramString3);
}


/* Location:           D:\apache-tomcat-7.0.72\webapps\webapps170429\water-gis\WEB-INF\classes\
 * Qualified Name:     com.waternet.gis.service.statisticalData.StatisticalDataService
 * JD-Core Version:    0.7.0.1
 */