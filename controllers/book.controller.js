var config = require('config.json');
var express = require('express');
var router = express.Router({mergeParams: true});
var BookService = require('services/book.service');


// routes
router.use('/:bookId/pages', require('controllers/page.controller'));

router.get('/', getAllBooks);
router.get('/:bookId', getBook);
router.get('/:bookId/numberPages', getNumberPages);
router.post('/', createBook);
router.put('/:bookId', updateBook);
router.delete('/:bookId', deleteBook);

module.exports = router;

function getNumberPages (req, res) {
	BookService.numberOfPages(req.params.bookId)
	.then(number => {
		res.status(200).send({number: number});
	})
	.catch(err => {
		res.status(401).send(err);
	});
}

function getBook (req, res) {

	BookService.load(req.params.bookId)
	.then(book => {
		res.status(200).send(book);
	})
	.catch(err => {
		res.status(401).send(err);
	});

}

function getAllBooks(req, res) {

	BookService.loadAll(req.params.libraryId)
	.then(books => {
		res.status(200).send(books);
	})
	.catch(err => {
		res.status(401).send(err);
	});
	
}

function createBook(req, res) {

	BookService.create(req.params.libraryId, req.body.name, req.body.structure)
	.then(createdBook => {
		res.status(200).send(createdBook);
	})
	.catch(err => {
		res.status(401).send(err);
	});

}

function updateBook(req, res) {

	BookService.update (req.params.bookId, req.body)
	.then(editedBook => {
		res.status(200).send(editedBook);
	})
	.catch(err => {
		res.status(401).send(err);
	});

}

function deleteBook(req, res) {
	
	//TODO: delete all page from this book

	BookService.remove(req.params.bookId)
	.then(removedBook => {
		if(!removedBook) {
			res.status(401).send('Not Found');
		}else{
			res.status(200).send(removedBook);
		}
	})
	.catch(err => {
		res.status(401).send(err);
	});

}