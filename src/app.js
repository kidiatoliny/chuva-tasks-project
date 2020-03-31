const express = require('express')
const bodyParser = require('body-parser')
router = require('./router')

require('dotenv').config({
	// eslint-disable-next-line no-undef
	path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
})

class App {
	constructor() {
		this.express = express()
		this.middlewares()
		this.routes()
	}

	middlewares() {
		this.express.use(express.json())
		this.express.use(bodyParser.json())
		this.express.use(bodyParser.urlencoded({ extended: true }))
	}

	routes() {
		this.express.use(router)
	}
}

module.exports = new App().express

/* const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes')
const app = express()

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(routes)
module.exports = app
*/
