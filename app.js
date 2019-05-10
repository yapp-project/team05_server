var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var config = require('./db_info.js').local;
var session = require('express-session');
var moment = require('moment');
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
                    database: config.database,
                    multipleStatements: true
                });

connection.connect();
app.listen(port ,function(){
    console.log("Express server has started on port " + port);
});
var meetDetailRouter = require('./routes/meet/detail.js')(app,connection);
var meetKeywordRouter = require('./routes/meet/searchKeyword.js')(app,connection);
var meetCategoryRouter = require('./routes/meet/searchCategory.js')(app,connection);
var meetAttendantRouter = require('./routes/meet/attendant.js')(app, connection);
var meetAttendantEndRouter = require('./routes/meet/attendantEnd.js')(app, connection);
var meetScheduledMeetingRouter = require('./routes/meet/scheduledMeeting.js')(app,connection);
var mostNearestMeetingRouter = require('./routes/meet/mostNearestMeeting.js')(app, connection);
var meetingcancelRouter = require('./routes/meet/meetingcancel.js')(app,connection);
var meetingAlarmRouter = require('./routes/meet/meetingAlarm.js')(app,connection);
var clientTokenRouter = require('./routes/meet/clientToken.js')(app,connection);
var cancelReasonRouter = require('./routes/meet/cancelreason.js')(app,connection);
var joinRouter = require('./routes/login/join.js')(app,connection);
var logRouter = require('./routes/login/login.js')(app,connection);
var myPage = require('./routes/mypage/mypage.js')(app,connection);
var notice = require('./routes/notice/notice.js')(app,connection);
// var attendantMain = require('./routes/meetAttendant/attendantMain.js')(app,connection);
