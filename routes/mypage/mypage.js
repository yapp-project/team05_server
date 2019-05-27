module.exports = function(app, connection)
{
//mypage 호출시 user정보(닉네임, 생년월일, 성별), 관심사 정보, 모임이름 호출
  app.get('/mypage', (req, res) => {
    console.log("get /mypage");
    var userId = req.query.userId;
    connection.query('SELECT * FROM users WHERE userId = ?',userId,
    function(error,results,fields){
        if (error) {
          console.log(error);
          res.json({
            'state': 500
          });
        } else {
          connection.query('SELECT * FROM interests WHERE fk_userId = ?', userId,
          function(error2,results2,fields2){
              if (error2) {
                console.log(error2);
                res.json({
                  'state': 400
                });
              } else {
                connection.query('SELECT * from meettable where meet_Id = ANY(SELECT meetAttendants_Id FROM meetAttendants WHERE fk_attendants_Id = ?)', userId,
                function(error3,results3,fields3){
                    if (error3) {
                      console.log(error3);
                      res.json({
                        'state': 300
                      });
                    } else {
                      connection.query('SELECT userimg from userimg where fk_userId = ?', userId,
                      function(error4,results4,fields4){
                          if (error4) {
                            console.log(error4);
                            res.json({
                              'state': 500
                            });
                          } else {
                            // console.log(req.session.userId);
                            // console.log(results2[0]);
                            res.send({'userNick' : results[0].userNick,
                                      'userGen' : results[0].userGen,
                                      'userBirth' :results[0].userBirth,
                                      'userImg' : results4[0],
                                      'interest':results2[0],
                                      'meetId' : results3});

                          }
                      })

                    }
                })

              }
          })

        }
    })


  });

}
