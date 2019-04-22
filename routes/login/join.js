module.exports = function(app, connection)
{


  //아이디 중복 확인
  app.get('/login/join/userId', function(req, res){
    var userId = req.query.userId;
    var sql = "select userId from users where userId = '" + userId + "' ;";
    connection.query(sql,function(error, rows, fields){
      if(error) res.status(400).json({"state": 400});
      else{
        console.log(rows);
        if(Object.keys(rows).equal ==='userId') res.status(200).json({"state" : 200, "duplicate Id" : true});
        else res.status(200).json({"state" : 200, "duplicate id": false});
      }
    });
  });

  //join
   app.post('/login/join', function(req, res){
    console.log('post /login/join');
    var userId = req.body.userId;
    var userPw = req.body.userPw;
    var userGen = req.body.userGen;
    var userBirth = req.body.userBirth;
    var userNick = req.body.userNick;
    var userImg = req.body.userImg;
    var gps_lat = req.body.gps_lat;
    var gps_lan = req.body.gps_lan;
    var interest = req.body.interest;
    var sql = 'INSERT INTO users SET ?;';
    var params = {
        "userId" : userId,
        "userPw" : userPw,
        "userGen" : userGen,
        "userBirth" : userBirth,
        "userNick" : userNick,
        "userImg" : userImg
    };
    connection.query(sql,params, function (error, result,fields){
        if(error) {
            res.json({
              'status': 400
            });
            console.error('error', error);
        }
        else{
          var sql = 'INSERT INTO userGps SET ?;';
          var params = {
              "fk_userId": userId,
              "gps_lat" : gps_lat,
              "gps_lan" : gps_lan
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

                        console.log(userId + ',' + userPw + ',' +gps_lan);
                        res.json({
                          'status': 200
                        });
                    }
                });
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
