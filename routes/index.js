var express = require('express');
var router = express.Router();

// views/index.hbs
router.get('/', function(req, res, next) {
  if (req.session.loggedin) {
    res.render('home', { title: 'Home | Job Tracker' });
	} else {
    res.render('login', { title: 'Login | Job Tracker' });
	}
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login | Job Tracker',message: req.flash('error')  });
});

router.get('/register', function(req, res, next) {
	res.render('register', {title: 'Register | Job Tracker', message: req.flash('error') });
});

router.get('/menu', function(req, res, next) {
  res.render('menu', { title: 'Menu | Job Tracker' });
});

router.get('/contacts', function(req, res, next) {
  if (req.session.loggedin) {
    res.render('contacts', { title: 'Contact | Job Tracker' });
	} else {
    res.render('login', { title: 'Login | Job Tracker' });
	}
});

router.get('/user', function(req, res, next) {
  if (req.session.loggedin) {
    res.render('user', { title: 'User | Job Tracker', user : req.user}); 
  } else {
    res.render('login', { title : 'Login | Job Tracker' });
  }
});

router.get('/create', function(req, res, next) {
  if (req.session.loggedin) {
    res.render('create', { title: 'Create | Job Tracker' });
	} else {
    res.render('login', { title: 'Login | Job Tracker' });
	}
});

module.exports = router;
