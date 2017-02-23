var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');

//passport.authenticate(..) returns a function object which takes three parameters-req, res and next!
router.get('/facebook', passport.authenticate('facebook'), function (req, res, next) {
    // The request will be redirected to facebook for authentication, so this
    // function will not be called.
});

// router.get('/facebook/callback', function (req, res, next) {
//     passport.authenticate('facebook', function (err, user, info) {
//         if(err) return next(err); //TODO
//
//         if(!user){
//             return res.status(401).json({
//                 err: info
//             });
//         }
//
//         //calling passport.serializeUser() and passport.deserializeUser() to get persistent login sessions and req.user
//         req.login(user, function (err) {
//             if(err) {
//                 return res.status(500).json({
//                     success: false,
//                     status: 'Could not log in user'
//                 });
//             }
//             res.status(200).json({
//                 success: true,
//                 status: 'Login successful!'
//             });
//         })
//     })(req, res, next);
// });

router.get('/facebook/callback', passport.authenticate('facebook'),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

router.get('/info', function (req, res) {
    res.json(req.user);
});

module.exports = router;
