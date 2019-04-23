module.exports = function(app,connection)
{
    //모임 만들기
    app.post('/meet/detail', function(req, res){
        console.log('post /meet/detail');

        var fk_meetcaptain = req.session.userId;
        var meet_name = req.body.name;
        var meet_longitude = req.body.longitude;
        var key;
        var sql = 'INSERT INTO meettable SET ?;';
        var sqltwo = 'INSERT INTO meetkeywords SET ?;';
        var sqlthree = 'INSERT INTO meetinterests SET ?;'
        var lists = ["sports","activity","writing","study","exhibition","music","movie","diy","volunteer","picture","game","cooking","coffee","nail","car","interior","concert","etc"];
        var params = {
            "fk_meetcaptain" : fk_meetcaptain,
            "meet_name" : req.body.name,
            "meet_datetime" : req.body.datetime,
            "meet_location" : req.body.location,
            "meet_latitude" : req.body.latitude,
            "meet_longitude" : req.body.longitude,
            "meet_explanation" : req.body.explanation,
            "meet_personNumMax" : req.body.personNumMax,
            "meet_personnumMin" : req.body.personNumMin,
            "meet_filterSameGender" : req.body.filterSameGender,
            "meet_filterSameAgeGroup" : req.body.filterSameAgeGroup

        };


        connection.query(sql,params, function (error, result,fields){
            if(error) {
                res.json({"state" : 400});
                res.status(400).end('err :' + error);
                console.error('error', error);
            }
            else{
                var parameter = {
                    "fk_meet_Id" : result.insertId,
                    "meet_keyword" : req.body.keyword
                }
                for(var i = 0; i < lists.length; i++){
                    if(lists[i]== req.body.list)
                        key = i;
                }
                var param = new Object();
                for(var i = 0; i < lists.length; i++){
                    if(key == i)
                        param[lists[i]] = 1;
                    else
                        param[lists[i]] = 0;
                }
                param.fk_meetId = result.insertId;

                connection.query(sqltwo, parameter, function(error, results, fields){
                    if(error) {
                        res.json({"state" : 400});
                        res.status(400).end('err :' + error);
                        console.error('error', error);
                    }
                    else{
                        connection.query(sqlthree, param, function(error, rows, fields){
                            if(error){
                                res.json({"state" : 400});
                                res.status(400).end('err :' + error);
                                console.error('error', error);
                            }
                            else
                                res.status(200).json({"state" : 200, "meetId" : result.insertId, "intId" : rows.insertId});
                        });
                    }
                });
            }
    });
    });
    // 모임정보 상세 전달
    app.get('/meet/detail', function(req, res){
        console.log("get /meet/detail");
        var meetId = req.query.meet_Id;
        var sql = "select m.meet_Id,m.meet_name, m.meet_datetime, m.meet_location, m.meet_explanation, m.meet_personNumMax "
        +"from meettable AS m where m.meet_Id = " + meetId +";" ;
        var sqltwo = 'INSERT INTO meetviews(fk_meetId,views) VALUES(' + meetId + ',1) ON DUPLICATE KEY UPDATE fk_meetId='+meetId+', views=views+1;';
        console.log(sqltwo);
        // var sqltwo = 'IF EXISTS( SELECT fk_meetId FROM meetviews where fk_meetId='+meetId+') BEGIN UPDATE meetviews SET views = views+1 where fk_meetId ='+ meetId+'END ELSE BEGIN INSERT INTO meetviews(fk_meetId,views) VALUES('+meetId+',1) END';
        connection.query(sql, function(error,result, fields){
            if(error)
            res.status(400).json({"states" : 400});
            else{
              connection.query(sqltwo, function(errortwo,resulttwo, fieldstwo){
                  if(errortwo)
                  res.status(300).json({"states" : 300});
                  else{

                      res.status(200).json({"state" : 200 , "list" : [result[0]]});
                      console.log(result[0]);
                  }
                  // res.end();
              });
            }
            // res.end();
        });
    });


}
