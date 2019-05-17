module.exports= function(app,connection){
    //모임정보 상세 내 참여 인원 수, 혹은 예정 모임에서 참여인원 수, +1은 모임장 포함임
    app.get('/meet/attendant', function(req, res){
        console.log("get /meet/attendant");
        var meetId = req.query.meet_Id;
        var sql= "select count(*)+1 AS count from meetAttendants AS m where m.fk_meet_Id = " + meetId + ";";
        connection.query(sql, function(error, result, fields){
            if(error){
                res.status(400).json({"state" : 400});
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