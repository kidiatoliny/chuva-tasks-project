const { User } = require('./../../models')

class UserValidate {
	isNotExist(user, res) {
		if (!user) {
			return res.status(403).send({
				error: 'Please authenticate to create a Project',
			})
		}
	}
}

module.exports = new UserValidate()
