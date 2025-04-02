const jwt = require('jsonwebtoken')

const adminAuth = async (req,res,next ) => {
    try {
        const {token} = req.headers
        if (!token) {
            return res.status(404).send({message:"Unauthourized Login again"})
        }

        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)
        if (tokenDecode != process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.status(404).send({message:"Unauthourized Login again"})
        }

        next()

    } catch (error) {
        console.log(error)
        res.status(404).send({error:error.message})
    }


}


module.exports = adminAuth