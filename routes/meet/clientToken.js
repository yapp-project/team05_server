module.exports = function(app,connection){
    app.post('/meet/client-token',function(req,res){
        console.log('post /meet/client-token')
        var usertoken = req.body.usertoken;
        var sqlone = "select fk_userId from usertokens where fk_userId = '" + req.body.userId + "';";
        var sql = "UPDATE usertokens SET usertoken = '"+usertoken+"' WHERE fk_userId = '" + req.body.userId + "';";
        var sqltwo = "INSERT INTO usertokens SET ?;";
        var params = {
            "fk_userId" : req.body.userId,
            "usertoken" : usertoken
        };
        connection.query(sqlone,function(error,rows,fields){
            if(error){res.status(400).json({"state": 400});console.log(error);}
            
            else{
                if(Object.keys(rows).length > 0){
                connection.query(sql,function(err,row,field){
                    if(err){res.status(400).json({"state": 400});console.log(err);}
                    else{
                        res.status(200).json({"state": 200});
                    }
                });
            }
                else{
                    connection.query(sqltwo,params,function(err,row,field){
                        if(err){res.status(400).json({"state": 400});console.log(err);}
                        else{
                            res.status(200).json({"state": 200});
                        }
                    });
                }
        }   
        });
    });
}