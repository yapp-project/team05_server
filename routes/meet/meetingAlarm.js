module.exports = function(app,connection){
    app.post('/meet/meetcaptain',function(req,res){
        var FCM = require('fcm-node');
        var server = require('./serverKey.js');
        var meetcaptain = req.body.meetcaptain;
        var meetId = req.body.meetId;
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
                connection.query(sqltwo, function(error, rows, fields){
                if(error){
                    res.status(400).json({"state" : 400});
                    console.error(error);
                }
                else{
                    if(rows[0].cacelReason)
                    cancel = rows[0].cancelReason;
                }

                });
                for(var i = 0; i < rows.length; i++){
                    var push_data = {
                        to: rows[i].clientToken,
                            
                        notification: {
                            title : "심모",
                            body : meetcaptain+ " 님이 모임을 취소했어요." + "\n이유 : " + cancel,
                            sound : "default",
                            click_action : "FCM_PLUGIN_ACTIVITY",
                            icon: "fcm_push_icon"
                        },
                        priority: "high",
                        restricted_package_name:"com.yapp14th.yappapp",
                    };
                
                    var fcm = new FCM(server.serverKey);
                    console.log(server.serverKey);
                
                    fcm.send(push_data, function(error, response){
                        if(error){
                            console.error('push메시지 발송에 실패했습니다.');
                            console.error(error);
                        }
                        else{
                            console.log("push메시지가 발송되었습니다.");
                            console.log(response);
                            console.log(response.results);
                        }
                    });
                }

            }
        });
      
    });
}