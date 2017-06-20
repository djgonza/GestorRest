var config = require('config.json');
var mongoose = require('mongoose');
var Q = require('q');
var Page = require('models/page.model');
mongoose.Promise = global.Promise;

var service = {};

service.load 	= load;
service.loadAll = loadAll;
service.create 	= create;
service.update 	= update;
service.remove 	= remove;

module.exports = service;

function load (pageId) {

	var deferred = Q.defer();

	Page.findOne({_id: pageId})
	.then(page => {
		deferred.resolve(page);
	})
	.catch(err => {
		deferred.reject(err);
	});

	return deferred.promise;

}

function loadAll (bookId) {

	var deferred = Q.defer();

	Page.find({book: bookId})
	.then(pages => {
		deferred.resolve(pages);
	})
	.catch(err => {
		deferred.reject(err);
	});

	return deferred.promise;

}

function create (book, data) {

	var deferred = Q.defer();

	new Page({
		book,
		data
	})
	.save()
	.then(createdPage => {
		deferred.resolve(createdPage);
	})
	.catch(err => {
		deferred.reject(err);
	});

	return deferred.promise;

}

function update (oldPageId, newPage) {

	var deferred = Q.defer();

	Page.findOneAndUpdate({_id: oldPageId}, {$set: newPage}, {new: true})
	.exec()
	.then(editedPage => {
		deferred.resolve(editedPage);
	})
	.catch(err => {
		deferred.reject(err);
	});

	return deferred.promise;

}

function remove (pageId) {

	var deferred = Q.defer();

	Page.findByIdAndRemove({_id: pageId})
	.then(removedPage => {
		deferred.resolve(removedPage);
	})
	.catch(err => {
		deferred.reject(err);
	});

	return deferred.promise;

}