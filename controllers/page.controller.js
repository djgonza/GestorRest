var config = require('config.json');
var express = require('express');
var router = express.Router({mergeParams: true});
var PageService = require('services/page.service');

// routes
router.get('/', getAllPages);
router.get('/:pageId', getPage);
router.post('/', createPage);
router.put('/:pageId', updatePage);
router.delete('/:pageId', deletePage);

module.exports = router;

function getAllPages(req, res) {
	
	PageService.loadAll(req.params.bookId)
	.then(pages => {
		res.status(200).send(pages);
	})
	.catch(err => {
		res.status(401).send(err);
	});

}

function getPage (req, res) {

	PageService.load(req.params.pageId)
	.then(page => {
		res.status(200).send(page);
	})
	.catch(err => {
		res.status(401).send(err);
	});

}

function createPage(req, res) {

	PageService.create (req.params.bookId, req.body.data)
	.then(page => {
		res.status(200).send(page);
	})
	.catch(err => {
		res.status(401).send(err);
	});

}

function updatePage(req, res) {

	PageService.update (req.params.pageId, req.body)
	.then(updatedPage => {
		res.status(200).send(updatedPage);
	})
	.catch(err => {
		res.status(401).send(err);
	});

}

function deletePage(req, res) {
	
	PageService.remove (req.params.pageId)
	.then(removedPage => {
		if(!removedPage) {
			res.status(401).send('Not Found');
		}else{
			res.status(200).send(removedPage);
		}
	})
	.catch(err => {
		res.status(401).send(err);
	});

}