const httpStatus = require('http-status');
const { Theme } = require('../../models/superAdmin');
const all = async () => {
    try {
        const themes = await Theme.find();
        return ({ status: httpStatus.OK, data: themes })
    } catch (error) {
        return ({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error })
    }
}

const create = async (data) => {
    try {
        await Theme.create(data)
        return ({ status: httpStatus.OK, message: 'Theme Added Successfully' })
    } catch (error) {
        return ({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error })
    }
}

module.exports = {
    all, create
}