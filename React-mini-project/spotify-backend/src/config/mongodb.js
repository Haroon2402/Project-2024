const mongoose = require('mongoose')

const connectDb = async () => {

    mongoose.connection.on('connected', ()=>console.log('mongoDb connection established'))

    await mongoose.connect(`${process.env.MONGODB_URI}/Spotifyapp`)

}

module.exports = connectDb