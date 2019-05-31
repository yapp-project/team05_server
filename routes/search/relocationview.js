module.exports = function(result){
    var listArray = new Array();
    for(var i = 0; i < Object.keys(result).length; i++){
        var listObject = new Object();
        listObject.distance = result[i].distance;
        listObject.meetId = result[i].meet_Id;
        listObject.meetName = result[i].meet_name;
        listObject.meetDateTime = result[i].meet_datetime;
        listObject.meetlocation = result[i].meet_location;
        listObject.meet_personNum = result[i].meet_personNum;
        listObject.meet_Img = result[i].meet_Img;
        listObject.participantNum = result[i].participantNum;
        listObject.participantImg = result[i].participantImg;
        listArray.push(listObject);
    }
    return listArray;
}