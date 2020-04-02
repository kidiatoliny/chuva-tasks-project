/**
 * javascript comment
 * @Author: kidiatoliny
 * @Date: 2020-04-01 23:20:52
 * @Desc: All Projects  Routes
 */

const router = require('express').Router()
const { ProjectController } = require('./../../app/controllers')

router
	.route('/user/:user_id/projects')
	.get(ProjectController.index)
	.post(ProjectController.store)

router
	.route('/user/:user_id/project/:project_id')
	.get(ProjectController.show)
	.delete(ProjectController.delete)
	.patch(ProjectController.update)

module.exports = router
