module.exports = function(a,b){
    if(a.distance == b.distance && a.meet_Id > b.meet_Id) return 1;
    else if(a.distance == b.distance && a.meet_Id < b.meet_Id) return -1
    return a.distance > b.distance ? 1 : -1;
}