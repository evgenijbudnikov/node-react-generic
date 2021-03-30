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

    async GetAllUsers(searchTerm = "") {
        try{

            let result = {}

            const searchFilter = searchTerm ? { email: { $regex: searchTerm, $options: "i" }}: {}

            let [users, roles] = await Promise.all([
                this.model.find(searchFilter).populate({path:'roles', model:'Role'}),
                this.roleProvider.GetAll()
            ]);

            result.users = users
            result.roles = roles
            result.count = users.length

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