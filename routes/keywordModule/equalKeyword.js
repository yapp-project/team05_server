module.exports = function(result,keyword){
    var idKeyArray = new Array();
    var index = 0;
    for(var i = 0; i < Object.keys(result).length; i++){
        var target = result[i].word;
        var comparisonTargetArray = target.split('#');
        for(var j = 0; j < comparisonTargetArray.length; j++){
           if(comparisonTargetArray[j] == keyword){
               idKeyArray[index] = result[i].meetId;
               index = index + 1;
               break;
           }
        }
    }
    console.log(idKeyArray);
    return idKeyArray;
}