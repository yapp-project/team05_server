module.exports = function(startlati,startlongi,destlati,destlongi){
    var degreesToRadians = require('./degreesToRadians.js');
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