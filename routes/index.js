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
    res.render('fish', {title: 'Add a Catch', avatar: req.session.user.image.url})
  }
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
