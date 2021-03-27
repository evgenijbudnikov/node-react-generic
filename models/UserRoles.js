const mongoose = require("mongoose")
const {Schema, model} = require('mongoose')

const schema = new Schema({
    userId: {type:Schema.Types.ObjectId, required: true, unique: true},
    roles: [{type:Schema.Types.ObjectId, required: true, ref:'roles', default: [mongoose.Types.ObjectId('6047e7e03b674f23b02a7380')]}]
})

module.exports = model('UserRoles', schema)