module.exports = function(app, connection)
{
//mypage 호출시 user정보(닉네임, 생년월일, 성별), 관심사 정보, 모임이름 호출
  app.get('/mypage', (req, res) => {
    console.log("get /mypage");

    connection.query('SELECT * FROM users WHERE userId = ?', req.session.userId,
    function(error,results,fields){
        if (error) {
          res.json({
            'status': 500
          });
        } else {
          connection.query('SELECT * FROM interests WHERE fk_userId = ?', req.session.userId,
          function(error2,results2,fields2){
              if (error2) {
                res.json({
                  'status': 400
                });
              } else {
                connection.query('SELECT meet_name from meettable where meet_Id = (SELECT meetAttendants_Id FROM meetAttendants WHERE fk_attendants_Id = ?)', req.session.userId,
                function(error3,results3,fields3){
                    if (error3) {
                      res.json({
                        'status': 300
                      });
                    } else {
                      console.log(results2);
                      console.log(results);
                      res.send({'userNick' : results[0].userNick,
                                'userGen' : results[0].userGen,
                                'userBirth' :results[0].userBirth,
                                'userImg' : results[0].userImg,
                                'interest':results2[0],
                                'meetId' : results3[0]});

                    }
                })

              }
          })

        }
    })


  });

}
