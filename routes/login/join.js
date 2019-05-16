module.exports = function(app, connection)
{

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
                var usertoken = req.body.usertoken;
                var sql = "INSERT INTO usertoken SET ?;";
                var params = {
                  "fk_userId" : userId,
                  "client_token" : usertoken
                };
                connection.query(sql,params,function(error,rows,fields){
                    if(error)res.status(400).json({"state": 400});
                    else{
                      res.status(200).json({"state" : 200});
                  console.log(userId + ',' + userPw);
                  console.log(userImg);
              }
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
