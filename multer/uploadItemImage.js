const multer = require('multer');
const path = require('path');
const fs = require('fs');


var storage = multer.diskStorage({
    destination: async function (req, file, cb) {
        const dir = `./uploaded/itemImage`
        const pathExist = fs.existsSync(dir);
        if (!pathExist) {
            return fs.mkdirSync(dir, { recursive: true })
        }
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
    },
});

var upload = multer({ storage: storage, preservePath: true });

module.exports = upload;