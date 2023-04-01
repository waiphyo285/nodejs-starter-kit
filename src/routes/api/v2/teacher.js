const utils = require('@helpers/utils')
const Teacher = require('@controllers/teachers')
const { handleDatabase } = require('@helpers/handlers/response')

const teachers = (module.exports = {})

teachers.index = (req, res, next) => {
    delete req.query._
    const getService = Teacher.listData(req.query)
    handleDatabase(getService, utils.isEmptyObject, res)
}

teachers.show = (req, res, next) => {
    const getService = Teacher.findDataById(req.params.id)
    handleDatabase(getService, utils.isEmptyObject, res)
}

teachers.showBy = (req, res, next) => {
    delete req.query._
    const getService = Teacher.findDataBy(req.query)
    handleDatabase(getService, utils.isEmptyObject, res)
}

teachers.create = (req, res, next) => {
    const getService = Teacher.addData(req.body)
    handleDatabase(getService, utils.isEmptyObject, res)
}

teachers.update = (req, res, next) => {
    const getService = Teacher.updateData(req.params.id, req.body)
    handleDatabase(getService, utils.isEmptyObject, res)
}

teachers.delete = (req, res, next) => {
    const getService = Teacher.deleteData(req.params.id)
    handleDatabase(getService, utils.isEmptyObject, res)
}

teachers.deleteAll = (req, res, next) => {
    Teacher.dropAll()
        .then((data) => res.send(data))
        .catch(next)
}
