var config = require('config.json');
var mongoose = require('mongoose');
var Q = require('q');
var Book = require('models/book.model');
var Page = require('models/page.model');
mongoose.Promise = global.Promise;

var service = {};

service.numberOfPages = numberOfPages;
service.load = load;
service.loadAll = loadAll;
service.create = create;
service.update = update;
service.remove = remove;

module.exports = service;

function numberOfPages (bookId) {

	var deferred = Q.defer();

	Page.count({book: bookId})
	.exec()
	.then(number => {
		deferred.resolve(number);
	})
	.catch(err => {
		deferred.reject(err);
	})

	return deferred.promise;
}

function load (bookId) {

	var deferred = Q.defer();

	Book.findOne({_id: bookId})
	.then(book => {
		deferred.resolve(book);
	})
	.catch(err => {
		deferred.reject(err);
	});

	return deferred.promise;

}

function loadAll (library) {

	var deferred = Q.defer();

	Book.find({library})
	.then(books => {
		deferred.resolve(books);
	})
	.catch(err => {
		deferred.reject(err);
	});

	return deferred.promise;

}

function create (library, name, structure) {

	var deferred = Q.defer();

	new Book({
		library,
		name,
		structure
	})
	.save()
	.then(createdBook => {
		deferred.resolve(createdBook);
	})
	.catch(err => {
		deferred.reject(err);
	});

	return deferred.promise;

}

function update (oldBookId, newBook) {
    
	var deferred = Q.defer();

	Book.findOneAndUpdate({_id: oldBookId}, {$set: newBook}, {new: true})
	.exec()
	.then(editedBook => {
		deferred.resolve(editedBook);
	})
	.catch(err => {
		deferred.reject(err);
	});

	return deferred.promise;

}

function remove (bookId) {

	var deferred = Q.defer();

	Book.findByIdAndRemove({_id: bookId})
	.exec()
	.then(removedBook => {
		deferred.resolve(removedBook);
	})
	.catch(err => {
		deferred.reject(err);
	});

	return deferred.promise;

}