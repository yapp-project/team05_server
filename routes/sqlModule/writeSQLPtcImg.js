module.exports = function(row,results){
var sqltwo = "select i.fk_userId as userId, i.userImg as userImg, a.fk_meet_Id as meet_Id from userImg as i join" +
" meetAttendants as a on i.fk_userId = a.fk_attendants_Id where a.fk_meet_Id = ";
for(var i = 0; i < Object.keys(row).length; i++){
    var meetId = row[i].meet_Id;
    if(i != Object.keys(results).length -1)
        sqltwo = sqltwo.concat(meetId+";");
    else
        sqltwo = sqltwo.concat(meetId + " or a.fk_meet_Id = ");
    }
return sqltwo;
}