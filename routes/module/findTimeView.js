module.exports= function(myId,latitude,longitude,results){
    var computeDistance = require('../distanceModule/computeDistance.js');
     var sqlthree = "select a.fk_meet_Id as meet_Id, i.userImg as userImg, i.fk_userId as userId from userImg as i" + 
    " left outer join meetAttendants as a on a.fk_attendants_Id = i.fk_userId where "; 
    var sqlthr =  " union"+" select a.meet_Id as meet_Id, i.userImg as userImg, i.fk_userId as userId from userImg as i" +
    " right outer join meettable as a on a.fk_meetcaptain = i.fk_userId where  ";
    var distance = new Array();
        for(var i = 0; i < Object.keys(results).length; i++){
            distance[i] = computeDistance(latitude,longitude,results[i].latitude,results[i].longitude);
            results[i].distance = distance[i].toFixed(4);
            if(i != Object.keys(results).length -1){
                sqlthree = sqlthree.concat(" a.fk_meet_Id = " + results[i].meet_Id + " or ");
                sqlthr = sqlthr.concat(" a.meet_Id = " + results[i].meet_Id + " or ");
            }
            else{
                sqlthree = sqlthree.concat(" a.fk_meet_Id = " + results[i].meet_Id);
                sqlthr = sqlthr.concat(" a.meet_Id = " + results[i].meet_Id + ";");
                sqlthree = sqlthree.concat(sqlthr);
            }
        }
    var valueObject = new Object();
            valueObject.sqlthree =sqlthree;
            valueObject.results = results;
    return valueObject;

}