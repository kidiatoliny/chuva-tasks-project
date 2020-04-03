/**
 * javascript comment
 * @Author: kidiatoliny
 * @Date: 2020-04-02 23:44:45
 * @Desc:
 */

'use strict'
module.exports = (sequelize, DataTypes) => {
	const Task = sequelize.define(
		'Task',
		{
			title: {
				type: DataTypes.STRING,
				notEmpty: true,
			},

			assign_to: {
				type: DataTypes.INTEGER,
				notEmpty: true,
			},
			project_id: {
				type: DataTypes.INTEGER,
				notEmpty: true,
			},
			status: {
				type: DataTypes.STRING,
				notEmpty: true,
			},
		},
		{},
	)
	Task.associate = function(models) {
		this.belongsTo(models.Project, {
			foreignKey: 'project_id',
			as: 'project',
		})
		this.belongsTo(models.User, {
			foreignKey: 'user_id',
			as: 'user',
		})
		this.belongsTo(models.User, {
			foreignKey: 'assign_to',
			as: 'assign',
		})
	}
	return Task
}
