const httpStatus = require('http-status');
const bcrypt = require("bcryptjs");
const User = require('../../models/user.model');
const { Restaurant } = require('../../models/superAdmin');
const all = async (db, resId, branchId) => {
    try {
        const data = { ...(branchId != 'all' && { branchId: ObjectId(branchId) }) }
        const users = await global.restaurants[resId].RestaurantUser.aggregate([{
            $match: data
        },
        {
            $project: {
                branchUser: '$$ROOT',
                userName: "$userName",
                userRole: "$userRole",
                restaurantId: '$restaurantId',
                branchId: '$branchId',
                userMobile: "$userMobile",
            }
        }
        ]);
        const userdata = await Promise.all(users.map(async (item) => {

            if (resId) {
                let restaurant = await Restaurant.findById(resId);
                let branch = await global.restaurants[resId].Branch.findById(item.branchId)
                item.branchName = branch ? branch.branchName : undefined;
                item.associatedWith = branch ? `${restaurant.name} (${branch.branchName})` : restaurant.name
            }
            return { ...item }
        }))
        return ({ status: httpStatus.OK, data: userdata })
    } catch (error) {
        console.log(error);
        return ({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error })
    }
}

const create = async (restaurantId, data) => {
    try {

        await global.restaurants[data.restaurantId].RestaurantUser.create({ ...data, userRole: data.role })
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(data.password, salt);
        await User.create({ name: data.userName, mobile: data.userMobile, password: hashPassword, role: data.role, restaurantId: data.restaurantId })

        return ({ status: httpStatus.OK, message: 'User Added Successfully' })
    } catch (error) {
        return ({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error })
    }
}

const update = async (data) => {
    try {
        await global.restaurants[data.restaurantId].RestaurantUser.findByIdAndUpdate(data._id, data)
        return ({ status: httpStatus.OK, message: 'User Updated Successfully' })
    } catch (error) {
        return ({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error })
    }
}

const remove = async (data) => {
    try {
        await global.restaurants[data.restaurantId].RestaurantUser.findByIdAndDelete(data._id)
        return ({ status: httpStatus.OK, message: 'User Deleted Successfully' })
    } catch (error) {
        return ({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error })
    }
}

module.exports = {
    all, create, update, remove
}