const {Router} = require('express')
const router = Router()
const authMiddleware = require('../middleware/auth.middleware')
const userController = require('../controller/user.controller')

router.get('/:userId', authMiddleware, userController.getUserById)

module.exports = router