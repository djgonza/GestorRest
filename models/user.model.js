var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = require('schemas/user.schema');

module.exports = mongoose.model('User', UserSchema);