module.exports = function(results,latitude,longitude){
    var searchingArray = new Array();
    var searching = new Object();
    var computeDistance = require('./computeDistance.js');
    for(var i = 0; i < Object.keys(results).length; i++){
        var distance= computeDistance(latitude,longitude,results[i].latitude,results[i].longitude);
        searching.distance = distance.toFixed(1);
        searching.meetId = results[i].meet_Id;
        searching.meetName = results[i].meet_name;
        searching.meetDateTime = results[i].meet_datetime;
        searching.meetlocation = results[i].meet_location;
        searching.meet_personNumMax = results[i].meet_personNumMax;
        searchingArray.push(searching);
    } 
    var customSort = require('./customSort.js');
    searchingArray.sort(customSort);
    return searchingArray;
}