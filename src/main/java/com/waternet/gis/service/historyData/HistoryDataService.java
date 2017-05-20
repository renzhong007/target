package com.waternet.gis.service.historyData;

import com.lihs.httpBase.dto.ResultMap;

import java.sql.Timestamp;
import java.util.List;
import java.util.Map;

public abstract interface HistoryDataService
{
  public abstract ResultMap<Map<String, List<Map<String, Object>>>> getHistoryData(String[] paramArrayOfString1, Timestamp paramTimestamp1, Timestamp paramTimestamp2, String[] paramArrayOfString2, String paramString, Integer paramInteger);
}



/* Location:           D:\apache-tomcat-7.0.72\webapps\webapps170429\water-gis\WEB-INF\classes\

 * Qualified Name:     com.waternet.gis.service.historyData.HistoryDataService

 * JD-Core Version:    0.7.0.1

 */