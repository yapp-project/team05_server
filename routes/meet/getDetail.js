module.exports = function(app,connection){
    // 모임정보 상세 전달
    app.get('/meet/detail', function(req, res){
        console.log("get /meet/detail");
        var meetId = req.query.meet_Id;
        var sql = "select m.meet_Id,m.meet_name,m.fk_meetcaptain, m.meet_datetime, m.meet_location,m.meet_latitude,m.meet_longitude,m.meet_explanation, m.meet_personNumMax "
        +"from meettable AS m where m.meet_Id = " + meetId +";" ;
        //var sqltwo = 'INSERT INTO meetviews(fk_meetId,views) VALUES(' + meetId + ',1) ON DUPLICATE KEY UPDATE fk_meetId='+meetId+', views=views+1;';
        //console.log(sqltwo);
        //var sqltwo = 'IF EXISTS( SELECT fk_meetId FROM meetviews where fk_meetId='+meetId+') BEGIN UPDATE meetviews SET views = views+1 where fk_meetId ='+ meetId+'END ELSE BEGIN INSERT INTO meetviews(fk_meetId,views) VALUES('+meetId+',1) END';
        connection.query(sql, function(error,result, fields){
            if(error)
            res.status(400).json({"states" : 400});
            else{
              //connection.query(sqltwo, function(errortwo,resulttwo, fieldstwo){
                  //if(errortwo)
                  //res.status(300).json({"states" : 300});
                  //else{

                      res.status(200).json({"state" : 200 , "list" : [result[0]]});
                      console.log(result[0]);
                  //}
                   //res.end();
              }
            });
    });
}