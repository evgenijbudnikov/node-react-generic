const mongoose = require('mongoose')
const config = require('config')

module.exports = async () => {
    const connection = await mongoose.connect(config.get('mongoUri'), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    console.log('successfully connected to database')
    return connection.connection.db
}