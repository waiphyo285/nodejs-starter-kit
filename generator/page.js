const express = require('express')
const router = express.Router()
const utils = require('@helpers/utils')
const Service = require('@controllers/generators')
const checkAuth = require('@middlewares/dto/is_valid_user')
const { handleRenderer, handleDatabase } = require('@helpers/handlers/response')

router
    .get('/routings', checkAuth, (req, res, next) => {
        const pages = {
            runPage: 'pages/runnerPage-list',
            runProgram: 'menuList',
        }
        handleRenderer(req.user, pages, res)
    })
    .get('/routing/:id?', checkAuth, async (req, res, next) => {
        const id = req.params.id
        const data = id ? await Service.findDataById(id) : {}
        const pages = {
            data: data.data || {},
            runPage: 'pages/runnerPage-entry',
            runProgram: 'menuEntry',
        }
        handleRenderer(req.user, pages, res)
    })
    .post('/routing', (req, res, next) => {
        const getService = Service.addData(req.body)
        handleDatabase(getService, utils.isEmptyObject, res)
    })
    .put('/routing/:id?', (req, res, next) => {
        const { ['id']: rmId, ...data } = req.body
        const getService = Service.updateData(rmId, data)
        handleDatabase(getService, utils.isEmptyObject, res)
    })

module.exports = router
