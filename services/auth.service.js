const httpStatus = require('http-status');
const { User } = require('../models')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const getUserBranchCode = require('../middlewares/userBranchCode')
// const dbswitch = async (user) => {

//     switch (user.role) {
//         case 'restaurantadmin':
//             await setrestaurantdb(user.restaurantId)
//             break;

//         default:
//             break;
//     }
// }

const login = async (data) => {
    let user = await User.findOne({ mobile: data.mobile });

    if (!user) {
        return ({ status: httpStatus.INTERNAL_SERVER_ERROR, message: "User does not exist" });
    }
    const validPassword = await bcrypt.compare(data.password, user.password);
    if (!validPassword)
        return ({ status: httpStatus.NOT_FOUND, message: "Invalid password" });
    const token = jwt.sign({ _id: user._id, restaurant: user.restaurantId }, process.env.JWT_SECRET);

    const newuser = await getUserBranchCode(user)

    return ({ status: httpStatus.OK, user: newuser, token: token, message: "Login Successs" });
}

const details = async (data) => {
    let user = await User.findOne({ _id: data });
    if (!user) {
        return ({ status: httpStatus.NOT_FOUND, message: "user does not exist" });
    }
    const newuser = await getUserBranchCode(user)
    return ({ status: httpStatus.OK, user: newuser, message: "User details found successfully" });
}

module.exports = {
    login, details
}
