const errorMessages = require('../constant/error.messages')
const Role = require('../models/Role')
const BaseService = require('../services/base.service')
const mongoose = require('mongoose')


module.exports = class RoleService extends BaseService{

    constructor() {
        super(Role);
        this.model = Role
    }

    async UpdateRole (query, role) {
        try{
            const updated = await this.model.updateOne({_id: query.id}, role)
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
            return await this.model.deleteOne({_id: query.id})
        }
        catch (e) {
            return e
        }
    }

    //Here could be added more role specific methods
}