var express = require('express');
var router = express.Router();

var messages = require('../messages/messages');

/* GET users listing. */
router.get('/poyu', function(req, res, next) {
	messages.latest('poyu', function(result) {
		res.send(result);
	});
});
router.post('/poyu', function(req, res, next) {
	messages.save('poyu', req.body, function(result) {
		res.send(result);
	});
});


router.get('/celeste', function(req, res, next) {
	messages.latest('celeste', function(result) {
		res.send(result);
	});
});
router.post('/celeste', function(req, res, next) {
	messages.save('celeste', req.body, function(result) {
		res.send(result);
	});
});

module.exports = router;
