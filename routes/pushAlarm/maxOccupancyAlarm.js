module.exports = function(meetId,res,connection){
        var sql = "select fk_meetcaptain as meetcaptain, meet_name as meetname from meettable where meet_Id = " + meetId + ";";
        console.log(sql);
        connection.query(sql,function(error,row,field){
            if(error) res.status(400).json({"state": 400});
            else{
                var meetcaptain = row[0].meetcaptain;
                var meetname = row[0].meetname;
                var sql = "select usertoken as token from usertokens where fk_userId = '" + meetcaptain +"' ;";
                connection.query(sql, function(error,row,field){
                    if(error) res.status(400).json({"state" : 400,"err": error});
                    else{
                        var meetCaptainToken = row[0].token;
                        var getMaxData = require('./getMaxData.js');
                        var pushdata = getMaxData(meetCaptainToken,meetname);
                        var fcmAlarm = require('./fcmAlarm.js');
                        fcmAlarm(pushdata,res);
                    }
                })

            }
             
        });
}