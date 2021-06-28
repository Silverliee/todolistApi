const request = require('supertest');
const app = require('../app');

describe('Item test', () => {
	it('should work', async () => {
		const res = await request(app)
			.post('/user/todolist/add')
			.send({
				"email":"mohamedstrore@hotmail.fr",
				"password":"123456789",
				"name":"Test item",
				"content":"",
				"specialTestToken": true
			});
		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty('message');
		expect(res.body.message).toEqual("L'item a bien été ajouté")
	})

	it('should return invalid name exception', async () => {
		const res = await request(app)
			.post('/user/todolist/add')
			.send({
				"email":"mohamedstrore@hotmail.fr",
				"password":"123456789",
				"content":""
			});
		expect(res.statusCode).toEqual(400);
		expect(res.body).toHaveProperty('message');
		expect(res.body.message).toEqual('Un item doit obligatoirement avoir un nom')
	})

	it('should return invalid content exception', async () => {
		const res = await request(app)
			.post('/user/todolist/add')
			.send({
				"email":"mohamedstrore@hotmail.fr",
				"password":"123456789",
				"name":"Test item",
				"content":"TestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTest"
			});
		expect(res.statusCode).toEqual(400);
		expect(res.body).toHaveProperty('message');
		expect(res.body.message).toEqual('La description de l\'item ne doit pas dépasser 1000 caractères')
	})
})