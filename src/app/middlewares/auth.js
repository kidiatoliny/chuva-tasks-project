/**
 * javascript comment
 * @Author: kidiatoliny
 * @Date: 2020-04-01 04:43:42
 * @Desc:This middleware is use to prevent unauthenticated user to navigate to privates routes
 */
const jwt = require('jsonwebtoken')
var app = require('./../../app')
module.exports = async (req, res, next) => {
	const authHeader = req.headers.authorization

	if (!authHeader) return res.status(401).send({ error: 'Token not provided' })

	const [type, token] = authHeader.split(' ')
	try {
		if (type === 'Bearer') {
			const decode = await promisify(jwt.verify)(token, process.env.APP_SECRET)
			req.userId = decode.id
			return next()
		}
	} catch (err) {
		return res.status(401).send({ error: 'Token Invalid' })
	}
}
