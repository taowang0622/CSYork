var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var User = require('./models/user');
var config = require('./config');

//OAuth authentication requires session support!
passport.serializeUser(function (user, done) {
    done(null, user.id);
});
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

exports.facebook = passport.use(new FacebookStrategy({
        clientID: config.facebook.clientID,
        clientSecret: config.facebook.clientSecret,
        callbackURL: config.facebook.callbackURL
    }, function (accessToken, refreshToken, profile, done) {
        User.findOne({OauthId: profile.id}, function (err, user) {
            if (err) done(err); //passing error!
            if (!err && user !== null) {
                //passing user to passport.authenticate() and serializeUser()
                done(null, user);
            }
            else {
                var user = new User({
                    userName: profile.displayName,
                    OauthId: profile.id,
                    OauthToken: accessToken
                });
                user.save(function (err) {
                    if (err) console.log(err); //TODO
                    done(null, user); //passing user along the middleware chain!
                })
            }
        })
    }
));

exports.twitter = passport.use(new TwitterStrategy({
        consumerKey: config.twitter.clientID,
        consumerSecret: config.twitter.clientSecret,
        callbackURL: config.twitter.callbackURL
    },
    function(accessToken, tokenSecret, profile, done) {
        User.findOne({OauthId: profile.id}, function (err, user) {
            if (err) done(err); //passing error!
            if (!err && user !== null) {
                //passing user to passport.authenticate() and serializeUser()
                done(null, user);
            }
            else {
                var user = new User({
                    userName: profile.displayName,
                    OauthId: profile.id,
                    OauthToken: accessToken
                });
                user.save(function (err) {
                    if (err) console.log(err); //TODO
                    done(null, user); //passing user along the middleware chain!
                })
            }
        })
    }
));