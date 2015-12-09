exports.showAdd = function (req, res, next) {
  res.render('add')
};

exports.add = function (req, res, next) {
  var data = {
      name : req.body.name,
      surname : req.body.surname,
      birth_date : req.body.birth_date,
      address : req.body.address,
      contact_number : req.body.contact_number,
      allergies : req.body.allergies,
      folder_number: req.body.folder_number
  };
  console.log("data");
	req.getConnection(function(err, connection){
		if (err) return next(err);
		
		//var input = req.body;
		//console.log(req.body);
		connection.query('insert into children set ?', req.body, function(err, results) {
      if (err)
      console.log("Error inserting : %s ",err );

      res.redirect('/children');
    });
	});
};