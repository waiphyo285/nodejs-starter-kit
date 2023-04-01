const utils = require('@helpers/utils')
const UserRole = require('@controllers/user_roles')
const programConfig = require('@config/program/config.json')
const {
    createResponse,
    handleDatabase,
    handleError,
} = require('@helpers/handlers/response')

const userRole = (module.exports = {})

userRole.config = (req, res, next) => {
    try {
        const data = JSON.parse(JSON.stringify(programConfig.role))
        const locales = res.locals.i18n.translations
        res.status(200).json(createResponse(200, { data: { data } }, locales))
    } catch (error) {
        console.log(`Error ${err}`)
        res.status(500).json(handleError(err, locales))
    }
}

userRole.index = (req, res, next) => {
    delete req.query._
    const getService = UserRole.listData(req.query)
    handleDatabase(getService, utils.isEmptyObject, res)
}

userRole.show = (req, res, next) => {
    const getService = UserRole.findDataById(req.params.id)
    handleDatabase(getService, utils.isEmptyObject, res)
}

userRole.showBy = (req, res, next) => {
    delete req.query._
    const getService = UserRole.findDataBy(req.query)
    handleDatabase(getService, utils.isEmptyObject, res)
}

userRole.create = (req, res, next) => {
    const getService = UserRole.addData(req.body)
    handleDatabase(getService, utils.isEmptyObject, res)
}

userRole.update = (req, res, next) => {
    const getService = UserRole.updateData(req.params.id, req.body)
    handleDatabase(getService, utils.isEmptyObject, res)
}

userRole.delete = (req, res, next) => {
    const getService = UserRole.deleteData(req.params.id)
    handleDatabase(getService, utils.isEmptyObject, res)
}

userRole.deleteAll = (req, res, next) => {
    UserRole.dropAll()
        .then((data) => res.send(data))
        .catch(next)
}
