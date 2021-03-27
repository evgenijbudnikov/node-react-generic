const {Router} = require('express')
const router = Router()
const authMiddleware = require('../middleware/auth.middleware')
const resourceController = require('../controller/resource.controller')
const permissionMiddleware = require('../middleware/permission.middleware')

router.get('/', permissionMiddleware, resourceController.getAllRoutes, resourceController.getRouteById)
router.put('/', permissionMiddleware, resourceController.updateRoute)

module.exports = router