const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('config')
const UserService = require('../services/user.service')


module.exports = class AuthService {

    constructor() {
        this.userService = new UserService()
    }

    async Register(userModel){
        try{
            return await this.userService.CreateUser(userModel)
        }
        catch (e) {
            console.log(e.message)
            throw e
        }
    }

    async Login(email, password){

        try{
            const user = await this.userService.GetOneByField({ email: email })

            if(!user){
                throw ({ status:400, message:`User email ${email} or password is incorrect.`})
                return
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if(!isMatch){
                throw ({status:400, message:'wrong login or password'})
                return
            }

            const token = jwt.sign({ userId: user.id }, config.get('jwtSecret'), {expiresIn: '1h'})

            return { token: token, userId: user.id }
        }
        catch (e) {
            console.log(e.message)
            throw e
        }
    }
}