const httpStatus = require('http-status');

const all = async (resId, branchId) => {
    try {
        const data = { ...(branchId != 'all' && { branchId: ObjectId(branchId) }) }
        const category = await global.restaurants[resId].ItemCategory.find(data)
        return ({ status: httpStatus.OK, data: category })
    } catch (error) {
        return ({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error })
    }
}

const create = async (data, files) => {
    try {
        if (files) {
            files.map(file => {
                data.categoryImage = file.destination + '/' + file.filename
            })
        } else {
            data.categoryImage = "uploaded/restaurants/category/res_logo.png";
        }
        await global.restaurants[data.restaurantId].ItemCategory.create(data)
        return ({ status: httpStatus.OK, message: 'Category Added Successfully' })
    } catch (error) {
        return ({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error })
    }
}

const update = async (data, files) => {
    try {
        if (files) {
            files.map(file => {
                data.categoryImage = file.destination + '/' + file.filename
            })
        }
        await global.restaurants[data.restaurantId].ItemCategory.findByIdAndUpdate(data.id, data)
        return ({ status: httpStatus.OK, message: 'Category Updated Successfully' })
    } catch (error) {
        return ({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error })
    }
}

const remove = async (data) => {
    try {
        await global.restaurants[data.restaurantId].ItemCategory.findByIdAndDelete(data.id);
        return ({ status: httpStatus.OK, message: 'Category Deleted Successfully' })
    } catch (error) {
        return ({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error })
    }
}

module.exports = {
    create, all, update, remove
}