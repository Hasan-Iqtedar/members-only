var express = require('express');
var router = express.Router();

var userController = require('../controllers/userController');
var messageController = require('../controllers/messageController');

/* GET home page. */
router.get('/', messageController.index);

router.get('/sign-up', userController.signUpGet);
router.post('/sign-up', userController.signUpPost);

router.get('/login', userController.loginGet);
router.post('/login', userController.loginPost);

router.get('/log-out', userController.logOut);

router.get('/membership', userController.becomeMemberGet);
router.post('/membership', userController.becomeMemberPost);

router.get('/new-message', messageController.createMessageGet);
router.post('/new-message', messageController.createMessagePost);

router.get('/:id/delete', messageController.deleteMessage);

module.exports = router;
