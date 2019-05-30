module.exports = function(result,results,performNum){
if(performNum == 1){
    var count = 0;
    for(var i = 0; i < Object.keys(result).length; i++){
        if(count == Object.keys(result).length) break;
        for(var j = 0; j < Object.keys(results).length; j++){
            if(result[i].meetId == results[j].meetId){
                result[i].senderId = results[j].senderId;
                result[i].title = results[j].title;
                count = count + 1;
                break;
            }        
        }
    }
}
else if(performNum == 2){
    for(var i = 0; i < Object.keys(result).length; i++){
        for(var j = 0; j < Object.keys(results).length; j++){
            if(result[i].senderId == results[j].senderId){
                if(results[j].profileImage == "null") results[j].profileImage = "https://s3-us-west-2.amazonaws.com/yappsimmo/meetimg/1.jpg";
                result[i].profileImage = results[j].profileImage;
                result[i].nick = results[j].nick;
                break;
            }

        }
    }
}
    
    return result;
}