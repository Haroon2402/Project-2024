const express = require('express')
const { allOrders, updateStatus, placeOrder, placeOrderStripe, placeOrderRazorPay, userOrders, verifyStripe, verifyRazorpay } = require('../controllers/orderController')
const adminAuth = require('../middleware/adminAuth')
const authUser = require('../middleware/auth')

const orderRouter = express.Router()

//admin features
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

//payment features
orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/stripe',authUser,placeOrderStripe)
orderRouter.post('/razorpay',authUser,placeOrderRazorPay)

//user feature
orderRouter.post('/userorders',authUser,userOrders)

//payment verification

orderRouter.post('/verifyStripe',authUser,verifyStripe)
orderRouter.post('/verifyRazorpay',authUser,verifyRazorpay)

module.exports = orderRouter