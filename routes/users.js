var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');

//passport.authenticate(..) returns a function object which takes three parameters-req, res and next!
router.get('/facebook', passport.authenticate('facebook'), function (req, res, next) {
    // The request will be redirected to facebook for authentication, so this
    // function will not be called.
});

router.get('/facebook/callback', passport.authenticate('facebook'),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

router.get('/twitter', passport.authenticate('twitter'), function (req, res, next) {
    // The request will be redirected to facebook for authentication, so this
    // function will not be called.
});

router.get('/twitter/callback', passport.authenticate('twitter'),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

router.get('/info', function (req, res) {
    res.json(req.user);
});

module.exports = router;
