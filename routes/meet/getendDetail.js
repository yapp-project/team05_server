module.exports = function(app,connection){
    // 모임정보 상세 전달
    app.get('/meet/enddetail', function(req, res){
        console.log('get /meet/enddetail');
        var meetId = req.query.meetId;
        var sql = "select m.fk_meetcaptain as captain_id, m.meet_latitude as latitude,m.meet_longitude as longitude, m.meet_personNum as person_num," +
         "m.meet_explanation as meet_explanation,u.userNick as user_nick from meetendtable AS m join users as u on m.fk_meetcaptain = u.userId where m.meet_Id = " + meetId +";";
         var sqltwo = "select u.userImg as participants_img from meetAttendants as m join userImg as u on m.fk_attendants_Id = u.fk_userId where " +
         "m.fk_meet_Id = " + meetId +  ";";
         var sqlthree = "select u.userImg as captain_img from meetendtable as m join userImg as u on m.fk_meetcaptain = u.fk_userId where " +
         "m.meet_Id = " + meetId + ";";
         var sqlfour = "select count(*)+1 as participants_num from endmeetAttendants where fk_meet_Id = " + meetId + ";";
         var imgArray = new Array();

       connection.query(sql, function(error,result,fields){
            if(error)
            res.status(400).json({"state" : 400, "err":error});
            else{
                    console.log(sql);
                    connection.query(sqltwo, function(err,row,field){
                        if(err) res.status(400).json({"state" : 400, "err" : err});
                        else{
                            if(Object.keys(row).length > 0){
                                for(var i = 0; i < Object.keys(row).length; i++)
                                    imgArray.push(row[i].participants_img);
                                console.log(result);
                                result[0].participants_img = imgArray;
                            }
                            
                            else
                                result[0].participants_img = null;

                            connection.query(sqlthree,function(err,row,field){
                                if(err)res.status(400).json({"state" : 400, "err" : err});
                                else{
                                    if(Object.keys(row).length > 0)
                                        result[0].captain_img = row[0].captain_img;
                                    else
                                        result[0].captain_img = null;
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
    });
});
}