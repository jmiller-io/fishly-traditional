var mongoose = require('mongoose');

var FishSchema = new mongoose.Schema({
  date: String,
  imgURL: String,
  lake: String,
  weight: Number,
  species: String,
  username: String
})

var Fish  = mongoose.model('Fish', FishSchema);


module.exports = {
  FishSchema: FishSchema,
  Fish: Fish
}

