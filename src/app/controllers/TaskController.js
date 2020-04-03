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
		const { user_id, project_id } = req.params
		try {
			const project = await Project.findByPk(project_id, {
				include: { association: 'user' },
			})

			if (user_id == project.user.id) {
				return res.status(200).json(project.user)
			} else return res.status(403).send(err)
		} catch (err) {
			return res.status(401).send(fieldsError(err))
		}
	}

	async delete(req, res) {
		const { user_id, project_id } = req.params
		try {
			const project = await Project.findByPk(project_id)

			if (user_id == project.user_id) {
				await Project.destroy({ where: { id: project_id } })
				return res.status(200).send({ message: 'Project Deleted' })
			} else return res.status(403).send(err)
		} catch (err) {
			return res.status(401).send(fieldsError(err))
		}
	}

	async update(req, res) {
		const { user_id, project_id } = req.params

		const { title, end, status } = req.body
		try {
			const project = await Project.findByPk(project_id)

			if (user_id == project.user_id) {
				await Project.update(req.body, { where: { id: project_id } })
				return res.status(200).send({ message: 'Project Update' })
			} else return res.status(403).send({ error: 'Forbidden' })
		} catch (err) {
			return res.status(401).send(fieldsError(err))
		}
	}
}

module.exports = new AuthController()
