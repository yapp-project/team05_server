//사용자 키워드 검색 결과
module.exports = function(app,connection){
    app.get('/meet/keyword',function(req,res){
        var keyword = req.query.keyword;
        var latitude = req.query.latitude;
        var longitude = req.query.longitude;
        var page = req.query.page;
        var myId = null;
        var offset, firstIndex;
        var searching = new Object();
        firstIndex = (parseInt(page)-1) * 20;
        offset = 20;
        var sql = "select k.fk_meet_Id AS meetId, k.meet_keyword AS word from meetkeywords as k join meettable as m on k.fk_meet_Id = m.meet_Id "+
         "order by m.meet_datetime limit " +firstIndex+","+offset+";";
        var idKeyArray = new Array();
            connection.query(sql, function(error,result,fields){
            if(error){
                res.status(400).json({"state" : 400});
                console.log(error);
            }
            else{
                var eqaulKeyword = require('../keywordModule/equalKeyword.js');
                idKeyArray = eqaulKeyword(result,keyword);
                    if(idKeyArray.length > 0){
                        var sqltwo = "select m.meet_Id as meet_Id,m.meet_name as meet_name, m.meet_datetime as meet_datetime, m.meet_location as meet_location"+
                        ", m.meet_personNum as meet_personNum, m.meet_latitude as meet_latitude, m.meet_longitude as meet_longitude" +
                        ",i.meetImg as meet_Img from meettable as m join meetimgs as i on m.meet_Id = i.fkmeetId where ";
                        for(var i = 0; i < idKeyArray.length; i++){
                            if(i != idKeyArray.length - 1){
                                sqltwo = sqltwo.concat("m.meet_Id="+idKeyArray[i]+" or ");
                            }
                            else{
                                sqltwo = sqltwo.concat("m.meet_Id="+idKeyArray[i]+";");
                            }

                        }
                        console.log(sqltwo);
                            connection.query(sqltwo,function(error,results,fields){
                                if(error) {
                                    res.status(400).json({"state": 400});
                                console.log(error);
                                }
                                else{
                                        var write = require('../sqlModule/writeSQLPtcNum.js');
                                        var sql = write(results);
                                        console.log(results);
                                        connection.query(sql,function(err,row,field){
                                            if(err){
                                                res.status(400).json({"state":400});
                                                console.log(err);
                                            }
                                            else{
                                                if(Object.keys(row).length > 0 && row[0].meet_Id != null){
                                                    for(var i = 0; i < Object.keys(results).length; i++){
                                                        results[i].participantNum = 1;
                                                        for(var j = 0; j < Object.keys(row).length; j++){
                                                            if(results[i].meet_Id == row[j].meet_Id)
                                                                results[i].participantNum = row[j].count;
                                                        }
                                                    }
                                                }
                                                else{
                                                    for(var i = 0; i < Object.keys(results).length; i++)
                                                        results[i].participantNum = 1;
                                                }
                                    var findSimmo = require('../module/findSimmo.js');
                                    var sqlthree= findSimmo(myId,latitude,longitude,results);
                                    connection.query(sqlthree,function(err,row,field){
                                        if(err) res.status(400).json({"state": 400, "err" : err});
                                        else{
                                            var setPtcImage = require("../imageModule/setParticipantImage.js");
                                            var result = setPtcImage(results,row);
                                            var distanceSort = require('../sortModule/distanceSort.js');
                                            var searchingResult = distanceSort(result,latitude,longitude);
                                            res.status(200).json({"state": 200, "list" : searchingResult});
                                        }
                                    });
                                }
                            });
            }
        });

    }else {
      var sqlthree = "select m.meet_Id as meet_Id,m.meet_name as meet_name, m.meet_datetime as meet_datetime, m.meet_location as meet_location, m.meet_personNum as meet_personNum, m.meet_latitude as meet_latitude, m.meet_longitude as meet_longitude,i.meetImg as meet_Img from meettable as m left join meetimgs as i on m.meet_Id = i.fkmeetId left join meetviews as v on m.meet_Id = v.fk_meetId order by v.views desc limit 5 ;"
                          connection.query(sqlthree,function(error,results,fields){
                            if(error) {
                              console.log(error);
                              res.status(400).json({"state": 400});
                            }else{
                              var write = require('../sqlModule/writeSQLPtcNum.js');
                              var sql = write(results);
                              console.log(sql);
                              connection.query(sql,function(err,row,field){
                                  if(err){
                                      res.status(400).json({"state":400});
                                      console.log(err);
                                  }
                                  else{
                                      if(Object.keys(row).length > 0 && row[0].meet_Id != null){
                                          for(var i = 0; i < Object.keys(results).length; i++){
                                              results[i].participantNum = 1;
                                              for(var j = 0; j < Object.keys(row).length; j++){
                                                  if(results[i].meet_Id == row[j].meet_Id)
                                                      results[i].participantNum = row[j].count;
                                              }
                                          }
                                      }
                                      else{
                                          for(var i = 0; i < Object.keys(results).length; i++)
                                              results[i].participantNum = 1;
                                      }
                          var findSimmo = require('../module/findSimmo.js');
                          var sqlthree= findSimmo(myId,latitude,longitude,results);
                          connection.query(sqlthree,function(err,row,field){
                              if(err) res.status(400).json({"state": 400, "err" : err});
                              else{
                                  var setPtcImage = require("../imageModule/setParticipantImage.js");
                                  var result = setPtcImage(results,row);
                                  var distanceSort = require('../sortModule/distanceSort.js');
                                  var searchingResult = distanceSort(results,latitude,longitude);
                                  res.json({"state": 300, "list" : searchingResult});
                              }
                          });
                      }
                  });
                            }
                        });



    }


}
    });

});

}
