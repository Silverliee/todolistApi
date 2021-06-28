const mongoose = require('mongoose');
const {ItemSchema} = require('./Item');

const TodolistSchema = new mongoose.Schema({
	items: {type: [ItemSchema], default: null},
	lastUpdate: String
});

module.exports = {
	TodolistSchema: TodolistSchema,
	TodolistModel: mongoose.model('Todolist', TodolistSchema)
};