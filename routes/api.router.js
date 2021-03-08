const {Router} = require('express')
const router = Router()

const authRoutes = require("./auth.routes")
const userRoutes = require("./user.routes")
const roleRoutes = require("./role.router")

router.use('/api/auth', authRoutes)
router.use('/api/users', userRoutes)
router.use('/api/admin/roles', roleRoutes)

module.exports = router