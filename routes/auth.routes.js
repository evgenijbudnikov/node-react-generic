const {Router} = require('express')
const router = Router()
const {check} = require('express-validator')
const authController = require('../controller/auth.controller')


router.post('/register',
    [
        check('email', 'Please enter valid email').isEmail(),
        check('password', 'Password should contain minimum 6 and maximum 12 characters').isLength({min: 6, max: 12}),
        check('password', 'Password should contain alpha numeric characters').isAlphanumeric()
    ],
    authController.register)


router.post('/login',
    [
        check('email', 'Please enter valid email').normalizeEmail().isEmail(),
        check('password', 'enter password').exists()
    ],
    authController.login)


module.exports = router