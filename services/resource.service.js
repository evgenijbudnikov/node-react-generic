const errorMessages = require('../constant/error.messages')
const RouteResource = require('../models/RouteResource')
const BaseService = require('../services/base.service')

module.exports = class RouteService extends BaseService{

    constructor() {
        super(RouteResource);
        this.model = RouteResource
    }

    async UpdateRoute (query, route) {
        try{
            const updated = await this.model.updateOne(query, route)
            return updated
        }
        catch (e) {
            return e
        }
    }
    async GetAllRoutes () {
        try{
            return await this.model.find().populate(
                {
                    path:'access',
                    populate: {
                        path: 'role',
                        model: 'Role'
                    }
                })
        }
        catch (e) {
            return e
        }
    }
}