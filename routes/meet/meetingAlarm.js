module.exports = function(app,connection){
    function cloneObject(obj) {
        return JSON.parse(JSON.stringify(obj));
      }
    app.post('/meet/meetcaptain',function(req,res){
        var FCM = require('fcm-node');
        var server = require('./serverKey.js');
        var meetcaptain = req.session.userId;
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
                connection.query(sqltwo, function(errorerr, row, fields){
                if(errorerr){
                    res.status(400).json({"state" : 400});
                    console.error(errorerr);
                }
                else{
                    
                    cancel = row[0].cancelReason;
                    var clientToken = new Array();
                    for(var i = 0; i < rows.length; i++)
                        clientToken.push(rows[i].clientToken);
                    var push_data = {
                        registration_ids: clientToken,
                                
                            notification: {
                                title : "심모",
                                body : meetcaptain + " 님이 모임을 취소했어요." + "\n이유 : " + cancel,
                                sound : "default",
                                click_action : "FCM_PLUGIN_ACTIVITY",
                                icon: "fcm_push_icon"
                            },
                            priority: "high",
                            restricted_package_name:"com.yapp14th.yappapp",
                        };
                    
                        var fcm = new FCM(server.serverKey);
                        var count = 0;
                        fcm.send(push_data, function(err, response){
                            count = count + 1;
                            if(err){
                                console.error('push메시지 발송에 실패했습니다.');
                                console.error(err);
                                if(count == 1) res.status(400).json({"state" : 400, "error" : err});
                                return;
                            }
                            else{
                                console.log("push메시지가 발송되었습니다.");
                                if(count == 1) res.status(200).json({state : 200});  
                            }
                     
                        });
                       
                      
                    }
                    

                });
                

            }
        });
      
    });
}