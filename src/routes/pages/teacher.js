const express = require('express')
const router = express.Router()
const utils = require('@helpers/utils')
const Teacher = require('@controllers/teachers')
const checkAuth = require('@middlewares/dto/is_valid_user')
const isValidData = require('@middlewares/dto/is_valid_dto')
const teacherSchema = require('@models/validations/teacher.schema')
const { handleRenderer, handleDatabase } = require('@helpers/handlers/response')

router
    .get('/teachers', checkAuth, (req, res, next) => {
        const pages = {
            runPage: 'pages/teacher-list',
            runProgram: 'course.teacher.list',
            runContent: 'teacher.list',
        }
        handleRenderer(req.user, pages, res)
    })
    .get('/teacher/:id?', checkAuth, async (req, res, next) => {
        const id = req.params.id
        const data = id ? await Teacher.findDataById(id) : {}
        const pages = {
            data: data.data || {},
            runPage: 'pages/teacher-entry',
            runProgram: 'course.teacher.entry',
            runContent: 'teacher.entry',
        }
        handleRenderer(req.user, pages, res)
    })
    .post('/teacher', isValidData(teacherSchema), (req, res, next) => {
        const getService = Teacher.addData(req.body)
        handleDatabase(getService, utils.isEmptyObject, res)
    })
    .put('/teacher/:id?', isValidData(teacherSchema), (req, res, next) => {
        const { ['id']: rmId, ...data } = req.body
        const getService = Teacher.updateData(rmId, data)
        handleDatabase(getService, utils.isEmptyObject, res)
    })

module.exports = router
