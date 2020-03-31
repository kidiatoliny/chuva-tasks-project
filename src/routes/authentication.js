const router = require('express').Router()

router.get('/kid', (req, res) => {
	return res.status(200).send()
})
module.exports = router
