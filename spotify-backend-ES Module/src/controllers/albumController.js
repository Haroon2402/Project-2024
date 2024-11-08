import {v2 as cloudinary} from 'cloudinary'
import albumModel from '../models/albumModel.js'

const addAlbum = async (req ,res) => {
    try {
        
        const {name,desc,bgColor} = req.body
        const imageFile = req.file
        const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
        console.log(name,desc,bgColor)
        const albmData = {
            name,
            desc,
            bgColor,
            image: imageUpload.secure_url
        }
        console.log(albmData)

        const album = albumModel(albmData)
        console.log(album)
        await album.save()

        res.json({success: true, message:"Album added"})

    } catch (error) {
        res.json({success: false})
    }
}

const listAlbum = async (req, res) => {
    try {
        
        const allAlbums = await albumModel.find()
        res.json({success: true, albums: allAlbums})

    } catch (error) {
        res.json({success:false})
    }
}

const removeAlbum = async (req, res) => {
    try {
        const {id} = req.params
        const {body} = req
        console.log(id, body)
        await albumModel.findByIdAndDelete(id, body)
        res.json({success: true, message:"Album removed"})

    } catch (error) {
        res.json({success: false})
    }
}

export {addAlbum, listAlbum, removeAlbum}