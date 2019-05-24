module.exports= function(result,myId,latitude,longitude){
    var current;
    var count = 0;
    var sqltwo = "select m.meet_name as meet_name, m.meet_datetime as meet_datetime , m.meet_Id as meet_Id," +
"m.meet_personNum as meet_personNum, m.meet_location as meet_location, m.meet_latitude as meet_latitude, m.meet_longitude as meet_longitude, i.meetImg as meet_Img "+
"from meettable AS m Join meetimgs AS i ON m.meet_Id = i.fkmeetId where fk_meetcaptain != '" + myId + "' and (";
    
var sqlthree = "select a.fk_meet_Id as meet_Id, i.userImg as userImg, i.fk_userId as userId from userImg as i" + 
    " right outer join meetAttendants as a on a.fk_attendants_Id = i.fk_userId where "; 
    var sqlthr =  " union"+" select a.meet_Id as meet_Id, i.userImg as userImg, i.fk_userId as userId from userImg as i" +
    " right outer join meettable as a on a.fk_meetcaptain = i.fk_userId where  ";
                var past = new Array();
                var row = new Array();
                var meetId = new Array();
                var distance = new Array();
                var computeDistance = require('../distanceModule/computeDistance.js');
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
                        if(count == 0){
                            sqltwo = sqltwo.concat(" meet_Id = " + meetId[count]);
                            sqlthree = sqlthree.concat( "a.fk_meet_Id = " + meetId[count]);
                        sqlthr = sqlthr.concat("a.meet_Id = " + meetId[count]);
                        }
                        else{
                            sqltwo = sqltwo.concat(" or meet_Id = " + meetId[count]);
                        sqlthree = sqlthree.concat( " or a.fk_meet_Id = " + meetId[count]);
                        sqlthr = sqlthr.concat(" or a.meet_Id = " + meetId[count]);
                        }
                        
                        
                        count = count + 1;  
                }
                    if(count == 5) break;
            }
                
                if(count != 0){
                    sqltwo = sqltwo.concat(");");
                    sqlthr = sqlthr.concat(";");
                }
                sqlthree = sqlthree.concat(sqlthr);
                row.push(sqltwo);
                row.push(sqlthree);
                row.push(count);
                row.push(meetId);
                row.push(distance);
                console.log(sqltwo);
                console.log(sqlthree);
                
        
        return row;
}