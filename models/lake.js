var mongoose = require('mongoose');

var LakeSchema = new mongoose.Schema({
  name: String,
  caught: [{
    user: String,
    type: String
  }]
})

var Lake = mongoose.model('Lake', LakeSchema);
module.exports = Lake;
