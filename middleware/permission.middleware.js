const config = require('config')
const permission = require('../security/permission.mapping.json')


module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next()
    }

    try {
        //console.log(permission)
        //console.log(req.method)
        console.log(req.baseUrl)
        console.log('requested permission: '+permission[req.method.toLowerCase()])
        //const token = req.headers.authorization.split(' ')[1] // "Bearer TOKEN"

        //if (!token) {
        //    console.log(token)
        //    return res.status(401).json({ message: 'Нет авторизации!!!' })
        //}

        //const decoded = jwt.verify(token, config.get('jwtSecret'))
        //req.user = decoded
        next()

    } catch (e) {
        //res.status(401).json({ status: 401, message: 'Нет авторизации' })
    }
}