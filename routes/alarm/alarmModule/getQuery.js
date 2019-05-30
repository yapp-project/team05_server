module.exports = function(row,queryNum){
    var query = "select i.userImg as profileImage,i.fk_userId as senderId,u.userNick as nick from userImg as i join users as u on i.fk_userId = u.userId"+
        " where i.fk_userId = '";
    var sqltwo = "select isEnded,flag,date,fk_meetId as meetId from meetinfo where fk_meetId = ";
    if(queryNum == 1){
        for(var i = 0; i < Object.keys(row).length; i++){
            var id = row[i].meetId;
            if(i == Object.keys(row).length -1)
                sqltwo = sqltwo.concat(id+";");
            else
                sqltwo = sqltwo.concat(id+" or fk_meetId = ");
        }
        query = sqltwo;
    }
    else if(queryNum == 2){
        for(var i = 0; i < Object.keys(row).length; i++){
            var id = row[i].senderId;
            if(i == Object.keys(row).length -1)
                query = query.concat(id+"';");
            else
                query = query.concat(id+"' or fk_userId = '");
        }
    }
    return query;
}