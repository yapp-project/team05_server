module.exports = function(app, connection)
{


//session login
app.get('/', (req, res) => {      // 1
  console.log(req.session.logined);
  if(req.session.logined) {
    res.send({'state': 400});
  } else {
    res.send({'state':500});
  }
});

//session logout
app.post('/logout', (req, res) => {      // 3
  req.session.destroy();
  res.send({'state':400})
});

//login
app.post('/login/login', function(req, res){
  var userId = req.body.userId;
  var userPw = req.body.userPw;
  connection.query('SELECT * FROM users WHERE userId = ?', [userId],
  function(error,results,fields){
      if (error) {
        res.json({
          'state': 500
        });
        console.log(error);
      } else {
        console.log(results[0]);
          if(results.length > 0) {
              if(results[0].userPw == userPw) {
                req.session.logined = true;
                req.session.userId = req.body.userId;
                res.json({
                  'state': 200
                });
              } else {
                res.json({
                  'state': 300
                });
              }
          } else {
            res.json({
              'state': 400
            });
          }
      }
  });
});

}
