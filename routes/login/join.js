module.exports = function(app, connection)
{
    //aws s3 세팅
    let AWS = require("aws-sdk");
    AWS.config.loadFromPath(__dirname + "/../../config/awsconfig.json");
    let s3 = new AWS.S3();
    let fs = require("fs");
    let path = require('path');
    let multer = require("multer");
    let multerS3 = require('multer-s3');
    let upload = multer({
        storage: multerS3({
            s3: s3,
            bucket: "yappsimmo",
            key:
            function (req, file, cb) {
                 cb(null, req.body.userId+".png")
            }
            ,
            acl: 'public-read-write',
        })
    })
    var multiparty = require('multiparty');

      app.post('/login/join/uploadImage', function(req, res, next) {
        console.log("post /login/join/uploadImage");
      var form = new multiparty.Form();
      
      // get field name & value
      form.on('field',function(name,value){
           console.log('normal field / name = '+name+' , value = '+value);
      });

      // file upload handling
      form.on('part',function(part){
           var filename;
           var size;
           if (part.filename) {
                 filename = part.filename;
                 size = part.byteCount;
           }else{
                 part.resume();
           }

           console.log("Write Streaming file :"+filename);
           var writeStream = fs.createWriteStream('userImg/'+filename);
           writeStream.filename = filename;
           part.pipe(writeStream);
           part.on('data',function(chunk){
                 console.log(filename+' read '+chunk.length + 'bytes');
           });
           part.on('end',function(){
                 console.log(filename+' Part read complete');
                 writeStream.end();
           });
      });
      // all uploads are completed
      form.on('close',function(){
           res.josn({'status':200});
      });

      // track progress
      form.on('progress',function(byteRead,byteExpected){
           console.log(' Reading total  '+byteRead+'/'+byteExpected);
      });
      form.parse(req);
});

      //이미지 업로드 to s3
      app.post('/upload', function(req, res, next){
        var form = new multiparty.Form();
        upload.single("userImg");
        console.log('post');
          let imgFile = req.file;
          res.json(imgFile);
      })

      app.get('/upload', function(req, res, next) {
          res.render('upload');
      });

  //join
   app.post('/login/join',function(req, res, next){
    console.log('post /login/join');
    var userId = req.body.userId;
    var userPw = req.body.userPw;
    var userGen = req.body.userGen;
    var userBirth = req.body.userBirth;
    var userNick = req.body.userNick;
    var userImg = req.file;
    var gps_lat = req.body.gps_lat;
    var gps_lan = req.body.gps_lan;
    var interest = req.body.interest;
    var sql = 'INSERT INTO users SET ?;';
    var params = {
        "userId" : userId,
        "userPw" : userPw,
        "userGen" : userGen,
        "userBirth" : userBirth,
        "userNick" : userNick
    };
    connection.query(sql,params, function (error, result,fields){
        if(error) {
            res.json({
              'status': 400
            });
            console.error('error', error);
        }
        else{
          var sql = 'INSERT INTO interests SET ?;';
          var params = {
              "fk_userId":userId,
              "sports": interest.sports,
              "activity":interest.activity,
              "writing" : interest.writing,
              "study":interest.study,
              "exhibition":interest.exhibition,
              "music":interest.music,
              "movie": interest.movie,
              "diy":interest.diy,
              "volunteer":interest.volunteer,
              "picture":interest.picture,
              "game":interest.game,
              "cooking" : interest.cooking,
              "coffee" : interest.coffee,
              "nail":interest.nail,
              "car":interest.car,
              "interior":interest.interior,
              "concert":interest.concert,
              "etc":interest.etc
          };
          connection.query(sql,params, function (error, result,fields){
              if(error) {
                  res.json({
                    'status': 400
                  });
                  console.error('error', error);
              }
              else{

                  console.log(userId + ',' + userPw);
                  console.log(userImg);
                  res.json({
                    'status': 200
                  });
              }
          });
        }
    });
  });


  //아이디&닉네임 중복 확인
  app.get('/login/join/check', function(req, res){
    var userId = req.query.userId;
    var userNick = req.query.userNick;
    var sql1 = "select userId from users where userId = '" + userId + "' ;";
    var sql2 = "select userNick from users where userNick = '" + userNick + "' ;";
    connection.query(sql1,function(error1, rows1, fields1){
      if(error1) res.status(400).json({"status": 400});
      else{
        connection.query(sql2,function(error2, rows2, fields2){
          if(error2) res.status(400).json({"status": 400});
          else{
            if(rows1.length !== 0 && rows2.length !== 0 ){
               res.status(300).json({"status" : 300});//둘 다 중복
            }else if(rows1.length !== 0  && rows2.length == 0){
                res.status(260).json({"status" : 260});//아이디 중복
            }else if(rows1.length == 0  && rows2.length !== 0){
                res.status(230).json({"status" : 230});//닉네임 중복
            }else{
                res.status(200).json({"status" : 200});//둘 다 중복 아님
            }
        }
        });
    }
    });
  });


  // get all user data
 app.get('/login/join', function(req,res){
   console.log('get /login/join');
   var statement = 'select * from users';
        connection.query(statement, function (err, rows, fields){
            if(err) return res.status(4000).send({error: 'database failure'});
            else{
                console.log('success ',rows);
                res.send(rows);
            }
        });

      });


    app.post('/login/withdraw', function(req, res){
      var userId = req.body.userId;
      var userPw = req.body.userPw;
      connection.query('SELECT * FROM users WHERE userId = ?', [userId], function(error,results,fields){
          if (error) {
            res.json({
              'status': 400
            });
          } else {
            connection.query('DELETE FROM users WHERE userId = ?', [userId], function(error,results,fields){
                if (error) {
                  console.log(error);
                  res.json({
                    'status': 400
                  });
                } else {
                  res.json({
                    'status': 200
                  });
                }
            })
          }
      })
    });

}
