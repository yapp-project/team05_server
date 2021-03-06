var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var config = require('./db_info.js').local;
var session = require('express-session');
const FileStore = require('session-file-store')(session);
var app = express();
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb'}));
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
var markEndingScheduleRouter = require('./routes/meet/markEndingSchedule.js')(app,connection);
var getNearestRouter = require('./routes/search/getNearestView.js')(app,connection);
var postDetailRouter = require('./routes/meet/postDetail.js')(app,connection);
var getDetailRouter = require('./routes/meet/getDetail.js')(app,connection);
var postMeetImageRouter = require('./routes/meet/postMeetImage.js')(app,connection);
var meetKeywordRouter = require('./routes/search/searchdisKeyword.js')(app,connection);
var meetCategoryRouter = require('./routes/search/searchCategory.js')(app,connection);
var recommendKeywordRouter = require('./routes/search/recommendKeyword.js')(app,connection);
var applyAttendantRouter = require('./routes/meet/applyAttendant.js')(app, connection);
var meetScheduledMeetingRouter = require('./routes/meet/postMainSimmo.js')(app,connection);
var mostNearestMeetingRouter = require('./routes/meet/postNearestMeeting.js')(app, connection);
var clientTokenRouter = require('./routes/meet/clientToken.js')(app,connection);
var meetingcancelRouter = require('./routes/meetCancel/meetingcancel.js')(app,connection);
var remainCancelReasonRouter = require('./routes/meetCancel/remainCancelReason.js')(app,connection);
var meetingAlarmRouter = require('./routes/pushAlarm/cancelAlarm.js')(app,connection);
var putDetailRouter = require('./routes/meet/putDetail.js')(app,connection);
//login
var joinRouter = require('./routes/login/join.js')(app,connection);
var logRouter = require('./routes/login/login.js')(app,connection);
var withdrawRouter = require('./routes/login/withdraw.js')(app,connection);
var imageRouter = require('./routes/login/image.js')(app,connection);

//mypage
var myPageUserRouter = require('./routes/mypage/mypageUser.js')(app,connection);
var myPageMyMeetRouter = require('./routes/mypage/myMeet.js')(app,connection);
var myPageMeetHistoryRouter = require('./routes/mypage/meetHistory.js')(app,connection);

//notice
var noticeRouter = require('./routes/notice/notice.js')(app,connection);

var getAlarmRouter = require('./routes/alarm/getAlarm.js')(app,connection);
var testRouter = require('./routes/search/test.js')(app,connection);
var cancelAttendantRouter = require('./routes/meet/cancelAttendant.js')(app,connection);
// var attendantMain = require('./routes/meetAttendant/attendantMain.js')(app,connection);
