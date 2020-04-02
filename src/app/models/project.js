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
			title: DataTypes.STRING,
			description: DataTypes.STRING,
			user_id: DataTypes.STRING,
			status: DataTypes.STRING,
			start: DataTypes.DATE,
			end: DataTypes.DATE,
		},
		{},
	)
	Project.associate = function(models) {
		// associations can be defined here
	}
	return Project
}
