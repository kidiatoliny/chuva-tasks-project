/**
 * javascript comment
 * @Author: kidiatoliny
 * @Date: 2020-04-01 23:19:27
 * @Desc: Project Controller
 */
const { User } = require('./../models')
const { Project } = require('./../models')
const error = require('../helppers/errorFilter')

class AuthController {
	async index(req, res) {
		const { user_id } = req.params
		const user = await User.findByPk(user_id, {
			include: { association: 'projects' },
		})

		return res.status(200).json({ projects: user.projects })
	}

	async store(req, res) {
		const { user_id } = req.params
		const user = await User.findByPk(user_id)
		try {
			if (!user) {
				return res.status(400).send({
					error: 'User not found',
				})
			}

			const project = await Project.create(req.body)
			return res.status(200).json(project)
		} catch (err) {
			return res.status(500).send(error(err))
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
			return res.status(500).send(error(err))
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
			return res.status(500).send(error(err))
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
			return res.status(500).send(error(err))
		}
	}
}

module.exports = new AuthController()
