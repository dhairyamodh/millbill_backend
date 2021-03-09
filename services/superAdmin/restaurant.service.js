const httpStatus = require('http-status');
const { Restaurant } = require('../../models/superAdmin');

const all = async () => {
    try {
        const restaurant = await Restaurant.find();
        const newAllRes = await Promise.all(restaurant.map(async (value, index) => {
            const id = value.id;
            const branchCount = await global.restaurants[id].Branch.find();
            const userCount = await global.restaurants[id].RestaurantUser.find();
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
        if (files) {
            files.map(file => {
                data.logo = file.destination + '/' + file.filename
            })
        } else {
            data.logo = "uploaded/logo/res_logo.png";
        }
        await Restaurant.create(data)
        return ({ status: httpStatus.OK, message: 'Restaurant Added Successfully' })
    } catch (error) {
        return ({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error })
    }
}

const update = async (data, files) => {
    try {
        if (files) {
            files.map(file => {
                data.logo = file.destination + '/' + file.filename
            })
        }
        await Restaurant.findByIdAndUpdate(data._id, data);
        return ({ status: httpStatus.OK, message: 'Restaurant Updated Successfully' })
    } catch (error) {
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