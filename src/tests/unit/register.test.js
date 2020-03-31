const request = require('supertest')
const app = require('../../app')
const bcrypt = require('bcryptjs')
const factory = require('./../../helppers/factory')
const truncate = require('./../../helppers/truncate')
describe('Register', () => {
	beforeEach(async () => {
		await truncate()
	})
	it('should return code 400 if email is not provided', async () => {
		const response = await request(app)
			.post('/auth/register')
			.send({
				name: 'kid',
				email: '',
				password: '2525fsdsfg',
			})

		expect(response.status).toBe(400)
	})
	it('should return code 400 if name is not provided', async () => {
		const response = await request(app)
			.post('/auth/register')
			.send({
				name: '',
				email: 'kid@kid.com',
				password: '2525fsdsfg',
			})

		expect(response.status).toBe(400)
	})
	it('should return code 400 if password is not provided', async () => {
		const response = await request(app)
			.post('/auth/register')
			.send({
				name: 'kid',
				email: 'kid@kid.com',
				password: '',
			})

		expect(response.status).toBe(400)
	})
	it('should encrypt the user password', async () => {
		const user = await factory.create('User')
		const response = await request(app)
			.post('/auth/register')
			.send({
				name: user.name,
				password: user.password,
				email: user.email,
			})

		const compareHash = await bcrypt.compare(user.password, user.password_hash)

		expect(compareHash).toBe(true)
	})

	it('should return code 401 if the email is registered', async () => {
		const user = await factory.create('User')
		const response = await request(app)
			.post('/auth/register')
			.send({
				name: user.name,
				password: user.password,
				email: user.email,
			})

		expect(response.status).toBe(401)
	})
	it('should not be able to access private routes without', async () => {
		const user = await factory.create('User')
		const response = await request(app)
			.get('/dashboard')
			.set('Authorization', `Bearer ${user.generateToken()}`)

		expect(response.status).toBe(401)
	})
})
