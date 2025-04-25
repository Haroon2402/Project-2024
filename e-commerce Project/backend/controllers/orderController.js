
const userModel = require("../models/userModel")
const orderModel = require('../models/orderModel')
require('dotenv').config()

const Stripe = require('stripe').Stripe
const razorpayInstance = require('razorpay')


//global variables
const currency = 'inr'
const deliveryCharge = 10





//Payment Gateway


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const razorpay  = new razorpayInstance({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

const placeOrder = async (req, res) => {
    try {
        const {userId,items,amount,address} = req.body

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment : false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId,{cartData:{}})

        res.status(201).send({success:true,message:'Order placed'})

    } catch (error) {
        console.log(error)
        res.status(404).send({message:error.message})
    }
}

const placeOrderStripe = async (req,res) => {
    try {
        const {userId, items, amount, address} = req.body
        const {origin} = req.headers
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Stripe",
            payment : false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const line_items = items.map((item)=>({
            price_data :{ 
                currency:currency,
                product_data:{
                name: item.name
            },
                unit_amount: item.price * 100,

            },
            quantity:item.quantity
        }))

        line_items.push({
            price_data :{ 
                currency: currency,
                product_data:{
                name: "Delivery Charges"
            },
                unit_amount:deliveryCharge * 100,

            },
            quantity:1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment'
        })  

        res.status(200).send({success:true,session_url:session.url})

        

    } catch (error) {
        console.log({error})
        res.status(404).send({error:error})
    }
}

//Stripe Verification

const verifyStripe = async (req, res) => {
    const {userId, orderId, success} = req.body

    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, {payment:true})
            await userModel.findByIdAndUpdate(userId, {cartData:{}})
         
            res.status(201).send({success: true})
        }else{
            await orderModel.findByIdAndDelete(orderId)
         
            res.send({success:false})
        }
    } catch (error) {
        console.log(error)
        res.status(404).send({success:false,message:error.message})
    }
}

const placeOrderRazorPay = async (req,res) => {
    try {
        const {userId,items,amount,address} = req.body

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Razorpay",
            payment : false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const options = {
            amount: amount * 100,
            currency: currency.toUpperCase(),
            receipt: newOrder._id.toString()

        }
        console.log(options)

        await razorpay.orders.create(options,(error,order)=>{
            if(error){
                console.log(error)
                return send({success:false,message:error})
            }
            res.send({success:true,order})
        })

    } catch (error) {
        res.send({error:error.message})
    }
}

const verifyRazorpay = async (req, res) => {
    try {
        const {userId, razorpay_order_id} = req.body
        const orderInfo = await razorpay.orders.fetch(razorpay_order_id)
        if (orderInfo.status === 'paid') {
            await orderModel.findByIdAndUpdate(orderInfo.receipt,{payment:true})
            await userModel.findByIdAndUpdate(userId,{cartData:{}})
            res.status(201).send({success:true,message:'payment successfull'})
        }else{
            res.send({success:false,message:'Payment failed'})
        }
       // console.log(orderInfo)
    } catch (error) {
        res.status(404).send({error:error})
    }
}

//Order visiblity on Admin panel
const allOrders = async (req,res) => {
    try {
        const orders = await orderModel.find({})
        res.status(200).send({success:true,orders})
    } catch (error) {
        res.send({error:error})
    }
}

//user order for frontend
const userOrders = async (req,res) => {
    try {

        const {userId} = req.body
        const orders = await orderModel.find({userId})
        res.status(200).send({success:true,orders})
        
      
    } catch (error) {
        res.status(404).send({error:error})
    }
}

//Update can be done only from admin
const updateStatus = async (req,res) => {
    try {
        const {orderId, status} = req.body
        await orderModel.findByIdAndUpdate(orderId, {status})
        res.status(201).send({success:true, message:"Status Updated"})
    } catch (error) {
        res.status(404).send({error:error})
    }
}


module.exports = {placeOrder,placeOrderStripe,placeOrderRazorPay, allOrders,userOrders,updateStatus, verifyStripe, verifyRazorpay}


