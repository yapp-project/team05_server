var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var config = require('./db_info.js').local;
var session = require('express-session');
const FileStore = require('session-file-store')(session);


var app = express();
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: new FileStore()
}));

var port = process.env.PORT || 8078;


var connection = mysql.createConnection({
                    host: config.host,
                    port: config.port,
                    user: config.user,
                    password: config.password,
                    database: config.database
                });

connection.connect();
app.listen(port ,function(){
    console.log("Express server has started on port " + port);
});
// var meetRouter = require('./routes/test_one.js')(app,connection);
var logRouter = require('./routes/join.js')(app,connection);
