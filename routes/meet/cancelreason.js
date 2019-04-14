module.exports = function(app,connection){
    app.post('/meet/reason',function(req,res){
        var meetId = req.body.meetId;
        var cancelReason = req.body.cancelreason;

        var sqlone = "INSERT INTO cancelreasons SET ?; "
        var params = {
            "cancelReason" : cancelReason,
            "fk_meetId" : meetId
        };
        
        connection.query(sqlone, params, function(error,rows,fields){
            if(error){
                res.status(400).json({"state" : 400});
                console.error(error);
            }
            else
                res.status(200).json({"state" : 200});
            
        });
    });
}