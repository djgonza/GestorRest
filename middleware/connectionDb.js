var config = require('config.json');
var mongoose = require('mongoose');

var connectionDb = {};

module.exports = connectionDb;

connectionDb.connect = function () {
	mongoose.connect(config.connectionString);
}

connectionDb.disconnect = function () {
	mongoose.connection.close();
}