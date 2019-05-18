//사용자 키워드 검색 결과
module.exports = function(app,connection){
    app.get('/meet/keyword',function(req,res){
        var keyword = req.query.keyword;
        var latitude = req.query.latitude;
        var longitude = req.query.longitude;
        var meetPage = req.query.meetPage;
        var offset, firstIndex;
        var searching = new Object();
        firstIndex = (parseInt(meetPage)-1) * 20;
        offset = 20;
        var sql = "select fk_meet_Id AS meetId, meet_keyword AS word from meetkeywords;";
        var idKeyArray = new Array();

        connection.query(sql, function(error,result,fields){
            if(error){
                res.status(400).json({"state" : 400});
                console.log(error);
            }
            else{
                var eqaulKeyword = require('../module/equalKeyword.js');
                idKeyArray = eqaulKeyword(result,keyword);            
                    if(idKeyArray.length > 0){
                        var sqltwo = "select meet_Id,meet_name, meet_datetime, meet_location, meet_personNum, " + 
                        "meet_latitude as latitude, meet_longitude as longitude from meettable where ";
                        for(var i = 0; i < idKeyArray.length; i++){
                            if(i != idKeyArray.length - 1){
                                sqltwo = sqltwo.concat("meet_Id="+idKeyArray[i]+" or ");
                                console.log(sqltwo);
                            }
                            else
                                sqltwo = sqltwo.concat("meet_Id="+idKeyArray[i]+" limit " + firstIndex +", " + offset +";");
                        }


                            connection.query(sqltwo,function(error,results,fields){
                                if(error) {res.status(400).json({"state": 400});
                            console.log(error);}
                                else{
                                    var distanceSort = require('../module/distanceSort.js');
                                    var searchingResult = distanceSort(results,latitude,longitude);
                                    res.status(200).json({"state": 200, "list" : searchingResult});
                                    
                                }
                            });
                }
                else{
                    var sqlthree = "select m.meet_Id,m.meet_name, m.meet_datetime, m.meet_location, m.meet_explanation, m.meet_personNumMax from meettable as m join meetviews as v on m.meet_Id = v.fk_meetId order by v.views asc ;"
                    connection.query(sqlthree,function(error,results,fields){
                      if(error) {
                        console.log(error);
                        res.status(400).json({"state": 400});
                      }else{
                          res.status(300).json({"state": 300, "list" : results});
                          console.log(results);
                      }
                  });
                    // res.status(300).json({"states" : 300, "string" : "there is no meeting for the keyword."});
                }
            }

        });

    });
}