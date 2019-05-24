module.exports = function(app,connection){
  var processImage = require('../imageModule/processImage.js');
        var upload = processImage();
  app.post('/meet/image',upload.single("meetImg"), function(req, res, next){
        var up = upload.single("meetImg");
        var meetId = req.query.meetId;
        let meetImg = req.file;
        console.log(meetImg);
        if(!meetImg){
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
              console.log(meetImg.location);
              var sql = 'INSERT INTO meetimgs(fkmeetId,meetImg) VALUES ("'+meetId+'","'+meetImg.location+'") ON DUPLICATE KEY UPDATE meetImg="'+meetImg.location+'";';
              var sqltwo = 'INSERT INTO endmeetimgs(fkmeetId,meetImg) VALUES ("'+meetId+'","'+meetImg.location+'") ON DUPLICATE KEY UPDATE meetImg="'+meetImg.location+'";';
              connection.query(sql, function (error, result,fields){
                  if(error) {
                      res.status(400).json({'state': 400});
                      console.error('error', error);
                  }
                  else{
                    connection.query(sqltwo, function(err,result,fields){
                      if(err){
                        res.status(400).json({"state" : 400});
                        console.error("err "+err);
                      }
                      else
                        res.status(200).json({'state': 200});
                    });
                  }
                    
                });
            }
          });
        }
      })
}