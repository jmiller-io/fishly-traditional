var mongoose = require('mongoose');
var FishSchema = require('./fish.js');

var UserSchema = new mongoose.Schema({
  _id: Number,
  name: String,
  avatar: String,
  basket: [{type: mongoose.Schema.Types.ObjectId, ref: 'Fish'}]
})

var User = mongoose.model('User', UserSchema);
module.exports = User;
