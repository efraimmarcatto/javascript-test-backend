const router = require('express').Router()
const authController = require('../controllers/authController')
const authentication = require('../middlewares/authentication')

router.post('/login', authController.login)

module.exports = router
