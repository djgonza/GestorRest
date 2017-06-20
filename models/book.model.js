var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var BookSchema = require('schemas/book.schema');

module.exports = mongoose.model('Book', BookSchema);