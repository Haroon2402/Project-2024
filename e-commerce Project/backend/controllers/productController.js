const cloudinary = require('cloudinary').v2
const productModel = require('../models/productModel')
// Add product function

const addProduct = async (req, res) => {
    try {
        
        const {name, description, price, category, subCategory, size, bestSeller} = req.body
        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]
        
        const images = [image1,image2,image3,image4].filter((item)=>item !==undefined)
        const imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'})
                return result.secure_url
            })
        )

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestSeller: bestSeller === 'true' ? true : false,
            size: JSON.parse(size),
            image: imagesUrl,
            date: Date.now()

        }

        console.log(productData)

        const product = await productModel.create(productData)
        res.status(200).send({success:true,message: 'Product Added',product})

        //console.log(name, description, price, category, subCategory, sizes, bestSeller)
         //console.log(imagesUrl) 

    
        
    } catch (error) {
        res.status(404).send({error:error.message})
    }
}

// List product function

const listProducts = async (req, res) => {
    try {

        const products = await productModel.find({})
        res.status(200).send({success:true,products})
        
    } catch (error) {
        res.status(404).send({error:error.message})
    }
}

// Remove product function

const removeProduct = async (req, res) => {
    try {

        const {id} = req.body
        const removeItem = await productModel.findByIdAndDelete(id)
        res.status(200).send({success:true,message:"Product Removed",removeItem})
        
    } catch (error) {
        res.status(404).send({error:error.message})
    }
}

// Single product information function

const singleProduct = async (req, res) => {
    try {

        const {productId} = req.body
        const product = await productModel.findById(productId)
        console.log(product)
        res.status(200).send({product})
        
    } catch (error) {
        res.status(404).send({error:error.message})
    }

}


module.exports = {listProducts,addProduct,removeProduct,singleProduct}

