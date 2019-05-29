module.exports = function(app, connection)
{

app.post('/login/withdraw', function(req, res){
  var userId = req.body.userId;
  var userPw = req.body.userPw;
  connection.query('SELECT userPw FROM realusers WHERE userId = ?', [userId], function(error,results,fields){
      if (error) {
        res.json({
          'state': 400
        });
      } else {
        if (results.length>0) {
          if (userPw == results[0].userPw) {
            connection.query('DELETE FROM realusers WHERE userId = ?', [userId], function(error,results,fields){
              if (error) {
                console.log(error);
                res.json({
                  'state': 400
                });
              } else {
                res.json({
                  'state': 200
                });
              }
            })
          }else {
            res.json({
              'state': 300
            });
          }

        }else {
          res.json({
            'state': 300
          });
        }
      }
  })
});
}
