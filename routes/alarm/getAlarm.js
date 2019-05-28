module.exports = function(app,connection){
    app.post('/meet/alarm',function(req,res){
        console.log("post meet/alarm");
        var userId = req.body.userId;
        var sql = "select m.meet_Id as meetId,m.fk_meetcaptain as senderId,m.meet_name as title from endmeetAttendants as a"+
        " right join meetendtable as m on m.meet_Id = a.fk_meet_Id where a.fk_attendants_Id = '"+userId+"' or m.fk_meetcaptain = '"+userId+"';";
        var query = "select i.userImg as profileImage,i.fk_userId as senderId,u.userNick as nick from userImg as i join users as u on i.fk_userId = u.userId"+
        " where i.fk_userId = '";
        var sqltwo = "select isEnded,flag,date,fk_meetId as meetId from meetinfo where fk_meetId = ";
        var cancelsql = "select cancelReason as cancel,fk_meetId as meetId from cancelreasons where fk_meetId = ";
        connection.query(sql,function(err,row,field){
            if(err){res.status(400).json({"state":400});console.log(err);}
            else{
                if(Object.keys(row).length > 0){
                    for(var i = 0; i < Object.keys(row).length; i++){
                        var id = row[i].meetId;
                        if(i == Object.keys(row).length -1)
                            sqltwo = sqltwo.concat(id+";");
                        else
                            sqltwo = sqltwo.concat(id+" or fk_meetId = ");
                    }
                    connection.query(sqltwo,function(err,result,field){
                        if(err){res.status(400).json({"state":400});console.log(err);}
                        else{
                            var count = 0;
                            if(Object.keys(result).length > 0){
                                for(var i = 0; i < Object.keys(result).length; i++){
                                    if(count == Object.keys(result).length) break;
                                    for(var j = 0; j < Object.keys(row).length; j++){
                                        if(result[i].meetId == row[j].meetId){
                                            result[i].senderId = row[j].senderId;
                                            result[i].title = row[j].title;
                                            count = count + 1;
                                            break;
                                        }        
                                    }
                                }
                                for(var i = 0; i < Object.keys(result).length; i++){
                                    var id = result[i].senderId;
                                    if(i == Object.keys(result).length -1)
                                        query = query.concat(id+"';");
                                    else
                                        query = query.concat(id+"' or fk_userId = '");
                                }
                                console.log(query);
                                connection.query(query,function(err,results,field){
                                    if(err){res.status(400).json({"state":400});console.log(err);}
                                    else{
                                        for(var i = 0; i < Object.keys(result).length; i++){
                                            for(var j = 0; j < Object.keys(results).length; j++){
                                                if(result[i].senderId == results[j].senderId){
                                                    result[i].profileImage = results[j].profileImage;
                                                    result[i].nick = results[j].nick;
                                                    break;
                                                }

                                            }
                                        }
                                        var isCancelMeeting = 0;
                                        for(var i = 0; i < Object.keys(result).length; i++){
                                            if(result[i].flag == 0){
                                                cancelsql = cancelsql.concat(result[i].meetId+" or fk_meetId =");
                                                isCancelMeeting = 1;
                                            }
                                        }
                                        if(isCancelMeeting = 1){
                                            cancelsql = cancelsql.concat(0+";");
                                            
                                            connection.query(cancelsql, function(err,row,field){
                                                if(err){
                                                    res.status(400).json({"state":400});
                                                    console.log(err);
                                                }
                                                else{
                                                    for(var i = 0; i < Object.keys(result).length; i++){
                                                        for(var j = 0; j < Object.keys(row).length; j++){
                                                            if(result[i].meetId == row[j].meetId){
                                                                result[i].content = result[i].nick+ '님이 모임을 취소했어요. "' + row[j].cancel +'"';
                                                                delete result[i].nick;
                                                            }
                                                        }
                                                    }
                                                    for(var i = 0; i < Object.keys(result).length; i++){
                                                        if(result[i].isEnded == 1&& result[i].flag == 1)
                                                            result[i].content = "모임이 마감되었어요.모임 정보를 확인하세요";
                                                        else if(result[i].isEnded == 0 && result[i].flag == 1)
                                                            result[i].content = "모임인원이 다 찼어요!";
                                                    }
                                                    console.log(result);
                                                    var listArray = new Array();
                                                    for(var i = 0; i < Object.keys(result).length; i++){
                                                        var listObject = new Object();
                                                        listObject.isEnded = result[i].isEnded;
                                                        listObject.flag = result[i].flag;
                                                        listObject.meetId = result[i].meetId;
                                                        listObject.profileImage = result[i].profileImage;
                                                        listObject.senderId = result[i].senderId;
                                                        listObject.title = result[i].title;
                                                        listObject.date = result[i].date;
                                                        listObject.content = result[i].content;
                                                        listArray.push(listObject);
                                                    }
                                                        res.status(200).json({"state":200,"list":listArray});

                                                }
                                            });
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