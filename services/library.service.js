var config = require('config.json');
var Q = require('q');
var mongoose = require('mongoose');
var Library = require('models/library.model');
var User = require('models/user.model');
mongoose.Promise = global.Promise;

var service = {};

service.getLibrary = getLibrary;
service.create = create;

module.exports = service;

function getLibrary (userId) {

	var deferred = Q.defer();

	Library.findOne({user: userId})
	.exec()
	.then((library) => {
		deferred.resolve(library);
	})
	.catch((err) => {
		deferred.reject(err);
	});

	return deferred.promise;

}

function create (userId) {

	let deferred = Q.defer();

	new Library({user: userId})
		.save()
		.then(createdLibrary => {
			deferred.resolve(createdLibrary);
		})
		.catch(err => {
			deferred.reject(err);
		});

	return deferred.promise;

}