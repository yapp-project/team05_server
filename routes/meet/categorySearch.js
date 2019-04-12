//카테고리별로 모임 검색 알려주기
module.exports = function(app, connection){
    app.get('/meet/category',function(req,res){
        var lists = ["sports","activity","write","study","festival","music","diy","volunteer","picture","game","cooking"];
        var userCategory = req.query.category;
        var sql = "select fk_meetId AS meetId from interests where " + userCategory
        +" = 1;";
        var sqltwo = "select meet_Id, meet_name, meet_datetime, meet_location, meet_personNumMax from meettable where meet_scheduledEnd = 0 and ";
        connection.query(sql, function(error, rows, fields){
            if(error)res.status(400).json({"state" : 400});
            else{
                if(rows.length != 0){
                    for(var i = 0; i < rows.length; i++){
                        if(i != rows.length - 1)
                            sqltwo = sqltwo.concat(" meet_Id = " + rows[i].meetId + " or ");
                        else
                            sqltwo = sqltwo.concat(" meet_Id = " + rows[i].meetId + " ;");
                    }
                    connection.query(sqltwo, function(error, result, fields){
                        if(error)res.status(400).json({"state" : 400});
                        else{
                            res.status(200).json({"state" : 200, "list" : result});
                            console.log(result);
                        }
                    });
                }
                else
                    res.status(300).json({"state" : 300, "string" : "there is no meeting for the category."});
                
            }

        });
    
    });
}