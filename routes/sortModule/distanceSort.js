module.exports = function(results,latitude,longitude){
    var searchingArray = new Array();
    var computeDistance = require('../distanceModule/computeDistance.js');
    for(var i = 0; i < Object.keys(results).length; i++){
        var searching = new Object();
        var distance= computeDistance(latitude,longitude,results[i].meet_latitude,results[i].meet_longitude);
        searching.distance = distance.toFixed(4);
        searching.meetId = results[i].meet_Id;
        searching.meetName = results[i].meet_name;
        searching.meetDateTime = results[i].meet_datetime;
        searching.meetlocation = results[i].meet_location;
        searching.meet_personNum = results[i].meet_personNum;
        searching.meet_Img = results[i].meet_Img;
        searching.participantNum = results[i].participantNum;
        searching.participantImg = results[i].participantImg;
        console.log(searching);
        searchingArray.push(searching);
    } 
    var customSort = require('./customSort.js');
    searchingArray.sort(customSort);
    return searchingArray;
}