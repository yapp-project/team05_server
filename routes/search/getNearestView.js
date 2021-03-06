module.exports = function(app,connection){
    //검색 메인 가장 가까운 순
       app.get('/meet/dsearch', function(req,res){
           console.log("get /meet/dsearch");
           var myId = req.query.userId;
           var latitude = req.query.latitude;
           var longitude = req.query.longitude;
           var count = req.query.page;
           var distancebool = req.query.distancebool;
           var offset, firstIndex;
           firstIndex = (parseInt(count)-1) * 20;
           offset = 20;
           var findSimmo = require("../module/findSimmo.js");
           var sql = "select m.meet_name as meet_name, m.meet_datetime as meet_datetime , m.meet_Id as meet_Id," +
           "m.meet_personNum as meet_personNum, m.meet_location as meet_location, m.meet_latitude as meet_latitude, m.meet_longitude as meet_longitude,"+
            "i.meetImg as meet_Img from meettable AS m Join meetimgs AS i ON m.meet_Id = i.fkmeetId where fk_meetcaptain != '" + myId+"';";
        if(distancebool == 1){
           connection.query(sql,function(error,results,fields){
               if(error) {
                   res.status(400).json({"state" : 400});
                   console.log(error);
               }
               else{
                if(Object.keys(results).length > 0){
                               var write = require('../sqlModule/writeSQLPtcNum.js');
                               var sql = write(results);
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
                                       var sqltwo = findSimmo(myId,latitude,longitude,results);
                                        connection.query(sqltwo,function(err,row,field){
                                        if(err){
                                            res.status(400).json({"state" : 400});
                                            console.log(err);
                                        }
                                        else{
                                               var setPtcImage = require("../imageModule/setParticipantImage.js");
                                               var result = setPtcImage(results,row);
                                               var distanceSort = require('../sortModule/distanceSort.js');
                                               var list = distanceSort(result,latitude,longitude);
                                               var searcing = new Object();
                                               var count = 0;
                                               for(var i = firstIndex; i< Object.keys(searchingResult).length; i++){
                                                   searcing.distance = list[i].distance;
                                                    searching.meetId = list[i].meet_Id;
                                                    searching.meetName = list[i].meet_name;
                                                    searching.meetDateTime = list[i].meet_datetime;
                                                    searching.meetlocation = list[i].meet_location;
                                                    searching.meet_personNum = list[i].meet_personNum;
                                                    searching.meet_Img = list[i].meet_Img;
                                                    searching.participantNum = list[i].participantNum;
                                                    searching.participantImg = list[i].participantImg;
                                                   count = count + 1;
                                                   if(count == offset) break;
                                                   
                                               }
                                               res.status(200).json({"state": 200, "list" : searching});
                                        }
                                    });
                       }
                   });
               
          
        }
        else{
            res.json({"state" : 300});
        }
       }
       });
    }
    else{
        var timeview = require('./getTimeView.js');
        timeview(myId,latitude,longitude,count,res,connection);
    }
   });
    }