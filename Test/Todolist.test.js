const request = require('supertest');
const app = require('../app');

describe('Todolist test - should return invalid delay exception', () => {
	it('should return invalid delay exception', async() => {
		const firstCall = await request(app)
			.post('/user/todolist/add')
			.send({
				"email": "mohamedstrore@hotmail.fr",
				"password": "123456789",
				"name": "Test item one",
				"content": ""
			});
		const res = await request(app)
			.post('/user/todolist/add')
			.send({
				"email": "mohamedstrore@hotmail.fr",
				"password": "123456789",
				"name": "Test item",
				"content": ""
			});
		expect(res.statusCode).toEqual(400);
		expect(res.body).toHaveProperty('message');
		expect(res.body.message).toEqual("Vous avez ajouté un item il y a moins 30 minutes, veuillez patienter")
	})
	it('should send email', async() => {
		let emailDynamic = new Date();
		emailDynamic = emailDynamic.getSeconds().toString() + emailDynamic.getMilliseconds().toString();
		const newUser = await request(app)
			.post('/user/')
			.send({
				"email": "mohamedstrore" + emailDynamic + "@hotmail.fr",
				"password": "123456789",
				"birthday": "1998-09-09"
			});
		for(let i = 0; i < 8; i++) {
			let itemCreation = await request(app)
				.post('/user/todolist/add')
				.send({
					"email": "mohamedstrore" + emailDynamic + "@hotmail.fr",
					"password": "123456789",
					"name": "Test item",
					"content": "",
					"specialTestToken": true
				});
			if(i === 7) {
				expect(itemCreation.statusCode).toEqual(200);
				expect(itemCreation.body).toHaveProperty('message');
				expect(itemCreation.body.message).toEqual("L'item a bien été ajouté");
				expect(itemCreation.body.email !== undefined);
			}
		}
		})
})