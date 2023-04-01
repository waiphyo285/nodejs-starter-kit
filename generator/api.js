const utils = require('@helpers/utils')
const Services = require('@controllers/generators')
const { handleDatabase } = require('@helpers/handlers/response')

const modExport = (module.exports = {})

modExport.index = (req, res, next) => {
    const getService = Services.listData()
    handleDatabase(getService, utils.isEmptyObject, res)
}

modExport.show = (req, res, next) => {
    const getService = Services.findDataById(req.params.id)
    handleDatabase(getService, utils.isEmptyObject, res)
}

modExport.showBy = (req, res, next) => {
    delete req.query._
    const getService = Services.findDataBy(req.query)
    handleDatabase(getService, utils.isEmptyObject, res)
}

modExport.create = (req, res, next) => {
    const getService = Services.addData(req.body)
    handleDatabase(getService, utils.isEmptyObject, res)
}

modExport.update = (req, res, next) => {
    const getService = Services.updateData(req.params.id, req.body)
    handleDatabase(getService, utils.isEmptyObject, res)
}

modExport.delete = (req, res, next) => {
    const getService = Services.deleteData(req.params.id)
    handleDatabase(getService, utils.isEmptyObject, res)
}

modExport.deleteAll = (req, res, next) => {
    Services.dropAll()
        .then((data) => res.send(data))
        .catch(next)
}
