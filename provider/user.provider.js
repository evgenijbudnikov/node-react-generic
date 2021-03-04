const User = require('../models/User')
const BaseProvider = require('../provider/base.provider')

module.exports = class UserProvider extends BaseProvider{

    constructor() {
        super(User);
        this.model = User
    }

    //Here could be added more user specific methods
}