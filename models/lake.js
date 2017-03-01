var mongoose = require('mongoose');

var LakeSchema = new mongoose.Schema({
  name: String,
  caught: [{type: mongoose.Schema.Types.ObjectId, ref: 'Fish'}]
})

var Lake = mongoose.model('Lake', LakeSchema);
module.exports = Lake;
