/**
 * javascript comment
 * @Author: kidiatoliny
 * @Date: 2020-04-01 23:19:27
 * @Desc: Project Controller
 */
const { User, Project } = require('./../models')
const userValidate = require('./../helppers/validators/UserValidate')
const { fieldsError } = require('../helppers/errors')

let project = new Project()

class AuthController {
	async index(req, res) {
		const { user_id } = req.params
		const user = await User.findByPk(user_id, {
			include: [
				{ association: 'projects' },
				{ association: 'tasks' },
				{ association: 'assigns' },
			],
		})

		return res.status(200).send(user)
	}

	async store(req, res) {
		let { user_id } = req.params
		let user = await User.findByPk(user_id)
		try {
			userValidate.isNotExist(user, res)
			project.createProject(req.body, res)
		} catch (err) {
			return res.status(401).send(fieldsError(err))
		}
	}

	async show(req, res) {
		const { user_id, project_id } = req.params
		try {
			project.showProject(user_id, project_id, res)
		} catch (err) {
			return res.status(401).send(fieldsError(err))
		}
	}

	async delete(req, res) {
		const { user_id, project_id } = req.params
		try {
			project.deleteProject(user_id, project_id, res)
		} catch (err) {
			return res.status(401).send(fieldsError(err))
		}
	}

	async update(req, res) {
		const { user_id, project_id } = req.params

		const { title, end, status } = req.body
		try {
			project.updateProject(user_id, project_id, req.body, res)
		} catch (err) {
			return res.status(401).send(fieldsError(err))
		}
	}
}

module.exports = new AuthController()
