module.exports = function(app, connection)
{
//aws s3 세팅
let AWS = require("aws-sdk");
AWS.config.loadFromPath(__dirname + "/../../config/awsconfig.json");
let s3 = new AWS.S3();
let multer = require("multer");
let multerS3 = require('multer-s3');
let upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: "yappsimmo",
        key:
        function (req, file, cb) {
             cb(null, req.query.userId+".png")
        }
        ,
        acl: 'public-read-write',
    })
})
  //이미지 업로드 to s3
  app.post('/login/join/uploadImage',upload.single("userImg"), function(req, res, next){
    var userId = req.query.userId;
    var up = upload.single("userImg");
    let imgFile = req.file;
    console.log(imgFile);
    if(!imgFile){
      var sql = 'INSERT INTO userImg(fk_userId,userImg) VALUES ("'+userId+'","null") ON DUPLICATE KEY UPDATE userImg="null";';
      connection.query(sql, function (error, result,fields){
          if(error) {
              res.json({
                'state': 400
              });
              console.error('error', error);
          }else{
            res.json({
              'state': 200
            });
          }
        });
    }else{
      up(req,res,function(err){
        if(err){
          res.json({'state':400});
        }else {
          console.log(imgFile['location']);
          var sql = 'INSERT INTO userImg(fk_userId,userImg) VALUES ("'+userId+'","'+imgFile["location"]+'") ON DUPLICATE KEY UPDATE userImg="'+imgFile["location"]+'";';
          connection.query(sql, function (error, result,fields){
              if(error) {
                  res.json({
                    'state': 400
                  });
                  console.error('error', error);
              }else{
                res.json({
                  'state': 200
                });
              }
            });
        }
      });
    }
  })

}
