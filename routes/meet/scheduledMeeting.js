module.exports = function(app,connection){
 //메인화면 내 예정 모임 전달
    app.get('/meet/scheduled', function(req,res){
        console.log("get /meet/scheduedMeeting");
        var myId = req.session.userId;
        var sql = "select t.meet_Id, t.meet_name, t.meet_datetime, t.meet_location," +
        "t.meet_personNumMax from meettable AS t where t.meet_scheduledEnd = 0 AND t.meet_Id IN (select fk_meet_Id"+
        " from meetAttendants where fk_attendants_Id = '"+ myId +"')ORDER BY t.meet_datetime;";
        connection.query(sql,function(error,result,fields){
            if(error) res.status(400).json({"states" : 400});
            else{
                res.status(200).json({"state" : 200 , "list" : result});
                console.log(result);
            }
        });
    });
 }