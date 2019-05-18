//지금 나와 1km 이내에 있는 가장 가까운 모임 전달 5개까지 업로드
module.exports = function(app,connection){
    var computeDistance = require('../module/computeDistance.js');
    
    app.post('/meet/meetId/near',function(req,res){
        console.log('get /meet/meetId/near');
        var meetId = new Array();
        var computeDistance = require('../module/computeDistance.js');
        var longitude = req.body.myLongitude;
        var latitude = req.body.myLatitude;
        var myId = req.body.userId;
        console.log(longitude,latitude,myId);
        var distance = new Array(); 
        var count = 0;
        var sqlone = "select meet_latitude, meet_longitude,meet_Id from meettable where meet_scheduledEnd = 0;";
        var sqltwo = "select meet_name, meet_datetime, meet_Id, fk_meetcaptain, meet_personNum,"+
        "meet_location from meettable where meet_scheduledEnd = 0 and fk_meetcaptain != '" + myId + "' and(";
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
                    current = Math.floor(Math.random() * Object.keys(result).length);
                    console.log("현재 값 " + current);
                    
                    console.log("존재하는지 아닌지 여부 " + past.indexOf(current) + " 과거 " +past);
		            while(past.indexOf(current) != -1){
                                        current = Math.floor(Math.random() * Object.keys(result).length);
                                        console.log("변화하는 값 "+current);
                                }
                    var destlat = result[current].meet_latitude;
                    var destlong = result[current].meet_longitude;
                    meetId[count] = result[current].meet_Id;
                    distance[count] = computeDistance(latitude,longitude,destlat,destlong);
                    console.log(distance[count]);
                    if(distance[count] <= 1.0 ){
                        if(count == 0)
                            sqltwo = sqltwo.concat(" meet_Id = " + meetId[count]);
                        else{
                                if(count < 4)
                                	sqltwo = sqltwo.concat(" or meet_Id = " + meetId[count]);
                                else
                                    sqltwo = sqltwo.concat(" or meet_Id = " + meetId[count] + " );");
                        }
                        console.log(past + " 현재 : " + current + " count " + count);
                        console.log(sqltwo);
                        count = count + 1;  
                }
                    if(count == 5) break;
                }
                if(count == 0) res.status(300).json({"state" : 300, "string" : "there is no closest meeting."});
                else {
                    connection.query(sqltwo,function(error,results,fields){
                    if(error){
                        res.status(400).json({"state" : 400});
                        console.log(error);
                    }
                    else{
                        console.log(results);
                        for(var i = 0 ; i < count; i++){
                            results[i].distance = distance[i].toFixed(1);
                        }
                        res.status(200).json({"state" : 200, "list" : results});
                        
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
