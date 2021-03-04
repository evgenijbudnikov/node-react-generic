const express = require('express')
const config = require('config')
const mongoConnect = require('./loaders/mongoconnect.js')

const app = express()
app.use(express.json({extended:true}))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/users', require('./routes/user.routes'))
app.use('/api/admin/roles', require('./routes/role.router'))

const PORT = config.get('port') || 5000

async function start() {
    try{
        await mongoConnect()
    }
    catch(e){
        console.log('server error', e.message)
    }
}

start()

app.listen(PORT, () =>
    console.log(`App has been started on port ${PORT}...`)
)