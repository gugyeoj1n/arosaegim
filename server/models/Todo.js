const mongoose = require('../node_modules/mongoose')

const todoSchema = mongoose.Schema({
	date: {
		type: String
	},
	text: {
		type: String
	},
	done: {
		type: Boolean
	},
	userName: {
		type: String
	},
	id: {
		type: Number
	},
	createdAt: {
		type: Date,
		expires: 86400,
		default: Date.now
	}
})

const Todo = mongoose.model('todo', todoSchema)
module.exports = { Todo }