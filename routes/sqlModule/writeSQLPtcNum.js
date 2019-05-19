module.exports = function(results){
var sql = "select count(*)+1 as count, fk_meet_Id as meet_Id from meetAttendants where fk_meet_Id = ";

for(var i = 0; i < Object.keys(results).length; i++){
    var meetId = results[i].meet_Id;
    if(i != Object.keys(results).length -1)
        sql = sql.concat(meetId + " or fk_meet_Id = ");
    else
        sql = sql.concat(meetId + " group by fk_meet_Id;");
}
return sql;
}