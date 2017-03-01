const express = require('express');
const request = require('request');
const router = express.Router();
const user = require('../models/user.js')

router.get('/', (req, res, next) => {
  const user = req.session.user;
  if (!user) return res.redirect('/');

  // res.render( profile page )
  res.send(`<h1>${f_name}</h1><img src=${avatar_url}>`);
});

router.get('/me', (req, res, next) => {
  const url = 'https://www.googleapis.com/plus/v1/people/me';
  const access_token = req.session.access_token;
  if (!access_token) return res.redirect('/');
  const options = {
    method: 'GET',
    url,
    headers: { 'Authorization' : `Bearer ${access_token}`}
  }
  request(options, (err, response, body) => {
    const userData = JSON.parse(body);
    req.session.user = userData;
    // Database work
    user.findById({_id: req.session.user.id }, function(err, results) {
      if (err) {
        console.log(err)
      }

      if (!results) {
        console.log('no existing user in db')
        var u = new user({
          _id: req.session.user.id,
          name: req.session.user.name.givenName,
          avatar: req.session.user.image.url
        })
        u.save();
        console.log(req.session.user)
      }
      else if(results) {
        console.log('user exists in db')
        req.session.user.basket = results.basket
        console.log('basket')
        console.log(req.session.user.basket)

      }
      return res.redirect('/');
    })
  })
});

module.exports = router;
