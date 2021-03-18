const express = require('express')
const config = require('config')
const mongoConnect = require('./loaders/mongoconnect.js')
const apiRouter = require('./routes/api.router')
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger/swagger.options.json')


const app = express()
app.use(express.json({extended:true}))


app.use('/', apiRouter)
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))


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