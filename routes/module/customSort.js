module.exports = function(a,b){
    if(a.distance == b.distance){ return 0} return a.distance > b.distance ? 1 : -1;
}