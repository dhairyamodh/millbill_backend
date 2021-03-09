const httpStatus = require('http-status');

const all = async (db, resId, branchId) => {
    try {
        const data = { ...(branchId != undefined && { branchId: ObjectId(branchId) }) }
        const table = await db.Table.aggregate([
            {
                $match: data
            },
            {
                $addFields: {
                    itemName: '$hotkeyItem.itemName'
                }
            }
        ])
        return ({ status: httpStatus.OK, data: table })
    } catch (error) {
        return ({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error })
    }
}

const create = async (db, data) => {
    try {
        await db.Table.create({ ...data, tableNumber: parseInt(data.tableNumber), extraPrice: parseInt(data.extraPrice) })
        return ({ status: httpStatus.OK, message: 'Hotkey Added Successfully' })
    } catch (error) {
        return ({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error })
    }
}

const update = async (db, data) => {
    try {
        await db.Table.findByIdAndUpdate(data._id, { ...data, tableNumber: parseInt(data.tableNumber), extraPrice: parseInt(data.extraPrice) })
        return ({ status: httpStatus.OK, message: 'Hotkey Updated Successfully' })
    } catch (error) {
        return ({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error })
    }
}

const remove = async (db, data) => {
    try {
        await db.Table.findByIdAndDelete(data._id);
        return ({ status: httpStatus.OK, message: 'Hotkey Deleted Successfully' })
    } catch (error) {
        return ({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error })
    }
}

module.exports = {
    create, all, update, remove
}