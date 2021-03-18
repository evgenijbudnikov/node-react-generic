const UserRoles = require('../models/UserRoles')
const RoleProvider = require('../provider/roles.provider')
const BaseProvider = require('../provider/base.provider')

module.exports = class UserProvider extends BaseProvider{

    constructor() {
        super(UserRoles)
        this.model = UserRoles
        this.roleProvider = new RoleProvider()
    }

    async AssignRolesToUser (userId, roles) {
        try{
            const assignedRoles = new UserRoles({
                    userId : userId,
                    roles: roles
                })
            return await assignedRoles.save()
        }
        catch (e) {
            return e
        }
    }

    async UpdateAssignedRolesToUser (query, roles) {
        try{
            const updated = await this.model.updateOne(query, roles)
            return updated
        }
        catch (e) {
            return e
        }
    }

    async GetUserRoles (userId) {
        try{
            const userRoles = await this.model.findOne({userId:userId})
            return userRoles
        }
        catch (e) {
            return e
        }
    }

    async DeleteUserRoles (userId) {
        try{
            const userRoles = await this.model.deleteOne({userId:userId})
            return userRoles
        }
        catch (e) {
            return e
        }
    }

}