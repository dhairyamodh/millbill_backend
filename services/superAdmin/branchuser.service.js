const httpStatus = require('http-status');
const { BranchUser } = require('../../models/superAdmin');
const bcrypt = require("bcryptjs");
const User = require('../../models/user.model');
const all = async (resId, branchId) => {
    try {
        const data = { ...(resId != 'all' && { restaurantId: resId }), ...(branchId != 'all' && { branchId: branchId }) }
        const users = await BranchUser.find(data);
        return ({ status: httpStatus.OK, data: users })
    } catch (error) {
        return ({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error })
    }
}

const create = async (data) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(data.password, salt);
        await User.create({ name: data.userName, mobile: data.userMobile, password: hashPassword, role: data.role })
        await BranchUser.create(data)
        return ({ status: httpStatus.OK, message: 'User Added Successfully' })
    } catch (error) {
        return ({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error })
    }
}

module.exports = {
    all, create
}