const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    image:{
        type: Array,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    subCategory:{
        type: String,
        required: true
    },
    size:{
        type: Array,
        required: true
    },
    bestSeller:{
        type:Boolean,
        required: true
    },
    date:{
        type:Number,
        required: true
    }
})

module.exports = mongoose.models.product || mongoose.model('product', productSchema)