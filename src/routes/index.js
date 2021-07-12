const { Router } = require('express')
const router = Router()
const ctrlRouter = require('../controllers/ctrl-router')
const { isAuthorized } = require('../middlewares/isAuthorized')

router.get('/', ctrlRouter.root)

router.post('/signup', ctrlRouter.signUp)
router.post('/signin', ctrlRouter.signIn)

router.get('/home', isAuthorized, ctrlRouter.home)

module.exports = router