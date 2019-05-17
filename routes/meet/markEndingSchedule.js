module.exports = function(app,connection){
    app.put('/meet/attendant', function(req,res){
        console.log("put /meet/attendant");
        var meetId = req.body.meetId;
        var sql = "UPDATE meettable AS m SET m.meet_scheduledEnd = 1 WHERE m.meet_Id = " +meetId+";";
        connection.query(sql, function(error,result, fields){
            if(error) res.status(400).json({"state" : 400});
            else{
                var endingMeetingAlarm = require('../pushAlarm/endingMeetingAlarm.js');
                endingMeetingAlarm(connection,meetId,res);
            } 
        });
});
}