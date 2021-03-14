const httpStatus = require('http-status');
const { Restaurant } = require('../../models/superAdmin');
const { resValidation } = require('../../validations/superAdmin')

const all = async () => {
    try {
        const restaurant = await Restaurant.find();
        const newAllRes = await Promise.all(restaurant.map(async (value, index) => {
            let branchCount = [], userCount = [];
            if (global.restaurants[value.id] != {}) {
                branchCount = await global.restaurants[value.id].Branch.find();
                userCount = await global.restaurants[value.id].RestaurantUser.find();
            }
            return { ...value._doc, branchCount: branchCount.length, userCount: userCount.length }
        }))
        return ({ status: httpStatus.OK, data: newAllRes })
    } catch (error) {
        console.log(error);
        return ({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error })
    }
};

const create = async (data, files) => {
    try {
        const { error } = resValidation.create(data)
        if (error) {
            console.log(error);
            return ({ status: httpStatus.NOT_FOUND, message: error.details[0].message })
        }
        if (files) {
            files.map(file => {
                data.logo = file.destination + '/' + file.filename
            })
        } else {
            data.logo = "uploaded/logo/res_logo.png";
        }
        const restaurant = await Restaurant.create(data)
        return ({ status: httpStatus.OK, message: 'Restaurant Added Successfully' })
    } catch (error) {
        console.log(error);
        return ({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error })
    }
}

const update = async (data, files) => {
    try {
        const { error } = resValidation.create(data)
        if (error) {
            console.log(error);
            return ({ status: httpStatus.NOT_FOUND, message: error.details[0].message })
        }
        if (files) {
            files.map(file => {
                data.logo = file.destination + '/' + file.filename
            })
        }

        const restaurant = await Restaurant.findByIdAndUpdate(data._id || data.id, data);
        return ({ status: httpStatus.OK, message: 'Restaurant Updated Successfully' })
    } catch (error) {
        console.log(error);
        return ({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error })
    }
}

const remove = async (data) => {
    try {
        await Restaurant.findByIdAndDelete(data);
        return ({ status: httpStatus.OK, message: 'Restaurant Deleted Successfully' })
    } catch (error) {
        return ({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error })
    }
}

module.exports = {
    all, create, update, remove
}