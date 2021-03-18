const UserProvider = require('../provider/user.provider')
const UserRolesProvider = require('../provider/userroles.provider')
const errorMessages = require('../constant/error.messages')


module.exports = class UserService {

    constructor() {
        this.userProvider = new UserProvider()
        this.userRolesProvider = new UserRolesProvider()
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

    async AssignRoles(userId, roles) {
        try{
            return await this.userRolesProvider.AssignRolesToUser(userId, roles)
        }
        catch (e) {
            return e
        }
    }
    async UpdateAssignedRoles(query, roles) {
        try{
            return await this.userRolesProvider.UpdateAssignedRolesToUser(query, roles)
        }
        catch (e) {
            return e
        }
    }

    async GetUserRoles(userId) {
        try{
            return await this.userRolesProvider.GetUserRoles(userId)
        }
        catch (e) {
            return e
        }
    }

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
            return await this.userProvider.DeleteUser(user)
        }
        catch (e) {
            throw e
        }
    }

}