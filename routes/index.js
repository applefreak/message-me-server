var express = require('express');
var router = express.Router();

var moment = require('moment');
var messages = require('../messages/messages');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.redirect('/poyu');
});

router.get('/poyu', function(req, res, next) {
	messages.latest('poyu', function(msg) {
		res.render('index', {dest: 'poyu', isPoyu: true, msg, sent_time: moment(msg.time).format('LLL'), title: 'To Poyu'});
	})
});
router.get('/celeste', function(req, res, next) {
	messages.latest('celeste', function(msg) {
		res.render('index', {dest: 'celeste', isCeleste: true, msg, sent_time: moment(msg.time).format('LLL'), title: 'To Celeste'});
	})
});

module.exports = router;
