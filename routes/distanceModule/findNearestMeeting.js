module.exports= function(result,latitude,longitude){
    var current;
    var count = 0;
    var sqltwo = "select m.meet_name as meet_name, m.meet_datetime as meet_datetime , m.meet_Id as meet_Id," +
"m.meet_personNum as meet_personNum, m.meet_location as meet_location, i.meetImg as meet_Img "+
"from meettable AS m Join meetimgs AS i ON m.meet_Id = i.fkmeetId where meet_scheduledEnd = 0 and fk_meetcaptain != '" + myId + "' and (";
                var past = new Array();
                var row = new Array();
                var meetId = new Array();
                var distance = new Array();
                var computeDistance = require('../module/computeDistance.js');
                for(var i = 0; i < Object.keys(result).length; i++){
                    if(i != 0)
                        past.push(current);
                    current = Math.floor(Math.random() * Object.keys(result).length);
		            while(past.indexOf(current) != -1)
                        current = Math.floor(Math.random() * Object.keys(result).length);
                                
                    var destlat = result[current].meet_latitude;
                    var destlong = result[current].meet_longitude;
                    meetId[count] = result[current].meet_Id;
                    distance[count] = computeDistance(latitude,longitude,destlat,destlong);
                    if(distance[count] <= 1.0 ){
                        if(count == 0)
                            sqltwo = sqltwo.concat(" meet_Id = " + meetId[count]);
                        else{
                                if(count < 4)
                                	sqltwo = sqltwo.concat(" or meet_Id = " + meetId[count]);
                                else
                                    sqltwo = sqltwo.concat(" or meet_Id = " + meetId[count] + " );");
                        }
                        count = count + 1;  
                }
                    if(count == 5) break;
                }
        row.push(sqltwo);
        row.push(count);
        row.push(distance);
        
        return row;
}