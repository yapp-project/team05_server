module.exports = function(result,sqlNum){
    var sql;
    if(sqlNum == 1){
    var sqltwo = "select m.meet_Id as meet_Id,m.meet_name as meet_name, m.meet_datetime as meet_datetime, m.meet_location as meet_location" +
    ", m.meet_personNum as meet_personNum, m.meet_latitude as meet_latitude, m.meet_longitude as meet_longitude" +
    ",i.meetImg as meet_Img from meettable as m join meetimgs as i on m.meet_Id = i.fkmeetId where ";
  for (var i = 0; i < result.length; i++) {
    if (i != result.length - 1) {
      sqltwo = sqltwo.concat("m.meet_Id=" + result[i] + " or ");
    } else {
      sqltwo = sqltwo.concat("m.meet_Id=" + result[i] + ";");
    }

  }
  sql = sqltwo;
  
}
else if(sqlNum == 2){

}
  return sql;
}