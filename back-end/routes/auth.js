const passport = require('passport');
const Account = require('../models/account');
const router = require('express').Router();

router.get('/', function(req, res) {
  res.send('index');
});

router.get('/register', function(req, res) {
  res.send('registered');
});

router.post('/register', function(req, res, next) {
  console.log('registering user');
  Account.register(new Account({username: req.body.username}), req.body.password, function(err) {
    if (err) {
      console.log('error while user register!', err);
      return next(err);
    }

    console.log('user registered!');

    res.redirect('/');
  });
});

router.get('/login', function(req, res) {
  res.send('login');
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), function(req, res) {
    res.redirect('/');
  });

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;