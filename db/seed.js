require('./config')
// Require models
const user = require('../models/user.js');
const fish = require('../models/fish.js');
const lake = require('../models/lake.js');

// var l = new lake({
//   name: 'Lake Minnetonka'
// })

// l.save();

var f = new Fish({
  img: 'http://www.gameandfishmag.com/files/2016/04/Post-spawn_walleye_fishing.jpg',
  lake: 'Lake Minnetonka',
  length: 24,
  species: 'Walleye'
})

var me = mongoose.findOneAndUpdate({_id: 111074352570139300000})
