const request = require('supertest');
const app = require('../app');

describe('User test', () => {
	it('getUser should work', async() => {

		const res = await request(app)
			.get('/user/')
			.send();
		expect(res.statusCode).toEqual(200);
	})

	it('getUserById should work', async() => {

		const res = await request(app)
			.get('/user/60da37d505585b297802be66')
			.send();
		expect(res.statusCode).toEqual(200);
	})

	it('delete user by email should work', async() => {
		let emailDynamic = new Date();
		emailDynamic = emailDynamic.getSeconds().toString() + emailDynamic.getMilliseconds().toString();
		const res = await request(app)
			.post('/user/')
			.send({
				"email": "mohamedstrore" + emailDynamic + "@hotmail.fr",
				"password": "123456789",
				"birthday": "1998-09-09"
			});

		const test = await request(app)
			.delete('/user/')
			.send({"email": "mohamedstrore" + emailDynamic + "@hotmail.fr"})
			.expect(200, {"message": "L'utilisateur a bien été supprimé"});
	})

	it('should work', async() => {
		let emailDynamic = new Date();
		emailDynamic = emailDynamic.getSeconds().toString() + emailDynamic.getMilliseconds().toString();
		const res = await request(app)
			.post('/user/')
			.send({
				"email": "mohamedstrore" + emailDynamic + "@hotmail.fr",
				"password": "123456789",
				"birthday": "1998-09-09"
			});
		expect(res.statusCode).toEqual(201);
		expect(res.body).toHaveProperty('message');
		expect(res.body.message).toEqual("L'utilisateur a été crée !")
	})

	it('should return invalid email exception', async() => {
		const res = await request(app)
			.post('/user/')
			.send({
				"email": "tesrt",
				"password": "123456789",
				"birthday": "1998-09-09"
			});
		expect(res.statusCode).toEqual(400);
		expect(res.body).toHaveProperty('message');
		expect(res.body.message).toEqual('Email invalide')
	})

	it('should return invalid password exception for pass under 8', async() => {
		let emailDynamic = new Date();
		emailDynamic = emailDynamic.getSeconds().toString() + emailDynamic.getMilliseconds().toString()
		const res = await request(app)
			.post('/user/')
			.send({
				"email": "mohamedstrore" + emailDynamic + "@hotmail.fr",
				"password": "123",
				"birthday": "1998-09-09"
			});
		expect(res.statusCode).toEqual(400);
		expect(res.body).toHaveProperty('message');
		expect(res.body.message).toEqual('Mot de passe invalide')
	})
	it('should return invalid password exception for pass upper than 40', async() => {
		let emailDynamic = new Date();
		emailDynamic = emailDynamic.getSeconds().toString() + emailDynamic.getMilliseconds().toString()
		const res = await request(app)
			.post('/user/')
			.send({
				"email": "mohamedstrore" + emailDynamic + "@hotmail.fr",
				"password": "123123123123123123123123123123123123123123123123123123123123123123123",
				"birthday": "1998-09-09"
			});
		expect(res.statusCode).toEqual(400);
		expect(res.body).toHaveProperty('message');
		expect(res.body.message).toEqual('Mot de passe invalide')
	})
	it('should return invalid old exception', async() => {
		let emailDynamic = new Date();
		emailDynamic = emailDynamic.getSeconds().toString() + emailDynamic.getMilliseconds().toString();
		let birthdayDynamic = new Date();
		birthdayDynamic = birthdayDynamic.toISOString();
		const res = await request(app)
			.post('/user/')
			.send({
				"email": "mohamedstrore" + emailDynamic + "@hotmail.fr",
				"password": "123456789",
				"birthday": birthdayDynamic
			});
		expect(res.statusCode).toEqual(400);
		expect(res.body).toHaveProperty('message');
		expect(res.body.message).toEqual('âge invalide')
	})
})
const mongoose = require('mongoose');
afterAll(done => {
	// Closing the DB connection allows Jest to exit successfully.
	mongoose.connection.close()
	done()
})