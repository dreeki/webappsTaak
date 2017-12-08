var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');
let User = mongoose.model('User');

let jwt = require('express-jwt');

let auth = jwt({
  secret: process.env.PROJECT_BACKEND_SECRET,
  userProperty: 'payload'
});

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', function (req, res, next) {
  if (!req.body.username || !req.body.password || !req.body.firstname || !req.body.lastname || !req.body.country || !req.body.birthDate) {
    return res.status(400).json({
      message: 'Please fill out all fields'
    });
  }
  var user = new User();
  user.username = req.body.username;
  user.firstname = req.body.firstname;
  user.lastname = req.body.lastname;
  user.birthDate = req.body.birthDate;
  user.country = req.body.country;
  user.birthDate = req.body.birthDate;
  user.setPassword(req.body.password);
  user.save(function (err) {
    if (err) {
      return next(err);
    }
    return res.json({
      token: user.generateJWT()
    })
  });
});

router.post('/login', function (req, res, next) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({
      message: 'Please fill out all fields'
    });
  }
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (user) {
      return res.json({
        token: user.generateJWT()
      });
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});

router.post('/checkusername', function (req, res, next) {
  // if (req.body.username) {
  User.find({
    username: req.body.username
  }, function (err, result) {
    if (result.length) {
      res.json({
        'username': 'alreadyexists'
      })
    } else {
      res.json({
        'username': 'ok'
      })
    }
  });
  // }
});

router.patch('/edit/:id', auth,function (req, res, next) {
  User.findById(req.params.id, function (err, user) {
    if (err) return next(err);
    if (!user) return next(new Error("User not found"));
    user.firstname = req.body._firstname || user.firstname;
    user.lastname = req.body._lastname || user.lastname;
    user.birthDate = req.body._birthDate || user.birthDate;
    user.country = req.body._country || user.country;

    user.save(function (err, u) {
      if (err) return next(err);
      res.json({
        u
      });
    });
  });

});

router.post('/checkpassword/:id', auth,function (req, res, next) {
  User.findOne({
    username: req.params.id
  }, function (err, user) {
    if (err) return next(err);
    if (!user) return next(new Error("User not found"));
    if (user.validPassword(req.body.password)) {
      res.json({
        'password': 'ok'
      });
    } else {
      res.json({
        'password': 'wrong'
      });
    }
  });

});

router.get('/:username', function (req, res, next) {
  let query = User.findOne({
    username: req.params.username
  }).populate({
    path: 'threads',
    model: 'Thread',
    populate: {
      path: 'user',
      model: 'User'
    }
  }).populate({
    path: 'threads',
    model: 'Thread',
    populate: {
      path: 'subThreads',
      model: 'SubThread',
      populate: {
        path: 'user',
        model: 'User'
      }
    }
  });
  query.exec(function (err, user) {
    if (err) return next(err);
    if (!user) return next(new Error("User not found"));
    res.json(user)
  });
});

router.patch('/edit/password/:id', auth, function (req, res, next) {
  User.findById(req.params.id, function (err, user) {
    if (err) return next(err);
    if (!user) return next(new Error("User not found"));
    user.setPassword(req.body.password);

    user.save(function (err, u) {
      if (err) return next(err);
      res.json({
        u
      });
    });
  });
});


module.exports = router;