const UserService = require('../services/user.service')
const constants = require('../constant/errorCodes')

module.exports = {

    getUserById: async (req, res) => {
        try {
            const userId = req.params.userId
            const service = new UserService()
            const user = await service.GetUserById(userId)

            console.log(req.params)
            console.log(user)

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
    }
}