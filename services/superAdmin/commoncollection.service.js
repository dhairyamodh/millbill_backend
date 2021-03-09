const httpStatus = require('http-status');
const { CommonCollection } = require('../../models/superAdmin');

const all = async (data) => {
    try {
        const result = await CommonCollection.find()
        return ({ status: httpStatus.OK, data: result[data] })
    } catch (error) {
        return ({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error })
    }
};

const create = async (data) => {
    try {
        const result = CommonCollection.find();
        if (result.length > 0) {
            await CommonCollection.findByIdAndUpdate(result[0]._id, data)
        } else {
            await CommonCollection.create(data)
        }
        return ({ status: httpStatus.OK, message: 'CommonCollection Added Successfully' })
    } catch (error) {
        return ({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error })
    }
}

const update = async (data) => {
    try {
        await CommonCollection.findByIdAndUpdate(data._id, data);
        return ({ status: httpStatus.OK, message: 'CommonCollection Updated Successfully' })
    } catch (error) {
        return ({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error })
    }
}

const remove = async (data) => {
    try {
        await CommonCollection.findByIdAndDelete(data);
        return ({ status: httpStatus.OK, message: 'CommonCollection Deleted Successfully' })
    } catch (error) {
        return ({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error })
    }
}

module.exports = {
    all, create, update, remove
}