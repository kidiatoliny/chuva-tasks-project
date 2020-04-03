/**
 * javascript comment
 * @Author: kidiatoliny
 * @Date: 2020-04-02 23:44:19
 * @Desc:
 */

const router = require('express').Router()
const { TaskController } = require('./../../app/controllers')

router
	.route('/user/:user_id/project/:project_id/task')
	.get(TaskController.index)
	.post(TaskController.store)

// router
// 	.route('/user/:user_id/Task/:Task_id')
// 	.get(TaskController.show)
// 	.delete(TaskController.delete)
// 	.patch(TaskController.update)

module.exports = router
