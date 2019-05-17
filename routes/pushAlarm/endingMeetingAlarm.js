module.exports = function(connection,meetId,res){
    var sql = "select fk_meetcaptain as meetcaptain, meet_name as meetname from meettable where meetId = " + meetId+";";
    connection.query(sql,function(error,row,field){
        if(error)res.status(400).json({"state": 400,"err" : error});
        else{
            var sql = "select "
        }

    })

}