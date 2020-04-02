module.exports = err => ({
	error: {
		type: err.errors[0].type,
		path: err.errors[0].path,
		message: err.errors[0].message,
	},
})
