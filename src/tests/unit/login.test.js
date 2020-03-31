const request = require('supertest')
const app = require('../../app')
const bcrypt = require('bcryptjs')
const factory = require('./../../helppers/factory')
const truncate = require('./../../helppers/truncate')
describe('Login', () => {
	beforeEach(async () => {
		await truncate()
	})

	it('should return code 400 if email and pass is not provided', async () => {
		const response = await request(app)
			.post('/auth/login')
			.send()

		expect(response.status).toBe(400)
	})
	it('should return code 400 if password is not provided', async () => {
		const response = await request(app)
			.post('/auth/login')
			.send({
				email: 'kid@kid.com',
			})

		expect(response.status).toBe(400)
	})

	it('should return code 404 if email is not found', async () => {
		const response = await request(app)
			.post('/auth/login')
			.send({
				password: '12345',
				email: 'kid2@kid.com',
			})

		expect(response.status).toBe(404)
	})

	it('should return code 200 if email is in the database', async () => {
		const user = await factory.create('User')
		const response = await request(app)
			.post('/auth/login')
			.send({
				password: user.password,
				email: user.email,
			})

		expect(response.status).toBe(200)
		expect(response.body).toHaveProperty('token')
		expect.assertions(2)
	})

	it('should not be able to access private routes without jwt token valid', async () => {
		const response = await request(app)
			.get('/dashboard')
			.set('Authorization', `Bearer 12313123`)

		expect(response.status).toBe(401)
	})
})
