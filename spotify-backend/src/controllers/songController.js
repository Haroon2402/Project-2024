const { model } = require("mongoose")
const cloudinary = require('cloudinary').v2


const addSong = async (req, res) => {
    try {
        
        const {name, desc, album} = req.body 
        const audioFile = req.files.audio[0]
        const imageFile = req.files.image[0]
        const audioUpload = await cloudinary.uploader.upload(audioFile.path, {resource_type: 'video'}) // provoiding the path
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:'image'})

        console.log(name, desc, album, audioUpload, imageUpload)

    } catch (error) {
        
    }
}

const listSong = async (req, res) => {
    try {
        


    } catch (error) {
        
    }
}

module.exports = {addSong, listSong}