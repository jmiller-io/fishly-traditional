const express = require('express');
const router = express.Router();
const handlebars = require('handlebars');
const User = require('../models/user.js');
const Lake = require('../models/lake.js');
const Fish = require('../models/fish.js');

router.get('/', (req, res, next) => {
  if (!req.session.user) {
    res.render('index', {title: 'Fish.ly'})
  } else {
    User.findById({_id: req.session.user.id}, function(err, results) {
      res.render('landing', {title: 'landing', avatar: results.avatar, name: results.name, basket: results.basket})
    })
  }
})

router.get('/lakes', (req, res, next) => {
  if (!req.session.user) {
    res.render('index', {title: 'Fish.ly'})
  } else {
    Lake.find({}, function (err, results) {
      res.render('lakes', {title: 'All Lakes', avatar: req.session.user.image.url, name: req.session.user.name, lakes: results})
    })
  }
})

router.get('/lake/:id', (req, res, next) => {
  if (!req.session.user) {
    res.render('index', {title: 'Fish.ly'})
  } else {
    Lake.findById({_id: req.params.id}, function (err, results) {
      res.render('lake', {title: 'All Fish From:', avatar: req.session.user.image.url, name: req.session.user.name, lake: results})
    })
  }
})


router.get('/fish', (req, res, next) => {
  if (!req.session.user) {
    res.render('index', {title: 'Fish.ly'})
  } else {
    res.render('fish', {title: 'Add a Catch', avatar: req.session.user.image.url, userId: req.session.user.id})
  }
})

router.post('/fish', (req, res, next) => {
  console.log(req.body);
  // var entry = {
  //   date: req.body.date,
  //   imgURL: req.body.fishImg,
  //   lake: req.body.lake,
  //   length: req.body.length,
  //   species: req.body.species
  // }
  var f = new Fish.Fish({
    date: req.body.date,
    imgURL: req.body.fishImg,
    lake: req.body.lake,
    length: req.body.length,
    species: req.body.species
  })
  f.save();

  // Add fish to user
  User.findOneAndUpdate(req.body.userId, { $push: { basket: f } },
    function(err, results) {
      if (err) {
        res.send(err)
      } else {
        Lake.findOne({name: req.body.lake}, function(err, results) {
          if (err) {
            console.log(err)
          }
          if (!results) {
            console.log('no existing lake in db')
            var l = new Lake({
              name: req.body.lake,
              caught: f
            })
            l.save();
          }
          else if(results) {
            console.log('lake exists in db')
            Lake.findOneAndUpdate({name: req.body.lake}, { $push: {caught: f}},
              function(err, results) {
                if (err) {
                  console.log(err)
                } else {
                  console.log(results)
                }
              })
          }
        })
        res.redirect('/basket')
      }
    });
})

router.get('/basket', (req, res, next) => {
  if (!req.session.user) {
    res.render('index', {title: 'Fish.ly'})
  } else {
    User.findById({_id: req.session.user.id}, function(err, results) {
      res.render('basket', {title: 'basket', avatar: req.session.user.image.url, fish: results.basket})
    })
  }
})

module.exports = router
