const app = require('./app')
// require('./database')

const port = process.env.PORT || 3000

app.listen(port, () => {
	console.log(`server started on port:  ${port}`)
})

function kk() {}
