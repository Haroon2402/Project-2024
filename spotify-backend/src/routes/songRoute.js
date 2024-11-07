const {addSong, listSong} = require('../controllers/songController')
const express = require('express')
const upload = require('../middleware/multer')

const songRouter = express.Router()


songRouter.post('/add',upload.fields([{name: 'image',maxCount: 1},{name: 'audio', maxCount: 1}]), addSong)
songRouter.get('/list', listSong)

module.exports = songRouter
