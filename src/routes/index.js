const { Router } = require('express')
const router = Router()
const ctrlRouter = require('../controllers/ctrl-router')

router.get('/', ctrlRouter.root)

module.exports = router