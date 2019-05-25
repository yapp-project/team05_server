module.exports = function(app,connection){
    // 모임정보 상세 전달
    app.get('/meet/detail', function(req, res){
        console.log('get /meet/detail');
        var meetId = req.query.meetId;
        var sql = "select m.fk_meetcaptain as captain_id, m.meet_latitude as latitude,m.meet_longitude as longitude, m.meet_personNum as person_num," +
         "m.meet_explanation as meet_explanation,u.userNick as user_nick from meettable AS m join users as u on m.fk_meetcaptain = u.userId where m.meet_Id = " + meetId +";";
         var sqlone = "select m.fk_meetcaptain as captain_id, m.meet_latitude as latitude,m.meet_longitude as longitude, m.meet_personNum as person_num," +
         "m.meet_explanation as meet_explanation,u.userNick as user_nick from meetendtable AS m join users as u on m.fk_meetcaptain = u.userId where m.meet_Id = " + meetId +";";
        

        /*var sqltwo = 'INSERT INTO meetviews(fk_meetId,views) VALUES(' + meetId + ',1) ON DUPLICATE KEY UPDATE fk_meetId='+meetId+', views=views+1;';
        console.log(sqltwo);
        var sqltwo = 'IF EXISTS( SELECT fk_meetId FROM meetviews where fk_meetId='+meetId+') BEGIN UPDATE meetviews SET views = views+1 where fk_meetId ='+ meetId+'END ELSE BEGIN INSERT INTO meetviews(fk_meetId,views) VALUES('+meetId+',1) END';
        */connection.query(sql, function(error,result,fields){
            if(error)
                res.status(400).json({"state" : 400});
            else{
             /* connection.query(sqltwo, function(errortwo,resulttwo, fieldstwo){
                  if(errortwo){
                  res.status(300).json({"states" : 300});
                  console.log(errortwo);
                  }
                  else{*/
                    console.log(sql);
                    if(Object.keys(result).length > 0){
                        var getimgdetail = require("../detailModule/getimgdetail.js");
                        var detailObject = getimgdetail(connection,result,res,meetId);
                        detailObject.endingflag = 0;
                        res.status(200).json({"state": 200, "result" : detailObject});
                }
                    else{
                        connection.query(sqlone, function(err,result,fields){
                            if(error)
                                res.status(400).json({"state" : 400});
                                else{
                                    var getimgdetail = require("../detailModule/getimgdetail.js");
                                    var detailObject = getimgdetail(connection,result,res,meetId);
                                    detailObject.endingflag = 1;
                                    res.status(200).json({"state": 200, "result" : detailObject});
                                }
                            
                            
                        });
                        
                    }
                }
                   //res.end();
              //});
            //}
    });
});
}