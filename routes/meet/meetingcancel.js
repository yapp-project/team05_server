module.exports = function(app, connection){
    app.put('/meet/meetId',function(req,res){
        var meetId = req.query.meetId;
        var sql = "DELETE from meettable where meetId = " + meetId + ";"
        var sql = 
    });
}