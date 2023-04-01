const utils = require('@helpers/utils')
const serialize = require('../serializer')
const Student = require('@models/mongodb/schemas/student')

const listData = async (params) => {
    const { filter, w_regx, sort, skip, limit, draw } =
        await utils.getQueryParams(params, ['name'])

    const recordsTotal = await Student.countDocuments()

    return (
        Student.find(filter)
            .or({ $or: w_regx })
            .sort(sort)
            .skip(skip)
            .limit(limit)
            // .populate({
            //     path: 'regionid',
            //     model: 'city',
            //     select: 'city_mm city_en',
            // })
            // .populate({
            //     path: 'townshipid',
            //     model: 'township',
            //     select: 'township_mm township_en',
            // })
            .then((data) => {
                return serialize({
                    data,
                    draw,
                    recordsTotal,
                    recordsFiltered: recordsTotal,
                })
            })
    )
}

const findDataById = (id) => {
    return (
        Student.findById(id)
            // .populate({
            //     path: 'regionid',
            //     model: 'city',
            //     select: 'city_mm city_en',
            // })
            // .populate({
            //     path: 'townshipid',
            //     model: 'township',
            //     select: 'township_mm township_en',
            // })
            .then(serialize)
    )
}

const findDataBy = (params) => {
    return (
        Student.find(params)
            // .populate({
            //     path: 'regionid',
            //     model: 'city',
            //     select: 'city_mm city_en',
            // })
            // .populate({
            //     path: 'townshipid',
            //     model: 'township',
            //     select: 'township_mm township_en',
            // })
            .then(serialize)
    )
}

const addData = (dataObj) => {
    return Student.create(dataObj).then(serialize)
}

const updateData = (id, dataObj) => {
    return Student.findByIdAndUpdate(id, dataObj).then(serialize)
}

const deleteData = (id) => {
    return Student.findByIdAndDelete(id).then(serialize)
}

const dropAll = () => {
    return Student.remove()
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
