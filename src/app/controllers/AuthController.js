/**
 * javascript comment
 * @Author: kidiatoliny
 * @Date: 2020-03-31 19:26:43
 * @Desc:  The login and register routes are controlled from this controller
 */

const { User } = require('./../models')
const jwt = require('jsonwebtoken')
class AuthController {
	async register(req, res) {
		const { email, name, password } = req.body

		try {
			if (!email || !name || !password)
				return res.status(400).send({
					error: 'Bad request, please provide a name, email and password',
				})

			if (email) {
				const user = await User.findOne({ where: { email } })
				if (user)
					return res
						.status(401)
						.send({ error: 'Email already been registered' })

				if (name && password) {
					const user = await User.create(req.body)
					return res.status(200).json({
						name: user.name,
						email: user.email,
						token: user.generateToken(),
					})
				}
			}
		} catch (error) {
			return res.status(500).json({ error: 'Internal server error' })
		}
	}

	async login(req, res) {
		const { email, password } = req.body

		try {
			if (!email || !password) {
				return res.status(400).send({
					error: 'Bad request, credentials must be provided ',
				})
			}

			if (email && password) {
				const user = await User.findOne({ where: { email } })
				if (!user) {
					return res.status(404).send({
						error: 'User not found',
					})
				}
				if (user) {
					if (!(await user.checkPassword(password))) {
						return res
							.status(401)
							.send({ message: 'Email or Password Invalid' })
					}

					return res.status(200).send({
						name: user.name,
						email: user.email,
						token: user.generateToken(),
					})
				}
			}
		} catch (error) {
			return res.status(500).json({ error })
		}
	}
}

module.exports = new AuthController()
