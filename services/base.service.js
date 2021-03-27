const mongoose = require('mongoose')

module.exports = class BaseService
{
    constructor(model)
    {
        this.model = model
    }

    async IsRecordExists(query){
        try {
            const record = await this.model.findOne(query)
            if(record){
                return true
            }
            return false
        }
        catch (e) {
            return e
        }
    }

    async GetOneByField(field){
        try{
            return await this.model.findOne(field)
        }
        catch (e) {
            return e
        }
    }

    async GetByFieldFilter(field, value){
        try{
            return await this.model.find({[field]: value})
        }
        catch (e) {
            return e
        }
    }

    async GetById(id){
        try{
            return await this.model.findById({ _id: new mongoose.Types.ObjectId(id) })
        }
        catch (e) {
            throw e
        }
    }

    async GetAll(){
        try{
            return await this.model.find({})
        }
        catch (e) {
            return e
        }
    }
}