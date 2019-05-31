module.exports = function(app,connection){
  var processImage = require('../imageModule/processImage.js');
        var upload = processImage();
  app.post('/meet/image',upload.single("meetImg"), function(req, res, next){
    console.log('post /meet/image');
        var up = upload.single("meetImg");
        var meetId = req.query.meetId;
        let meetImg = req.file;
        if(!meetImg){
          var randomNum = Math.floor(Math.random() * 10) + 1;
          var imgString = "https://s3-us-west-2.amazonaws.com/yappsimmo/meetimg/"+randomNum+".jpg";
          var sql = 'INSERT INTO meetimgs(fkmeetId,meetImg) VALUES ("'+meetId+'","'+imgString+'") ON DUPLICATE KEY UPDATE meetImg="'+imgString+'";';
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
            if(err){
              res.status(400).json({'state':400});
              console.log(err);
          }
            else {
              var sql = 'INSERT INTO meetimgs(fkmeetId,meetImg) VALUES ('+meetId+",'"+meetImg.location+"') ON DUPLICATE KEY UPDATE meetImg='"+meetImg.location+"';";
              var sqltwo = 'INSERT INTO endmeetimgs(fkmeetId,meetImg) VALUES ('+meetId+",'"+meetImg.location+"') ON DUPLICATE KEY UPDATE meetImg='"+meetImg.location+"';";
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