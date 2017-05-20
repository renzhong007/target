define(['jquery'],function($) {
        var obj = {};
        //初始化模块列表
        require(['f2net/f2net']);
        require(['search/search']);
        require(['layerbar/layerbar']);
        require(['viewcard/viewcard']);
        require(['template']);
        require(['window/window']);
        require(['promptBox/promptBox']);

        return obj;
    }
);