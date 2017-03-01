require('./config')
// Require models
const user = require('../models/user.js');
const fish = require('../models/fish.js');
const lake = require('../models/lake.js');

var l = new lake({
  name: 'Lake Minnetonka'
})

l.save();
