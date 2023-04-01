const utils = require('@helpers/utils')
const User = require('@controllers/users')
const { handleDatabase } = require('@helpers/handlers/response')

const users = (module.exports = {})

users.index = (req, res, next) => {
    delete req.query._
    const getService = User.listUsers(req.query)
    handleDatabase(getService, utils.isEmptyObject, res)
}

users.show = (req, res, next) => {
    const getService = User.findUserById(req.params.id)
    handleDatabase(getService, utils.isEmptyObject, res)
}

users.create = (req, res, next) => {
    const getService = User.addUser(req.body)
    handleDatabase(getService, utils.isEmptyObject, res)
}

users.updateWithPass = (req, res, next) => {
    const getService = User.updateWithPass(req.params.id, req.body)
    handleDatabase(getService, utils.isEmptyObject, res)
}

users.updateWithoutPass = (req, res, next) => {
    const getService = User.updateWithoutPass(req.params.id, req.body)
    getService.then((data) => {
        req.user.theme = data.data.theme
        req.user.locale = data.data.locale
    })
    handleDatabase(getService, utils.isEmptyObject, res)
}

users.delete = (req, res, next) => {
    const getService = User.deleteUser(req.params.id)
    handleDatabase(getService, utils.isEmptyObject, res)
}
