const express = require('express')
const cors = require('cors')
const connectDB = require('./config/mongodb')
const connectCloudinary = require('./config/cloudinary')
const userRouter = require('./routes/userRoute')
const productRouter = require('./routes/productRoute')
const cartRoter = require('./routes/cartRoutes')
const orderRouter = require('./routes/orderRoute')


require('dotenv').config()




//App Config
const app = express()
const port = process.env.PORT || 4000

connectDB()
connectCloudinary()

//middlewares
app.use(express.json())

app.use(cors())

//api endpoints
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRoter)
app.use('/api/order',orderRouter)

app.get('/', (req, res) => {
  res.send('GET request to the homepage')
})

app.listen(port, ()=>console.log(`running in port http://localhost:${port}`))