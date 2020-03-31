const router = require('express').Router()

router.get('/dashboard', (req, res) => {
	return res.status(200).send()
})
module.exports = router
