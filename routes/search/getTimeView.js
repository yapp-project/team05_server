module.exports = function(myId,latitude,longitude,count,res,connection){
    //검색 메인 가장 가까운 시간 순
           var offset, firstIndex;
           firstIndex = (parseInt(count)-1) * 20;
           offset = 20;
           var findSimmo = require("../module/findSimmo.js");
           var sql = "select m.meet_name as meetName, m.meet_datetime as meetDatetime , m.meet_Id as meetId," +
           "m.meet_personNum as meet_personNum, m.meet_location as meetlocation, m.meet_latitude as latitude, m.meet_longitude as longitude,"+
            "i.meetImg as meet_Img from meettable AS m Join meetimgs AS i ON m.meet_Id = i.fkmeetId where fk_meetcaptain != '" + myId+"' ORDER BY meet_datetime limit "+firstIndex+ ","+offset+" ;";
            console.log(sql);
           connection.query(sql,function(error,results,fields){
               if(error) {
                   res.status(400).json({"state" : 400});
                   console.log(error);
               }
               else{
                   console.log(results);
                   var sqltwo = findSimmo(myId,latitude,longitude,results);
                   connection.query(sqltwo,function(err,row,field){
                       if(err){
                           res.status(400).json({"state" : 400});
                           console.log(err);
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
                                       var findSimmo = require('../module/findSimmo.js');
                                       var sqlthree= findSimmo(myId,latitude,longitude,results);
                                       connection.query(sqlthree,function(err,row,field){
                                           if(err) res.status(400).json({"state": 400, "err" : err});
                                           else{
                                               var setPtcImage = require("../imageModule/setParticipantImage.js");
                                               var result = setPtcImage(results,row);
                                              
                                               res.status(200).json({"state": 200, "list" : result});
                                           }
                                       });
                       }
                   });
               }
               else{
                   res.status(300).json({"state" : 300});
               }
           }
           });
       }
       
   });
    }