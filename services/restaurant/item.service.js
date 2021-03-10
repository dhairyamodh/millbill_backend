const httpStatus = require('http-status');

const all = async (db, resId, branchId) => {
    try {
        const data = { ...(branchId != 'all' && { branchId: ObjectId(branchId) }) }
        const item = await db.Item.find(data)
        const itemdata = await Promise.all(await item.map(async (singleitem) => {

            if (singleitem.categoryId) {
                let category = await db.ItemCategory.findById(singleitem.categoryId)
                singleitem.categoryName = category ? category.categoryName : '-'
                return { ...singleitem._doc, categoryName: category ? category.categoryName : '-', id: singleitem._doc._id }
            }
            return singleitem
        }))
        return ({ status: httpStatus.OK, data: itemdata })
    } catch (error) {
        return ({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error })
    }
}

const create = async (db, data, files) => {
    try {
        if (files) {
            files.map(file => {
                data.itemImage = file.destination + '/' + file.filename
            })
        } else {
            data.itemImage = "uploaded/restaurants/item/res_logo.png";
        }
        await db.Item.create({ ...data, itemPrice: parseInt(data.itemPrice) })
        return ({ status: httpStatus.OK, message: 'Item Added Successfully' })
    } catch (error) {
        console.log(error);
        return ({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error })
    }
}

const update = async (db, data, files) => {
    try {
        if (files) {
            files.map(file => {
                data.itemImage = file.destination + '/' + file.filename
            })
        }
        await db.Item.findByIdAndUpdate(data.id, { ...data, itemPrice: parseInt(data.itemPrice) })
        return ({ status: httpStatus.OK, message: 'Item Updated Successfully' })
    } catch (error) {
        return ({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error })
    }
}

const remove = async (db, data) => {
    try {
        await db.Item.findByIdAndDelete(data._id || data.id);
        await db.HotKey.deleteMany({ hotkeyItemId: data._id || data.id });
        return ({ status: httpStatus.OK, message: 'Item Deleted Successfully' })
    } catch (error) {
        return ({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error })
    }
}

module.exports = {
    create, all, update, remove
}