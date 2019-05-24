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
              'state': 400
            });
            console.error('error', error);
        }else{
          console.log(meetId + ',' + contents);
          res.json({
            'state': 200
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
            'state': 400
          });
          console.error('error', error);
      }else{
        console.log(meetId + ',' + comment);
        res.json({
          'state': 200
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
          if(err) return res.json({'state':400});
          else{
            connection.query(sql2, function (err2, rows2, fields2){
                if(err2) return res.json({'state':400});
                else{
                    // console.log(rows2);
                    res.json({
                      'state':200,
                      'notice': rows,
                      'comment': rows2

                    });
                }
            });
          }
      });

    });



}
