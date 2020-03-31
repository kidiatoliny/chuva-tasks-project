require('dotenv').config({
	path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
})

module.exports = {
	dialect: process.env.DB_DIALECT || 'postgres',
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	username: process.env.DB_USER || 'postgres',
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	storage: './src/tests/database.sqlite',
	logging: false,
	define: {
		timestamps: true,
		underscored: true,
		underscoredAll: true,
	},
}
