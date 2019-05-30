module.exports = function(app,connection){
    // 모임정보 상세 전달
    app.get('/meet/detail', function(req, res){
        console.log('get /meet/detail');
        var meetId = req.query.meetId;
        var sql = "select m.fk_meetcaptain as captain_id, m.meet_latitude as latitude,m.meet_longitude as longitude, m.meet_personNum as person_num," +
         "m.meet_explanation as meet_explanation,u.userNick as user_nick from meettable AS m join users as u on m.fk_meetcaptain = u.userId where m.meet_Id = " + meetId +";";
         var sqlone = "select m.fk_meetcaptain as captain_id, m.meet_latitude as latitude,m.meet_longitude as longitude, m.meet_personNum as person_num," +
         "m.meet_explanation as meet_explanation,u.userNick as user_nick from meetendtable AS m join users as u on m.fk_meetcaptain = u.userId where m.meet_Id = " + meetId +";";


        var sqltwo = 'INSERT INTO meetviews(fk_meetId,views) VALUES(' + meetId + ',1) ON DUPLICATE KEY UPDATE fk_meetId='+meetId+', views=views+1;';
        connection.query(sql, function(error,result,fields){
            if(error)
                res.status(400).json({"state" : 400});
            else{
             
                    if(Object.keys(result).length > 0){
                        connection.query(sqltwo, function(errortwo,resulttwo, fieldstwo){
                            if(errortwo){
                            res.status(300).json({"states" : 300});
                            console.log(errortwo);
                            }
                            else{
                        result[0].endingflag = 0;
                        var getimgdetail = require("../detailModule/getimgdetail.js");
                        getimgdetail(connection,result,res,meetId);
                            }
                        });

                }
                    else{
                        connection.query(sqlone, function(err,result,fields){
                            if(error)
                                res.status(400).json({"state" : 400});
                                else{
                                    result[0].endingflag = 1;
                                    var getimgdetail = require("../detailModule/getimgdetail.js");
                                    getimgdetail(connection,result,res,meetId);
                                }


                        });

                    }
                
            }
    });
});
}
