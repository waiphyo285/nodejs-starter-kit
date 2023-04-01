const utils = require('@helpers/utils')
const Student = require('@controllers/students')
const { handleDatabase } = require('@helpers/handlers/response')

const students = (module.exports = {})

students.index = (req, res, next) => {
    delete req.query._
    const getService = Student.listData(req.query)
    handleDatabase(getService, utils.isEmptyObject, res)
}

students.show = (req, res, next) => {
    const getService = Student.findDataById(req.params.id)
    handleDatabase(getService, utils.isEmptyObject, res)
}

students.showBy = (req, res, next) => {
    delete req.query._
    const getService = Student.findDataBy(req.query)
    handleDatabase(getService, utils.isEmptyObject, res)
}

students.create = (req, res, next) => {
    const getService = Student.addData(req.body)
    handleDatabase(getService, utils.isEmptyObject, res)
}

students.update = (req, res, next) => {
    const getService = Student.updateData(req.params.id, req.body)
    handleDatabase(getService, utils.isEmptyObject, res)
}

students.delete = (req, res, next) => {
    const getService = Student.deleteData(req.params.id)
    handleDatabase(getService, utils.isEmptyObject, res)
}

students.deleteAll = (req, res, next) => {
    Student.dropAll()
        .then((data) => res.send(data))
        .catch(next)
}
