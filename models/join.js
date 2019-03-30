var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

//Define Schemes
var JoinSchema = new Schema({
  userId: String,
  userPw: String,
  userGen: String,
  userBirth: String,
  userNick: String,
  userImg: String,
  interest: String,
  gps_lat: String,
  gps_lan: String
});


module.exports = mongoose.model('join',JoinSchema);
