var mongoose = require('mongoose')

var ExampleSchema = new mongoose.Schema({
  name: String,
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Example', ExampleSchema)
