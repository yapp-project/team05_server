module.exports = function(app,connection)
{
//모임정보 상세 내 참여 신청
    app.post('/meet/attendant', function(req,res){
        console.log("post /meet/attendant");
        var meetId = req.body.meet_Id;
        var meetCaptain;
        var attendantId = req.session.userId; 
        var sql_one = "select m.fk_meetcaptain from meettable As m where m.meet_Id = " + meetId + ";";
        var sql = 'INSERT INTO meetAttendants SET ?;';
        var params = {
            "fk_meet_Id" : meetId,
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
                            res.status(200).json({"states" : 200, "meet_Id" : meetId, "userId" : attendantId});
                            console.log(meetId+' '+ attendantId);
                        }
                    });
                }
                else{
                    res.status(300).json({"states" : 300, "sentence" : "the meetCaptain is already an attendant." });
                    console.log("the meetCaptain is already an attendant.");
                    res.end();
                }
            }
        });
  
    });
    //모임정보 상세 내 참여 인원 수, 혹은 예정 모임에서 참여인원 수, +1은 모임장 포함임
    app.get('/meet/attendant', function(req, res){
        console.log("get /meet/attendant");
        var meetId = req.query.meet_Id;
        var sql= "select count(*)+1 AS count from meetAttendants AS m where m.fk_meet_Id = " + meetId + ";";
        connection.query(sql, function(error, result, fields){
            if(error){
                res.status(400).json({"states" : 400});
                console.error(error);
            }
            else{
                res.status(200).json({"state" : 200 , "list" : [result[0]]});
                console.log(result);
            }
            res.end();
        });
        
    });

}