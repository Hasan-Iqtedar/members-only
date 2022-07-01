const Message = require('../models/message');

exports.index = function (req, res, next) {
  res.render('index', { title: 'Clubhouse', user: req.user });
};

exports.createMessage = function (req, res, next) {
  res.send('Create Message form');
};

exports.deleteMessage = function (req, res, next) {
  res.send('Delete Message');
};
