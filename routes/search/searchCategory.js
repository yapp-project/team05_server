//사용자 카테고리 검색 결과
module.exports = function(app,connection){

    app.get('/meet/category',function(req,res){
        var category = req.query.category;
        var sql = "select m.meet_Id,m.meet_name, m.meet_datetime, m.meet_location, m.meet_explanation, m.meet_personNumMax from meettable AS m join meetinterests as j on m.meet_Id = fk_meetId  where "+category+"=1;";
        var idKeyArray = new Array();
        var index = 0;

        connection.query(sql, function(error,result,fields){
            if(error){
                res.status(400).json({"state" : 400});
                console.log(error);
            }
            else{
              res.status(200).json({"states": 200, "list" : result});

            }

        });

    });
}
