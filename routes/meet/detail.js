module.exports = function(app,connection)
{
    //모임 만들기
    app.post('/meet/detail', function(req, res){
        console.log('post /meet/detail');

        var fk_meetcaptain = req.session.userId;
        var meet_name = req.body.meet_name;
        var meet_longitude = req.body.meet_longitude;
        var sql = 'INSERT INTO meettable SET ?;';
        var params = {
            "fk_meetcaptain" : fk_meetcaptain,
            "meet_name" : req.body.meet_name,
            "meet_datetime" : req.body.meet_datetime,
            "meet_location" : req.body.meet_location,
            "meet_latitude" : req.body.meet_latitude,
            "meet_longitude" : req.body.meet_longitude,
            "meet_explanation" : req.body.meet_explanation,
            "meet_personNumMax" : req.body.meet_personNumMax,
            "meet_personnumMin" : req.body.meet_personnumMin,
            "meet_filterSameGender" : req.body.meet_filterSameGender,
            "meet_filterSameAgeGroup" : req.body.meet_filterSameAgeGroup
        };
        connection.query(sql,params, function (error, result,fields){
            if(error) {
                res.json({"state" : 400});
                res.status(400).end('err :' + error);
                console.error('error', error);
            }
            else{
                console.log(fk_meetcaptain + ',' + meet_name + ',' +meet_longitude);
                res.json({"state" : 200,
                            "insertId" : result.insertId});
                res.status(200).end('success');
            }
        });
    });
    // 모임정보 상세 전달
    app.get('/meet/detail', function(req, res){
        console.log("get /meet/detail");
        var meeId = req.query.meet_Id;
        var sql = "select m.meet_Id,m.meet_name, m.meet_datetime, m.meet_location, m.meet_explanation, m.meet_personNumMax "
        +"from meettable AS m where m.meet_Id = " + meetId +";" ;
        connection.query(sql, function(error,result, fields){
            if(error)
            res.status(400).json({"states" : 400});
            else{
                res.status(200).json({"state" : 200 , "list" : [result[0]]});
                console.log(result[0]);
            }
            res.end();
        });
    });

    
}