const UserService = require('../services/user.service')
const constants = require('../constant/errorCodes')

module.exports = {

    getUserById: async (req, res) => {
        try {
            const userId = req.params.userId
            const service = new UserService()
            const user = await service.GetUserById(userId)

            //console.log(req.params)
            //console.log(user)

            if(!user){
                return await res.status(constants.NOT_FOUND)
                    .json({ message: 'user not found' })
            }

            await res.status(constants.OK)
                .json(user)
        }
        catch (e) {
            await res.status(constants.BAD_REQUEST)
                .json({message: e.message})
        }
    },

    createUser: async (req, res) => {
        try {

            const user = req.body
            const service = new UserService()
            const newRole = await service.CreateUser(user)

            await res.status(constants.OK)
                .json(newRole)
        }
        catch (e) {
            await res.status(constants.BAD_REQUEST)
                .json({message: e.message})
        }
    },

    getAllUsers: async (req, res, next) => {
        try {
            if(req.query.userId){
                return next()
            }
            const service = new UserService()
            const users = await service.GetAllUsers()

            await res.status(constants.OK)
                .json(users)

        }
        catch (e) {
            await res.status(constants.BAD_REQUEST)
                .json({message: e.message})
        }
    },

    updateUser: async (req, res) => {
        try {
            const service = new UserService()
            const updatedRole = await service.UpdateUser(req.query, {$set: req.body})

            await res.status(constants.OK)
                .json(updatedRole)

        }
        catch (e) {
            await res.status(constants.BAD_REQUEST)
                .json({message: e.message})
        }
    },

    updateAssignedRoles: async (req, res) => {
        try {
            const service = new UserService()
            const updatedRoles = await service.UpdateAssignedRoles(req.query, {$set: req.body})

            await res.status(constants.OK)
                .json(updatedRoles)

        }
        catch (e) {
            await res.status(constants.BAD_REQUEST)
                .json({message: e.message})
        }
    },

    deleteUser: async (req, res) => {
        try {
            const user = req.query

            const service = new UserService()
            const result = await service.DeleteUser(user)

            await res.status(constants.OK)
                .json(result)

        }
        catch (e) {
            await res.status(constants.BAD_REQUEST)
                .json({message: e.message})
        }
    }

}