//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package com.waternet.gis.service.realTimeData.impl;

import com.lihs.httpBase.page.Page;
import com.waternet.dao.device.AttributesDao;
import com.waternet.gis.dao.realTimeData.RealTimeDataDao;
import com.waternet.gis.service.deviceData.DeviceDataService;
import com.waternet.gis.service.realTimeData.RealTimeDataService;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import javax.annotation.Resource;
import org.springframework.stereotype.Service;

@Service("realTimeDataService")
public class RealTimeDataServiceImpl implements RealTimeDataService {
    @Resource
    private RealTimeDataDao realTimeDataDao;
    @Resource
    private DeviceDataService deviceDataService;
    @Resource
    private AttributesDao attrDao;

    public RealTimeDataServiceImpl() {
    }

    public List<Map<String, Object>> getRealTimeData(String[] id, String[] rtName, String[] staticName) throws Exception {
        Map map = this.realTimeDataDao.getRealTimeData(id, rtName);
        HashMap params = new HashMap();
        params.put("id", id);
        if(staticName != null) {
            params.put("name", staticName);
        }

        List attrlist = this.attrDao.getAttrByCondition(params);
        ArrayList resultList = new ArrayList();

        for(int i = 0; i < id.length; ++i) {
            HashMap obj = new HashMap();
            obj.put("id", id[i]);
            Map rtdmap;
            if(attrlist != null && attrlist.size() > 0) {
                for(int rtdList = 0; rtdList < attrlist.size(); ++rtdList) {
                    rtdmap = (Map)attrlist.get(rtdList);
                    rtdmap.put("id", this.toInter(rtdmap.get("id").toString()));
                    if(rtdmap.get("id").equals(id[i])) {
                        Iterator name1 = rtdmap.keySet().iterator();

                        while(name1.hasNext()) {
                            String name = (String)name1.next();
                            if(rtdmap.get(name) != null && !name.equals("id")) {
                                obj.put(name, rtdmap.get(name));
                            }
                        }
                    }
                }
            }

            if(map != null && map.size() > 0 && map.containsKey(obj.get("id"))) {
                List var17 = (List)map.get(obj.get("id").toString());
                Iterator var18 = var17.iterator();

                label92:
                while(var18.hasNext()) {
                    rtdmap = (Map)var18.next();
                    Iterator var14 = rtdmap.keySet().iterator();

                    while(true) {
                        while(true) {
                            String var19;
                            do {
                                do {
                                    if(!var14.hasNext()) {
                                        continue label92;
                                    }

                                    var19 = (String)var14.next();
                                } while(rtdmap.get(var19) == null);
                            } while(var19.equals("id"));

                            String attrValue = rtdmap.get(var19).toString();
                            if(!var19.equals("startTime") && !var19.equals("endTime") && !var19.equals("name") && !var19.equals("address") && !var19.equals("section")) {
                                BigDecimal db = new BigDecimal(attrValue);
                                obj.put(var19, db.toPlainString());
                            } else {
                                obj.put(var19, attrValue);
                            }
                        }
                    }
                }
            }

            resultList.add(obj);
        }

        return resultList;
    }

    private String toInter(String id) {
        return String.valueOf(Double.valueOf(id).intValue());
    }

    public List<Map<String, Object>> getRealTimeByCid(String cid, String[] rtName, String[] staticName) throws Exception {
        String[] deviceType = new String[]{cid};
        new Page();
        Page page = this.deviceDataService.listJsonByDeviceTypeConditions(1, 1000, deviceType, (String[])null, (String[])null, (String[])null, (String[])null);
        String[] id = new String[page.getRows().size()];

        for(int i = 0; i < page.getRows().size(); ++i) {
            id[i] = this.toInter(((Map)page.getRows().get(i)).get("id").toString());
        }

        return this.getRealTimeData(id, rtName, staticName);
    }

    public List<Map<String, Object>> getRealTimeStationPumpState(String cid, String[] rtName, String[] staticName) throws Exception {
        ArrayList resltData = new ArrayList();
        String[] deviceType = new String[]{cid};
        new Page();
        Page pageStation = this.deviceDataService.listJsonByDeviceTypeConditions(1, 1000, deviceType, (String[])null, (String[])null, (String[])null, (String[])null);
        HashMap stationPumps = new HashMap();

        for(int deviceType2 = 0; deviceType2 < pageStation.getRows().size(); ++deviceType2) {
            ArrayList pname = new ArrayList();
            stationPumps.put(this.toInter(((Map)pageStation.getRows().get(deviceType2)).get("id").toString()), pname);
        }

        String[] var23 = new String[]{"5"};
        String[] var24 = new String[]{"parentId"};
        String[] sign = new String[]{"EQ"};
        String[] connection = new String[]{"AND"};
        Iterator allPumpsIdArray = stationPumps.keySet().iterator();

        while(true) {
            String allPumpsid;
            Page i;
            do {
                if(!allPumpsIdArray.hasNext()) {
                    ArrayList var25 = new ArrayList();
                    Iterator var28 = stationPumps.values().iterator();

                    int var30;
                    while(var28.hasNext()) {
                        List var26 = (List)var28.next();

                        for(var30 = 0; var30 < var26.size(); ++var30) {
                            var25.add(((String)var26.get(var30)).toString());
                        }
                    }

                    String[] var27 = new String[var25.size()];

                    for(int var29 = 0; var29 < var25.size(); ++var29) {
                        var27[var29] = (String)var25.get(var29);
                    }

                    Map var31 = this.realTimeDataDao.getRealTimeData(var27, rtName);

                    for(var30 = 0; var30 < pageStation.getRows().size(); ++var30) {
                        HashMap var32 = new HashMap();
                        var32.put("pid_bus", this.toInter(((Map)pageStation.getRows().get(var30)).get("id").toString()));
                        var32.put("pName", ((Map)pageStation.getRows().get(var30)).get("name"));
                        ArrayList var33 = new ArrayList();
                        if(stationPumps.containsKey(this.toInter(((Map)pageStation.getRows().get(var30)).get("id").toString()))) {
                            List ids = (List)stationPumps.get(this.toInter(((Map)pageStation.getRows().get(var30)).get("id").toString()));
                            Iterator var20 = ids.iterator();

                            label48:
                            while(true) {
                                String id;
                                do {
                                    if(!var20.hasNext()) {
                                        break label48;
                                    }

                                    id = (String)var20.next();
                                } while(var31.get(id) == null);

                                Iterator var22 = ((List)var31.get(id)).iterator();

                                while(var22.hasNext()) {
                                    Map pumpdata = (Map)var22.next();
                                    var33.add(pumpdata);
                                }
                            }
                        }

                        var32.put("objs", var33);
                        resltData.add(var32);
                    }

                    return resltData;
                }

                allPumpsid = (String)allPumpsIdArray.next();
                String[] pumpData = new String[]{allPumpsid};
                new Page();
                i = this.deviceDataService.listJsonByDeviceTypeConditions(1, 1000, var23, var24, sign, pumpData, connection);
            } while(i.getRows().size() <= 0);

            for(int stationMap = 0; stationMap < i.getRows().size(); ++stationMap) {
                String objs = this.toInter(((Map)i.getRows().get(stationMap)).get("id").toString());
                ((List)stationPumps.get(allPumpsid)).add(objs);
            }
        }
    }
}
