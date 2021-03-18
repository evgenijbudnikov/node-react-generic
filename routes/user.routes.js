const {Router} = require('express')
const router = Router()
const authMiddleware = require('../middleware/auth.middleware')
const permissionMiddleware = require('../middleware/permission.middleware')

const userController = require('../controller/user.controller')

router.get('/:userId', authMiddleware, permissionMiddleware, userController.getUserById)
router.get('/', authMiddleware, permissionMiddleware, userController.getAllUsers)
router.post('/', authMiddleware, permissionMiddleware, userController.createUser)
router.post('/assign', permissionMiddleware, userController.assignRolesToUser)
router.put('/', authMiddleware, permissionMiddleware, userController.updateUser)
router.put('/assign', permissionMiddleware, userController.updateAssignedRoles)


router.delete('/', authMiddleware, permissionMiddleware, userController.deleteUser)

module.exports = router