const multer = require('multer')

const storage = multer.diskStorage({
    filename: function(req, file, callback){
        callback(null,file.originalname)                   //extract song,image,mp3 and provoide its path
    }
})


const upload = multer({storage})

module.exports = upload















                                                    