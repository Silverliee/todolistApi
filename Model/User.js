const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const {TodolistSchema} = require('./TodoList');
const {TodolistModel} = require('./TodoList');

const UserSchema = new mongoose.Schema({
	firstname: String,
	lastname: String,
	birthday: String,
	email: {type: String, required: true, unique: true},
	password: String,
	todolist: {
		type: TodolistSchema, default: new TodolistModel({})
	}
});

module.exports = {
	UserSchema: UserSchema,
	UserModel: mongoose.model('User', UserSchema)
};