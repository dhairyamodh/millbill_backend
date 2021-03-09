const httpStatus = require('http-status');

const all = async (db, resId, branchId) => {
    try {
        const data = { ...(branchId != "all" && { branchId: ObjectId(branchId) }) }
        const hotkey = await db.HotKey.aggregate([
            {
                $match: data
            },
            {
                $addFields: {
                    itemName: '$hotkeyItem.itemName'
                }
            }
        ])
        return ({ status: httpStatus.OK, data: hotkey })
    } catch (error) {
        return ({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error })
    }
}

const create = async (db, data, files) => {
    try {
        const item = await db.Item.findById(data.hotkeyItemId);
        await db.HotKey.create({ ...data, hotkeyItem: item })
        return ({ status: httpStatus.OK, message: 'Hotkey Added Successfully' })
    } catch (error) {
        return ({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error })
    }
}

const update = async (db, data, files) => {
    try {
        const item = await db.Item.findById(data.hotkeyItemId);
        await db.HotKey.findByIdAndUpdate(data.id, { ...data, hotkeyItem: item })
        return ({ status: httpStatus.OK, message: 'Hotkey Updated Successfully' })
    } catch (error) {
        return ({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error })
    }
}

const remove = async (db, data) => {
    try {
        await db.HotKey.findByIdAndDelete(data._id);
        return ({ status: httpStatus.OK, message: 'Hotkey Deleted Successfully' })
    } catch (error) {
        return ({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error })
    }
}

module.exports = {
    create, all, update, remove
}