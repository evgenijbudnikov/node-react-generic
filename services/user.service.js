const UserProvider = require('../provider/user.provider')

module.exports = class UserService {

    constructor() {
        this.userProvider = new UserProvider()
    }

    async GetUserById (id) {
        try{
            return await this.userProvider.GetById(id)
        }
        catch (e) {
            return e
        }
    }

    async GetUserByEmail(email) {
        try{
            return await this.userProvider.GetByField("email", email)
        }
        catch (e) {
            return e
        }
    }

    async GetAllUsers(){
        try{
            return await this.userProvider.GetAll()
        }
        catch (e) {
            return e
        }
    }

}