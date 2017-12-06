var express = require('express');
var expressListRoutes = require('express-list-routes');
var router = express.Router();

let jwt = require('express-jwt');

let auth = jwt({
  secret: process.env.PROJECT_BACKEND_SECRET,
  userProperty: 'payload'
});

let mongoose = require('mongoose');
let Thread = mongoose.model('Thread');
let SubThread = mongoose.model('SubThread');
let User = mongoose.model('User');

//threads ophalen
router.get('/threads/', function (req, res, next) {
  let query = Thread.find().populate('user');
  query.exec(function (err, threads) {
    if (err) {
      return next(err);
    }
    if (!threads) return next(new Error("threads niet gevonden"));
    res.json(threads);
  });
});

//thread opslaan in databank
router.post('/threads/:username', auth, function (req, res, next) {
  User.findOne({
    username: req.params.username
  }, function (err, user) {
    if (err) return next(err);
    if (!user) return next(new Error("User not found"));
    let thread = new Thread(req.body);
    thread.user = user;
    thread.save(function (err, t) {
      if (err) {
        return next(err);
      }
      user.threads.push(t);
      user.save(function(err, u){
        if(err) return next(err);
        res.json(t);
      });
    });
  });
});

//1 thread met id ophalen (hier zijn de subthreads erbij!)
router.get('/threads/:id', function (req, res, next) {
  let query = Thread.findById(req.params.id).populate('user').populate({
    path: 'subThreads',
    model: 'SubThread',
    populate: {
      path: 'user',
      model: 'User'
    }
  });

  query.exec(function (err, thread) {
    if (err) return next(err);
    if (!thread) return next(new Error('Thread not found'));
    res.json(thread);
  });
});

//subthread toevoegen aan thread met id
router.post('/threads/:username/addsubthread/:id', auth, function (req, res, next) {
  User.findOne({
    username: req.params.username
  }, function (err, user) {
    if(err) return next(err);
    if(!user) return next(new Error("User not found"))
    Thread.findById(req.params.id, function (err, thread) {
      if (err) return next(err);
      if (!thread) return next(new Error('Thread not found'));
      let sub = new SubThread(req.body);
      sub.user = user;
      sub.save(function (err, s) {
        if (err) return next(err);
        thread.subThreads.push(s);
        thread.save(function (err, t) {
          if (err) return next(err);
          res.json(t);
        });
      });
    });
  });
});

//deleten van een subthread
router.delete('/threads/delete/subthread/:id', auth, function(req, res, next){
  SubThread.findById(req.params.id, function(err, sub){
    if(err) return next(err);
    if(!sub) return next(new Error('Subthread not found'));
    sub.remove(function(err, s){
      if(err) return next(err);
      res.json("done");
    });
  });
});

//deleten van een thread + alle subthreads
router.delete('/threads/delete/thread/:id', auth, function(req, res, next){
  Thread.findById(req.params.id, function(err, t){
    if(err) return next(err);
    if(!t) return next(new Error('Thread not found'));
    for(var i = 0; i < t.subThreads.length; i++){
      SubThread.findById(t.subThreads[i], function(err, sub){
        if(err) return next(err);
        if(!sub) return next(new Error('SubThread not found'));
        sub.remove(function(err, s){
          if(err) return next(err);
        });
      });
    }
    t.remove(function(err, thread){
      if(err) return next(err);
      res.json("done");
    });
  });
});

//liken of undo'en van een thread voor een username
router.post('/threads/:id/like', auth, function(req, res, next){
  Thread.findById(req.params.id, function(err, thread){
    if(err) return next(err);
    if(!thread) return next(new Error('Thread not found'));
    let i = thread.likes.indexOf(req.body.username);
    if(i === -1){
      thread.likes.push(req.body.username);
    }else {
      thread.likes.splice(i, 1);
    }
    thread.save(function(err, t){
      if(err) return next(err);
      res.json(t);
    });
  });
});


expressListRoutes({
  prefix: ''
}, 'API:', router);
module.exports = router;