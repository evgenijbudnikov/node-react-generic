const {Router} = require('express')
const router = Router()
const authMiddleware = require('../middleware/auth.middleware')
const userController = require('../controller/user.controller')

router.get('/:userId', authMiddleware, userController.getUserById)
router.get('/', userController.getAllUsers)
router.post('/', userController.createUser)
router.put('/', userController.updateUser)
router.delete('/', userController.deleteUser)

module.exports = router