const express = require('express')
const router = express.Router()

const upload = require('./upload')
const deleteFile = require('./delete')

router
    .post('/upload/:folderName', upload.index)
    .post('/multiUpload/:folderName', upload.multiUpload)
    .delete('/delete/:filePath', deleteFile.index)

module.exports = router
