/**
 * javascript comment
 * @Author: kidiatoliny
 * @Date: 2020-04-01 04:43:42
 * @Desc:This middleware is use to prevente unauthenticated user to navigate to privates routes
 */
const jwt = require('jsonwebtoken')
var app = require('./../../app')
module.exports = async (req, res, next) => {
	const authHeader = req.headers.authorization

	if (!authHeader) return res.status(401).send({ error: 'Token not provided' })

	const [, token] = authHeader.split(' ')
	try {
		const decode = await promisify(jwt.verify)(token, process.env.APP_SECRET)
		req.userId = decode.id
		return next()
	} catch (err) {
		return res.status(401).send({ error: 'Token Invalid' })
	}
}
