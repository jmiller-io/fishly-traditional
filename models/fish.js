var mongoose = require('mongoose');

var FishSchema = new mongoose.Schema({
  date: Date,
  img: String,
  lake: String,
  length: Number,
  species: String
})

var Fish  = mongoose.model('Fish', FishSchema);
module.exports = FishSchema;
