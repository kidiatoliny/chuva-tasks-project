/**
 * javascript comment
 * @Author: kidiatoliny
 * @Date: 2020-03-31 19:25:04
 * @Desc: database configuration for PostgresSQL
 */
require('dotenv').config({
	path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
})

module.exports = {
	dialect: process.env.DB_DIALECT || 'postgres',
	host: process.env.DB_HOST || 'localhost',
	port: process.env.DB_PORT || '5432',
	username: process.env.DB_USER || 'postgres',
	password: process.env.DB_PASSWORD || 'root',
	database: process.env.DB_NAME || 'tasks',
	storage: './src/tests/database.sqlite',
	logging: false,
	define: {
		timestamps: true,
		underscored: true,
		underscoredAll: true,
	},
}
