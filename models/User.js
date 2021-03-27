const {Schema, model} = require('mongoose')

const schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    roles: [{type:Schema.Types.ObjectId, ref:'roles'}]
})

module.exports = model('User', schema)