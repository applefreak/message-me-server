var jsonfile = require('jsonfile');
var mqtt = require('./mqtt');

var save = function (dest, msg, cb) {
	var file = __dirname + '/' + dest + '/message.json';

	jsonfile.writeFile(file, msg, function (err) {
		if (err) {
			cb({saved: false, err: err});
		} else {
			cb({saved: true});
			mqtt.publishMsg(dest, msg.msg);
		}
	});
}

var latest = function (name, cb) {
	var file = __dirname + '/' + name + '/message.json';

	jsonfile.readFile(file, function(err, obj) {
		if (err) {
			cb(err);
		} else {
			cb(obj);
		}
	});
}


module.exports.save = save;
module.exports.latest = latest;
