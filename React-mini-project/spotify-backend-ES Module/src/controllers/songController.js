import {v2 as cloudinary} from 'cloudinary'
import songModel from '../models/songModel.js';


const addSong = async (req, res) => {
    try {
        const {name,desc,album} = req.body;
        console.log(name, desc, album)
        
        const audioFile = req.files.audio[0];
        const imageFile = req.files.image[0];
        const audioUpload = await cloudinary.uploader.upload(audioFile.path, {resource_type:'video'});
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:'image'});
        const duration = `${Math.floor(audioUpload.duration/60)}:${Math.floor(audioUpload.duration%60)}`
        console.log(audioFile,imageFile,audioUpload,imageUpload,duration)
        const songData = {
            name,
            desc,
            album,
            image: imageUpload.secure_url,
            file: audioUpload.secure_url,
            duration
        }
        console.log(songData)

        const song = songModel(songData);
        console.log(song)
        await song.save()

        res.json({success:true,message:"Song Added"})

    } catch (error) {
        res.json({success:false})
    }
}


const listSong = async (req, res) => {
    try {

        const allSongs = await songModel.find()
        res.json({success:true, songs: allSongs})

    } catch (error) {

        res.json({success:false})
    }
}

const removeSong = async (req, res) => {
    try {
        const {id} = req.params
        const {body}= req
        await songModel.findByIdAndDelete(id, body)
        res.json({ success: true, message:"Song removed"})

    } catch (error) {
        res.json({success: false})
    }
}


export {addSong, listSong, removeSong}