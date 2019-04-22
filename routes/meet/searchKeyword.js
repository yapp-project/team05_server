//사용자 키워드 검색 결과
module.exports = function(app,connection){

    app.get('/meet/keyword',function(req,res){
        var keyword = req.query.keyword;
        var sql = "select fk_meet_Id AS meetId, meet_keyword AS word from meetkeywords;";
        var idKeyArray = new Array();
        var index = 0;

        connection.query(sql, function(error,result,fields){
            if(error){
                res.status(400).json({"state" : 400});
                console.log(error);
            }
            else{
                for(var i = 0; i < Object.keys(result).length; i++){
                    var comparisonTarget = result[i].word;
                       var target = comparisonTarget.search(keyword);
                       if(target != -1){
                           idKeyArray[index] = result[i].meetId;
                           index = index + 1;
                       }
                    }
                    if(idKeyArray.length > 0){
                        var sqltwo = "select m.meet_Id,m.meet_name, m.meet_datetime, m.meet_location, m.meet_explanation, m.meet_personNumMax "
                            +"from meettable AS m where ";
                        for(var i = 0; i < idKeyArray.length; i++){
                            if(i != idKeyArray.length - 1){
                                sqltwo = sqltwo.concat("m.meet_Id="+idKeyArray[i]+" or ");
                                console.log(sqltwo);
                            }
                            else
                                sqltwo = sqltwo.concat("m.meet_Id="+idKeyArray[i]+" ;");
                        }


                            connection.query(sqltwo,function(error,results,fields){
                                if(error) res.status(400).json({"states": 400});
                                else{
                                    res.status(200).json({"states": 200, "list" : results});
                                    console.log(results);
                                }
                            });
                }
                else{
                  var sqlthree = "select m.meet_Id,m.meet_name, m.meet_datetime, m.meet_location, m.meet_explanation, m.meet_personNumMax from meettable as m join meetviews as v on m.meet_Id = v.fk_meetId order by v.views asc limit 3;"
                  connection.query(sqlthree,function(error,results,fields){
                      if(error) {
                        console.log(error);
                        res.status(400).json({"states": 400});
                      }else{
                          res.status(300).json({"states": 300, "list" : results});
                          console.log(results);
                      }
                  });
                    // res.status(300).json({"states" : 300, "string" : "there is no meeting for the keyword."});
                }
            }

        });

    });
}
