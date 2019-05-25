module.exports = function(connection,result,res,meetId){
    var sqltwo = "select u.userImg as participants_img from meetAttendants as m join userImg as u on m.fk_attendants_Id = u.fk_userId where " +
    "m.fk_meet_Id = " + meetId +  ";";
    var sqlthree = "select u.userImg as captain_img from meettable as m join userImg as u on m.fk_meetcaptain = u.fk_userId where " +
    "m.meet_Id = " + meetId + ";";
    var sqlfour = "select count(*)+1 as participants_num from meetAttendants where fk_meet_Id = " + meetId + ";";
    var imgArray = new Array();
    connection.query(sqltwo, function(err,row,field){
        if(err) res.status(400).json({"state" : 400, "err" : err});
        else{
            if(Object.keys(row).length > 0){
                for(var i = 0; i < Object.keys(row).length; i++)
                    imgArray.push(row[i].participants_img);
                console.log(result);
                result[0].participants_img = imgArray;
            }
            
            else
                result[0].participants_img = null;

            connection.query(sqlthree,function(err,row,field){
                if(err)res.status(400).json({"state" : 400, "err" : err});
                else{
                    if(Object.keys(row).length > 0)
                        result[0].captain_img = row[0].captain_img;
                    else
                        result[0].captain_img = null;
                    connection.query(sqlfour,function(err,row,field){
                        if(err)res.status(400).json({"state" : 400, "err" : err});
                        else
                            result[0].participants_num = row[0].participants_num;
                            
                        
                            
                    });
                }
            });
        }
    });
    return result[0];
}