module.exports = function(connection,meetId,res){
    var sql = "select m.fk_meetcaptain as meetcaptain, m.meet_name as meetname,a.fk_attendants_Id as attendant from meettable " +
    "as m join meetAttendants as a on m.meet_Id = a.fk_meet_Id where m.meet_Id = " + meetId+";";
    connection.query(sql,function(error,rows,field){
        if(error){res.status(400).json({"state": 400});console.log(error);}
        else{
            var sql = "select usertoken,fk_userId as userId from usertokens where fk_userId = '";
            if(Object.keys(rows).length > 0){
            for(var i = 0; i < Object.keys(rows).length; i++){
                if(i == Object.keys(rows).length-1)
                    sql = sql.concat(rows[i].attendant+"';");
                else
                    sql = sql.concat(rows[i].attendant+"' or userId = '");
            }
            connection.query(sql,function(err,row,field){
                if(err){res.status(400).json({"state":400});console.log(err);}
                else{
                    var clientToken = new Array();
                    for(var i = 0; i < rows.length; i++)
                        clientToken.push(rows[i].clientToken);
                    var pushdata = require('./getendingData.js');
                    var push_data = pushdata(clientToken,rows[0].meetcaptain,rows[0].meetname);
                    var fcmAlarm = require('./fcmAlarm.js');
                    fcmAlarm(push_data,res);
                }
            });
        }
        else{
            res.status(200).json({"state": 200});
        }
            
        }

    });

}