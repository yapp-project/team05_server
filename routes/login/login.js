module.exports = function(app, connection)
{


//session login
app.get('/', (req, res) => {      // 1
  console.log(req.session.logined);
  if(req.session.logined) {
    res.send({'status': 400});
  } else {
    res.send({'status':500});
  }
});

//session logout
app.post('/logout', (req, res) => {      // 3
  req.session.destroy();
  res.send({'status':400})
});

//login
app.post('/login/login', function(req, res){
  var userId = req.body.userId;
  var userPw = req.body.userPw;
  connection.query('SELECT * FROM users WHERE userId = ?', [userId],
  function(error,results,fields){
      if (error) {
        res.json({
          'status': 500
        });
      } else {
        console.log(results[0]);
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

}
