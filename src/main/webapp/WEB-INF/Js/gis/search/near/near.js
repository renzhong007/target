define(['jquery', 'util', 'search/near/query' ,'search/property/resultlist'],function($, util, query, rslist) {
	
	//空间查询
    $("#spaceSearch section div.nearby .searchbutton").click(function(){
    	 query.query();//lui test2016-3-2 查询
    });
    return {
		load:rslist.load, 
		query:query.query,
		setData: function(obj) {
			query.setData(obj);
			rslist.setData(query.getFirstPage());
			rslist.load();
		}, 
		nextPage : function() {
			rslist.setData(query.getNextPage());
			rslist.load();
		},
		prevPage : function() {
			rslist.setData(query.getPrevPage());
			rslist.load();
		}
	};
});