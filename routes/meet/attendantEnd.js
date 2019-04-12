module.exports = function(app, connection){
    //모임 마감하기 버튼 눌렀을 시 meet_personNumMax부분을 현재 인원수로 변경
    app.put('/meet/personnummax', function(req, res){
        console.log('put /meet/personnummax');
        var meetId = req.body.meet_Id;
        var count;
        var query = "select count(*) + 1 as count from meettable where meet_Id = " + meetId +";";
        var sql;
        connection.query(query, function(error, result, fields){
            if(error){
                res.status(400).json({"states": 400});
                console.log(error);
            }
            else{
                count = result[0].count;
                sql = "UPDATE meettable SET meet_personNumMax ="+ count +" where meet_Id = "+meetId+";";
                connection.query(sql, function(error, result, fields){
                    if(error){
                        res.status(400).json({"states": 400});
                        console.log(error);
                    }
                    else{
                        res.status(200).json({"states" :200, "meet_personnumMax" : count,
                    "meet_Id" : meetId});
                        console.log(200);
                        
                    }
                    res.end();
                });
            }
        });
        
    });
}