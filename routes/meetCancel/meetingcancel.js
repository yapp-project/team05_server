module.exports = function(app, connection){
    app.post('/meet/meetId',function(req,res){
        var meetId = req.body.meetId;
        var sqlone = "DELETE from meetAttendants where fk_meet_Id = " + meetId + ";";
        var sqltwo = "DELETE from meettable where meet_Id = " + meetId + ";";
        connection.query(sqlone, function(error,rows,fields){
            if(error){
                res.status(400).json({"state" : 400});
                console.error(error);
            }
            else{

        connection.query(sqltwo, function(error,row,field){
            if(error){
                res.status(400).json({"state" : 400});
                console.error(error);
            }
            else
                res.status(200).json({"state" : 200});
        });
    }
});  
        
    });
}