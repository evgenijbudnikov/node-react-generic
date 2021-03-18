const {Router} = require('express')
const router = Router()
const authMiddleware = require('../middleware/auth.middleware')
const roleController = require('../controller/role.controller')
const permissionMiddleware = require('../middleware/permission.middleware')

router.get('/', authMiddleware, permissionMiddleware, roleController.getAllRoles)
router.get('/:id', authMiddleware, permissionMiddleware, roleController.getRoleById)
router.post('/', authMiddleware, permissionMiddleware, roleController.createRole)
router.put('/', authMiddleware, permissionMiddleware, roleController.updateRole)
router.delete('/', authMiddleware, permissionMiddleware, roleController.deleteRole)

module.exports = router