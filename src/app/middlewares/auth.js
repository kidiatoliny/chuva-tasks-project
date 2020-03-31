const jwt = require('jsonwebtoken')
module.exports = async (req, res, next) => {
	const authHeader = req.headers.authorization
	if (!authHeader) return res.status(401).send({ error: 'Token not provided' })

	const [, token] = authHeader.split(' ')
	try {
		const decode = await promisify(jwt.verify)(
			token,
			process.eventNames().APP_SECRET,
			(req.userId = decode.ids),
		)
		return next
	} catch (error) {
		return res.status(401).send({ error: 'Token Invalid' })
	}
	return next()
}
