var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');
//var multer 		= require('multer');
//var upload = multer({dest:'./static/'});

var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function(){
	console.log("Connected to mongod server");
});

mongoose.connect('mongodb://localhost:27017/real_test');

//Define model
var Join = require('./models/join');
app.use(bodyParser.urlencoded({limit:'50mb', extended: true }));
app.use(bodyParser.json({limit:'50mb'}));

var port = process.env.PORT || 8078;
// var router =require('./routes')(app, Book);
var logrouter = require('./routes/join.js')(app, Join);
var server = app.listen(port, function(){
 console.log("Express server has started on port " + port)
 });
