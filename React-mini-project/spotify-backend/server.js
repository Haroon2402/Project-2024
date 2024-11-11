const express = require('express')
const cors = require('cors')
const songRouter = require('./src/routes/songRoute')
const connectDb = require('./src/config/mongodb')
const connectCloudinary = require('./src/config/cloudinary')
const albumRouter = require('./src/routes/albumRoute')
require('dotenv').config()



//app config

const app = express()
const port = process.env.PORT || 3000
connectDb()
connectCloudinary()


//middlewares

app.use(express.json())
app.use(cors())

//routes initialization
app.use('/api/song', songRouter)
app.use('/api/album',albumRouter)

app.get('/',(req, res)=>{
  res.status(200).send("api working")
})


app.listen(port, ()=>console.log(`running in http://localhost:${port}`))