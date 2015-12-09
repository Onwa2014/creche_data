exports.categorySearch = function(req, res, next){
	req.getConnection(function(error, connection){
        if(error) return next(error);
        
        var searchVar = req.params.query;
        searchVar = "%" + searchVar + "%";
        console.log(searchVar)

		connection.query('SELECT * FROM categories WHERE name LIKE ?', [searchVar], function(error, results) {
			if (error) return next(error);
			    console.log(results);
				res.render( 'categories', {	
				categories: results,
				is_admin : req.session.is_admin
			});
		});
	});		
}; 

exports.searchProd = function(req, res, next){
	req.getConnection(function(error, connection){
        		if(error) return next(error);
        
        var searchVar = req.params.query;
        searchVar = "%" + searchVar + "%";
        console.log("searchVar");

		var Administrator = req.session.role === "Admin"
		var user = req.session.role !== "Admin"


		connection.query('SELECT  products.id,products.name, categories.name, products.cat_id FROM products, categories  where products.cat_id = categories.id WHERE product.name LIKE ? OR categories.name LIKE ?', [searchVar,searchVar], function(error, results) {
			if (error) return next(error);
			connection.query('SELECT id, name FROM categories', [searchVar], function(error, results1) {
				if (error) return next(error);
			    //console.log(Administrator);
				res.render( 'products', {
					product : results,
					categories: results1,
					layout : false,
					is_admin : req.session.is_admin 
					//action: user
				});
			});
			});
		});	
	};



















/*exports.categorySearch = function (req, res, next) {
    req.getConnection(function(err, connection){

      var Administrator = req.session.role === "Admin"
      var user = req.session.role !== "Admin"

      if (err){ 
        return next(err);
      }

      var cat_search = "%" + JSON.parse(JSON.stringify(req.body)).name +"%";

      connection.query('SELECT * FROM categories WHERE name LIKE ?', [cat_search], function(err, results) {
        if (err)
          console.log("Error inserting : %s ",err );
        console.log(cat_search);
        res.render('categories', {
          category : results,
          is_admin : req.session.is_admin,
           action: user 
        });
      });
    });
};*/
