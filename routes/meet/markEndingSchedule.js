module.exports = function(app,connection){
    app.put('/meet/attendant', function(req,res){
        console.log("put /meet/attendant");
        var meetId = req.body.meetId;
        var sql = "select * from meettable WHERE meet_Id = " +meetId+";";
        var sqltwo = "insert into meetendtable (fk_meetcaptain,meet_Id,meet_name,meet_datetime,meet_location,meet_latitude,meet_longitude,meet_explanation,meet_personNum) values ('";
        connection.query(sql, function(error,result, fields){
            if(error){
                res.status(400).json({"state" : 400});
                console.log(error);
            } 
            else{
               sqltwo = sqltwo.concat(result[0].fk_meetcaptain+"',"+result[0].meet_Id+",'"+result[0].meet_name+"','");
               sqltwo = sqltwo.concat(result[0].meet_datetime+"','"+result[0].meet_location+"',"+result[0].meet_latitude+","+result[0].meet_longitude+",'");
               sqltwo = sqltwo.concat(result[0].meet_explanation+"',"+result[0].meet_personNum+") union ");
               sqltwo = sqltwo.concat("delete from meettable whre meet_Id = " + meetId + ";"); 
               connection.query(sqltwo,function(err,row,field){
                if(err){
                    res.status(400).json({"state" : 400});
                    console.log(error);
                   } 
                   else{
                    var endingMeetingAlarm = require('../pushAlarm/endingMeetingAlarm.js');
                    endingMeetingAlarm(connection,meetId,res);
                   }
               });
            }

        });
});
}
