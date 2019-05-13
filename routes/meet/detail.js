module.exports = function(app,connection)
{
    //모임 만들기
    app.post('/meet/detail', function(req, res){
        console.log('post /meet/detail');
        var fk_meetcaptain = req.session.userId;
        var meet_name = req.body.name;
        var meet_longitude = req.body.longitude;
        var key;
        //var fs = require("fs");
        var sql = 'INSERT INTO meettable SET ?;';
        var sqltwo = 'INSERT INTO meetkeywords SET ?;';
        var sqlthree = 'INSERT INTO meetinterests SET ?;';
        //var sqlfour = 'INSERT INTO meetimages SET ?;';
        var lists = ["sports","activity","writing","study","exhibition","music","movie","diy","volunteer","picture","game","cooking","coffee","nail","car","interior","concert","etc"];
        /*var encodedImage = req.body.meetimage;
        fs.writeFile("encodedImage.png", encodedImage, 'base64', function(err) {
            console.log(err);
          });
           //aws s3 세팅
        let aws = require("aws-sdk");
        aws.config.loadFromPath(__dirname + "/../../config/awsconfig.json");
        let s3 = new aws.S3();
        let param = {
                s3: s3,
                bucket: "yappsimmo",
                key:
                function (req, file, cb) {
                     cb(null, Date.now().toString()+".png")
                },
                acl: 'public-read-write',
                location : "/test",
                body : fs.createReadStream('encodedImage.png'),
                ContentType:'image/png'
            };
            s3.upload(param, function(err,data){
                if(err) console.log(err);
                else console.log(data);
            });*/
        var params = {
            "fk_meetcaptain" : fk_meetcaptain,
            "meet_name" : req.body.name,
            "meet_datetime" : req.body.datetime,
            "meet_locname" : req.body.location,
            "meet_latitude" : req.body.latitude,
            "meet_longitude" : req.body.longitude,
            "meet_explanation" : req.body.explanation,
            "meet_personNumMax" : req.body.personNumMax,
            "meet_personnumMin" : req.body.personNumMin,
            "meet_filterSameGender" : req.body.filterSameGender,
            "meet_filterSameAgeGroup" : req.body.filterSameAgeGroup
        };
        
        connection.query(sql,params, function (error, result,fields){
            if(error) {
                res.json({"state" : 400});
                res.status(400).end('err :' + error);
                console.error('error', error);
            }
            else{
                var parameter = {
                    "fk_meet_Id" : result.insertId,
                    "meet_keyword" : req.body.keyword
                }
                var param = new Object();
                var count = 0;
                var key = new Array();
                for(var i = 0; i < req.body.list.length; i++){
                    for(var j = 0; j < lists.length; j++){
                    if(lists[j]== req.body.list[i]){
                        key[count] = j;
                        count = count + 1;
                        }
                    }
                }
                console.log(count);
                for(var i = 0; i < key.length; i++){
                for(var j = 0; j < lists.length; j++){
                    if(key[i] == j){
                        param[lists[j]] = 1;
                        console.log(lists[j]);
                    }
                    else
                        param[lists[j]] = 0;
                }
            }
                param.fk_meetId = result.insertId;

                connection.query(sqltwo, parameter, function(error, results, fields){
                    if(error) {
                        res.json({"state" : 400});
                        res.status(400).end('err :' + error);
                        console.error('error', error);
                    }
                    else{
                        connection.query(sqlthree, param, function(error, rows, fields){
                            if(error){
                                res.json({"state" : 400});
                                res.status(400).end('err :' + error);
                                console.error('error', error);
                            }
                            else{
                                connection.query(sqlfour, parameters,)
                                var sqlfive = 'CREATE EVENT ' +'event_'+String(result.insertId)+" on schedule AT '"+req.body.datetime
                                +"' do update meettable set meet_scheduledEnd = 1 WHERE meet_Id = "+result.insertId+';';
                                connection.query(sqlfive, function(err, row, fields){
                                    if(err){
                
                                        res.status(400).json({"state" : 400,"err" : error + " " +err});
                                        console.error('error', err);
                                    }
                                    else{
                                        res.status(200).json({"state" : 200});
                                    }
                                });
                            }
                        });
                    }
                });
            }
    });
    });
    // 모임정보 상세 전달
    app.get('/meet/detail', function(req, res){
        console.log("get /meet/detail");
        var meetId = req.query.meet_Id;
        var sql = "select m.meet_Id,m.meet_name,m.fk_meetcaptain, m.meet_datetime, m.meet_location,m.meet_latitude,m.meet_longitude,m.meet_explanation, m.meet_personNumMax "
        +"from meettable AS m where m.meet_Id = " + meetId +";" ;
        //var sqltwo = 'INSERT INTO meetviews(fk_meetId,views) VALUES(' + meetId + ',1) ON DUPLICATE KEY UPDATE fk_meetId='+meetId+', views=views+1;';
        //console.log(sqltwo);
        //var sqltwo = 'IF EXISTS( SELECT fk_meetId FROM meetviews where fk_meetId='+meetId+') BEGIN UPDATE meetviews SET views = views+1 where fk_meetId ='+ meetId+'END ELSE BEGIN INSERT INTO meetviews(fk_meetId,views) VALUES('+meetId+',1) END';
        connection.query(sql, function(error,result, fields){
            if(error)
            res.status(400).json({"states" : 400});
            else{
              //connection.query(sqltwo, function(errortwo,resulttwo, fieldstwo){
                  //if(errortwo)
                  //res.status(300).json({"states" : 300});
                  //else{

                      res.status(200).json({"state" : 200 , "list" : [result[0]]});
                      console.log(result[0]);
                  //}
                   //res.end();
              }
            });
    });


}
