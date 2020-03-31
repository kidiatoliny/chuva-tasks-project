const { factory } = require('factory-girl')
const { User } = require('./../app/models')
const faker = require('faker')

factory.define('User', User, {
	name: faker.name.findName(),
	email: faker.internet.email(),
	password: faker.internet.password(),
})

module.exports = factory
