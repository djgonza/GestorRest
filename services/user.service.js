var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongoose = require('mongoose');
var User = require('models/user.model');
var LibraryService = require('services/library.service');

var service = {};

service.getUser = getUser;
service.getUserInfo = getUserInfo;
service.authenticate = authenticate;
service.create = create;
//service.update = update;
//service.remove = remove;

module.exports = service;

function getUserInfo (id) {

	var deferred = Q.defer();
	User.findOne({_id: id}, {password:0})
	.exec()
	.then(user => {
		deferred.resolve(user);
	})
	.catch(err => {
		deferred.reject(err);
	});

	return deferred.promise;

}

function getUser (username) {

	var deferred = Q.defer();

	User.findOne({username})
	.exec()
	.then(user => {
		deferred.resolve(user);
	})
	.catch(err => {
		deferred.reject(err);
	});

	return deferred.promise;

}

function authenticate(username, password) {

	var deferred = Q.defer();

	getUser(username).then(user => {
		if (user && bcrypt.compareSync(password, user.password)) {
			// authentication successful
			deferred.resolve({
				token: jwt.sign({ id: user._id }, config.secret)
			});
		} else {
			// authentication failed
			deferred.resolve();
		}

	})
	.catch(err => {
		deferred.reject(err);
	});

	return deferred.promise;
}

function create(userParam) { //Create user and library

	let deferred = Q.defer();

	// validation
	getUser(userParam.username).then(user => {
		if (user) {
			// username already exists
			deferred.reject('Username "' + userParam.username + '" is already taken');
		} else {
			createUser(userParam).then(createdUser => {
				//Create library
				LibraryService.create(createdUser._id);
				//Return creted user
				deferred.resolve(createdUser);
			});
		}

	})
	.catch(err => {
		deferred.reject(err);
	});

	return deferred.promise;
}

function createUser(userParam) { //Create user and return this

	let deferred = Q.defer();

	new User (userParam)
	.save()
	.then(createdUser => {
		deferred.resolve(createdUser);
	})
	.catch(err => {
		deferred.reject(err);
	});


	return deferred.promise;

}

/*
function update(_id, userParam) {
	
	var deferred = Q.defer();

	// validation
	db.users.findById(_id, function (err, user) {
		if (err) deferred.reject(err.name + ': ' + err.message);

		if (user.username !== userParam.username) {
			// username has changed so check if the new username is already taken
			db.users.findOne(
				{ username: userParam.username },
				function (err, user) {
					if (err) deferred.reject(err.name + ': ' + err.message);

					if (user) {
						// username already exists
						deferred.reject('Username "' + req.body.username + '" is already taken')
					} else {
						updateUser();
					}
				});
		} else {
			updateUser();
		}
	});

	function updateUser() {
		// fields to update
		var set = {
			firstName: userParam.firstName,
			lastName: userParam.lastName,
			username: userParam.username,
		};

		// update password if it was entered
		if (userParam.password) {
			set.hash = bcrypt.hashSync(userParam.password, 10);
		}

		db.users.update(
			{ _id: mongo.helper.toObjectID(_id) },
			{ $set: set },
			function (err, doc) {
				if (err) deferred.reject(err.name + ': ' + err.message);

				deferred.resolve();
			});
	}

	return deferred.promise;
}

function remove(_id) {
	
	var deferred = Q.defer();

	db.users.remove(
		{ _id: mongo.helper.toObjectID(_id) },
		function (err) {
			if (err) deferred.reject(err.name + ': ' + err.message);

			deferred.resolve();
		});

	return deferred.promise;

	
}


*/