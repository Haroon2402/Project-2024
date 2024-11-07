const cloudinary = require('cloudinary').v2
const albumModel = require('../models/albumModel')


const addAlbum = async (req, res) => {
    try {
        
        const {name, desc, bgColor} = req.body
        const imageFile = req.file
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:'image'})

        const albumData = {
            name,
            desc,
            bgColor,
            image: imageUpload.secure_url
        }
        
        const album = albumModel(albumData)
        await album.save()

        res.status(201).send({success: true, message: "Album Added"})


    } catch (error) {
        
        res.status(404).send({success: false})

    }
}

const listAlbum = async (req, res) => {
    try {
        
        const allAlbums = await albumModel.find()

        res.status(200).send({success: true, albums: allAlbums})

    } catch (error) {
        
        res.status({success: false})

    }
}

const removeAlbum = async (req, res) => {
    try {
        
        const {id} = req.params
        const {body} = req
        await albumModel.findByIdAndDelete(id, body)
        res.status(202).send({success: true, message: "Album removed"})

    } catch (error) {
        
        res.status(304).send({success: false})

    }
}

module.exports = {addAlbum, listAlbum, removeAlbum}