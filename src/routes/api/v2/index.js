const express = require('express')
const router = express.Router()

// api routing
const teachers = require('./teacher')

// middlewares
const isValidData = require('@middlewares/dto/is_valid_dto')

// schema validations
const teacherSchema = require('@models/validations/teacher.schema')

module.exports = router

router
    .get('/teachers', teachers.index)
    .get('/teacher/:id', teachers.show)
    .get('/teacher', teachers.showBy)
    .post('/teacher', isValidData(teacherSchema), teachers.create)
    .put('/teacher/:id', isValidData(teacherSchema), teachers.update)
    .delete('/teacher/:id', teachers.delete)
