define(['jquery', 'search/property/query', 'search/property/resultlist'],function($, query, rslist) {
	
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