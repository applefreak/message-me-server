var URL = require('url');
var mqtt = require('mqtt');
var days = require('./days');
var config = require('../config');
var messages = require('./messages');

var broker = URL.parse(config.brokerUrl);
var url = "mqtts://" + broker.host;

var options = {
	port: broker.port,
	clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
	username: config.brokerUsername,
	password: config.brokerPassword,
};

var client = mqtt.connect(url, options);

var publishMsg = function(topic, msg) {
	if (client.connected) {
		client.publish(topic, msg, {qos: 0, retain: false}, function (err) {
			console.log('Sent msg!');
		});
	}
}

client.on('connect', function() {
	client.subscribe('request');
	console.log('MQTT Connected!');
});

client.on('message', function(topic, message, packet) {
	var msg = message.toString();
	if (topic == 'request') {
		if (msg == 'days') {
			client.publish('days', days.getDaysTogether(), {qos: 0, retain: false}, function (err) {
				console.log('Sent days!');
			});
		} else if (msg == 'celeste' || msg == 'poyu') {
			messages.latest(msg, function(latest) {
				client.publish(msg, latest.msg, {qos: 0, retain: false}, function (err) {
					console.log('Sent latest!');
				});
			});
		}
		
	}
});

module.exports.publishMsg = publishMsg;
