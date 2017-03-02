const express = require('express');
const router = express.Router();
const handlebars = require('handlebars');
const User = require('../models/user.js');
const Lake = require('../models/lake.js');
const Fish = require('../models/fish.js');
const multer = require('multer');
const AWS = require('aws-sdk');
const generateRandomFileName = require('../lib/generateRandomFileName.js');

// MULTER
const upload = multer({
  storage: multer.memoryStorage(),
});



// AWS
const s3 = new AWS.S3();
AWS.config.update(
  {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
);


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
    Lake.findOne({_id: req.params.id})
      .populate('caught')
      .exec(function (err, results) {
        if (err) console.log(err)
          console.log(results)
          res.render('lake', {title: 'All Fish From:', avatar: req.session.user.image.url, name: req.session.user.name, fish: results.caught})
      })
  }
})

// Handle Request for fish page
router.get('/fish', (req, res, next) => {
  if (!req.session.user) {
    res.render('index', {title: 'Fish.ly'})
  } else {
    console.log(req.session.user)
    res.render('fish', {title: 'Add a Catch', avatar: req.session.user.image.url, userId: req.session.user.id, username: req.session.user.name.givenName})
  }
})

// Handle Fish Creation
router.post('/fish', upload.any(), (req, res, next) => {
  var file = generateRandomFileName(req.files[0])
  s3.putObject({
    Bucket: process.env.S3_BUCKET_FISHLY,
    Key: file,
    Body: req.files[0].buffer,
    ACL: 'public-read'
  }, function(err) {
    if (err) return res.status(400).send(err);
      var f = new Fish.Fish({
        date: req.body.date,
        imgURL: 'https://fishly-app.s3.amazonaws.com/' + file,
        lake: req.body.lake,
        measurement: req.body.measurement,
        species: req.body.species,
        username: req.body.user
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
            else if (results) {
              console.log('lake exists in db')
              Lake.findOneAndUpdate({name: req.body.lake}, { $push: {caught: f}},
              function(err, results) {
                if (err) {
                  // console.log(err)
                } else {
                  // console.log(results)
                }
              })
            }
          })
        res.redirect('/basket')
        }
    });
  })
})


// Handles deletion of fish
router.delete('/fish/:id', function(req, res, next) {
  console.log(req.params.id)
  console.log(req.query.lake)
  Fish.Fish.remove({_id: req.params.id}, function(err) {
    if (err) {
      console.log(err)
    } else {
      console.log('deleted from db')
      User.findOneAndUpdate({_id: req.session.user.id}, {$pull: {basket: req.params.id}}, {new: true}, function(err, removedFromUser) {
        if (err) {
          console.log(err)
        } else {
          console.log('deleted reference from user')
        }
      })
      Lake.findOneAndUpdate({name: `${req.query.lake}`}, {$pull: {caught: req.params.id}}, {new: true}, function(err, removedFromLake) {
        if (err) {
          console.log(err)
        } else {
          console.log('deleted reference from lake')
        }
      })
    }
  })
})

// Update Fish
router.post('/fish/:id', upload.any(), function(req, res, next) {
  var entry = {};
  for (var key in req.body) {
    if (req.body[key] !== "") {
      entry[key] = req.body[key]
    }
  }

  if(req.files[0]) {
    var file = generateRandomFileName(req.files[0]);
    entry['imgURL'] = 'https://fishly-app.s3.amazonaws.com/' + file
    s3.putObject({
      Bucket: process.env.S3_BUCKET_FISHLY,
      Key: file,
      Body: req.files[0].buffer,
      ACL: 'public-read'
    }, function(err) {
      if (err) {
        return res.status(400).send(err)
      }
    })
  }

  // remove reference from old lake
  if (entry.lake) {
    Fish.Fish.findOne({_id: req.params.id}, function(err, fish) {
      Lake.findOneAndUpdate({name: `${fish.lake}`}, {$pull: {caught: req.params.id}}, {new: true}, function(err, removedFromLake) {
        if (err) {
          console.log(err)
        } else {
          console.log('deleted reference from lake')
        }
      })
      // find new lake
      Lake.findOne({name: entry.lake}, function(err, results) {
          if (err) {
            console.log(err)
          }
          if (!results) {
            console.log('no existing lake in db')
            var l = new Lake({
              name: entry.lake,
              caught: fish
            })
            l.save();
          }
          else if(results) {
            console.log('lake exists in db')
            Lake.findOneAndUpdate({name: entry.lake}, { $push: {caught: fish}},
              function(err, results) {
                if (err) {
                } else {
                }
              })
          }
        })
    })
  }
  console.log('hello?')
  // Updates fish document
  Fish.Fish.update({_id: req.params.id}, entry, function(err, results) {
    if (err) {
      console.log(err)
    } else {
      res.redirect('/basket')
    }
  })
})


router.get('/basket', (req, res, next) => {
  if (!req.session.user) {
    res.render('index', {title: 'Fish.ly'})
  } else {
    User.findOne({_id: req.session.user.id})
      .populate('basket')
      .exec(function (err, results) {
        if (err) console.log(err)
          console.log(results)
          res.render('basket', {title: 'All Fish From:', avatar: req.session.user.image.url, name: req.session.user.name, fish: results.basket})
      })
  }
})

module.exports = router


















