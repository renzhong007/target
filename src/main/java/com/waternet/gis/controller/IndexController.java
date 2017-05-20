package com.waternet.gis.controller;

import com.lihs.authority.interceptor.AllInterceptor;
import com.lihs.httpBase.dto.ResultMap;
import com.lihs.httpBase.page.Page;
import com.lihs.httpBase.service.FunctionMenuService;
import com.waternet.pojo.config.ConfigGisTopicBean;
import com.waternet.pojo.config.ConfigList;
import com.waternet.service.config.ConfigGisTopicService;
import com.waternet.service.config.ConfigListService;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class IndexController
{
    @Resource(name="functionMenuService")
    private FunctionMenuService functionMenuService;
    @Resource(name="configGisTopicService")
    private ConfigGisTopicService configGisTopicService;
    @Resource(name="configListService")
    private ConfigListService configListService;

    @RequestMapping({"basePath"})
    public String basePath()
    {
        return "common/BasePath";
    }
    @RequestMapping(value = "/sd",method = RequestMethod.GET)
    public  String index1()
    {
        return "gis";
    }

    @RequestMapping(method={org.springframework.web.bind.annotation.RequestMethod.GET}, value={"index"})
    public ModelAndView index(HttpSession session)
    {
        ModelAndView modelAndView = new ModelAndView("index");
        try
        {
            modelAndView.addObject("functionMenuList", this.functionMenuService.listJson());
        }
        catch (Exception e)
        {
            e.printStackTrace();
            modelAndView.addObject("functionMenuList", new ArrayList());
        }
        modelAndView.addObject("currentUserPermission", AllInterceptor.currentUserPermission.get());
        modelAndView.addObject("userBean", AllInterceptor.currentUser.get());
        return modelAndView;
    }

    @RequestMapping(method={org.springframework.web.bind.annotation.RequestMethod.GET}, value={"menu"})
    public ModelAndView menu(HttpSession session)
    {
        ModelAndView modelAndView = new ModelAndView("menu");
        modelAndView.addObject("currentUserPermission", AllInterceptor.currentUserPermission.get());
        try
        {
            modelAndView.addObject("functionMenuList", this.functionMenuService.listJson());
        }
        catch (Exception e)
        {
            e.printStackTrace();
            modelAndView.addObject("functionMenuList", new ArrayList());
        }
        return modelAndView;
    }

    @RequestMapping(method={org.springframework.web.bind.annotation.RequestMethod.GET}, value={"gis"})
    public ModelAndView homePage(HttpSession session)
    {
        ModelAndView modelAndView = new ModelAndView("gis");
        modelAndView.addObject("currentUserPermission", AllInterceptor.currentUserPermission.get());
        try
        {
            Page<ConfigGisTopicBean> gisConfigList = this.configGisTopicService.list(1, 9999, null, null, null, "gis_layer_tree", Boolean.valueOf(true));
            modelAndView.addObject("gisConfigList", gisConfigList.getRows());
            ResultMap<List<ConfigList>> waySearchResult = this.configListService.list(null, "gis_spacesearch_way");
            modelAndView.addObject("waySearchConfigList", waySearchResult.getData());
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }
        return modelAndView;
    }

    @RequestMapping(method={org.springframework.web.bind.annotation.RequestMethod.GET}, value={"detail"})
    public ModelAndView detail(HttpSession session)
    {
        ModelAndView modelAndView = new ModelAndView("search/detail");
        return modelAndView;
    }

    @RequestMapping(method={org.springframework.web.bind.annotation.RequestMethod.GET}, value={"stationdetail"})
    public ModelAndView stationdetail(HttpSession session)
    {
        ModelAndView modelAndView = new ModelAndView("station/stationdetail");
        return modelAndView;
    }

    @RequestMapping(method={org.springframework.web.bind.annotation.RequestMethod.GET}, value={"monitorPointDetail"})
    public ModelAndView monitorPointDetail(HttpSession session)
    {
        ModelAndView modelAndView = new ModelAndView("monitorPoint/monitorPointDetail");
        return modelAndView;
    }

    @RequestMapping(method={org.springframework.web.bind.annotation.RequestMethod.GET}, value={"pumpdetail"})
    public ModelAndView pumpdetail(HttpSession session)
    {
        ModelAndView modelAndView = new ModelAndView("pump/pumpdetail");
        return modelAndView;
    }
}
