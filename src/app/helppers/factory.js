const { factory } = require('factory-girl')
const { User } = require('./../models')
const { Project } = require('./../models')
const faker = require('faker')

factory.define('User', User, {
	name: faker.name.firstName(),
	email: faker.internet.email(),
	password: faker.internet.password(),
})

factory.define('Project', Project, {
	title: faker.lorem.sentence(),
	description: faker.lorem.paragraphs(),
	status: faker.random.boolean(),
	user_id: faker.random.number(),
	start: faker.date.between(),
	end: faker.date.future(),
})

module.exports = factory
