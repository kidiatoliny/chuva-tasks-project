/**
 * javascript comment
 * @Author: kidiatoliny
 * @Date: 2020-04-01 23:20:52
 * @Desc: All Projects  Routes
 */

const router = require('express').Router()
const { ProjectController } = require('./../app/controllers')

router.post('/project/add', ProjectController.store)

module.exports = router
