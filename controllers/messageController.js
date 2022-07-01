const { body, validationResult } = require('express-validator');
const Message = require('../models/message');

exports.index = function (req, res, next) {
  res.render('index', { title: 'Clubhouse', user: req.user });
};

exports.createMessageGet = function (req, res, next) {
  res.render('message_form', { title: 'New Message', user: req.user });
};

exports.createMessagePost = [
  body('title', 'Title not provided.').trim().isLength({ min: 1 }).escape(),
  body('newMessage', 'Cannot submit empty message.')
    .trim()
    .isLength({ min: 1 })
    .escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render('message_form', {
        title: 'New Message',
        user: req.user,
        errors: errors.array(),
      });
      return;
    }
    const message = new Message({
      title: req.body.title,
      text: req.body.newMessage,
      timestamp: new Date(),
      user: req.user._id,
    });

    message.save(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect('/');
    });
  },
];

exports.deleteMessage = function (req, res, next) {
  res.send('Delete Message');
};
