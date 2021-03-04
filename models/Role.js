const {Schema, model} = require('mongoose')

const schema = new Schema({
    roleName: {type: String, required: true, unique: true}
})

module.exports = model('Role', schema)