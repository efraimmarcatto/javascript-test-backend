const router = require('express').Router()
const userController = require('../controllers/userController')

const authentication = require('../middlewares/authentication')

router.post('/user', userController.create)

//Authenticated Routes
router.get('/users', authentication, userController.readAll)
router.get('/user', authentication, userController.read)
router.put('/user', authentication, userController.update)
router.delete('/user', authentication, userController.delete)

module.exports = router
