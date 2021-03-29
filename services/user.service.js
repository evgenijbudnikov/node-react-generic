const errorMessages = require('../constant/error.messages')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const BaseService = require('../services/base.service')
const RoleService = require('../services/role.service')



module.exports = class UserService extends BaseService{

    constructor() {
        super(User)
        this.model = User
        this.roleProvider = new RoleService()
    }

    async UpdateUser (query, user) {
        try{
            const updated = await this.model.updateOne(query, user)
            return updated
        }
        catch (e) {
            return e
        }
    }

    async CreateUser (user) {
        try{

            const candidate = await this.GetOneByField({ email: user.email })

            if(candidate){
                throw ({
                    status:400,
                    message:'user with this email already exists'
                })
                return
            }

            const hashedPassword = await bcrypt.hash(user.password, 12)

            const newUser = new User({email : user.email, password: hashedPassword, roles:["6047e7e03b674f23b02a7380"]})
            const createdUser = await newUser.save()

            const serializedUser = createdUser.toObject({ getters: true })

            if(!serializedUser.id){
                throw ({
                    status:400,
                    message:'Something went wrong while creating user'
                })
                return
            }

            return createdUser
        }
        catch (e) {
            throw new Error(e)
            return e
        }
    }

    async GetAllUsers() {
        try{

            let result = {}

            let [roles, users] = await Promise.all([
                this.roleProvider.GetAll(),
                this.model.find().populate({path:'roles', model:'Role'})
            ]);

            result.roles = roles
            result.users = users

            return result
        }
        catch (e) {
            return e
        }
    }

    async DeleteUser (query) {
        try{
            return await this.model.deleteOne({ _id: query.id })
        }
        catch (e) {
            return e
        }
    }
}