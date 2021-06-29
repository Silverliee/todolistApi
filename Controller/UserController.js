const express = require('express');
const router = express.Router();
const {UserModel} = require('../Model/User');
const {TodolistModel} = require('../Model/TodoList');
const {ItemModel} = require('../Model/Item');

// Get Request Here
router.get('/', async(req, res) => {
	await UserModel.find()
		.then(products => res.status(200).json(products))
		.catch(error => res.status(400).json({error}));
});
router.get('/:id', async(req, res) => {
	await UserModel.findOne({_id: req.params.id})
		.then(product => res.status(200).json(product))
		.catch(error => res.status(404).json({error}));
});
router.get('/:id/todolist', async(req, res) => {
	const user = await UserModel.findOne({_id: req.params.id})
		.catch(error => res.status(404).json({error}));
	if(user.email != req.body.email || user.password != req.body.password) {
		res.status(400).json({message: "Connection refusée"});
		return;
	} else {
		res.status(200).json(user.todolist);
	}
});
// Post Request Here
router.post('/', async(req, res) => {
	const user = new UserModel({
		...req.body
	});
	const userBirthday = new Date(req.body.birthday);
	user.birthday = userBirthday.toISOString();
	const today = new Date();
	const userOld = new Date(userBirthday.getTime() - today.getTime());
	if(!user.email.match("\\b[\\w.-]+@[\\w.-]+\\.\\w{2,4}\\b")) {
		res.status(400).json({message: "Email invalide"});
		return;
	} else if(user.password.length < 8 || user.password.length > 40) {
		res.status(400).json({message: "Mot de passe invalide"});
		return;
	} else if((1970 - userOld.getUTCFullYear()) < 13) {
		res.status(400).json({message: "âge invalide"});
		return;
	}
	await user.save()
		.then(() => res.status(201).json({message: "L'utilisateur a été crée !"}))
		.catch(error => res.status(400).json({error}));
});
// Put request Here
router.put('/:id', async(req, res) => {
	await UserModel.updateOne({_id: req.params.id}, {...req.body, _id: req.params.id})
		.then(() => res.status(201).json({message: "L'utilisateur a bien été modifié"}))
		.catch(error => res.status(400).json({error}));
});
//Delete Request here
router.delete('/', async(req, res) => {
	await UserModel.deleteOne({email: req.body.email})
		.then(() => res.status(200).json({message: "L'utilisateur a bien été supprimé"}))
		.catch(error => res.status(400).json({error}));
});

//#################################################################TODOLIST################################################
//get Request
//post Request
router.post('/todolist/add', async(req, res) => {
	const user = await UserModel.findOne({email: req.body.email});
	const now = new Date();
	const lastUpdate = user.todolist.lastUpdate != null ? new Date(user.todolist.lastUpdate) : null;
	let acceptableDate = new Date()
	acceptableDate = user.todolist.lastUpdate != null ? acceptableDate.setMinutes(acceptableDate.getMinutes() + 30) : null;
	if(user === null) {
		res.status(404).json({message: "Aucun utilisateur répertoriée"});
	} else if(user.password != req.body.password) {
		res.status(400).json({message: "Le mot de passe est incorrecte"});
	} else if(req.body.name === undefined || req.body.name.length === 0) {
		res.status(400).json({message: "Un item doit obligatoirement avoir un nom"});
	} else if(req.body.content.length !== 0 && req.body.content.length > 1000) {
		res.status(400).json({message: "La description de l'item ne doit pas dépasser 1000 caractères"});
	} else if(lastUpdate != null && now < acceptableDate && req.body.specialTestToken === undefined) {
		res.status(400).json({message: "Vous avez ajouté un item il y a moins 30 minutes, veuillez patienter"});
	} else {
		if(user.todolist.length === 8) {
			res.body.email = true;
		}
		user.todolist.items.push({
			name: req.body.name,
			content: req.body.content,
			date: now.toISOString()
		})
		user.todolist.lastUpdate = now.toISOString();
		await user.save()
			.then(() => res.status(200).json({message: "L'item a bien été ajouté"}))
			.catch(error => res.status(400).json({error}));
	}
});
module.exports = router;