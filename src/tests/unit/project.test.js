/**
 * javascript comment
 * @Author: kidiatoliny
 * @Date: 2020-04-01 23:31:59
 * @Desc: Project Tests
 */
const request = require('supertest')
const app = require('../../app')
const bcrypt = require('bcryptjs')
const factory = require('./../../app/helppers/factory')
const truncate = require('./../../app/helppers/truncate')

describe('POST /user/project', () => {
	const url = '/user/1/projects'
	beforeEach(async () => {
		await truncate()
	})

	// it('return CODE 200 if USER ID is provided', async () => {
	// 	const response = await request(app)
	// 		.post(url)
	// 		.send()

	// 	expect(response.status).toBe(200)
	// })
	// it('Should return CODE 400 if provided a Empty Object', async () => {
	// 	const response = await request(app).post(url)

	// 	expect(response.status).toBe(400)
	// })

	// it('Should return CODE 400 if Title is not provided', async () => {
	// 	const project = {}
	// 	const response = await request(app)
	// 		.post(url)
	// 		.send({ title: 'kfsdfs' })
	// 	expect(response.status).toBe(400)
	// })
})
