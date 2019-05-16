module.exports = function(app,connection){
    app.get('/meet/meetcaptain',function(req,res){
        var meetcaptain = req.session.userId;
        var meetId = req.query.meetId;
        var cancel;
        var sqlone = "select a.fk_attendants_Id AS attendant, c.client_token AS clientToken " +
                 "from meetAttendants AS a" + " JOIN usertoken AS c ON c.fk_userId = a.fk_attendants_Id where a.fk_meet_Id = " +
                  meetId+" ;";
        var sqltwo = "select cancelReason from cancelreasons where fk_meetId = " + meetId+" ;";
        connection.query(sqlone, function(error, rows, fields){
            if(error){
                res.status(400).json({"state" : 400});
                console.error(error);
            }
            else{
                connection.query(sqltwo, function(err, row, fields){
                if(err){
                    res.status(400).json({"state" : 400});
                    console.error(err);
                }
                else{
                    var data = require('./cancelAlarmData.js');
                    cancel = row[0].cancelReason;
                    var clientToken = new Array();
                    for(var i = 0; i < rows.length; i++)
                        clientToken.push(rows[i].clientToken);
                    push_data = data(clientToken,meetcaptain,cancel);
                    var fcmAlarm = require('./fcmAlarm.js');
                    fcmAlarm(push_data,res);
                }     

                });
                

            }
        });
      
    });
}