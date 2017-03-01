const express = require('express');
const router = express.Router();
const handlebars = require('handlebars');
const User = require('../models/user.js');
const Lake = require('../models/lake.js');

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
      res.render('lakes', {title: 'All Lakes', avatar: req.session.user.image.url, name: req.session.user.name, lakes: results[0]})
    })
  }
})

router.get('/lake/:id', (req, res, next) => {
  if (!req.session.user) {
    res.render('index', {title: 'Fish.ly'})
  } else {
    Lake.findById({_id: req.params.id}, function (err, results) {
      res.render('lake', {title: 'All Fish From Lake', avatar: req.session.user.image.url, name: req.session.user.name, lake: results})
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
  var entry = {
    date: req.body.date,
    img: req.body.fishimg,
    lake: req.body.lake,
    length: req.body.length,
    species: req.body.species
    }

    User.findOneAndUpdate(req.body.id, { $push: { basket: entry } },
      function(err, results) {
        if (err) {
          res.send(err)
        } else {
          res.send(results)
        }
    });
  // User.findOneAndUpdate(req.body.userId {$push: {basket: entry}} function(err, results) {
  //   console.log('inside find and update')
  //   console.log(results)
  // })
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
