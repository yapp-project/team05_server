module.exports = function(push_data,res){
    var FCM = require('fcm-node');
                        var server = require('./serverKey.js');
                        var fcm = new FCM(server.serverKey);
                        var count = 0;
                        fcm.send(push_data, function(err, response){
                            count = count + 1;
                            if(count == 1){
                                if(err) res.status(400).json({"state" : 400, "err" : err});
                                else res.status(200).json({"state": 200});
                            }
                            
                        });
    
}