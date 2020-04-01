const router = require('express').Router()
/**
 * javascript comment
 * @Author: kidiatoliny
 * @Date: 2020-03-31 19:23:00
 * @Desc: You must be authenticated to access this routes
 */
const middleware = require('./app/middlewares')
const routes = require('./routes')

router.use(routes.authentication)

router.use(middleware.auth)

// router.use(routes.auth.dashboard)
module.exports = router
