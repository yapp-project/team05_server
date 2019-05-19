module.exports = function(app,connection){
 //메인화면 내 실시간심모
 var computeDistance = require('../module/computeDistance.js');
    app.post('/meet/scheduled', function(req,res){
        console.log("get /meet/scheduedMeeting");
        var myId = req.body.userId;
        var latitude = req.body.latitude;
        var longitude = req.body.longitude;
        var count = req.body.meetPage;
        var distance = new Array();
        var offset, firstIndex;
        firstIndex = (parseInt(count)-1) * 20;
        offset = 20;
        var sql = "select meet_Id, meet_name, meet_datetime, meet_location, meet_latitude as latitude, meet_longitude as longitude, " +
        "meet_personNum from meettable where meet_scheduledEnd = 0 ORDER BY meet_datetime" +" limit " + firstIndex +", " + offset +";";
        connection.query(sql,function(error,result,fields){
            if(error) {
                res.status(400).json({"state" : 400});
                console.log(error);
            }
            else{
                for(var i = 0; i < Object.keys(result).length; i++){
                    distance[i] = computeDistance(latitude,longitude,result[i].latitude,result[i].longitude);
                    result[i].distance = distance[i].toFixed(4);
                }
                res.status(200).json({"state" : 200 , "list" : result});
                console.log(result);
            }
        });
    });
 }