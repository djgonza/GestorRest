var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PageSchema = require('schemas/page.schema');

module.exports = mongoose.model('Page', PageSchema);