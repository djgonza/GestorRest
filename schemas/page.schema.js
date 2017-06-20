var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = new Schema ({
	book: {
		type: Schema.Types.ObjectId,
		required: true
	},
	data: [{
		ref: {
			type: String,
			required: true
		},
		value: {
			type: Schema.Types.Mixed,
			required: true
		}
	}]
});