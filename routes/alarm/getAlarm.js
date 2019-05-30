module.exports = function(app,connection){
    app.post('/meet/alarm',function(req,res){
        console.log("post meet/alarm");
        var userId = req.body.userId;
        var sql = "select m.meet_Id as meetId,m.fk_meetcaptain as senderId,m.meet_name as title from endmeetAttendants as a"+
        " right join meetendtable as m on m.meet_Id = a.fk_meet_Id where a.fk_attendants_Id = '"+userId+"' or m.fk_meetcaptain = '"+userId+"';";
        var cancelsql = "select cancelReason as cancel,fk_meetId as meetId from cancelreasons where fk_meetId = ";
        connection.query(sql,function(err,row,field){
            if(err){res.status(400).json({"state":400});console.log(err);}
            else{
                if(Object.keys(row).length > 0){
                    var getQuery = require('./alarmModule/getQuery.js');
                    var sqltwo = getQuery(row,1);
                    connection.query(sqltwo,function(err,result,field){
                        if(err){res.status(400).json({"state":400});console.log(err);}
                        else{
                            if(Object.keys(result).length > 0){
                                var getResultInfo = require('./alarmModule/getResultinfo.js');
                                var list = getResultInfo(result,row,1);
                                var getQuery = require('./alarmModule/getQuery.js');
                                var query = getQuery(list,2);
                                connection.query(query,function(err,results,field){
                                    if(err){res.status(400).json({"state":400});console.log(err);}
                                    else{
                                        var getResultInfo = require('./alarmModule/getResultinfo.js');
                                        var result = getResultInfo(list,results,2);
                                        var isCancelMeeting = 0;
                                        for(var i = 0; i < Object.keys(result).length; i++){
                                            if(result[i].flag == 0){
                                                cancelsql = cancelsql.concat(result[i].meetId+" or fk_meetId =");
                                                isCancelMeeting = 1;
                                            }
                                        }
                                        var cancelqueryrow = new Object();
                                        if(isCancelMeeting = 1){
                                            cancelsql = cancelsql.concat(0+";");
                                            connection.query(cancelsql, function(err,cancel,field){
                                                if(err){
                                                    res.status(400).json({"state":400});
                                                    console.log(err);
                                                }
                                                else{
                                                    var getContent = require('./alarmModule/getContent.js');
                                                    var contentList = getContent(result,cancel);
                                                    var relocationList = require('./alarmModule/relocationList.js');
                                                    var listArray = relocationList(contentList);
                                                    res.status(200).json({"state":200,"list":listArray});
                                                }
                                            });
                                        }
                                        else{
                                            var getContent = require('./alarmModule/getContent.js');
                                            var contentList = getContent(result,cancelqueryrow);
                                            var relocationList = require('./alarmModule/relocationList.js');
                                            var listArray = relocationList(contentList);
                                            res.status(200).json({"state":200,"list":listArray});
                                        }
                                        }
                                })
                            }
                            else{
                                res.json({"state":300});
                            }
                            
                        }
                    });
                }
                else{
                    res.json({"state":300});
                }
                
            }
        });
    });
}