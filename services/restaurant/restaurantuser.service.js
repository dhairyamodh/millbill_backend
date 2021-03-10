const httpStatus = require('http-status');
const bcrypt = require("bcryptjs");
const User = require('../../models/user.model');
const { Restaurant } = require('../../models/superAdmin');
const all = async (db, resId, branchId) => {
    try {
        const data = { ...(resId != 'all' && { restaurantId: ObjectId(resId) }), ...(branchId != 'all' && { branchId: ObjectId(branchId) }) }
        let users = [];
        if (resId == 'all') {
            await Promise.all(Object.values(global.restaurants).map(async (key, index) => {
                const allusers = await key.RestaurantUser.aggregate([
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
                users.push(...allusers)
            }))
        } else {

            users = await global.restaurants[resId].RestaurantUser.aggregate([{
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
        }
        const userdata = await Promise.all(users.map(async (item) => {

            if (item.restaurantId) {
                let restaurant = await Restaurant.findById(item.restaurantId);
                let branch = await global.restaurants[item.restaurantId].Branch.findById(item.branchId)
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
        await User.create({ name: data.userName, mobile: data.userMobile, password: hashPassword, role: data.role, restaurantId: data.restaurantId, branchId: data.branchId ? data.branchId : undefined })

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

const removeAll = async (data) => {
    try {
        await User.deleteMany(data)
        await global.restaurants[data.restaurantId].RestaurantUser.deleteMany(data)
        return ({ status: httpStatus.OK, message: 'User Deleted Successfully' })
    } catch (error) {
        return ({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error })
    }
}

module.exports = {
    all, create, update, remove, removeAll
}