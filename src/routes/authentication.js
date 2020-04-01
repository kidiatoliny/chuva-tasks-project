/**
 * javascript comment
 * @Author: kidiatoliny
 * @Date: 2020-04-01 01:49:39
 * @Desc: Auhentication Routes
 */

const router = require('express').Router()
const { AuthController } = require('./../app/controllers')

router.post('/auth/register', AuthController.register)
router.post('/auth/login', AuthController.login)
module.exports = router
