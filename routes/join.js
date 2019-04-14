module.exports = function(app, connection)
{

  //session login
  app.get('/', (req, res) => {      // 1
    console.log(req.session.logined);
    if(req.session.logined) {
      res.send({'code': 400});
    } else {
      res.send({'code':500});
    }
  });

  //session logout
  app.post('/logout', (req, res) => {      // 3
    req.session.destroy();
    // res.redirect('/');
  });

  //login
  app.post('/login/login', function(req, res){
    var userId = req.body.userId;
    var userPw = req.body.userPw;
    connection.query('SELECT * FROM jointable WHERE userId = ?', [userId],
    function(error,results,fields){
        if (error) {
          res.json({
            'status': 500
          });
        } else {
            if(results.length > 0) {
                if(results[0].userPw == userPw) {
                  req.session.logined = true;
                  req.session.userId = req.body.userId;
                  res.json({
                    'status': 200
                  });
                } else {
                  res.json({
                    'status': 300
                  });
                }
            } else {
              res.json({
                'status': 400
              });
            }
        }
    })
  });

  //아이디 중복 확인
  app.get('/login/join/userId', function(req, res){
    var userId = req.query.userId;
    var sql = "select userId from jointable where userId = '" + userId + "' ;";
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
    var gps_lon = req.body.gps_lon;
    var sql = 'INSERT INTO jointable SET ?;';
    var params = {
        "userId" : userId,
        "userPw" : userPw,
        "userGen" : userGen,
        "userBirth" : userBirth,
        "userNick" : userNick,
        "userImg" : userImg,
        "gps_lat" : gps_lat,
        "gps_lon" : gps_lon
    };
    connection.query(sql,params, function (error, result,fields){
        if(error) {
            res.json({
              'status': 400
              // 'err :' + error
            });
            console.error('error', error);
        }
        else{
            console.log(userId + ',' + userPw + ',' +gps_lon);
            res.json({
              'status': 200
            });
        }
    });
  });

  // get all user data
 app.get('/login/join', function(req,res){
   console.log('get /login/join');
   var statement = 'select * from jointable';
        connection.query(statement, function (err, rows, fields){
            if(err) return res.status(4000).send({error: 'database failure'});
            else{
                console.log('success ',rows);
                res.send(rows);
            }
        });

      });

// app.get('/login/join', function(req,res){
//     console.log('get /login/join');
//     var statement = 'select * from jointable';
//          connection.query(statement, function (err, rows, fields){
//              if(err) return res.status(500).send({error: 'database failure'});
//              else{
//                  console.log('success ', rows);
//                  res.send(rows);
//              }
//          });
//
//  });
//    app.delete('/login/join', function(req,res){
//                 console.log('/login/join delete');
//                 statement = 'delete from jointable where userId = "' + req.body.userId +'";';
//                 connection.query(statement, function (err, rows, fields){
//                     if(err) return res.status(4000).send({error: 'database failure'});
//                     else {
//                         console.log('delete success');
//                   }
//                });
//             });

}