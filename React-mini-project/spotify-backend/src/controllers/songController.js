const mongoose = require("mongoose")
const cloudinary = require('cloudinary').v2
const songModel = require('../models/songModel')


const addSong = async (req, res) => {
    try {
        
        const {name, desc, album} = req.body 
        const audioFile = req.files.audio[0]
        const imageFile = req.files.image[0]
        const audioUpload = await cloudinary.uploader.upload(audioFile.path, {resource_type: 'video'}) // provoiding the path
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:'image'})
        const duration = `${Math.floor(audioUpload.duration / 60)} : ${Math.floor(audioUpload.duration % 60)}`
        
        const songData = {
            name,
            desc,
            album,
            image: imageUpload.secure_url,
            file: audioUpload.secure_url,
            duration
        }

        const song = songModel(songData)
        await song.save()

        res.status(201).send({success: true,message: "Song Added"})

    } catch (error) {
        
        res.status(404).send({success: false})

    }
}

const listSong = async (req, res) => {
    try {
        
        const allSongs = await songModel.find()
        res.status(200).send({success: true, songs: allSongs})

    } catch (error) {
        
        res.status(404).send({success: false})

    }
}

const removeSong = async (req, res) => {
    try {
        
        const {id} = req.params
        const {body} = req
        await songModel.findByIdAndDelete(id, body)
        res.status(202).send({success: true, message: "Song Removed"})

    } catch (error) {
        
        res.status(304).send({success: false})

    }
}

module.exports = {addSong, listSong, removeSong}