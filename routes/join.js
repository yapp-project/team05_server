module.exports = function(app, Join)
{
	app.post('/api/join', function(req, res){
    console.log('post /api/join');
    var join = new Join();
    join.userId = new String(req.body.userId),
    join.userPw = new String(req.body.userPw),
    join.userGen = new String(req.body.userGen),
    join.userBirth = new String(req.body.userBirth),
    join.userNick = new String(req.body.userNick),
    join.userImg = new String(req.body.userImg),
    join.interest = new String(req.body.interest),
    join.gps_lat = new String(req.body.gps_lat),
    join.gps_lan = new String(req.body.gps_lan)
    join.save(function(err){
        if(err){
            console.error(err);
            res.json({result: 0});
            return;
        }

        res.json({result: 1});

    });
     });

     // GET ALL BOOKS
app.get('/api/join', function(req,res){
  console.log('get /api/join');
    Join.find(function(err, join){
        if(err) return res.status(500).send({error: 'database failure'});
        res.json(join);
    })
});

	// app.get('/api/join', function(req, res){
	// 	console.log('/api/join');
	// 	join.find({}, function(err, join){
	// 		if(err) return res.status(500).send({error: 'database failure'});
	// 		res.json(join);
	// 		res.end();
	// 	});
	// });
	// app.delete('/api/join', function(req,res){
  //               console.log('/api/join delete');
  //               join.remove({userId: req.body[0].userId, userPw: req.body[0].userPw},function(err,join){
  //                       if(err){
  //                               console.log(error);
  //                               return res.status(500).end('Database error');
  //                       }
  //
  //                       res.end();
  //               });
  //       });
  //
	// function addjoin(userId, userPw){
	// 	join.findOne({userId:userId, userPw:userPw}, function(err, con){
	// 		if(!con){
	// 			var join  = new join({userId:userId, userPw:userPw});
	// 			join.save(function(err){
	// 				if(err){
	// 					console.error(err);
	// 				}
	// 			});
	// 		}
	// 	});
	// }
}
