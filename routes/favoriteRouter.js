var express = require('express');
var Favorite = require('../models/favorite');
var verify = require("./verify.js");

var favoriteRouter = express.Router();

favoriteRouter.route('/')
    //Verify
    .all(verify.verifyUser)
    .get(function (req, res, next) {
        Favorite.findOne({postedBy: req.user._id})
            .populate('threads')
            .exec(function (err, favorites) {
                if (err) return next(err);
                res.json(favorites.threads);
            })
    })
    .post(function (req, res, next) {
        Favorite.findOne({postedBy: req.user._id}, function (err, doc) {
            if (err) return next(err);

            if (doc === null) {
                Favorite.create({postedBy: req.user._id, threads: [req.body._id]}, function (err, favorite) {
                    if (err) next(err);

                    console.log('A new list of favorites has been created!');
                    return res.json(favorite);
                });
            }
            else {
                if (doc.threads.indexOf(req.body._id) != -1)
                    return res.status(200).end("This dish has been added into the favorite list!");

                doc.threads.push(req.body._id);
                doc.save(function (err, result) {
                    res.json(result);
                });

            }
        })
    });

favoriteRouter.delete('/:threadId', verify.verifyUser,function (req, res, next) {
    Favorite.findOne({postedBy: req.user._id}, function (err, doc) {
        if (err) return next(err);
        doc.threads.splice(doc.threads.indexOf(req.params.threadId), 1);
        doc.save(function (err, doc) {
            if (err) return next(err);
            res.json(doc);
        })
    })
});

module.exports = favoriteRouter;

