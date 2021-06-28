const express = require('express');
const router = express.Router();
const {UserModel} = require('../Model/User');

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
	const today = new Date();
	const userOld = new Date(userBirthday.getTime() - today.getTime());
	if(!user.email.match("\\b[\\w.-]+@[\\w.-]+\\.\\w{2,4}\\b")) {
		res.status(400).json({message: "Email invalide"});
		return;
	} else if(user.password.length < 8 || user.password.length > 40) {
		res.status(400).json({message: "Mot de passe invalide"});
		return;
	} else if((userOld.getUTCFullYear() - 1970) < 13){
		res.status(400).json({message: "âge invalide"});
		return;
	}
	await user.save()
		.then(() => res.status(201).json({message: "L'utilisateur a été crée !"}))
		.catch(error => res.status(400).json({error}));
});
router.post('/todolist/add', async(req, res) => {
	const user = await UserModel.findOne({email: req.body.email})
	if(employee === null) {
		res.status(404).json({message: "Aucun employée ne possède cette email"})
	} else if(employee.password != req.body.password) {
		res.status(400).json({message: "Le mot de passe est incorrecte"})
	} else if(!employee.is_admin) {
		res.status(400).json({message: "Vous devez être administrateur pour mettre un espace en maintenance"})
	} else if(req.body.on_maintain === null) {
		res.status(422).json({message: "La valeur fournie n'est pas correcte "})
	} else {
		if(req.body.on_maintain === true) {
			const currentDate = new Date().toISOString().slice(0, 10);
			const maintenanceToHistorize = new maintenanceHistoryModel({
				employee: employee._id,
				date: currentDate
			});
			let space = await spaceModel.findOne({_id: req.params.id});
			if(space.maintenanceHistory === null) {
				await spaceModel.updateOne({_id: req.params.id}, {maintenanceHistory: maintenanceToHistorize});
			} else {
				space.maintenanceHistory.push(maintenanceToHistorize);
				await spaceModel.updateOne({_id: req.params.id}, {maintenanceHistory: space.maintenanceHistory});
			}
		}
		await spaceModel.updateOne({_id: req.params.id}, {on_maintain: req.body.on_maintain})
			.then(() => res.status(200).json({message: "Le status de maintenance a bien été modifié"}))
			.catch(error => res.status(400).json({error}));
	}
});
// Put request Here
router.put('/:id', async(req, res) => {
	await UserModel.updateOne({_id: req.params.id}, {...req.body, _id: req.params.id})
		.then(() => res.status(201).json({message: "L'utilisateur a bien été modifié"}))
		.catch(error => res.status(400).json({error}));
});
//Delete Request here
router.delete('/:id', async(req, res) => {
	await UserModel.deleteOne({_id: req.params.id})
		.then(() => res.status(200).json({message: "L'utilisateur a bien été supprimé"}))
		.catch(error => res.status(400).json({error}));
});
module.exports = router;