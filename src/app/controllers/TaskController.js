/**
 * javascript comment
 * @Author: kidiatoliny
 * @Date: 2020-04-02 23:43:54
 * @Desc:Task Controller
 */
const { Project, User, Task } = require('./../models')
const { fieldsError } = require('../helppers/errors')

class AuthController {
	async index(req, res) {
		const { user_id } = req.params
		const user = await User.findByPk(user_id, {
			include: { association: 'projects' },
		})

		return res.status(200).json({ projects: user.projects })
	}

	async store(req, res) {
		const { user_id, project_id } = req.params
		const user = await User.findByPk(user_id)
		const project = await Project.findByPk(project_id)
		try {
			if (!user) {
				return res.status(404).send({
					error: 'User not found',
				})
			}
			if (!project) {
				return res.status(404).send({
					error: 'Project not found',
				})
			}

			const task = await Task.create(req.body)
			return res.status(200).send(task)
			// 	return res.status(200).json(project)
		} catch (err) {
			return res.status(401).send(fieldsError(err))
		}
	}

	async show(req, res) {
		const { user_id, project_id, task_id } = req.params
		try {
			const task = await Task.findByPk(task_id, {
				include: [
					{ association: 'project' },
					{ association: 'author' },
					{ association: 'assignTo' },
				],
			})
			if (task) {
				return res.status(200).json(task)
			} else return res.status(403).send(err)
		} catch (err) {
			return res.status(401).send(fieldsError(err))
		}
	}

	async delete(req, res) {
		const { user_id, project_id, task_id } = req.params
		const { title, status, assing_to } = req.body
		try {
			const task = await Task.findByPk(task_id)
			if (project_id == task.project_id) {
				await Task.destroy({ where: { id: task_id } })
				return res.status(200).send({ message: 'Task Deleted' })
			} else return res.status(403).send(err)
		} catch (err) {
			return res.status(401).send(fieldsError(err))
		}
	}

	async update(req, res) {
		const { user_id, project_id, task_id } = req.params
		const { title, status, assing_to } = req.body
		try {
			const task = await Task.findByPk(task_id)
			const project = await Project.findByPk(project_id)

			if (task && project) {
				if (project_id == task.project_id) {
					await Task.update(req.body, { where: { id: task_id } })
					return res.status(200).send({ message: 'Task Update' })
				}
				return res.status(403).send(err)
			}

			return res.status(403).send(err)
		} catch (err) {
			return res.status(401).send(fieldsError(err))
		}
	}
}

module.exports = new AuthController()
