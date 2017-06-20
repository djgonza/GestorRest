var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var LibrarySchema = require('schemas/library.schema');

module.exports = mongoose.model('Library', LibrarySchema);