const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('config')
const UserProvider = require('../provider/user.provider')

module.exports = class AuthService {

    async Register(userModel){
        try{
            const provider = new UserProvider()
            const candidate = await provider.GetOneByField({ email: userModel.email })

            if(candidate){
                throw ({
                    status:400,
                    message:'user with this email already exists'
                })
                return
            }

            const hashedPassword = await bcrypt.hash(userModel.password, 12)

            const newUser = new User({
                email: userModel.email,
                password: hashedPassword
            })

            const createdUser = await newUser.save()
            const serializedUser = createdUser.toObject({ getters: true })

            if(!serializedUser.id){
                throw ({
                    status:400,
                    message:'Error while creating user'
                })
                return
            }

            return createdUser
        }
        catch (e) {
            console.log(e.message)
            throw e
        }
    }

    async Login(email, password){

        try{

            const provider = new UserProvider()
            const user = await provider.GetOneByField({ email: email })

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