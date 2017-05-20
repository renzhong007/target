package com.waternet.gis.service.model;

import com.lihs.httpBase.page.Page;
import com.waternet.gis.pojo.LayerBean;

import java.sql.Timestamp;

public abstract interface LayerService
{
  public abstract Page<LayerBean> list(Integer paramInteger1, Integer paramInteger2, String paramString1, String paramString2, String paramString3, Timestamp paramTimestamp1, Timestamp paramTimestamp2, String paramString4)
    throws Exception;
}



/* Location:           D:\apache-tomcat-7.0.72\webapps\webapps170429\water-gis\WEB-INF\classes\

 * Qualified Name:     com.waternet.gis.service.model.LayerService

 * JD-Core Version:    0.7.0.1

 */