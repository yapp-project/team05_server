module.exports = function(app,connection)
{
//모임정보 상세 내 참여 신청
    app.post('/meet/attendant', function(req,res){
        console.log("post /meet/attendant");
        var meetName = req.query.meet_name;
        var meetCaptain;
        var attendantId = req.session.userId; 
        var sql_one = "select m.fk_meetcaptain from meettable As m where m.meet_name = '" + meetName + "';";
        var sql = 'INSERT INTO meetAttendants SET ?;';
        var params = {
            "fk_meet_name" : meetName,
            "fk_attendants_Id" : attendantId
        }
        connection.query(sql_one, function(error,result, fields){
            if(error)
                res.status(400).send('err :' + error);
            else{
                meetCaptain = result[0].fk_meetcaptain;
                if(meetCaptain != attendantId){
                    connection.query(sql,params,function(error, result, fields){
                        if(error) res.status(400).json({"states" : 400});
                        else{
                            res.status(200).json({"states" : 200});
                            console.log(meetName+' '+ attendantId);
                        }
                    });
                }
                else{
                    console.log("the meetCaptain is already an attendant.");
                    res.end();
                }
            }
        });
  
    });
    //모임정보 상세 내 참여 인원 수, 혹은 예정 모임에서 참여인원 수, +1은 모임장 포함임
    app.get('/meet/attendant', function(req, res){
        console.log("get /meet/attendant");
        var meetName = req.query.meet_name;
        var sql= "select count(*)+1 from meetAttendants AS m where m.fk_meet_name = '" + meetName + "';";
        connection.query(sql, function(error, result, fields){
            if(error)
                res.status(400).json({"states" : 400});
            else{
                res.status(200).json({"state" : 200 , "list" : [result[0]]});
                console.log(result);
            }
            res.end();
        });
        
    });
    //모임 기한 지남을 표기 따라서 예정 모임과 추천에 나오지 않음
    app.put('/meet/attendant', function(req,res){
        console.log("put /meet/attendant");
        var meetName = req.body.meet_name;
        var sql = "UPDATE meettable AS m SET m.meet_scheduledEnd = 1 WHERE m.meet_name = '" +meetName+"';";
        connection.query(sql, function(error,result, fields){
            if(error)
            res.status(400).json({"states" : 400});
            else{
                res.status(200).json({"states" : 200});
                conslole.log(result);
            }
            res.end();
        });
    });
    
}