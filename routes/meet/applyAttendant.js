module.exports = function(app,connection)
{
//모임정보 상세 내 참여 신청
    app.post('/meet/attendant', function(req,res){
        console.log("post /meet/attendant");
        var meetId = req.body.meet_Id;
        var meetCaptain;
        var attendantId = req.body.user_Id; 
        var sql_one = "select fk_meetcaptain, meet_personNum from meettable where meet_Id = " + meetId + ";";
        var sqltwo= "select count(*)+1 AS count from meetAttendants where fk_meet_Id = " + meetId + ";";
        var sql = 'INSERT INTO meetAttendants SET ?;';
        var params = {
            "fk_meet_Id" : meetId,
            "fk_attendants_Id" : attendantId
        }
        connection.query(sql_one, function(error,result, fields){
            if(error)
                res.status(400).send('err :' + error);
            else{
                console.log(result);
                meetCaptain = result[0].fk_meetcaptain;
                personNum = result[0].meet_personNum;
                connection.query(sqltwo, function(err,row,fields){
                    if(meetCaptain != attendantId && row[0].count < personNum){
                        connection.query(sql,params,function(error, result, fields){
                            if(error) res.status(400).json({"state" : 400,"err":error});
                            else{
                                res.status(200).json({"state" : 200, "meet_Id" : meetId, "userId" : attendantId});
                                console.log(meetId+' '+ attendantId);
                            }
                        });
                    }
                    else if(row[0].count == personNum){
                        var alarm = require('../pushAlarm/maxOccupancyAlarm.js');
                        alarm(meetId,res,connection);
                    }
                });
            }
        });
  
    });
    
}