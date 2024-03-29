const express = require('express')
const router = express.Router()
const utils = require('@helpers/utils')
const Student = require('@controllers/students')
const checkAuth = require('@middlewares/dto/is_valid_user')
const isValidData = require('@middlewares/dto/is_valid_dto')
const studentSchema = require('@models/validations/student.schema')
const { handleRenderer, handleDatabase } = require('@helpers/handlers/response')

router
    .get('/students', checkAuth, (req, res, next) => {
        const pages = {
            runPage: 'pages/student-list',
            runProgram: 'course.student.list',
            runContent: 'student.list',
        }
        handleRenderer(req.user, pages, res)
    })
    .get('/student/:id?', checkAuth, async (req, res, next) => {
        const id = req.params.id
        const data = id ? await Student.findDataById(id) : {}
        const pages = {
            data: data.data || {},
            runPage: 'pages/student-entry',
            runProgram: 'course.student.entry',
            runContent: 'student.entry',
        }
        handleRenderer(req.user, pages, res)
    })
    .post('/student', isValidData(studentSchema), (req, res, next) => {
        utils.removeImages(req.body.remove_images || []).then((result) => {
            req.body.images = req.body.images
            const getService = Student.addData(req.body)
            handleDatabase(getService, utils.isEmptyObject, res)
        })
    })
    .put('/student/:id?', isValidData(studentSchema), (req, res, next) => {
        utils.removeImages(req.body.remove_images || []).then((result) => {
            const { ['id']: rmId, ...data } = req.body
            data.images = data.images
            const getService = Student.updateData(rmId, data)
            handleDatabase(getService, utils.isEmptyObject, res)
        })
    })

module.exports = router
