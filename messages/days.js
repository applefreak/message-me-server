var moment = require('moment');
var config = require('../config');

var dateTogether = moment(config.dateTogether, 'YYYY-MM-DD').utc();

var getDaysTogether = function () {
	var now = moment().utc().hour(0).minute(0).second(0).millisecond(0);
	var diff = now.diff(dateTogether);
	return moment.duration(diff).asDays().toString();
}

module.exports.getDaysTogether = getDaysTogether;
