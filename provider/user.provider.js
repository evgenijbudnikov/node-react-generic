const User = require('../models/User')
const RoleProvider = require('../provider/roles.provider')
const BaseProvider = require('../provider/base.provider')

module.exports = class UserProvider extends BaseProvider{

    constructor() {
        super(User)
        this.model = User
        this.roleProvider = new RoleProvider()
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
            const newUser = new User({email : user.email, password: user.password})
            return await newUser.save(user)
        }
        catch (e) {
            return e
        }
    }

    async DeleteRole (query) {
        try{
            return await this.model.deleteOne(query)
        }
        catch (e) {
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
}