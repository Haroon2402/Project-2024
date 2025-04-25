const jwt = require('jsonwebtoken')


const authUser = async (req,res, next) => {

    const {token} = req.headers

    if(!token){
      return  res.status(404).send({success:false,message: 'Not authorized login again'})
    }
    
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        req.body.userId = token_decode.id
        next()
    } catch (error) {
        console.log(error)
        res.status(404).send({message:error.message,success:false})
    }
    
}


module.exports = authUser