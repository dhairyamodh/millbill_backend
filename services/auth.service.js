const httpStatus = require('http-status');
const { User } = require('../models')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const setrestaurantdb = require('../config/setrestaurantdb');
const { Restaurant } = require('../models/superAdmin');
const dbswitch = async (user) => {
    console.log(user);

    switch (user.role) {
        case 'restaurantadmin':
            await setrestaurantdb(user.database)
            break;

        default:
            break;
    }
}

const login = async (data) => {
    console.log(data);
    const user = await User.findOne({ mobile: data.mobile });

    if (!user) {
        return ({ status: httpStatus.INTERNAL_SERVER_ERROR, message: "User does not exist" });
    }
    const validPassword = await bcrypt.compare(data.password, user.password);
    if (!validPassword)
        return ({ status: httpStatus.NOT_FOUND, message: "Invalid password" });
    const restaurant = await Restaurant.findById(user.restaurantId)
    const token = jwt.sign({ _id: user._id, restaurant: user.database }, process.env.JWT_SECRET);
    await dbswitch(user)

    return ({ status: httpStatus.OK, user: user, token: token, message: "Login Successs" });
}

const details = async (data) => {
    const user = await User.findOne({ _id: data });

    if (!user) {
        return ({ status: httpStatus.NOT_FOUND, message: "user does not exist" });
    }

    return ({ status: httpStatus.OK, user: user, message: "User details found successfully" });
}

module.exports = {
    login, details
}
