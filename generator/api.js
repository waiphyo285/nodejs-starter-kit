const utils = require('@helpers/utils')
const Service = require('@controllers/generators')
const { handleDatabase } = require('@helpers/handlers/response')

const genExport = (module.exports = {})

genExport.index = (req, res, next) => {
    const getService = Service.listData()
    handleDatabase(getService, utils.isEmptyObject, res)
}

genExport.show = (req, res, next) => {
    const getService = Service.findDataById(req.params.id)
    handleDatabase(getService, utils.isEmptyObject, res)
}

genExport.showBy = (req, res, next) => {
    delete req.query._
    const getService = Service.findDataBy(req.query)
    handleDatabase(getService, utils.isEmptyObject, res)
}

genExport.create = (req, res, next) => {
    const getService = Service.addData(req.body)
    handleDatabase(getService, utils.isEmptyObject, res)
}

genExport.update = (req, res, next) => {
    const getService = Service.updateData(req.params.id, req.body)
    handleDatabase(getService, utils.isEmptyObject, res)
}

genExport.delete = (req, res, next) => {
    const getService = Service.deleteData(req.params.id)
    handleDatabase(getService, utils.isEmptyObject, res)
}

genExport.deleteAll = (req, res, next) => {
    Service.dropAll()
        .then((data) => res.send(data))
        .catch(next)
}
