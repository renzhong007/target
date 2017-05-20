//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package com.waternet.gis.service.statisticalData.impl;

import com.lihs.httpBase.dto.ResultMap;
import com.waternet.gis.dao.statisticalData.StatisticalDataDao;
import com.waternet.gis.service.statisticalData.StatisticalDataService;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import javax.annotation.Resource;
import org.springframework.stereotype.Service;

@Service("statisticalDataService")
public class StatisticalDataServiceImpl implements StatisticalDataService {
    @Resource
    private StatisticalDataDao statisticalDataDao;

    public StatisticalDataServiceImpl() {
    }

    public List<Map<String, Object>> getStaByIds(String[] id, String feature, Timestamp startTime, Timestamp endTime, String inv, String num) {
        ResultMap rsMap = this.statisticalDataDao.getStaByIds(id, startTime, endTime, num, inv, feature);
        HashMap timeMap = new HashMap();
        ArrayList result = new ArrayList();
        if(rsMap.isSuccess()) {
            Map tempmap = (Map)rsMap.getData();
            Iterator var12 = tempmap.keySet().iterator();

            while(var12.hasNext()) {
                String tempid = (String)var12.next();
                List hisList = (List)tempmap.get(tempid);

                for(Integer i = Integer.valueOf(0); i.intValue() < hisList.size(); i = Integer.valueOf(i.intValue() + 1)) {
                    Map hisdata = (Map)hisList.get(i.intValue());
                    String time = hisdata.get("startTime").toString();
                    Object singleData = null;
                    if(timeMap.containsKey(time)) {
                        singleData = (Map)timeMap.get(time);
                    } else {
                        singleData = new HashMap();
                        timeMap.put(time, singleData);
                        result.add(singleData);
                    }

                    ((Map)singleData).put("startTime", time);
                    if(hisdata.containsKey(feature)) {
                        ((Map)singleData).put(tempid, hisdata.get(feature));
                    } else {
                        ((Map)singleData).put(tempid, (Object)null);
                    }
                }
            }
        }

        return result;
    }
}
