module.exports = function(app,connection){
    app.put('/meet/attendant', function(req,res){
        console.log("put /meet/attendant");
        var meetId = req.body.meetId;
        var sql = "delete from meettable WHERE meet_Id = " +meetId+";";
        var sqlone = "insert into meetinfo (fk_meetId,flag,date,isEnded) values(" +meetId+",1,now(),1);";
        connection.query(sql, function(error,result, fields){
            if(error){
                res.status(400).json({"state" : 400});
                console.log(error);
            } 
            else{
                connection.query(sqlone, function(err,result,field){
                    if(err){ 
                        res.status(400).json({"state": 400});
                        console.log(err);
                }
                else{
                    res.status(200).json({"state":200});
                }
                    
                });
                    //var endingMeetingAlarm = require('../pushAlarm/endingMeetingAlarm.js');
                    //endingMeetingAlarm(connection,meetId,res);
            }

        });
});
}
