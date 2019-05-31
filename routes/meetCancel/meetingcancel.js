module.exports = function(app, connection){
    app.post('/meet/meetId',function(req,res){
        console.log('post /meet/meetId');
        var meetId = req.body.meetId;
        var cancelReason = req.body.cancelreason;

        var sqlone = "INSERT INTO cancelreasons SET ?; ";
        var sql = "DELETE from meettable where meet_Id = " + meetId + ";";
        var sqltwo = "insert into meetinfo (fk_meetId,flag,date,isEnded) values ("+meetId+",0,now(),1);";
        var params = {
            "cancelReason" : cancelReason,
            "fk_meetId" : meetId
        };
        
        connection.query(sqlone, params, function(error,rows,fields){
            if(error){
                res.status(400).json({"state" : 400});
                console.error(error);
            }
            else{
                connection.query(sql, function(error,row,field){
                    if(error){
                        res.status(400).json({"state" : 400});
                        console.error(error);
                }
                    else{
                        connection.query(sqltwo, function(err,row,field){
                            if(err){
                                res.status(400).json({"state": 400});
                                console.log(err);
                            }
                            else{
                                res.status(200).json({"state" : 200});
                            }
                        });
                }
                
                });
            }
        });  
        
    });
}