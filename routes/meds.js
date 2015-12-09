exports.medSearch = function(req, res, next){
	req.getConnection(function(error, connection){
        if(error) return next(error);
        
        var searchVar = req.params.query;
        searchVar = "%" + searchVar + "%";
        console.log(searchVar)

		connection.query("SELECT * FROM medication WHERE time LIKE ?", searchVar, function(error, results) {
			if (error) return next(error);
				//connection.query("SELECT name,surname FROM children", searchVar, function(error, results) {
				//if (error) return next(error);
				    
				    console.log('results');
				    console.log(results);

					res.render( 'medsearch', {	
					medication: results,
					layout:false
					//is_admin : req.session.is_admin
				});
			//});
		});
	});		
};

exports.show = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) 
			return next(err);
		connection.query('SELECT medication.id,medication.time,children.name,children.surname as child_lastname,medication.medication FROM medication,children Where child_id = children.id', [], function(err, results1) {
			connection.query('SELECT * FROM children', [], function(err, results) {
	        	if (err) return next(err);
	        	//console.log(results);
	    		res.render( 'meds', {
	    			medication : results1,
	    			children : results
	    		});
	        });
	    });
	});
};

exports.showAdd = function (req, res, next) {
  res.render('add_meds')
};

exports.add = function (req, res, next) {
 	req.getConnection(function(err, connection){
 		if (err){ 
 			return next(err);
 		}
 		var input = JSON.parse(JSON.stringify(req.body));
 		var data = {
             child_lastname: input.surname,
             time : input.time,
             medication : input.medication
         };
 		connection.query('insert into medication set ?', data, function(err, results) {
             if (err)
             console.log("Error inserting : %s ",err );
           //res.redirect('/addProducts');
            res.redirect('/meds');
       	});
 	});
};

exports.delete = function(req, res, next){
	var id = req.params.id;
	req.getConnection(function(err, connection){
		connection.query('DELETE FROM medication WHERE id = ?', [id], function(err,rows){
			if(err){
    			console.log("Error Selecting : %s ",err );
			}
			res.redirect('/meds');
		});
	});
};
exports.get = function(req, res, next){
	var id = req.params.id;
	 console.log(">>>>>>>" + id);
	req.getConnection(function(err, connection){
		var data = connection.query('SELECT * FROM medication WHERE id = ?', [id], function(err,results){
			if(err){
    			console.log("Error Selecting : %s ",err );
			}
			console.log(data)
			var query ="SELECT * FROM children";	
			connection.query(query,[id], function(err, children){
				if(err){
					console.log("Error Selecting : %s ",err);
				}
					res.render('edit_meds',{
						page_title:"Edit Customers - Node.js",
						data: data,
						id: id
					});      
				}); 
			});
	});
};

exports.update = function(req, res, next){

	var data = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    var input = JSON.parse(JSON.stringify(req.body));
		var data = {
            medication : input.medication,
            time : input.time
        };
        console.log(data);
    req.getConnection(function(err, connection){
        connection.query('UPDATE medication SET ? WHERE id = ?', [data, id], function(err, rows){
    		if (err){
              	console.log("Error Updating : %s ",err );
    		}
          	res.redirect('/meds');
    	});	
    });
};