module.exports = function(app, connection){
    app.post('/meet/meetId',function(req,res){
        var meetId = req.body.meetId;
        var sql = "DELETE from meettable where meet_Id = " + meetId + ";";
        var sqlone = "insert into meetinfo (fk_meetId,flag,date,isEnded) values ("+meetId+",0,now(),1);";
        var sqltwo = 'CREATE EVENT ' +'event_'+String(meetId)+" on schedule AT date_add(now(),interval 1 month)"+
        +" do delete from meetendtable WHERE meet_Id = "+meetId+";";
        
        connection.query(sql, function(error,row,field){
            if(error){
                res.status(400).json({"state" : 400});
                console.error(error);
            }
            else{
                connection.query(sqlone, function(err,row,field){
                    if(err){
                        res.status(400).json({"state": 400});
                        console.log(err);
                    }
                    else{
                        res.status(200).json({"state" : 200});
                    }
                })
            }
                
});  
        
    });
}