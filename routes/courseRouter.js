var express = require('express');
var Course = require('../models/course');
var Thread = require('../models/thread');
var passport = require('passport');
var verify = require('./verify');

var courseRouter = express.Router();

courseRouter.route('/')
     //Verify
    .all(verify.verifyUser)
    .get(function (req, res, next) {
        Course.find({}, function (err, docs) {
            if (err) return next(err);
            res.json(docs);
        })
    })
    .post(function (req, res, next) {  //TODO just open for admin
        Course.create(req.body, function (err, course) {
            if (err) return next(err);
            res.json({
                message: 'New course created',
                course: course
            })
        })
    });

courseRouter.route('/:courseId/threads')
//Verify
    .all(verify.verifyUser)
    .get(function (req, res, next) {
        Thread.find({course: req.params.courseId}, function (err, docs) {
            if (err) return next(err);
            res.json(docs);
        })
    })
    .post(function (req, res, next) {
        req.body.postedBy = req.user._id;
        req.body.course = req.params.courseId;
        Thread.create(req.body, function (err, thread) {
            if (err) return next(err);
            res.json({
                message: 'New thread created',
                thread: thread
            })
        })
    });

courseRouter.route('/:courseId/threads/:threadId/comments')
    .all(verify.verifyUser)
    .get(function (req, res, next) {
        Thread.findById(req.params.threadId)
            .populate('comments.postedBy')   //mongoose population!!!
            .exec(function (err, thread) {
                if (err) next(err);
                res.json(thread.comments);
            })
    })
    .post(function (req, res, next) {
        Thread.findById(req.params.threadId, function (err, thread) {
            if (err) return next(err);
            req.body.postedBy = req.user._id;
            thread.comments.push(req.body);
            thread.save(function (err, thread) {
                if (err) return next(err);
                res.json(thread);
            })
        })
    });

//TODO
// courseRouter.delete('/:courseId/threads/:threadId/comments/:commentId', function () {
//
// })


module.exports = courseRouter;

