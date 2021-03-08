const RoleService = require('../services/role.service')
const constants = require('../constant/errorCodes')

module.exports = {

    getRoleById: async (req, res) => {
        try {
            const userId = req.params.id
            const service = new RoleService()
            const role = await service.GetRoleById(userId)

            console.log(req.params)
            console.log(role)

            if(!role){
                return await res.status(constants.NOT_FOUND)
                    .json({ message: 'role not found' })
            }

            await res.status(constants.OK)
                .json(role)
        }
        catch (e) {
            await res.status(constants.BAD_REQUEST)
                .json({message: e.message})
        }
    },

    createRole: async (req, res) => {
        try {
            const role = req.body
            const service = new RoleService()
            const newRole = await service.CreateRole(role)

            await res.status(constants.OK)
                .json(newRole)
        }
        catch (e) {
            await res.status(constants.BAD_REQUEST)
                .json({message: e.message})
        }
    },

    getAllRoles: async (req, res) => {
        try {
            const service = new RoleService()
            const roles = await service.GetAllRoles()

            await res.status(constants.OK)
                .json(roles)

        }
        catch (e) {
            await res.status(constants.BAD_REQUEST)
                .json({message: e.message})
        }
    },

    updateRole: async (req, res) => {
        try {
            const service = new RoleService()
            const updatedRole = await service.UpdateRole(req.query, {$set: req.body})

            await res.status(constants.OK)
                .json(updatedRole)

        }
        catch (e) {
            await res.status(constants.BAD_REQUEST)
                .json({message: e.message})
        }
    },

    deleteRole: async (req, res) => {
        try {
            const role = req.query

            const service = new RoleService()
            const result = await service.DeleteRole(role)

            await res.status(constants.OK)
                .json(result)

        }
        catch (e) {
            await res.status(constants.BAD_REQUEST)
                .json({message: e.message})
        }
    }


}