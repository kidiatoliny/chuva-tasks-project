'use strict'
/**
 * javascript comment
 * @Author: kidiatoliny
 * @Date: 2020-04-01 23:16:36
 * @Desc: Project Model
 */
module.exports = (sequelize, DataTypes) => {
	const Project = sequelize.define(
		'Project',
		{
			title: {
				type: DataTypes.STRING,
				notEmpty: true,
			},
			description: {
				type: DataTypes.TEXT,
				notEmpty: true,
			},
			status: DataTypes.BOOLEAN,
			start: DataTypes.DATE,
			end: DataTypes.DATE,
		},
		{},
	)
	Project.associate = function (models) {
		this.belongsTo(models.User, {
			foreignKey: 'user_id',
			as: 'user',
		})
		this.hasMany(models.Task, {
			foreignKey: 'project_id',
			as: 'tasks',
		})
	}

	Project.prototype.createProject = async (body, res) => {
		const project = await Project.create(body)
		return res.status(200).send(project)
	}

	Project.prototype.showProject = async (user_id, project_id, res) => {
		let project = await Project.findByPk(project_id, {
			include: [{ association: 'user' }, { association: 'tasks' }],
		})
		if (user_id == project.user.id) {
			return res.status(200).send(project)
		} else
			return res
				.status(403)
				.send({ error: "You don't have permitions to see this project" })
	}

	Project.prototype.deleteProject = async (user_id, project_id, res) => {
		let project = await Project.findByPk(project_id, {
			include: { association: 'user' },
		})
		if (user_id == project.user.id) {
			await Project.destroy({ where: { id: project_id } })
			return res.status(200).send({ message: 'Project Deleted' })
		} else
			return res
				.status(403)
				.send({ error: "You don't have permitions to delete this project" })
	}

	Project.prototype.updateProject = async function (
		user_id,
		project_id,
		body,
		res,
	) {
		const project = await Project.findByPk(project_id)

		if (user_id == project.user_id) {
			await Project.update(body, { where: { id: project_id } })
			return res.status(200).send({ message: 'Project Update' })
		} else
			return res
				.status(403)
				.send({ error: "You don't have permitions to Update this project" })
	}

	return Project
}
