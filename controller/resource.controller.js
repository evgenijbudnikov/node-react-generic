const RoutService = require('../services/resource.service')
const constants = require('../constant/errorCodes')

module.exports = {

    getAllRoutes: async (req, res, next) => {
        try {
            if(req.query.roleId){
                return next()
            }
            const service = new RoutService()
            const roles = await service.GetAllRoutes()

            await res.status(constants.OK)
                .json(roles)

        }
        catch (e) {
            await res.status(constants.BAD_REQUEST)
                .json({message: e.message})
        }
    },

    getRouteById: async (req, res) => {
        try {
            const id = req.query.routeId
            const service = new RoutService()
            const route = await service.GetById(id)

            //console.log(req.params)
            //console.log(role)

            if(!route){
                return await res.status(constants.NOT_FOUND)
                    .json({ message: 'route not found' })
            }

            await res.status(constants.OK)
                .json(route)
        }
        catch (e) {
            await res.status(constants.BAD_REQUEST)
                .json({message: e.message})
        }
    },

    updateRoute: async (req, res) => {
        try {
            const service = new RoutService()
            const updatedRole = await service.UpdateRoute(req.query, {$set: req.body})

            await res.status(constants.OK)
                .json(updatedRole)

        }
        catch (e) {
            await res.status(constants.BAD_REQUEST)
                .json({message: e.message})
        }
    }

}