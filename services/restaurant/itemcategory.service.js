const httpStatus = require('http-status');
const { categoryValidation } = require('../../validations/superAdmin')

const all = async (resId, branchId) => {
    try {
        const data = { ...(branchId != 'all' && { branchId: ObjectId(branchId) }) }
        const category = await global.restaurants[resId].ItemCategory.find(data)
        return ({ status: httpStatus.OK, data: category })
    } catch (error) {
        console.log(error);
        return ({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error })
    }
}

const create = async (data, files) => {
    try {
        const { error } = categoryValidation.create(data)
        if (error) {
            return ({ status: httpStatus.NOT_FOUND, message: error.details[0].message })
        }
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
        const { error } = categoryValidation.update(data)
        if (error) {
            return ({ status: httpStatus.NOT_FOUND, message: error.details[0].message })
        }
        if (files) {
            files.map(file => {
                data.categoryImage = file.destination + '/' + file.filename
            })
        }
        await global.restaurants[data.restaurantId].ItemCategory.findByIdAndUpdate(data.id, data)
        return ({ status: httpStatus.OK, message: 'Category Updated Successfully' })
    } catch (error) {
        console.log(error);
        return ({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error })
    }
}

const remove = async (data) => {
    try {
        await global.restaurants[data.restaurantId].ItemCategory.findByIdAndDelete(data.id);
        await global.restaurants[data.restaurantId].Item.updateMany({ categoryId: data.id }, { $set: { categoryId: undefined } });
        return ({ status: httpStatus.OK, message: 'Category Deleted Successfully' })
    } catch (error) {
        return ({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error })
    }
}



module.exports = {
    create, all, update, remove
}