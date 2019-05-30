module.exports = function(app, connection)
{

  //join
   app.post('/login/join',function(req, res, next){
    console.log('post /login/join');

    function find(title){
      for (var i = 0; i < req.body.interest.length; i++) {
        if (req.body.interest[i].title ==title) {
          return req.body.interest[i].isChecked;
        }
      }

    }
    var userId = req.body.userId;
    var userPw = req.body.userPw;
    var userGen = req.body.userGen;
    var userBirth = req.body.userBirth;
    var userNick = req.body.userNick;
    var gps_lat = req.body.gps_lat;
    var gps_lan = req.body.gps_lan;
    var interest = req.body.interest;
    var sql = 'INSERT INTO users SET ?;';
    var sql2 = 'INSERT INTO realusers SET ?';
    var params = {
        "userId" : userId,
        "userPw" : userPw,
        "userGen" : userGen,
        "userBirth" : userBirth,
        "userNick" : userNick
    };
    var params2 = {
        "userId" : userId,
        "userPw" : userPw,
        "userNick" : userNick
    };
    connection.query(sql,params, function (error, result,fields){
        if(error) {
            res.json({
              'state': 400
            });
            console.error('error', error);
        }
        else{
          connection.query(sql2,params2, function (error, result,fields){
              if(error) {
                  res.json({
                    'state': 400
                  });
                  console.error('error', error);
              }
              else{

                var sql = 'INSERT INTO interests SET ?;';
                var params = {
                    "fk_userId":userId,
                    "sports": find("sports"),
                    "activity":find("activity"),
                    "writing" : find("write"),
                    "study": find("study"),
                    "exhibition":find("exhibition"),
                    "music":find("music"),
                    "movie":find("movie"),
                    "diy":find("diy"),
                    "volunteer":find("volunteer"),
                    "picture": find("picture"),
                    "game": find("game"),
                    "cooking" : find("cooking"),
                    "coffee" : find("coffee"),
                    "nail": find("nail"),
                    "car": find("car"),
                    "interior": find("interior"),
                    "concert": find("concert"),
                    "etc": find("etc")
                };
                connection.query(sql,params, function (error, result,fields){
                    if(error) {
                        res.json({
                          'state': 400
                        });
                        console.error('error', error);
                    }
                    else{

                        console.log(userId + ',' + userPw);
                        res.json({
                          'state': 200
                        });
                    }
                });
              }
          });
        }
    });
  });

  app.post('/interest/modify',function(req, res, next){
   console.log('/interest/modify');
   var userId = req.body.userId;
   var list = req.body.list;
   var sql = 'UPDATE interests SET ? where fk_userId="'+userId+'";';
   var insertBinaryInCategory = require('../module/insertBinaryInCategory.js');
   param = insertBinaryInCategory(list);
   connection.query(sql,param, function (error, result,fields){
     console.log(sql);
       if(error) {
           res.json({
             'state': 400
           });
           console.error('error', error);
       }
       else{

           res.json({
             'state': 200
           });
       }
   });
 });


  //아이디&닉네임 중복 확인
  app.get('/login/join/check', function(req, res){
    var userId = req.query.userId;
    var userNick = req.query.userNick;
    var sql1 = "select userId from realusers where userId = '" + userId + "' ;";
    var sql2 = "select userNick from realusers where userNick = '" + userNick + "' ;";
    connection.query(sql1,function(error1, rows1, fields1){
      if(error1) res.json({"state": 400});
      else{
        connection.query(sql2,function(error2, rows2, fields2){
          if(error2) res.json({"state": 400});
          else{
            if(rows1.length !== 0 && rows2.length !== 0 ){
               res.json({"state" : 300});//둘 다 중복
            }else if(rows1.length !== 0  && rows2.length == 0){
                res.json({"state" : 260});//아이디 중복
            }else if(rows1.length == 0  && rows2.length !== 0){
                res.json({"state" : 230});//닉네임 중복
            }else{
                res.json({"state" : 200});//둘 다 중복 아님
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
            if(err) return res.state(4000).send({error: 'database failure'});
            else{
                console.log('success ',rows);
                res.send(rows);
            }
        });

      });




}
