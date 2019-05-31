module.exports = function(app, connection)
{
  //mypage 호출시 모임히스토리 정보 응답
  app.get('/mypage/meetHistory', (req, res) => {
    console.log("get /mypage/meetHistory");
    var myId = null;
    var userId = req.query.userId;
    var latitude = req.query.latitude;
    var longitude = req.query.longitude;
    var sql = 'SELECT m.meet_Id as meet_Id,m.meet_name as meet_name, m.meet_datetime as meet_datetime, m.meet_location as meet_location, m.meet_personNum as meet_personNum, m.meet_latitude as meet_latitude, m.meet_longitude as meet_longitude,i.meetImg as meet_Img ' +
      'from meetendtable as m ' +
      'left join meetimgs as i on m.meet_Id = i.fkmeetId ' +
      'where meet_Id in ((SELECT fk_meet_Id FROM endmeetAttendants  WHERE fk_meet_Id not in (select meet_Id from meettable) and  fk_attendants_Id ="'+userId+'"),(SELECT meet_Id FROM meetendtable WHERE meet_Id not in (select meet_Id from meettable) and  fk_meetcaptain ="'+userId+'" ));'
    connection.query(sql, function(error, results, fields) {
      console.log(sql);
      if (error) {
        console.log(error);
        res.json({
          'state': 400
        });
      } else {
        var write = require('../sqlModule/writeSQLPtcNum.js');
        var sql2 = write(results);
        connection.query(sql2, function(err, row, field) {
          if (err) {
            res.status(400).json({
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
                  "state": 200,
                  "list": searchingResult
                });
              }
            });
          }
        });
      }
    })


  });

}
