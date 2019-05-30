module.exports = function(connection,result,res,meetId){
    if(result[0].flag == 0){
    var sqltwo = "select u.userImg as participants_img from meetAttendants as m join userImg as u on m.fk_attendants_Id = u.fk_userId where " +
    "m.fk_meet_Id = " + meetId +  ";";
    var sqlthree = "select u.userImg as captain_img from meettable as m join userImg as u on m.fk_meetcaptain = u.fk_userId where " +
    "m.meet_Id = " + meetId + ";";
    var sqlfour = "select count(*)+1 as participants_num from meetAttendants where fk_meet_Id = " + meetId + ";";
    var imgArray = new Array();
    
    connection.query(sqltwo, function(err,row,field){
        if(err) res.status(400).json({"state" : 400, "err" : err});
        else{
            if(Object.keys(row).length > 0){
                for(var i = 0; i < Object.keys(row).length; i++){
                    if(row[i].participants_img=="null") imgArray.push("https://s3-us-west-2.amazonaws.com/yappsimmo/meetimg/1.jpg");
                    else imgArray.push(row[i].participants_img);
                }
                console.log(imgArray);
                result[0].participants_img = imgArray;
            }
            
            else{
                imgArray.push("https://s3-us-west-2.amazonaws.com/yappsimmo/meetimg/1.jpg");
                result[0].participants_img = imgArray;
            }
                

            connection.query(sqlthree,function(err,row,field){
                if(err)res.status(400).json({"state" : 400, "err" : err});
                else{
                    if(Object.keys(row).length > 0){
                        if(row[0].captain_img .equls=="null")result[0].captain_img = "https://s3-us-west-2.amazonaws.com/yappsimmo/meetimg/1.jpg";
                        else 
                        result[0].captain_img = row[0].captain_img;
                    }
                    else
                        result[0].captain_img = "https://s3-us-west-2.amazonaws.com/yappsimmo/meetimg/1.jpg";
                    connection.query(sqlfour,function(err,row,field){
                        if(err)res.status(400).json({"state" : 400, "err" : err});
                        else{
                            result[0].participants_num = row[0].participants_num;
                            res.status(200).json({"state": 200, "result" : result[0]});
                        }

                    });
                }
            });
        }
    });
}
else{
    var sqltwo = "select u.userImg as participants_img from endmeetAttendants as m join userImg as u on m.fk_attendants_Id = u.fk_userId where " +
    "m.fk_meet_Id = " + meetId +  ";";
    var sqlthree = "select u.userImg as captainimg from meetendtable as m join userImg as u on m.fk_meetcaptain = u.fk_userId where " +
    "m.meet_Id = " + meetId + ";";
    var sqlfour = "select count(*)+1 as participants_num from endmeetAttendants where fk_meet_Id = " + meetId + ";";
    var imgArray = new Array();
    console.log(sqltwo+" sqlthree " + sqlthree);
    connection.query(sqltwo, function(err,row,field){
        if(err) res.status(400).json({"state" : 400, "err" : err});
        else{
            if(Object.keys(row).length > 0){
                for(var i = 0; i < Object.keys(row).length; i++){
                    if(row[i].participants_img=="null") imgArray.push("https://s3-us-west-2.amazonaws.com/yappsimmo/meetimg/1.jpg");
                    else imgArray.push(row[i].participants_img);
                }
                console.log(imgArray);
                result[0].participants_img = imgArray;
            }
            
            else{
                imgArray.push("https://s3-us-west-2.amazonaws.com/yappsimmo/meetimg/1.jpg");
                result[0].participants_img = imgArray;
            }
            connection.query(sqlthree,function(err,row,field){
                if(err)res.status(400).json({"state" : 400, "err" : err});
                else{
                    if(Object.keys(row).length > 0){
                        console.log(row[0].captainimg);
                    if(row[0].captainimg == "null"){result[0].captain_img = "https://s3-us-west-2.amazonaws.com/yappsimmo/meetimg/1.jpg";}
                    else 
                    result[0].captain_img = row[0].captainimg;
                    }
                    else
                        result[0].captain_img = "https://s3-us-west-2.amazonaws.com/yappsimmo/meetimg/1.jpg";
                    connection.query(sqlfour,function(err,row,field){
                        if(err)res.status(400).json({"state" : 400, "err" : err});
                        else{
                            result[0].participants_num = row[0].participants_num;
                            res.status(200).json({"state": 200, "result" : result[0]});
                        }
                            
                        
                            
                    });
                }
            });
        }
    });
}
}