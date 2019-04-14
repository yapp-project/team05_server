module.exports = function(app,connection){
    app.post('/meet/client-token',function(req,res){
        var usertoken = req.body.usertoken;
        var sql = "INSERT INTO usertoken SET ?;";
        var params = {
            "fk_userId" : req.session.userId,
            "client_token" : usertoken
        };
        connection.query(sql,params,function(error,rows,fields){
            if(error)res.status(400).json({"state": 400});
            else
                res.status(200).json({"state" : 200});
        });
    });
}