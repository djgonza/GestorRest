var config = require('config.json');
var express = require('express');
var router = express.Router();
var userService = require('services/user.service');

// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/', getUserInfo);
/*router.get('/current', getCurrent);
router.put('/:_id', update);
router.delete('/:_id', _delete);*/

module.exports = router;

function getUserInfo (req, res) {
	userService.getUserInfo(req.user.id)
	.then(userInfo => {
		res.status(200).send(userInfo);
	})
	.catch(err => {
		res.status(400).send(err);
	});
}

function authenticate(req, res) {
	userService.authenticate(req.body.username, req.body.password)
		.then((token) => {
			if (token) {
				// authentication successful
				res.status(200).send(token);
			} else {
				// authentication failed
				res.status(401).send('Username or password is incorrect');
			}
		})
		.catch((err) => {
			res.status(400).send(err);
		});
}

function register(req, res) {
	if(!req.body.username || !req.body.password || !req.body.email) {
		res.status(401);
		return;
	}

	userService.create(req.body)
		.then((newUser) => {
			res.sendStatus(200);
		})
		.catch((err) => {
			res.status(409).send(err);
		});
}

/*function getAll(req, res) {
	userService.getAll()
		.then(function (users) {
			res.send(users);
		})
		.catch(function (err) {
			res.status(400).send(err);
		});
}

function getCurrent(req, res) {
	userService.getById(req.user.sub)
		.then(function (user) {
			if (user) {
				res.send(user);
			} else {
				res.sendStatus(404);
			}
		})
		.catch(function (err) {
			res.status(400).send(err);
		});
}

function update(req, res) {
	userService.update(req.params._id, req.body)
		.then(function () {
			res.sendStatus(200);
		})
		.catch(function (err) {
			res.status(400).send(err);
		});
}

function _delete(req, res) {
	userService.delete(req.params._id)
		.then(function () {
			res.sendStatus(200);
		})
		.catch(function (err) {
			res.status(400).send(err);
		});
}*/