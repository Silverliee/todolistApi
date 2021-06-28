const mongoose = require('mongoose');
const {ItemSchema} = require('./Item');

const TodolistSchema = new mongoose.Schema({
	items: {type: [ItemSchema], default: []},
	lastUpdate: {type: String, default: null}
});

module.exports = {
	TodolistSchema: TodolistSchema,
	TodolistModel: mongoose.model('Todolist', TodolistSchema)
};