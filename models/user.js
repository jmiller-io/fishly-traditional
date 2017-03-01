var mongoose = require('mongoose');
var FishSchema = require('./fish.js');

var UserSchema = new mongoose.Schema({
  name: String,
  avatar: String,
  catch: [FishSchema]
})

var User = mongoose.model('User', UserSchema);
module.exports = User;
