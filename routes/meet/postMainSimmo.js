module.exports = function(app,connection){
 //메인화면 내 실시간심모
 var computeDistance = require('../distanceModule/computeDistance.js');
    app.post('/meet/scheduled', function(req,res){
        console.log("post /meet/scheduled");
        var myId = req.body.userId;
        var latitude = req.body.latitude;
        var longitude = req.body.longitude;
        var count = req.body.meetPage;
        var distance = new Array();
        var offset, firstIndex;
        var findSimmo = require("../module/findSimmo.js");
        var sql = "select m.meet_name as meet_name, m.meet_datetime as meet_datetime , m.meet_Id as meet_Id," +
        "m.meet_personNum as meet_personNum, m.meet_location as meet_location, m.meet_latitude as meet_latitude, m.meet_longitude as meet_longitude,"+
         "i.meetImg as meet_Img from meettable AS m Join meetimgs AS i ON m.meet_Id = i.fkmeetId where meet_scheduledEnd = 0 and fk_meetcaptain != '" + myId + "'"+
         " ORDER BY meet_datetime" +" limit " + firstIndex +", " + offset +";";
       
        connection.query(sql,function(error,results,fields){
            if(error) {
                res.status(400).json({"state" : 400});
                console.log(error);
            }
            else{
                var sqltwo = findSimmo(myId,latitude,longitude,count,results);
                connection.query(sqltwo,function(error,row,field){
                    if(error)res.status(400).json({"state":400, "err" : error});
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
                        connection.query(sqlthree, function(err,row,field){
                            if(err){
                                res.status(400).json({"state":400});
                                console.log(err);
                            }
                            else{
                                var setPtcImage = require("../imageModule/setParticipantImage.js");
                                var result = setPtcImage(results,row);
                                var sort = require("../sortModule/distanceSort.js");
                                var list= sort(result,latitude,longitude);
                                res.status(200).json({"state": 200,"list" : list});
                            }
                        });
                    }
            });          
        }
                   }
                });
            }
        });
    });
 }