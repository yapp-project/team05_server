module.exports = function(app, connection)
{


  //notice upload
   app.post('/notice/upload', function(req, res, next){
    console.log('post /notice/upload');
    var meetId = req.body.meetId;
    var contents = req.body.contents;

    var sql = 'INSERT INTO notice(fk_meetId,contents) VALUES('+meetId+',"'+contents+'") ON DUPLICATE KEY UPDATE contents="'+contents+'";';
    console.log(sql);
    connection.query(sql, function (error, result,fields){
        if(error) {
            res.json({
              'status': 400
            });
            console.error('error', error);
        }else{
          console.log(meetId + ',' + contents);
          res.json({
            'status': 200
          });
        };
      });

});

//comment upload
 app.post('/notice/comment/upload', function(req, res, next){
  console.log('post /notice/comment/upload');;
  var userId = req.body.userId;
  var meetId = req.body.meetId;
  var comment= req.body.comment;
  var sql = 'INSERT INTO noticecomment(fk_meetId,fk_userId, comment) VALUES('+meetId+',"'+userId+'","'+comment+'")';
  console.log(sql);
  connection.query(sql, function (error, result,fields){
      if(error) {
          res.json({
            'status': 400
          });
          console.error('error', error);
      }else{
        console.log(meetId + ',' + comment);
        res.json({
          'status': 200
        });
      };
    });

});

// view notice
app.get('/notice/view', function(req,res){
 console.log('get /notice/view');
 var meetId=  req.query.meet_Id
 var statement = 'select * from notice where fk_meetId ='+meetId+';';
 var sql2 = 'select * from noticecomment where fk_meetId ='+meetId+';';
      connection.query(statement, function (err, rows, fields){
          if(err) return res.status(4000).send({error: 'database failure'});
          else{
            connection.query(sql2, function (err2, rows2, fields2){
                if(err2) return res.status(4000).send({error: 'database failure'});
                else{
                    // console.log('success ',rows);
                    console.log(rows2);
                    // for (var i = 0; i < rows2.length; i++) {
                    //   c
                    // }

                    res.json({
                      'notice': rows,
                      'comment': rows2

                    });
                }
            });
          }
      });

    });



  // //아이디&닉네임 중복 확인
  // app.get('/login/join/check', function(req, res){
  //   var userId = req.query.userId;
  //   var userNick = req.query.userNick;
  //   var sql1 = "select userId from users where userId = '" + userId + "' ;";
  //   var sql2 = "select userNick from users where userNick = '" + userNick + "' ;";
  //   connection.query(sql1,function(error1, rows1, fields1){
  //     if(error1) res.status(400).json({"state": 400});
  //     else{
  //       connection.query(sql2,function(error2, rows2, fields2){
  //         if(error2) res.status(400).json({"state": 400});
  //         else{
  //           if(rows1.length !== 0 && rows2.length !== 0 ){
  //              res.status(300).json({"state" : 300});//둘 다 중복
  //           }else if(rows1.length !== 0  && rows2.length == 0){
  //               res.status(260).json({"state" : 260});//아이디 중복
  //           }else if(rows1.length == 0  && rows2.length !== 0){
  //               res.status(230).json({"state" : 230});//닉네임 중복
  //           }else{
  //               res.status(200).json({"state" : 200});//둘 다 중복 아님
  //           }
  //       }
  //       });
  //   }
  //   });
  // });


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
