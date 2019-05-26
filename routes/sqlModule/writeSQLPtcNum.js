module.exports = function(results){
var sql = "select count(*)+1 as count, fk_meet_Id as meet_Id from meetAttendants where fk_meet_Id = ";
var count = 0;
for(var i = 0; i < Object.keys(results).length; i++){
    var meetId = results[i].meetId;
    if(i != Object.keys(results).length -1){
        sql = sql.concat( meetId + " or fk_meet_Id = ");
        count += 1;
    }
    else{
        sql = sql.concat(meetId + " group by fk_meet_Id;");
        count += 1;
    }
}
if(count == 0 ) sql = sql.concat(0 + ";");

return sql;
}
