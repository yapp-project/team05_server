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
    app.get('/meet/meetId/near',function(req,res){
        console.log('get /meet/meetId/near');
        var meetId = new Array();
        var longitude = req.query.myLongitude;
        var latitude = req.query.myLatitude;
        var myId = null;
        var distance;
        var count = 0;
        var sqlone = "select meet_latitude, meet_longitude,meet_Id from meettable where meet_scheduledEnd = 0;";
        var sqltwo = "select meet_name, meet_datetime, meet_Id, fk_meetcaptain, meet_personNumMax,"+
        "meet_location from meettable where meet_scheduledEnd = 0 and ";
        connection.query(sqlone,function(error,result,fields){
            if(error){
                res.status(400).json({"states" : 400});
                console.log(error);
            }
            else if(result[0].hasOwnProperty('meet_Id')){
                var current;
                var past = new Array();
                for(var i = 0; i < Object.keys(result).length; i++){
                    if(i != 0)
                        past.push(current);
                    console.log(past);
                    current = Math.floor(Math.random() * Object.keys(result).length);
                    var destlat = result[current].meet_latitude;
                    var destlong = result[current].meet_longitude;
                    meetId[count] = result[current].meet_Id;
                    distance = computeDistance(latitude,longitude,destlat,destlong);
                    console.log("meetId" + meetId[count]);
                    if(distance <= 1.0 ){
                        if(count == 0)
                            sqltwo = sqltwo.concat(" meet_Id = " + meetId[count]);
                        else{
                            console.log("같은 거 보기 " + past.indexOf(current)+ "현재" + current);
                            while(past.indexOf(current) != -1)
                                current = Math.floor(Math.random() * count);
                            meetId[count] = result[current].meet_Id;
                            console.log(past + "현재 : " + current);
                            if(count < 4)
                                sqltwo = sqltwo.concat(" or meet_Id = " + meetId[count]);
                            else{
                                sqltwo = sqltwo.concat(" or meet_Id = " + meetId[count] + " ;");
                                break;
                            }
                        }
                    
                    count = count + 1;
                    }       
                }
                if(count == 0) res.status(300).json({"state" : 300, "string" : "there is no closest meeting."});
                else {
                    connection.query(sqltwo,function(error,results,fields){
                    if(error){
                        res.status(400).json({"state" : 400});
                        console.log(error);
                    }
                    else{
                        res.status(200).json({"state" : 200, "list" : results});
                        console.log(results);
                        res.end();
                    }
                });
                }
            }
            else 
                res.status(300).json({"state" : 300, "string" : "there is no meeting."});
        });
        
    });
}