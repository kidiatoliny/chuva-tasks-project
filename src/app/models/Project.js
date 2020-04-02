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
	Project.associate = function(models) {
		this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
	}

	Project.prototype.addProject = async request => {
		await Project.create(request)
	}

	return Project
}
