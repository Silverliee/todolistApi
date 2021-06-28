const mongoose = require('mongoose');
const {TodolistSchema} = require('./TodoList');

const UserSchema = new mongoose.Schema({
	firstname: String,
	lastname: String,
	birthday: String,
	email: String,
	password: String,
	todolist: {type: TodolistSchema, default: null}
});

module.exports = {
	UserSchema: UserSchema,
	UserModel: mongoose.model('User', UserSchema)
};