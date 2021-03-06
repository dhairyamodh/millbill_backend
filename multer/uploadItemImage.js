const multer = require('multer');
const path = require('path');
var fs = require('fs');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // if (!fs.existsSync(`uploaded/restaurants/${req.params.resId}/category`)) {
        //     fs.mkdirSync(`uploaded/restaurants/${req.params.resId}/category`);
        // }
        cb(null, `uploaded/restaurants/item`);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
    },
});

var upload = multer({ storage: storage, preservePath: true });

module.exports = upload;