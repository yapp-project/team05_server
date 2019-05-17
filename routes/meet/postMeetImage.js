module.exports = function(app,connection){
  var processImage = require('../module/processImage.js');
        var upload = processImage();
  app.post('/meet/image',upload.single("userImg"), function(req, res, next){
        var up = upload.single("userImg");
        var meetId = req.query.meetId;
        let imgFile = req.file;
        console.log(imgFile);
        if(!imgFile){
          var sql = 'INSERT INTO meetimgs(fkmeetId,meetImg) VALUES ("'+meetId+'","null") ON DUPLICATE KEY UPDATE meetImg="null";';
          connection.query(sql, function (error, result,fields){
              if(error) {
                  res.status(400).json({'state': 400});
                  console.error('error', error);
              }
              else
                res.status(200).json({'state': 200});
            });
        }
        else{
          up(req,res,function(err){
            if(err)
              res.status(400).json({'state':400});
            else {
              console.log(imgFile.location);
              var sql = 'INSERT INTO meetimgs(fkmeetId,meetImg) VALUES ("'+meetId+'","'+imgFile.location+'") ON DUPLICATE KEY UPDATE meetImg="'+imgFile.location+'";';
              connection.query(sql, function (error, result,fields){
                  if(error) {
                      res.status(400).json({'state': 400});
                      console.error('error', error);
                  }
                  else
                    res.status(200).json({'state': 200});
                });
            }
          });
        }
      })
}