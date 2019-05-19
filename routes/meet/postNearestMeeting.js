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
    var count = row[1];
    var sql = row[0];
    var meetId = row[2];
    var distance = row[3];
    if(count == 0) res.status(300).json({"state" : 300, "string" : "there is no closest meeting."});
    else {

        connection.query(sql,function(error,results,fields){
        if(error){
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
                    else if(row[0].count != 0){
                        for(var i = 0; i < Object.keys(results).length; i++){
                            results[i].participantNum = 1;
                            for(var j = 0; j < Object.keys(row).length; j++){
                                if(results[i].meet_Id == row[j].meet_Id)
                                    results[i].participantNum = row[j].count;
                        }      
                    }
                        var writesql = require('../sqlModule/writeSQLPtcImg.js');
                        var sqltwo = writesql(row,results); 
                        console.log(sqltwo);
                    connection.query(sqltwo, function(err,rows,field){
                        if(err){
                        res.status(400).json({"state":400});
                        console.log(err);
                        }
                        else{
                            var getimage = require('../imageModule/getimageObject.js');
                            results = getimage(results,rows);
                        }
                        });
                        }
                else{
                    for(var i = 0; i < Object.keys(results).length; i ++){
                        results[i].participantimg = "nuldsfl";
                        results[i].participantNum = 1;

                    }
                }
            });          
        }
    }
    res.status(200).json({"state" : 200, "list" : results});
});

}
}
else 
res.status(300).json({"state" : 300, "string" : "there is no meeting."});
});

});
}
