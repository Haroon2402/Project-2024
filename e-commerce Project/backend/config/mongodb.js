const mongoose = require('mongoose')

const connectDB = async () => {
    
    mongoose.connection.on('connected', ()=>console.log('Database connected'))
    mongoose.connect(`${process.env.MONGOBD_URi}/e-commerce`)

}

module.exports = connectDB