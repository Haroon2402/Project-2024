const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true
    },
    caetData:{
        type:Object,
        default: {}        
    },
},{minimize: false})


module.exports = mongoose.models.user || mongoose.model('user',userSchema)