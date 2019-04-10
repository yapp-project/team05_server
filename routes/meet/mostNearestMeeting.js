//지금 나와 1km 이내에 있는 가장 가까운 모임 전달 4개까지 업로드
module.exports = function(app,connection){
    function computeDistance(startlati,startlongi,destlati,destlongi) {
        var startLatitude = degreesToRadians(startlati);
        var startLongitude = degreesToRadians(startlongi);
        var destLatitude = degreesToRadians(destlati);
        var destLongitude = degreesToRadians(destlongi);
    
        var Radius = 6371; //지구의 반경(km)
        var distance = Math.acos(Math.sin(startLatitude) * Math.sin(destLatitude) + 
                        Math.cos(startLatitude) * Math.cos(destLatitude) *
                        Math.cos(startLongitude - destLongitude)) * Radius;
        
        return distance;
    }
    function degreesToRadians(degrees) {
        var radians = (degrees * Math.PI)/180;
        return radians;
    }
    app.get('/meet/mostNearestMeeting',function(req,res){
        console.log('get /meet/mostNearestMeeting');
        var meetId = new Array();
        var longitude = req.query.myLongitude;
        var latitude = req.query.myLatitude;
        var myId = req.session.userId;
        var count = 0;
        var sqlone = "select meet_latitude, meet_longitude,meet_Id from meettable where meet_scheduledEnd = 0 and fk_meetcaptain !='"+myId+ "';";
        connection.query(sqlone,function(error,result,fields){
            if(error){
                res.status(400).json({"states" : 400});
                console.log(error);
            }
            else{
                for(var i = 0; i < Object.keys(result).length; i++){
                    var destlat = result[i].meet_latitude;
                    var destlong = result[i].meet_longitude;
                    meetId[count] = result[i].meet_Id;
                    var distance = computeDistance(latitude,longitude,destlat,destlong);
                    if(distance <= 123.0 && count < 4 ){
                        count = count + 1;
                    }
                    else if(count == 4) break;
                }
                var sqltwo = "select meet_name, meet_datetime, meet_Id, fk_meetcaptain, meet_personNumMax,"+
                "meet_location from meettable where meet_scheduledEnd = 0 and (meet_Id = "+meetId[0]+" or meet_Id = "+meetId[1]+ " or meet_Id ="
                +meetId[2]+" or meet_Id = "+meetId[3]+");";
                connection.query(sqltwo,function(error,results,fields){
                if(error){
                    res.status(400).json({"state" : 400});
                    console.log(error);
                }
                else{
                        res.status(400).json({"state" : 200, "list" : results});
                        console.log(results[0]);
                        res.end();
                    }
                });
            }
        });
        
    });
}