/**
 * javascript comment
 * @Author: kidiatoliny
 * @Date: 2020-04-01 03:13:49
 * @Desc: auth middleware tests
 */
const request = require('supertest')
const app = require('../../app')
const bcrypt = require('bcryptjs')
const factory = require('./../../helppers/factory')
const truncate = require('./../../helppers/truncate')

describe('AUTH MIDDLEWARE', () => {
	beforeEach(async () => {
		await truncate()
	})
	it('should not be able to access private routes without jwt token ', async () => {
		const response = await request(app).get('/dashboard')

		expect(response.status).toBe(401)
	})

	it('should not be able to access private routes with jwt token invalid', async () => {
		const response = await request(app)
			.get('/dashboard')
			.set('Authorization', `Bearer 12313123`)

		expect(response.status).toBe(401)
	})

	it('should be able to access private routes when authenticated', async () => {
		const user = await factory.create('User')
		const response = await request(app)
			.get('/dashboard')
			.set('Authorization', `Bearer ${user.generateToken()}`)

		expect(response.status).toBe(200)
	})
})
