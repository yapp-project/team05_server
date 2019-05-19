module.exports =function(results,rows){
    var imageArray = new Array();
    var imageObject = new Object();
    for(var i = 0; i < Object.keys(results).length; i++){
        imageObject[results[i].meet_Id] = "nll";
    }
    for(var i = 0; i < Object.keys(rows).length; i++){
        for(var j = 0; j < Object.keys(results).length; j++){
            if(results[i].meet_Id == rows[j].meet_Id && imageObject[results[i].meet_Id].length == 1){
                delete imageObject[results[i].meet_Id];
                imageObject[results[i].meet_Id] = rows[j].userImg;
                imageArray.push(imageObject);

                }
            else if(results[i].meet_Id == rows[j].meet_Id && imageObject[results[i].meet_Id].length < 4)
                imageObject[results[i].meet_Id] = rows[j].userImg;
                imageArray.push(imageObject);
                }
        }
        console.log(imageArray);
    /*for(var i = 0; i < Object.keys(results).length; i++){
        results[i].participantImg = imageObject[results[i].meet_Id];
    }*/
    return results;
}
