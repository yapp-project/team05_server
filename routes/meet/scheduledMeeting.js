module.exports = function(app,connection){
 //메인화면 내 실시간심모
    app.get('/meet/scheduled', function(req,res){
        console.log("get /meet/scheduedMeeting");
        var myId = req.session.userId;
        var count = req.query.meetPage;
        var offset, firstIndex;
        firstIndex = (parseInt(count)-1) * 20;
        offset = 20;
        var sql = "select t.meet_Id, t.meet_name, t.meet_datetime, t.meet_location," +
        "t.meet_personNumMax from meettable AS t where t.meet_scheduledEnd = 0 ORDER BY t.meet_datetime" +" limit " + firstIndex +", " + offset +";";
        connection.query(sql,function(error,result,fields){
            if(error) {
                res.status(400).json({"states" : 400});
                console.log(error);
            }
            else{
                res.status(200).json({"state" : 200 , "list" : result});
                console.log(result);
            }
        });
    });
 }