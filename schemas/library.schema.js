var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = new Schema ({
	user: {
		type: Schema.Types.ObjectId,
		required: true
	}
});