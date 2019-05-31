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
        var query = "insert into meetinfo (fk_meetId,flag,date,isEnded) values("+meetId+",1,now(),0);";
        var sqlthree = 'INSERT INTO endmeetAttendants SET ?;';
        var params = {
            "fk_meet_Id" : meetId,
            "fk_attendants_Id" : attendantId
        }
        connection.query(sql_one, function(error,result, fields){
            if(error){
                res.status(400).json({'state' : 400});
                console.log(error);
            }
            else{
                if(Object.keys(result).length > 0){
                meetCaptain = result[0].fk_meetcaptain;
                personNum = result[0].meet_personNum;
                connection.query(sqltwo, function(err,row,fields){
                    if(meetCaptain != attendantId && row[0].count <= personNum-1){
                        connection.query(sql,params,function(error, result, fields){
                            if(error){ res.status(400).json({"state" : 400});console.log(error);}
                            else{
                                if(row[0].count == personNum-1){
                                    connection.query(query,function(err,result,field){
                                        if(err){
                                            res.status(400).json({"state":400});
                                            console.log(err);
                                        }
                                        else{
                                            connection.query(sqlthree,params, function(err,result,fields){
                                                if(err) {
                                            res.status(400).json({"state": 400});
                                            console.log(err);
                                                }
                                                else{
                                            res.status(200).json({"state" : 200});
                                        }
                                            });
                                        }
                                    });

                                    //var alarm = require('../pushAlarm/maxOccupancyAlarm.js');
                                    //alarm(meetId,res,connection);
                                    
                                }
                                else{
                                    connection.query(sqlthree,params, function(err,result,fields){
                                        if(err) {
                                    res.status(400).json({"state": 400});
                                    console.log(err);
                                        }
                                        else{
                                    res.status(200).json({"state" : 200});
                                }
                                    });
                                }
                            }
                        });
                    }
                    else{
                        res.json({"state" : 300});
                        
                    }
                });
            }
            else{
                res.status(400).json({"state":400});
            }
        }
        });
  
    });
    
}