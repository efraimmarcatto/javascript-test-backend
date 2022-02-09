const router = require('express').Router()
const starwarsController = require('../controllers/starwarsController')

const authentication = require('../middlewares/authentication')

router.get('/characters/', authentication, starwarsController.readAll)
router.get('/characters/:page', authentication, starwarsController.readAll)
router.get('/character/:id', authentication, starwarsController.read)

module.exports = router
