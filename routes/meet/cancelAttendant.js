module.exports = function(app,connection)
{
//참여자 모임 참여 취소
    app.post('/meet/attendant/cancel', function(req,res){
        console.log("post /meet/attendant/cancel");
        var meetId = req.body.meet_Id;
        var meetCaptain;
        var attendantId = req.body.user_Id;
        var sql_one = "select fk_meetcaptain from meettable where meet_Id = " + meetId + ";";
        var sql = 'DELETE from meetAttendants where fk_attendants_Id ="'+attendantId+'" and fk_meet_Id = '+meetId+';';
        var sqltwo = "delete from endmeetAttendants where fk_attendants_Id ='" + attendantId +"' and fk_meet_Id = " + meetId +";";
        var params = {
            "fk_meet_Id" : meetId,
            "fk_attendants_Id" : attendantId
        }
        connection.query(sql_one, function(error,result, fields){
          if (error) {
            console.log(error);
            res.json({'state' : 400, "error" : error});
          }
          else {
            if (attendantId== result[0].fk_meetcaptain ) {
              res.json({'state' : 300});
            }
            else {
              connection.query(sql, function(err2,results2, fields2){
                if (error) {
                  console.log(err2);
                  res.json({'state' : 400, "error" : error});
                }
                else {
                  connection.query(sqltwo, function(err,result,field){
                    if(err){
                      console.log(err);
                      res.json({"state" : 400});
                    }
                    else{
                      res.json({'state' :200});
                    }
                  })
                  }
              });


            }
          }
        });

    });

}