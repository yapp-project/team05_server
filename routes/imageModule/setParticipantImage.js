module.exports = function(results,row){
    if(Object.keys(row).length > 0){
        for(var i = 0; i < Object.keys(results).length; i++){
            var participantImgArray = new Array();
            participantImgArray.push("null");
            for(var j = 0; j < Object.keys(row).length; j++){
                console.log("results " + results[i].meet_Id+"row");
                if(results[i].meet_Id == row[j].meet_Id&&participantImgArray[0] == "null"){
                    participantImgArray.pop();
                    participantImgArray.push(row[j].userImg);
                }
                else if(results[i].meet_Id == row[j].meet_Id&&participantImgArray.length < 4){
                    participantImgArray.push(row[j].userImg);
                }
                else if(participantImgArray.length == 4)
                break;
            }
            results[i].participantImg = participantImgArray;
        }   
    }
    else{
        for(var i = 0; i < Object.keys(results).length; i++)
            results[i].participantImg = "null";
    }
    console.log(results);
    return results;
}