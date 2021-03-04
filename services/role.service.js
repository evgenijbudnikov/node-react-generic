const RoleProvider = require('../provider/roles.provider')
const errorMessages = require('../constant/error.messages')

module.exports = class RoleService{

    constructor() {
        this.roleProvider = new RoleProvider()
    }

    async CreateRole (role) {
        try{
            const isRole = await this.roleProvider.IsRecordExists(role)
            if(isRole){
                throw new Error(errorMessages.RoleExist)
            }
            return await this.roleProvider.CreateRole(role)
        }
        catch (e) {
            throw e
        }
    }

    async UpdateRole (query, role) {
        try{
            const isRole = await this.roleProvider.IsRecordExists(query)
            if(!isRole){
                throw new Error(errorMessages.RoleNotExist)
            }
            return await this.roleProvider.UpdateRole(query, role)
        }
        catch (e) {
            throw e
        }
    }

    async DeleteRole (role) {
        try{
            const isRole = await this.roleProvider.IsRecordExists(query)
            if(!isRole){
                throw new Error(errorMessages.RoleNotExist)
            }
            return await this.roleProvider.DeleteRole(role)
        }
        catch (e) {
            throw e
        }
    }

    async GetRoleById (id) {
        try{
            const role = await this.roleProvider.GetById(id)

            if(!role){
                throw new Error(errorMessages.RoleNotExist)
            }
            return role
        }
        catch (e) {
            throw e
        }
    }

    async GetRoleByName(name) {
        try{
            return await this.roleProvider.GetByFieldFilter("roleName", name)
        }
        catch (e) {
            throw e
        }
    }

    async GetAllRoles(){
        try{
            return await this.roleProvider.GetAll()
        }
        catch (e) {
            throw e
        }
    }

}