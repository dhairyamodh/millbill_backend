const httpStatus = require('http-status');
const { User } = require('../models')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (data) => {
    const user = await User.findOne({ email: data.email });

    if (!user) {
        return ({ status: httpStatus.INTERNAL_SERVER_ERROR, message: "User does not exist" });
    }
    const validPassword = await bcrypt.compare(data.password, user.password);
    if (!validPassword)
        return ({ status: httpStatus.NOT_FOUND, message: "Invalid password" });
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

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