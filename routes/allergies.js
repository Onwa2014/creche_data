exports.show = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) 
			return next(err);
		connection.query('SELECT allergies,name, surname  FROM children', [], function(err, results) {
	        if (err) return next(err);
	        	//console.log(results);
	    	res.render( 'allergies', {
	    		children : results
	    	});
	    });
	});
};