'use strict'
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		'User',
		{
			name: {
				type: DataTypes.STRING,
				validate: {
					notEmpty: true,
					len: [2, 100],
				},
			},
			email: {
				type: DataTypes.STRING,
				validate: {
					isEmail: true,
					notEmpty: true,
				},
			},
			password_hash: {
				type: DataTypes.STRING,
				validate: {
					notEmpty: true,
				},
			},
			password: {
				type: DataTypes.VIRTUAL,
				validate: {
					notEmpty: true,
				},
			},
		},
		{
			hooks: {
				beforeSave: async user => {
					if (user.password) {
						user.password_hash = await bcrypt.hash(user.password, 10)
					}
				},
			},
		},
	)
	User.associate = function(models) {
		this.hasMany(models.Project, {
			foreignKey: 'user_id',
			as: 'projects',
		})
		this.hasMany(models.Task, {
			foreignKey: 'user_id',
			as: 'tasks',
		})
		this.hasMany(models.Task, {
			foreignKey: 'assign_to',
			as: 'assigns',
		})
	}

	User.prototype.checkPassword = function(password) {
		return bcrypt.compare(password, this.password_hash)
	}

	User.prototype.generateToken = function() {
		return jwt.sign(
			{
				id: this.id,
			},
			process.env.APP_SECRET,
		)
	}

	return User
}
