module.exports = function(app,connection)
{
    app.put('/meet/info',function(req, res){
        console.log('post /meet/info');
        var meet_Id = req.body.meetId;
        var meet_name = req.body.name;
        var meet_longitude = req.body.longitude;
        var sql = 'update meettable SET ? where meet_Id = '+meet_Id+';';
        var date = req.body.datetime;
        var param = new Object();
        var params = {
            "meet_name" : meet_name,
            "meet_datetime" : date,
            "meet_location" : req.body.location,
            "meet_latitude" : req.body.latitude,
            "meet_longitude" : req.body.longitude,
            "meet_explanation" : req.body.explanation,
            "meet_personNum" : req.body.personNum
        };
        
        connection.query(sql,params, function (error, result,fields){
            if(error) {
                res.status(400).json({"state" : 400});
                console.error('error'+ error);
            }
            else{
                var sqlone = "update meetendtable set ? where meet_Id ="+meet_Id+";";
                connection.query(sqlone,params,function(err,row,field){
                    if(err){
                        res.status(400).json({"state" : 400});
                        console.err("err " + err);
                    }
                    else{
                       
                        var sqlfive = 'alter EVENT ' +'event_'+String(meet_Id)+" on schedule AT '"+date
                        +"' do delete from meettable WHERE meet_Id = "+meet_Id+";";
                        connection.query(sqlfive, function(err, row, fields){
                            if(err){
                                res.status(400).json({"state" : 400});
                                console.error('error'+ err);
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
            
