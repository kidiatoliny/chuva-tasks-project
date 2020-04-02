/**
 * javascript comment
 * @Author: kidiatoliny
 * @Date: 2020-04-01 23:19:27
 * @Desc: Project Controller
 */
const { User } = require('./../models')

class AuthController {
	async store(res, req) {
		return res.status(200).send()
	}
}

module.exports = new AuthController()
