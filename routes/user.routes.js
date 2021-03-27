const {Router} = require('express')
const router = Router()
const authMiddleware = require('../middleware/auth.middleware')
const permissionMiddleware = require('../middleware/permission.middleware')

const userController = require('../controller/user.controller')

//router.get('/', authMiddleware, permissionMiddleware, userController.getUserById)
router.get('/', permissionMiddleware, userController.getAllUsers, userController.getUserById)
router.post('/', authMiddleware, permissionMiddleware, userController.createUser)
router.put('/', permissionMiddleware, userController.updateUser)

router.delete('/', authMiddleware, permissionMiddleware, userController.deleteUser)

module.exports = router