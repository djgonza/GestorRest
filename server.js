require('rootpath')();
var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var config = require('config.json');
var revokedToken = require('middleware/revokedToken');
var dbConnection = require('middleware/dbConnection');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use JWT auth to secure the api
app.use(expressJwt({ 
	secret: config.secret,
	resultProperty: 'user',
	getToken: (req) => {
		if (req.headers.authorization) {
			return req.headers.authorization;
		} else if (req.query && req.query.oauth_token) {
			return req.query.oauth_token;
		}
		return null;
	}
}).unless({ 
	path: ['/users/authenticate', '/users/register'] 
}));
app.use(revokedToken);

// routes
app.use('/users', require('./controllers/users.controller'));
app.use('/library', require('./controllers/library.controller'));

// start server
var port = process.env.NODE_ENV === 'production' ? 80 : 4000;
var server = app.listen(port, function () {
	console.log('Server listening on port ' + port);
});