const AuthService = require('../services/auth.service')
const {validationResult} = require('express-validator')
const config = require('config')


module.exports = {

    login: async (req, res) => {
        try{
            const errors = validationResult(req)

            if(!errors.isEmpty()){
                return res.status(400).json({errors})
            }

            const {email, password} = req.body

            const authService = new AuthService()
            const token = await authService.Login(email, password)

            await res.status(201).json({token, userId: token.userId})
        }
        catch (e) {
            await res.status(getErrorStatus(e)).json({message: e.message})
        }
    },

    register: async (req, res) => {
        try{
            const errors = validationResult(req)

            if(!errors.isEmpty()){
                return res.status(400).json({errors})
            }

            const authService = new AuthService()
            const usr = await authService.Register(req.body)

            await res.status(201).json({message: "user created", usr})
        }
        catch (e) {
            await res.status(getErrorStatus(e)).json({message: e.message})
        }
    }
}

function getErrorStatus(e){
    if(!e.status){
        return config.get('internalErrorStatus')
    }
    return e.status
}