module.exports =function(results,rows){
    var imageObject = new Object();
    for(var i = 0; i < Object.keys(results).length; i++){
        imageObject[results[i].meet_Id] = "nudfsfll";
    }
    console.log(rows);
    for(var i = 0; i < Object.keys(results).length; i++){
        for(var j = 0; j < Object.keys(rows).length; j++){
            if(results[i].meet_Id == rows[j].meet_Id && imageObject[results[i].meet_Id].length == 1){
                delete imageObject[results[i].meet_Id];
                imageObject[results[i].meet_Id] = rows[j].userImg;
                }
            else if(results[i].meet_Id == rows[j].meet_Id && imageObject[results[i].meet_Id].length < 4)
                imageObject[results[i].meet_Id] = rows[j].userImg;
                }
        }
    console.log(imageObject);
    for(var i = 0; i < Object.keys(results).length; i++){
        results[i].participantImg = imageObject[results[i].meet_Id];
        console.log(results[i].participantImg);
    }
    return results;
}
