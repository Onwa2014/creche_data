var express = require('express');
var exphbs  = require('express-handlebars');
var mysql = require("mysql");
var bodyParser = require('body-parser')
var myConnection = require("express-myconnection");
var new_child =require('./routes/new_child');
var meds = require('./routes/meds');
var children = require('./routes/children');
var allergies = require('./routes/allergies');
 
var app = express();
var dbOptions = {
     host : "localhost",
     user : "root",
     password : "amila",
     port : 3306,
     database : "creche_day"
 };
 
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + "/public"));
// allows you to use mysql from the http request
app.use(myConnection(mysql, dbOptions, "single")); 
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json 
app.use(bodyParser.json()) 
 
app.get('/', function (req, res) {
    res.render('add');
});
app.get('/signup',function ( req, res) {
	res.render('signup')
});
app.get('/add/showAdd',new_child.showAdd);
app.get('/children/search/:query',children.childSearch);
app.get('/add', function (req, res) {
	console.log("mila");
    res.render('add');
    console.log("onwaba");
});

app.get('/meds', meds.show);
app.get('/add_meds',meds.showAdd);
app.post('/meds/add', meds.add);
app.get('/meds/search/:query',meds.medSearch);
app.get("/meds/edit/:id", meds.get);
app.post("/meds/update/:id", meds.update);
app.get("/meds/delete/:id", meds.delete);

app.get('/children', children.show);
app.post('/new_child/add', new_child.add);
app.post('/new_child/add', new_child.add);

app.get('/allergies', allergies.show);


 
app.listen(2605);