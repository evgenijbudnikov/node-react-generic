const {Schema, model} = require('mongoose')

const schema = new Schema({
    resource: {type: String, required: true, unique: true},
    access: [{
                role: { type:Schema.Types.ObjectId, ref:'roles' },
                permissions: [{type: String}]
            }]
})

module.exports = model('RouteResource', schema)