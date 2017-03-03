require('./config')
// Require models
const user = require('../models/user.js');
const Fish = require('../models/fish.js');
const Lake = require('../models/lake.js');

var l = new lake({
  name: 'Lake Minnetonka'
})

l.save();

var f = new Fish.Fish({
  imgURL: 'http://www.gameandfishmag.com/files/2016/04/Post-spawn_walleye_fishing.jpg',
  lake: 'Lake Minnetonka',
  weight: 25,
  species: 'Walleye',
  username: 'BigJohn87',
  date: '2017-03-01'
})

f.save()

Lake.findOne({name: 'Lake Minnetonka'}, function(err, results) {
            if (err) {
              console.log(err)
            }
            if (!results) {
              console.log('no existing lake in db')
              var l = new Lake({
                name: 'Lake Minnetonka',
                caught: f
              })
              l.save();
            }
            else if (results) {
              console.log('lake exists in db')
              Lake.findOneAndUpdate({name: 'Lake Minnetonka'}, { $push: {caught: f}},
              function(err, results) {
                if (err) {
                  // console.log(err)
                } else {
                  // console.log(results)
                }
              })
            }
          })


var j = new Fish.Fish({
  imgURL: 'http://1source.basspro.com/images/BK_images/Sept_15/Crappie_Blade_Main.jpg',
  lake: 'Forest Lake',
  weight: 2,
  species: 'Crappie',
  username: 'Ass',
  date: '2017-04-27'
})
j.save()

Lake.findOne({name: 'Forest Lake'}, function(err, results) {
            if (err) {
              console.log(err)
            }
            if (!results) {
              console.log('no existing lake in db')
              var l = new Lake({
                name: 'Forest Lake',
                caught: j
              })
              l.save();
            }
            else if (results) {
              console.log('lake exists in db')
              Lake.findOneAndUpdate({name: 'Forest Lake'}, { $push: {caught: j}},
              function(err, results) {
                if (err) {
                  // console.log(err)
                } else {
                  // console.log(results)
                }
              })
            }
          })


var k = new Fish.Fish({
  imgURL: 'https://forum.americanexpedition.us/images/largemouth-bass/largemouth-bass-being-held-by-fisherman.jpg',
  lake: 'Lake Nikomis',
  weight: 20,
  species: 'Largemouth Bass',
  username: 'Dude',
  date: '2017-04-27'
})
k.save()

Lake.findOne({name: 'Lake Nikomis'}, function(err, results) {
            if (err) {
              console.log(err)
            }
            if (!results) {
              console.log('no existing lake in db')
              var l = new Lake({
                name: 'Lake Nikomis',
                caught: k
              })
              l.save();
            }
            else if (results) {
              console.log('lake exists in db')
              Lake.findOneAndUpdate({name: 'Lake Nikomis'}, { $push: {caught: k}},
              function(err, results) {
                if (err) {
                  // console.log(err)
                } else {
                  // console.log(results)
                }
              })
            }
          })


var m = new Fish.Fish({
  imgURL: 'http://www.in-fisherman.com/files/2012/07/IMG_5959.jpg',
  lake: 'Lake Calhoun',
  weight: 18,
  species: 'Perch',
  username: 'Dude',
  date: '2017-01-02'
})
m.save()

Lake.findOne({name: 'Lake Calhoun'}, function(err, results) {
            if (err) {
              console.log(err)
            }
            if (!results) {
              console.log('no existing lake in db')
              var l = new Lake({
                name: 'Lake Calhoun',
                caught: m
              })
              l.save();
            }
            else if (results) {
              console.log('lake exists in db')
              Lake.findOneAndUpdate({name: 'Lake Calhoun'}, { $push: {caught: m}},
              function(err, results) {
                if (err) {
                  // console.log(err)
                } else {
                  // console.log(results)
                }
              })
            }
          })

Fish.Fish.find({}, function(err, results) {
  console.log(JSON.stringify(results))
})
