const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
	name: String,
	content: String,
	date: String,
});

module.exports = {
	ItemSchema: ItemSchema,
	ItemModel: mongoose.model('Item', ItemSchema)
};