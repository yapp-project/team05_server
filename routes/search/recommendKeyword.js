module.exports = function(app,connection){
    app.get("/search/keyword",function(req,res){
        var sql = "select keyword from keywordnums order by keywordCount desc limit 0,5;"
        connection.query(sql,function(err,row,field){
            if(err){
                res.status(400).json({"state":400});
                console.log(err);
            }
            else{
                res.status(200).json({"state": 200, "keyword": row});
            }
        });

    });
}