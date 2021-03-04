const Role = require('../models/Role')
const BaseProvider = require('../provider/base.provider')
const mongoose = require('mongoose')

module.exports = class RoleProvider extends BaseProvider{

    constructor() {
        super(Role);
        this.model = Role
    }

    async UpdateRole (query, role) {
        try{
            const updated = await this.model.updateOne(query, role)
            return updated
        }
        catch (e) {
            return e
        }
    }

    async CreateRole (role) {
        try{
            const newRole = new Role({roleName : role.roleName})
            return await newRole.save(role)
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

    //Here could be added more role specific methods
}