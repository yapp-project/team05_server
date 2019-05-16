module.exports = function(app,connection)
{
    //모임 만들기
    app.post('/meet/detail', function(req, res){
        console.log('post /meet/detail');
        var fk_meetcaptain = req.session.userId;
        var meet_name = req.body.name;
        var meet_longitude = req.body.longitude;
        var key;
        var fs = require("fs");
        var sql = 'INSERT INTO meettable SET ?;';
        var sqltwo = 'INSERT INTO meetkeywords SET ?;';
        var sqlthree = 'INSERT INTO meetinterests SET ?;';
        var sqlfour = 'INSERT INTO meetimages SET ?;';
        var insertBinaryInCategory = require('../module/insertBinaryInCategory.js');
        var list = req.body.list;
        var param = new Object();
        param = insertBinaryInCategory(list);
        //var encodedImage = req.body.meetimage;
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
                param.fk_meetId = result.insertId;
                connection.query(sqltwo, parameter, function(error, results, fields){
                    if(error) {
                        res.json({"state" : 400});
                        res.status(400).end('err :' + error);
                        console.error('error', error);
                    }
                    else{
                        var keywordCount = require('../module/keywordCount.js');
                        keywordCount(req.body.keyword);
                        connection.query(sqlthree, param, function(error, rows, fields){
                            if(error){
                                res.json({"state" : 400});
                                res.status(400).end('err :' + error);
                                console.error('error', error);
                            }
                            else{
                                //connection.query(sqlfour, parameters,)
                                var sqlfive = 'CREATE EVENT ' +'event_'+String(result.insertId)+" on schedule AT '"+req.body.datetime
                                +"' do update meettable set meet_scheduledEnd = 1 WHERE meet_Id = "+result.insertId+';';
                                connection.query(sqlfive, function(err, row, fields){
                                    if(err){
                
                                        res.status(400).json({"state" : 400,"err" : error + " " +err});
                                        console.error('error', err);
                                    }
                                    else{
                                        res.status(200).json({"state" : 200});
                                    }
                                });
                            }
                        });
                    }
                });
            }
    });
    });
    


}
