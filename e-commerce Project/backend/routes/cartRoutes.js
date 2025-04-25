const express = require('express')
const { getUserCart, addToCart, updateCart } = require('../controllers/cartController')
const authUser = require('../middleware/auth')

const cartRoter = express.Router()


cartRoter.post('/get',authUser, getUserCart)
cartRoter.post('/add',authUser, addToCart)
cartRoter.post('/update',authUser, updateCart)

module.exports = cartRoter