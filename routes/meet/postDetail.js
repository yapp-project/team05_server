module.exports = function(app,connection)
{
    //모임 만들기
    app.post('/meet/detail',function(req, res){
        console.log('post/meet/detail');
        var fk_meetcaptain = req.body.userId;
        var meet_name = req.body.name;
        var meet_longitude = req.body.longitude;
        var sql = 'INSERT INTO meettable SET ?;';
        var sqltwo = 'INSERT INTO meetkeywords SET ?;';
        var sqlthree = 'INSERT INTO meetinterests SET ?;';
        var list = req.body.list;
        var date = req.body.datetime;
        var param = new Object();
        var insertBinaryInCategory = require('../module/insertBinaryInCategory.js');
        param = insertBinaryInCategory(list);
        var params = {
            "fk_meetcaptain" : req.body.userId,
            "meet_name" : req.body.name,
            "meet_datetime" : date,
            "meet_location" : req.body.location,
            "meet_latitude" : req.body.latitude,
            "meet_longitude" : req.body.longitude,
            "meet_explanation" : req.body.explanation,
            "meet_personNum" : req.body.personNum
        };
        
        connection.query(sql,params, function (error, result,fields){
            if(error) {
                res.status(400).json({"state" : 400});
                console.error('error'+ error);
            }
            else{
                var sqlone = "insert into meetendtable (fk_meetcaptain,meet_Id,meet_name,meet_datetime,meet_location,meet_latitude,meet_longitude,meet_explanation,meet_personNum) values ('"+
                req.body.userId+"',"+result.insertId+",'"+req.body.name+"','"+date+"','"+req.body.location+"',"+req.body.latitude+","+req.body.longitude+",'"+
                req.body.explanation+"',"+req.body.personNum+");";
                connection.query(sqlone,function(err,row,field){
                    if(err){
                        res.status(400).json({"state" : 400});
                        console.err("err " + err);
                    }
                    else{
                        var parameter = {
                            "fk_meet_Id" : result.insertId,
                            "meet_keyword" : req.body.keyword
                        }
                        param.fk_meetId = result.insertId;
                        connection.query(sqltwo, parameter, function(error, results, fields){
                            if(error) {
                                res.status(400).json({"state" : 400});
                                console.error('error'+ error);
                            }
                            else{
                                var keywordCount = require('../keywordModule/findKeyword.js');
                                var key = req.body.keyword;
                                keywordCount(key,connection,result.insertId);
                                connection.query(sqlthree, param, function(error, rows, fields){
                                    if(error){
                                        res.status(400).json({"state" : 400});
                                        console.error('error'+ error);
                                    }
                                    else{
                                        var sqlfive = 'CREATE EVENT ' +'event_'+String(result.insertId)+" on schedule AT '"+date
                                        +"' do delete from meettable WHERE meet_Id = "+result.insertId+";";
                                        connection.query(sqlfive, function(err, row, fields){
                                            if(err){
                                                res.status(400).json({"state" : 400});
                                                console.error('error'+ err);
                                            }
                                            else{
                                                res.status(200).json({"state" : 200, "meetId" : result.insertId});
                                            }
                                        });
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