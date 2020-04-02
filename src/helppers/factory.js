const { factory } = require('factory-girl')
const { User } = require('./../app/models')
const { Project } = require('./../app/models')
const faker = require('faker')

factory.define('User', User, {
	name: faker.name.findName(),
	email: faker.internet.email(),
	password: faker.internet.password(),
})

factory.define('Project', Project, {
	title: faker.name.findName(),
	description: faker.internet.email(),
	status: faker.internet.password(),
	user_id: faker.internet.password(),
	start: faker.internet.password(),
	end: faker.internet.password(),
})

module.exports = factory
