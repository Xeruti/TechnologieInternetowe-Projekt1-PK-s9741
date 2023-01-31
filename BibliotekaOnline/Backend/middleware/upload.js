const path = require('path')
const multer = require("multer")

var storage = multer.diskStorage({
    destination: function(req, file, cb ) {
        cb(null, 'frontend/src/uploads')
    },
    filename:function(req, file, cb) {
        let name = path.extname(file.originalname)
        cb(null,Date.now() + name)
    }
})

var upload = multer ({storage: storage})

module.exports = upload