module.exports = function(result){
    
    var listArray = new Array();
    for(var i = 0; i < Object.keys(result).length; i++){
        var listObject = new Object();
        listObject.isEnded = result[i].isEnded;
        listObject.flag = result[i].flag;
        listObject.meetId = result[i].meetId;
        listObject.profileImage = result[i].profileImage;
        listObject.senderId = result[i].senderId;
        listObject.title = result[i].title;
        listObject.date = result[i].date;
        listObject.content = result[i].content;
        listArray.push(listObject);
    }
    return listArray;
}