const User = require('../models/user');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { body, validationResult } = require('express-validator');

exports.signUpGet = function (req, res, next) {
  res.render('sign-up_form', { title: 'Sign Up' });
};

exports.signUpPost = [
  body('firstName', 'First Name is required')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('lastName', 'Last Name is required')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('username', 'Username is required').trim().isLength({ min: 1 }).escape(),
  body('password', 'Password is required').trim().isLength({ min: 1 }).escape(),
  body('confirmPassword', 'Password and Confirm Password should be same')
    .trim()
    .isLength({ min: 1 })
    .custom((value, { req }) => value === req.body.password)
    .escape(),
  body('isAdmin').trim().escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render('sign-up_form', {
        title: 'Sign Up',
        errors: errors.array(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        isAdmin: req.body.isAdmin,
      });
      return;
    }
    bcrypt.hash(req.body.password, 10, function (err, hashedPassword) {
      if (err) {
        return next(err);
      }
      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: hashedPassword,
        isAdmin: req.body.isAdmin ? true : false,
      });

      user.save(function (err) {
        if (err) {
          return next(err);
        }
        res.redirect('/login');
      });
    });
  },
];

exports.loginGet = function (req, res, next) {
  res.render('login_form', { title: 'Login' });
};

exports.loginPost = [
  body('username', 'Username is required').trim().isLength({ min: 1 }).escape(),
  body('password', 'Password is required').trim().isLength({ min: 1 }).escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render('login_form', {
        title: 'Login',
        username: req.body.username,
        errors: errors.array(),
      });
      return;
    }
    next();
  },
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
  }),
];

exports.logOut = function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
};

exports.becomeMemberGet = function (req, res, next) {
  res.send('Become member page get');
};

exports.becomeMemberPost = function (req, res, next) {
  res.send('Become member page post');
};
