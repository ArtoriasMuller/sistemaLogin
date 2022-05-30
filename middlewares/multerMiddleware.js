const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/avatars');
    },
    filename: function (req, file, cb){
        cb(null, Date.now() +'.jpg')
    }
})

const uploadFile = multer ({ storage });

module.exports = uploadFile;
