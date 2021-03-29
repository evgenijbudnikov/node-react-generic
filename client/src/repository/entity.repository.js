import React from 'react'
import {useHttp} from "../hooks/http.hook";

export const useEntityRepository = (routeUrl) => {

    const [request] = useHttp()

    const getAll = async() => {
        try{
            const entityResult = await request(routeUrl, 'GET')

            if(entityResult && !entityResult.status){
                return entityResult
            }
        }
        catch (e) {
            throw e
        }
    }


    function appendQuery(url, key, value){
        if(url && key && value) {
            return `${url}?${key}=${value}`
        }
    }

    const createOrUpdate = async(id, body) => {
        try{
            if(id){
                return await update(id, body)
            }else {
                return await create(body)
            }
        }
        catch (e) {
            throw e
        }
    }

    const create = async(body) => {
        try{
            const entityResult = await request(routeUrl, 'POST', body)

            if(entityResult && !entityResult.status){
                return entityResult
            }
        }
        catch (e) {
            throw e
        }
    }

    const update = async(id, body) => {
        try{
            let updateUrl = appendQuery(routeUrl, 'id', id)

            const entityResult = await request(updateUrl, 'PUT', body)

            if(entityResult && !entityResult.status){
                return entityResult
            }
        }
        catch (e) {
            throw e
        }
    }

    const remove = async(id) => {
        try{
            let updateUrl = appendQuery(routeUrl, 'id', id)

            const entityResult = await request(updateUrl, 'DELETE')

            if(entityResult && !entityResult.status){
                return entityResult
            }
        }
        catch (e) {
            throw e
        }
    }

    const getById = async(id) => {
        try{
            let updateUrl = appendQuery(routeUrl, 'id', id)

            const entityResult = await request(updateUrl, 'GET')

            if(entityResult && !entityResult.status){
                return entityResult
            }
        }
        catch (e) {
            throw e
        }
    }

    return [getAll, createOrUpdate, remove, getById]
}