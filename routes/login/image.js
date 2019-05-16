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

//  Upload = require('../UploadService');
// app.post('/test', function (req, res) {
//     var tasks = [
//         function (callback) {
//             Upload.formidable(req, function (err, files, field) {
//                 callback(err, files);
//             })
//         },
//         function (files, callback) {
//             Upload.s3(files, function (err, result) {
//                 callback(err, files);
//             });
//         }
//     ];
//     async.waterfall(tasks, function (err, result) {
//         if(!err){
//             res.json({success:true, msg:'업로드 성공'})
//         }else{
//             res.json({success:false, msg:'실패', err:err})
//         }
//     });
// });

  app.post('/login/join/uploadImage2', function(req, res, next) {
    console.log("post /login/join/uploadImage");
    var form = new multiparty.Form();

    // file upload handling
    form.on('part',function(part){

         var filename;
         var size;
         if (part.filename) {
               filename = part.filename.split('/').pop();
               size = part.byteCount;
         }else{
               part.resume();
         }

         console.log("Write Streaming file :"+filename);
         var writeStream = fs.createWriteStream('userImg'+filename);
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
         res.json({'status':200});
    });

    // track progress
    form.on('progress',function(byteRead,byteExpected){
         console.log(' Reading total  '+byteRead+'/'+byteExpected);
    });
    form.parse(req);
});

  //이미지 업로드 to s3
  app.post('/login/join/uploadImage',upload.single("userImg"), function(req, res, next){
    console.log('post /upload');
    var userId = req.query.userId;
    var up = upload.single("userImg");
    let imgFile = req.file;
    console.log(imgFile);
    if(!imgFile){
      var sql = 'INSERT INTO userImg(fk_userId,userImg) VALUES ("'+userId+'","null") ON DUPLICATE KEY UPDATE userImg="null";';
      connection.query(sql, function (error, result,fields){
          if(error) {
              res.json({
                'status': 400
              });
              console.error('error', error);
          }else{
            res.json({
              'status': 200
            });
          }
        });
    }else{
      up(req,res,function(err){
        if(err){
          res.json({'status':400});
        }else {
          console.log(imgFile['location']);
          var sql = 'INSERT INTO userImg(fk_userId,userImg) VALUES ("'+userId+'","'+imgFile["location"]+'") ON DUPLICATE KEY UPDATE userImg="'+imgFile["location"]+'";';
          connection.query(sql, function (error, result,fields){
              if(error) {
                  res.json({
                    'status': 400
                  });
                  console.error('error', error);
              }else{
                res.json({
                  'status': 200
                });
              }
            });
        }
      });
    }
  })

  app.get('/upload', function(req, res, next) {
      res.render('upload');
  });

}
