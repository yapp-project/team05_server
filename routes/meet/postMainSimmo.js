module.exports = function(app,connection){
 //메인화면 내 실시간심모
    app.post('/meet/scheduled', function(req,res){
        console.log("post /meet/scheduled");
        var myId = req.body.userId;
        var latitude = req.body.latitude;
        var longitude = req.body.longitude;
        var count = req.body.meetPage;
        var offset, firstIndex;
        firstIndex = (parseInt(count)-1) * 20;
        offset = 20;
        var findSimmo = require("../module/findSimmo.js");
        var sqlone = "select meet_Id from meettable where fk_meetcaptain != '" + myId+"';";
        var sqltwo = "select m.meet_name as meet_name, m.meet_datetime as meet_datetime , m.meet_Id as meet_Id," +
        "m.meet_personNum as meet_personNum, m.meet_location as meet_location, m.meet_latitude as meet_latitude, m.meet_longitude as meet_longitude,"+
         "i.meetImg as meet_Img from meettable AS m Join meetimgs AS i ON m.meet_Id = i.fkmeetId where m.meet_Id = ";
         
        connection.query(sqlone,function(error,results,fields){
            if(error) {
                res.status(400).json({"state" : 400});
                console.log(error);
            }
            else{
                for(var i = 0; i < Object.keys(results).length; i++)
                    if( i != Object.keys(results).length -1);
            }
        });
    });
 }