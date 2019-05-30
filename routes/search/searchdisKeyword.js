//사용자 키워드 검색 결과
module.exports = function(app, connection) {
  app.get('/meet/keyword', function(req, res) {
    var userId = req.query.userId;
    var keyword = req.query.keyword;
    var latitude = req.query.latitude;
    var longitude = req.query.longitude;
    var page = req.query.page;
    var myId = null;
    var offset, firstIndex;
    var searching = new Object();
    firstIndex = (parseInt(page) - 1) * 20;
    offset = 20;
    var sql = "select k.fk_meet_Id AS meetId, k.meet_keyword AS word from meetkeywords as k join meettable as m on k.fk_meet_Id = m.meet_Id " +
      "order by m.meet_datetime limit " + firstIndex + "," + offset + ";";
    var idKeyArray = new Array();
    connection.query(sql, function(error, result, fields) {
      if (error) {
        console.log(error);
        res.json({
          "state": 400
        });
        console.log(error);
      } else {
        var eqaulKeyword = require('../keywordModule/equalKeyword.js');
        idKeyArray = eqaulKeyword(result, keyword);
        if (idKeyArray.length > 0) {
          var sqltwo = "select m.meet_Id as meet_Id,m.meet_name as meet_name, m.meet_datetime as meet_datetime, m.meet_location as meet_location" +
            ", m.meet_personNum as meet_personNum, m.meet_latitude as meet_latitude, m.meet_longitude as meet_longitude" +
            ",i.meetImg as meet_Img from meettable as m join meetimgs as i on m.meet_Id = i.fkmeetId where ";
          for (var i = 0; i < idKeyArray.length; i++) {
            if (i != idKeyArray.length - 1) {
              sqltwo = sqltwo.concat("m.meet_Id=" + idKeyArray[i] + " or ");
            } else {
              sqltwo = sqltwo.concat("m.meet_Id=" + idKeyArray[i] + ";");
            }

          }
          connection.query(sqltwo, function(error, results, fields) {
            if (error) {
              console.log(error);
              res.json({
                "state": 400
              });
              console.log(error);
            } else {
              var write = require('../sqlModule/writeSQLPtcNum.js');
              var sql = write(results);
              console.log(results);
              connection.query(sql, function(err, row, field) {
                if (err) {
                  console.log(error);
                  res.json({
                    "state": 400
                  });
                  console.log(err);
                } else {
                  if (Object.keys(row).length > 0 && row[0].meet_Id != null) {
                    for (var i = 0; i < Object.keys(results).length; i++) {
                      results[i].participantNum = 1;
                      for (var j = 0; j < Object.keys(row).length; j++) {
                        if (results[i].meet_Id == row[j].meet_Id)
                          results[i].participantNum = row[j].count;
                      }
                    }
                  } else {
                    for (var i = 0; i < Object.keys(results).length; i++)
                      results[i].participantNum = 1;
                  }
                  var findSimmo = require('../module/findSimmo.js');
                  var sqlthree = findSimmo(myId, latitude, longitude, results);
                  connection.query(sqlthree, function(err, row, field) {
                    if (err) {
                      console.log(error);
                      res.status(400).json({"state": 400
                    });
                  }
                    else {
                      var setPtcImage = require("../imageModule/setParticipantImage.js");
                      var result = setPtcImage(results, row);
                      var distanceSort = require('../sortModule/distanceSort.js');
                      var searchingResult = distanceSort(result, latitude, longitude);
                      res.status(200).json({
                        "state": 200,
                        "list": searchingResult
                      });
                    }
                  });
                }
              });
            }
          });

        } else {
          var sql = 'select * from interests where fk_userId="' + userId + '";';
          var sql2 = ["select * from meetinterests where "];
          var interestlist = ["sports", "activity", "writing", "study", "exhibition", "music", "movie", "diy", "volunteer", "picture", "cooking", "coffee", "nail", "car", "interior", "concert", "etc"]
          var userInt = [];
          var intMeetId = [];
          connection.query(sql, function(error, results, fields) {
            if (error) {
              console.log(error);
              res.json({
                'state': 400
              });
            } else {
              for (var i = 0; i < interestlist.length; i++) {
                if (results[0][interestlist[i]] == 1) {
                  userInt.push(interestlist[i] + " = 1");
                  userInt.push(" or ");
                } else {
                  continue;
                }
              }
              userInt.splice(-1, 1);
              for (var i = 0; i < userInt.length; i++) {
                sql2.push(userInt[i]);
              }
              if (userInt.length >0) {
                var sqlthree = "select m.meet_Id as meet_Id,m.meet_name as meet_name, m.meet_datetime as meet_datetime, m.meet_location as meet_location, m.meet_personNum as meet_personNum, m.meet_latitude as meet_latitude, m.meet_longitude as meet_longitude,i.meetImg as meet_Img" +
                " from meettable as m" +
                " left join meetimgs as i on m.meet_Id = i.fkmeetId" +
                " left join meetviews as v on m.meet_Id = v.fk_meetId" +
                " left join meetinterests as mi on m.meet_Id = mi.fk_meetId where " + userInt.join(' ') + " order by v.views desc limit 5 ;"
              }else {
                var sqlthree = "select m.meet_Id as meet_Id,m.meet_name as meet_name, m.meet_datetime as meet_datetime, m.meet_location as meet_location, m.meet_personNum as meet_personNum, m.meet_latitude as meet_latitude, m.meet_longitude as meet_longitude,i.meetImg as meet_Img" +
                " from meettable as m" +
                " left join meetimgs as i on m.meet_Id = i.fkmeetId" +
                " left join meetviews as v on m.meet_Id = v.fk_meetId" +
                " left join meetinterests as mi on m.meet_Id = mi.fk_meetId order by v.views desc limit 5 ;"
              }
              connection.query(sqlthree, function(error, results, fields) {
                if (error) {
                  console.log(error);
                  res.status(400).json({
                    "state": 400
                  });
                } else {
                  if (results.length < 5) {
                    for (var i = 0; i < results.length; i++) {
                      intMeetId.push(results[i].meet_Id);
                    }
                    var sqlt = "select m.meet_Id as meet_Id,m.meet_name as meet_name, m.meet_datetime as meet_datetime, m.meet_location as meet_location, m.meet_personNum as meet_personNum, m.meet_latitude as meet_latitude, m.meet_longitude as meet_longitude,i.meetImg as meet_Img" +
                      " from meettable as m" +
                      " left join meetimgs as i on m.meet_Id = i.fkmeetId " +
                      " left join meetviews as v on m.meet_Id = v.fk_meetId" +
                      " where m.meet_Id not in (" + intMeetId.join(',') + ") order by v.views desc limit ?;"
                    connection.query(sqlt, 5 - results.length, function(error2, results2, fields2) {
                      if (error2) {
                        console.log(error);
                        res.json({
                          "state": 400
                        });
                      } else {
                        results.push(results2[0]);
                      }
                    });

                  }
                  var write = require('../sqlModule/writeSQLPtcNum.js');
                  var sql = write(results);
                  connection.query(sql, function(err, row, field) {
                    if (err) {
                      console.log(error);
                      res.json({
                        "state": 400
                      });
                    } else {
                      if (Object.keys(row).length > 0 && row[0].meet_Id != null) {
                        for (var i = 0; i < Object.keys(results).length; i++) {
                          results[i].participantNum = 1;
                          for (var j = 0; j < Object.keys(row).length; j++) {
                            if (results[i].meet_Id == row[j].meet_Id)
                              results[i].participantNum = row[j].count;
                          }
                        }
                      } else {
                        for (var i = 0; i < Object.keys(results).length; i++)
                          results[i].participantNum = 1;
                      }
                      var findSimmo = require('../module/findSimmo.js');
                      var sqlthree = findSimmo(myId, latitude, longitude, results);
                      connection.query(sqlthree, function(err, row, field) {
                        if (err){
                          console.log(err);
                          res.json({
                          "state": 400
                        });
                      }
                        else {
                          var setPtcImage = require("../imageModule/setParticipantImage.js");
                          var result = setPtcImage(results, row);
                          var distanceSort = require('../sortModule/distanceSort.js');
                          var searchingResult = distanceSort(results, latitude, longitude);
                          res.json({
                            "state": 300,
                            "list": searchingResult
                          });
                        }
                      });
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
