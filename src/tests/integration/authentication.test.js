const request = require('supertest')
const app = require('../../app')
const bcrypt = require('bcryptjs')
const factory = require('./../../helppers/factory')
const truncate = require('./../../helppers/truncate')

describe('Authentication', () => {
	beforeEach(async () => {
		await truncate()
	})
	it('Should authenticate with valid credencials', async () => {
		const user = await factory.create('User')

		const response = await request(app)
			.post('/auth/login')
			.send({
				email: user.email,
				password: user.password,
			})
		expect(response.status).toBe(200)
	})

	it('Should not authenticate with invalid credencials', async () => {
		const user = await factory.create('User', {
			password: '1234',
		})

		const response = await request(app)
			.post('/auth/login')
			.send({
				email: user.email,
				password: '123456',
			})
		expect(response.status).toBe(401)
	})

	it('Should return jwt token when authenticated', async () => {
		const user = await factory.create('User')

		const response = await request(app)
			.post('/auth/login')
			.send({
				email: user.email,
				password: user.password,
			})
		expect(response.body).toHaveProperty('token')
	})
})
