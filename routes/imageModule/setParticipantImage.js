module.exports = function(results,row){
    if(Object.keys(row).length > 0){
        for(var i = 0; i < Object.keys(results).length; i++){
            var participantImgArray = new Array();
            for(var j = 0; j < Object.keys(row).length; j++){
                if(results[i].meet_Id == row[j].meet_Id&&participantImgArray.length < 4){
                    if(row[j].userImg.equals("null")) row[j].userImg = "https://s3-us-west-2.amazonaws.com/yappsimmo/meetimg/1.jpg";
                    participantImgArray.push(row[j].userImg);
                }
                else if(participantImgArray.length == 4)
                break;
            }
            if(participantImgArray.length == 0) participantImgArray.push("https://s3-us-west-2.amazonaws.com/yappsimmo/meetimg/1.jpg");
            results[i].participantImg = participantImgArray;
        }   
    }
    else{
        for(var i = 0; i < Object.keys(results).length; i++)
            results[i].participantImg = "https://s3-us-west-2.amazonaws.com/yappsimmo/meetimg/1.jpg";
    }

    return results;
}