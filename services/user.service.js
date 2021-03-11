const UserProvider = require('../provider/user.provider')
const errorMessages = require('../constant/error.messages')


module.exports = class UserService {

    constructor() {
        this.userProvider = new UserProvider()
    }

    async GetUserById (id) {
        try{
            return await this.userProvider.GetById(id)
        }
        catch (e) {
            return e
        }
    }

    async CreateUser (user) {
        try{
            const isRole = await this.userProvider.IsRecordExists(user)
            if(isRole){
                throw new Error(errorMessages.RoleExist)
            }
            return await this.userProvider.CreateUser(user)
        }
        catch (e) {
            throw e
        }
    }
    async UpdateUser (query, user) {
        try{
            const isRole = await this.userProvider.IsRecordExists(query)
            if(!isRole){
                throw new Error(errorMessages.RoleNotExist)
            }
            return await this.userProvider.UpdateUser(query, user)
        }
        catch (e) {
            throw e
        }
    }
    //async GetUserByEmail(email) {
    //    try{
    //        return await this.userProvider.GetByField("email", email)
    //    }
     //   catch (e) {
    //        return e
    //    }
    //}

    async GetAllUsers(){
        try{
            return await this.userProvider.GetAllUsers()
        }
        catch (e) {
            return e
        }
    }

    async DeleteUser (user) {
        try{
            const isUser = await this.userProvider.IsRecordExists(user)
            if(!isUser){
                throw new Error(errorMessages.RoleNotExist)
            }
            return await this.userProvider.DeleteRole(user)
        }
        catch (e) {
            throw e
        }
    }

}