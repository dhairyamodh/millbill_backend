const multer = require('multer');
const path = require('path');
var fs = require('fs');
const { Restaurant } = require('../models/superAdmin');

var storage = multer.diskStorage({
    destination: async function (req, file, cb) {
        // const restaurant = await Restaurant.findById(req.body.restaurantId)
        // const restaurantName = restaurant.name.split(" ").join("");
        const dir = `./uploaded/categoryImage`
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