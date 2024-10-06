import express from 'express'
import cors from 'cors'
import 'dotenv/config'

// app config
const app = express()
const port = process.env.PORT || 4000

// middlewares
app.use(express.json())
app.use(cors())


// initializin routes
app.get('/', (req, res) => {
  res.send('GET request to the homepage')
})






app.listen(port,console.log(`running in port ${port}`))