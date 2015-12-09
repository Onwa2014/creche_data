exports.childSearch = function(req, res, next){
	req.getConnection(function(error, connection){
        if(error) return next(error);
        
        var searchVar = req.params.query;
        searchVar = "%" + searchVar + "%";
        console.log(searchVar)

		connection.query("SELECT DATE_FORMAT(birth_date,'%d %b %y') as birth_date,name,surname FROM children WHERE name LIKE ?", searchVar, function(error, results) {
			if (error) return next(error);
			    
			    console.log('results');
			    console.log(results);

				res.render( 'childsearch', {	
				children: results,
				layout:false
				//is_admin : req.session.is_admin
			});
		});
	});		
}; 
exports.show = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) 
			return next(err);
		connection.query("SELECT DATE_FORMAT(birth_date,'%d %b %y') as birth_date,name, surname  FROM children", [], function(err, results) {
	        if (err) return next(err);
	        	//console.log(results);
	    	res.render( 'children', {
	    		children : results
	    	});
	    });
	});
};