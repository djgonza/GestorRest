var config = require('config.json');
var express = require('express');
var Q = require('q');
var connectionDb = require('middleware/connectionDb');
var LibraryService =  require('services/library.service');
var router = express.Router({mergeParams: true});

var User = require('models/user.model');

// routes
router.use('/:libraryId/books', require('controllers/book.controller'));
router.get('/', load);

function load (req, res) {

	LibraryService.getLibrary(req.user.id)
	.then(library => {
		res.status(200).send(library);
	})
	.catch(err => {
		res.status(401).send(err);
	});

}

module.exports = router;





