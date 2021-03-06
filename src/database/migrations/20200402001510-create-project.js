/**
 * javascript comment
 * @Author: kidiatoliny
 * @Date: 2020-04-01 23:17:07
 * @Desc: Project fields
 */
'use strict'
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('projects', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			title: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			description: {
				type: Sequelize.TEXT,
				allowNull: false,
			},
			user_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'users',
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
			},
			status: {
				type: Sequelize.BOOLEAN,
			},
			start: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			end: {
				type: Sequelize.DATE,
			},
			created_at: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updated_at: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		})
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('projects')
	},
}
