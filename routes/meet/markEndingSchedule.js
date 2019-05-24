module.exports = function(app,connection){
    app.put('/meet/attendant', function(req,res){
        console.log("put /meet/attendant");
        var meetId = req.body.meetId;
        var sql = "delete from meettable WHERE meet_Id = " +meetId+";";
        connection.query(sql, function(error,result, fields){
            if(error){
                res.status(400).json({"state" : 400});
                console.log(error);
            } 
            else{
                    var endingMeetingAlarm = require('../pushAlarm/endingMeetingAlarm.js');
                    endingMeetingAlarm(connection,meetId,res);
            }

        });
});
}
