// Add products to user cart 

const userModel = require("../models/userModel")

const addToCart = async (req, res) => {
    try {
        const {userId, itemId, size} = req.body
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData
      //  console.log(userId,itemId,size)
        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1
            }
            else{
                cartData[itemId][size] = 1
            }
        }
        else{
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }
        await userModel.findByIdAndUpdate(userId,{cartData})

        res.status(201).send({success:true,message:"Added to cart"})
    } catch (error) {
        console.log(error)
        res.status(404).send({success:false,message:error.message})
    }
}

//update user cart date
const updateCart = async (req, res) => {
    try {
        const {userId , itemId, size, quantity} = req.body
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData

        cartData[itemId][size] = quantity
        await userModel.findByIdAndUpdate(userId,{cartData})
        res.status(201).send({success:true,message:"Cart updated"})

    } catch (error) {
        console.log(error)
        res.status(404).send({success:false,message:error.message})
    }
}

//Get user cart data 
const getUserCart = async (req, res) => {
    try {
        const {userId} = req.body
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData


        res.status(201).send({success:true,cartData})
    } catch (error) {
        console.log(error)
        res.status(404).send({success:false,message:error.message})
    }
}

module.exports = {addToCart, updateCart, getUserCart}