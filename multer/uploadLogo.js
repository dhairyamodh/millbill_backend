const multer = require('multer');
const path = require('path');
const fs = require('fs');

var storage = multer.diskStorage({
    destination: function async(req, file, cb) {
        const restaurantName = req.body.name.split(" ").join("");
        const dir = `./uploaded/${restaurantName}/logo`
        const pathExist = fs.existsSync(dir);
        if (!pathExist) {
            return fs.mkdirSync(dir, { recursive: true })
        }
        return cb(null, dir)
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
    },
});

var upload = multer({ storage: storage, preservePath: true });

module.exports = upload;