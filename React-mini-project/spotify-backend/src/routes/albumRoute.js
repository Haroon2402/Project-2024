const express = require('express')
const {addAlbum, listAlbum, removeAlbum} = require('../controllers/albumController')
const upload = require('../middleware/multer')

const albumRouter = express.Router()

albumRouter.post('/add', upload.single('image'), addAlbum)
albumRouter.get('/list',listAlbum)
albumRouter.delete('/remove/:id',removeAlbum)

module.exports = albumRouter
