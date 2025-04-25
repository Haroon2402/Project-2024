const userModel = require('../models/userModel')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



const createToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET)
}

//Route for user login
const loginUser = async (req, res) => {
    try {

        const {email,password} = req.body
        
        const user = await userModel.findOne({email})

        if (!user) {
            return res.status(404).send({message:`User doesn't exists`})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {

            const token = createToken(user._id)
            res.status(200).send({success:true,token})
            
        }
        else{
            res.status(404).send({success:false,message:'invalid credentials'})
        }
        
    } catch (error) {
        res.status(404).send(error.message)
    }
}

//Route for user registeration
const registerUser = async (req, res) => {
    try {
        const {name,email,password} = req.body

        //unique email verification
        const exists = await userModel.findOne({email})
        if(exists){
            return res.status(200).send({message:"User already exists"})
        }

        //Email and passwod validation
        if(!validator.isEmail(email)){
           return res.status(404).send({message:'Please enter a valid email'})
        }

        if (password.length < 8) {
            return res.status(404).send({message:'Please enter a strong password'})
        }

        const hashPass = await bcrypt.hash(password, 8)
        console.log(hashPass)
        const newUser = await userModel.create({name,email,password:hashPass})
        const token = createToken(newUser._id)
        
        
       
//6.11.34
        
       

       return res.status(201).send({token,newUser,success:true})

        


    } catch (error) {
        res.send(error.message)
    }
}

//Routr for admin login
const adminLogin = async (req,res) => {
    try {
        const {email,password} = req.body

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password, process.env.JWT_SECRET)
            res.status(201).send({success:true,token})
        }
        else{
            res.status(404).send({message:'invalid credentials'})
        }


    } catch (error) {
        res.status(404).send({error:error.message})
    }
}

module.exports = {loginUser,registerUser,adminLogin}