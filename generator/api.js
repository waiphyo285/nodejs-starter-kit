const utils = require('@helpers/utils')
const genDatabase = require('@controllers/generators')
const { handleDatabase } = require('@helpers/handlers/response')

const genExport = (module.exports = {})

genExport.index = (req, res, next) => {
    const getDb = genDatabase.listData()
    handleDatabase(getDb, utils.isEmptyObject, res)
}

genExport.show = (req, res, next) => {
    const getDb = genDatabase.findDataById(req.params.id)
    handleDatabase(getDb, utils.isEmptyObject, res)
}

genExport.showBy = (req, res, next) => {
    delete req.query._
    const getDb = genDatabase.findDataBy(req.query)
    handleDatabase(getDb, utils.isEmptyObject, res)
}

genExport.create = (req, res, next) => {
    const getDb = genDatabase.addData(req.body)
    handleDatabase(getDb, utils.isEmptyObject, res)
}

genExport.update = (req, res, next) => {
    const getDb = genDatabase.updateData(req.params.id, req.body)
    handleDatabase(getDb, utils.isEmptyObject, res)
}

genExport.delete = (req, res, next) => {
    const getDb = genDatabase.deleteData(req.params.id)
    handleDatabase(getDb, utils.isEmptyObject, res)
}

genExport.deleteAll = (req, res, next) => {
    genDatabase
        .dropAll()
        .then((data) => res.send(data))
        .catch(next)
}
