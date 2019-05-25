module.exports = function(app, connection)
{
  var date = require('date-utils');
  var newDate = new Date();
  var time = newDate.toFormat('YYYY-MM-DD HH24:MI:SS');
  // console.log(time)

  //notice upload
   app.post('/notice/upload', function(req, res, next){
    console.log('post /notice/upload '+ time);
    var meetId = req.body.meetId;
    var contents = req.body.contents;
    var sql = 'INSERT INTO notice(fk_meetId,contents) VALUES('+meetId+',"'+contents+'") ON DUPLICATE KEY UPDATE contents="'+contents+'";';
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
  console.log('post /notice/comment/upload '+ time);;
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
 console.log('get /notice/view '+ time);
 var meetId=  req.query.meetId
 var statement = 'select * from notice where fk_meetId ='+meetId+';';
 var sql2 = 'select count(*) from noticecomment where fk_meetId ='+meetId+';';
 console.log(sql2);
      connection.query(statement, function (err, rows, fields){
          if(err) {
            console.log(err);
            return res.json({'state':400});
          }
          else{
            connection.query(sql2, function (err2, rows2, fields2){
                if(err2) {
                  console.log(err2);
                  return res.json({'state':400});
                }
                else{
                    console.log(rows2[0]);
                    res.json({
                      'state':200,
                      'meetId': rows[0]["fk_meetId"],
                      'notice': rows[0]["contents"],
                      'date':rows[0]["date"],
                      'commentNum': rows2[0]["count(*)"]

                    });
                }
            });
          }
      });

    });

    // view notice
    app.get('/notice/comment/view', function(req,res){
     console.log('get /notice/comment/view '+ time);
     var meetId=  req.query.meetId
     // var statement = 'select userimg from notice where fk_meetId ='+meetId+';';
     var sql2 = 'SELECT * from noticecomment as nc left join userImg as ui  on ui.fk_userId = nc.fk_userId where nc.fk_meetId ='+meetId+';';
     connection.query(sql2, function (err2, rows2, fields2){
         if(err2) {
           console.log(err2);
           return res.json({'state':400});
         }
         else{
             // console.log(rows2);
             res.json({
               'state':200,
               'comment': rows2,
               // 'userImg': results4[0]["userImg"]

             });
         }
     });

        });



}
