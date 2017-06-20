var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = new Schema ({
	library: {
		type: Schema.Types.ObjectId,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	structure: [{
		ref: {
			type: String,
			required: true
		},
		valueType: {
			type: String,
			required: true
		},
		name: {
			type: String,
			required: true
		}
	}]
});