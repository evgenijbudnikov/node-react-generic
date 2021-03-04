const {Router} = require('express')
const router = Router()
const authMiddleware = require('../middleware/auth.middleware')
const roleController = require('../controller/role.controller')

router.get('/', roleController.getAllRoles)
router.get('/:id', roleController.getRoleById)
router.post('/', roleController.createRole)
router.put('/', roleController.updateRole)
router.delete('/', roleController.deleteRole)

module.exports = router