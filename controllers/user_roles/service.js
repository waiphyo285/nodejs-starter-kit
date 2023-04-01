const utils = require('@helpers/utils')
const serialize = require('../serializer')
const UserRole = require('@models/mongodb/schemas/user_role')
const { clearKey } = require('@models/cache/services/index')

const collectionName = UserRole.collection.collectionName

const listData = async (params) => {
    if (params.created_at) {
        params.created_at = await utils.getDateRange(params.created_at)
    }

    return UserRole.find(params).cache().then(serialize)
}

const findDataById = (id) => {
    return UserRole.findById(id)
        .lean()
        .then((resp) => {
            clearKey(collectionName)
            return resp
        })
        .then(serialize)
}

const findDataBy = (params) => {
    return UserRole.find(params)
        .then((resp) => {
            clearKey(collectionName)
            return resp
        })
        .then(serialize)
}

const addData = (dataObj) => {
    return UserRole.create(dataObj)
        .then((resp) => {
            clearKey(collectionName)
            return resp
        })
        .then(serialize)
}

const updateData = (id, dataObj) => {
    return UserRole.findByIdAndUpdate(id, dataObj)
        .then((resp) => {
            clearKey(collectionName)
            return resp
        })
        .then(serialize)
}

const deleteData = (id) => {
    return UserRole.findByIdAndDelete(id)
        .then((resp) => {
            clearKey(collectionName)
            return resp
        })
        .then(serialize)
}

const dropAll = () => {
    return UserRole.remove()
}

module.exports = {
    listData,
    findDataById,
    findDataBy,
    addData,
    updateData,
    deleteData,
    dropAll,
}
