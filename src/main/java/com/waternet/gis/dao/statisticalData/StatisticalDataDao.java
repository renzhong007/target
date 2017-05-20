package com.waternet.gis.dao.statisticalData;

import com.lihs.httpBase.dto.ResultMap;

import java.sql.Timestamp;
import java.util.List;
import java.util.Map;

public abstract interface StatisticalDataDao
{
  public abstract ResultMap<Map<String, List<Map<String, Object>>>> getStaByIds(String[] paramArrayOfString, Timestamp paramTimestamp1, Timestamp paramTimestamp2, String paramString1, String paramString2, String paramString3);
}



/* Location:           D:\apache-tomcat-7.0.72\webapps\webapps170429\water-gis\WEB-INF\classes\

 * Qualified Name:     com.waternet.gis.dao.statisticalData.StatisticalDataDao

 * JD-Core Version:    0.7.0.1

 */