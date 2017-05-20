package com.waternet.gis.dao.model;

import com.lihs.httpBase.page.Page;
import com.waternet.gis.pojo.LayerBean;

public abstract interface LayerDao
{
  public abstract Page<LayerBean> listLayer(Page<LayerBean> paramPage)
    throws Exception;
}


/* Location:           D:\apache-tomcat-7.0.72\webapps\webapps170429\water-gis\WEB-INF\classes\
 * Qualified Name:     com.waternet.gis.dao.model.LayerDao
 * JD-Core Version:    0.7.0.1
 */