const mongoose = require('mongoose')
const config = require('config')
const RouteResource = require('../models/RouteResource')


module.exports = async (app) => {

    const resultRoutes = []

    function print (path, layer) {
        if (layer.route) {
            layer.route.stack.forEach(print.bind(null, path.concat(split(layer.route.path))))
        } else if (layer.name === 'router' && layer.handle.stack) {
            layer.handle.stack.forEach(print.bind(null, path.concat(split(layer.regexp))))
        } else if (layer.method) {

            //console.log('%s',
                //layer.method.toUpperCase(),
                //path.concat(split(layer.regexp)).filter(Boolean).join('/'))
            resultRoutes.push(path.concat(split(layer.regexp)).filter(Boolean).join('/'))

        }
    }

    function split (thing) {
        if (typeof thing === 'string') {
            return thing.split('/')
        } else if (thing.fast_slash) {
            return ''
        } else {
            let match = thing.toString()
                .replace('\\/?', '')
                .replace('(?=\\/|$)', '$')
                .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//)
            return match
                ? match[1].replace(/\\(.)/g, '$1').split('/')
                : '<complex:' + thing.toString() + '>'
        }
    }

    app._router.stack.forEach(print.bind(null, []))


    const distArray = resultRoutes.map(item => item)
        .filter((value, index, self) => self.indexOf(value) === index)

    await updateRoutes()


    function hasRoutesToAdd(dbRoutes, appRoutes){
        const routes = appRoutes.filter(x => !dbRoutes.includes(x))
        return routes.map(x => ({resource: x}))
    }

    function hasRoutesToDelete(dbRoutes, appRoutes){
        const routes = dbRoutes.filter(x => !appRoutes.includes(x))
        return routes.map(x => ({resource: x}))
    }

    async function updateRoutes() {
        try {

            const dbRoutes = await RouteResource.find({})
            const dbRoutesList = dbRoutes.map(x => x.resource)

            const routesToAdd = hasRoutesToAdd(dbRoutesList, distArray)
            if(routesToAdd.length > 0){
                await RouteResource.insertMany(routesToAdd)
            }

            const routesToDelete = hasRoutesToDelete(dbRoutesList, distArray)
            if(routesToDelete.length > 0){
                for(let route in routesToDelete){
                    const {resource} = routesToDelete[route]
                    await RouteResource.deleteOne({resource: resource})
                }
            }
        } catch (e) {
            throw new Error(e)
        }
    }

    console.log(distArray)

}