//지금 나와 1km 이내에 있는 가장 가까운 모임 전달 5개까지 업로드
module.exports = function(app,connection){
var computeDistance = require('../distanceModule/computeDistance.js');

app.post('/meet/meetId/near',function(req,res){
console.log('get /meet/meetId/near');
var longitude = req.body.myLongitude;
var latitude = req.body.myLatitude;
var myId = req.body.userId;
var row = new Array();
var sqlone = "select meet_latitude, meet_longitude,meet_Id from meettable where meet_scheduledEnd = 0;";
connection.query(sqlone,function(error,result,fields){
if(error){
        res.status(400).json({"state" : 400});
        console.log(error);
    }
else if(result[0].hasOwnProperty('meet_Id')){
    var findMeeting = require('../distanceModule/findNearestMeeting.js');
    row = findMeeting(result,myId,latitude,longitude);
    var sqltwo = row[0];
    var sqlthree = row[1];
    var count = row[2];
    var meetId = row[3];
    var distance = row[4];
    if(count == 0) res.status(300).json({"state" : 300, "string" : "there is no closest meeting."});
    else {
        connection.query(sqltwo,function(error,results,fields){
        if(error){
            res.status(400).json({"state" : 400});
            console.log(error);
        }
        else{
            if(Object.keys(results).length > 0){
                console.log(results);
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
        else{
            res.status(300).json({"state" : 300});
            
        }
    }
    
});

}
}
else 
res.status(300).json({"state" : 300});
});

});
}
