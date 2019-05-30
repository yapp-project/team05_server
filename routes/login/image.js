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
var multiparty = require('multiparty');
var async = require('async');


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
    console.log('post /login/join/uploadImage');
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

  //이미지 삭제
  app.put('/login/join/removeImage',upload.single("userImg"), function(req, res, next){
    console.log('put /login/join/removeImage');
    var userId = req.query.userId;
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

  })


  app.get('/upload', function(req, res, next) {
      res.render('upload');
  });

}
