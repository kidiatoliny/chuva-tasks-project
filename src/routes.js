const routes = require('express').Router()
const AuthController = require('./app/controllers/AuthController')
const authMiddleware = require('./app/middlewares/auth')
routes.post('/auth/register', AuthController.register)
routes.post('/auth/login', AuthController.login)

routes.use(authMiddleware)
routes.get('/dashboard', (req, res) => {
	return res.status(200).send()
})
module.exports = routes
