module.exports = function(app,connection){
    app.get('/meet/reason',function(req,res){
        console.log('get /meet/reason');
        var meetId = req.query.meetId;
        sql = "select cancelReason from cancelreasons where fk_meetId = "+ meetId +" ;";
        connection.query(sql,function(error,result,fields){
            if(error){
                console.log(error);
                res.status(400).json({"state" : 400 });
            }
            else{
                res.status(200).json({"state" : 200 ,"cancelreason" : result});
            }
            
        });
    });
}