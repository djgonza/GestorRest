var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var FieldSchema = require('schemas/field.schema');

module.exports = mongoose.model('Field', FieldSchema);