const httpStatus = require('http-status');
const { Restaurant } = require('../../models/superAdmin');

const all = async (resId, branchId) => {
    try {
        const data = { ...(branchId != 'all' && { branchId: ObjectId(branchId) }) }
        const category = await global.restaurants[resId].Order.find(data)
        return ({ status: httpStatus.OK, data: category })
    } catch (error) {
        return ({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error })
    }
}

const create = async (data) => {
    try {

        const lastOrder = await global.restaurants[data.restaurantId].Order.find({ branchId: data.branchId }).sort({ _id: -1 }).limit(1)
        if (lastOrder.length > 0 && data.orderNumber == lastOrder[0].orderNumber) {

            data.orderNumber = lastOrder[0].orderNumber++;
            data.branchOrderNumber = data.branchCode + (data.orderNumber++)
        } else {
            data.branchOrderNumber = data.branchCode + data.orderNumber
        }
        const order = await global.restaurants[data.restaurantId].Order.create(data)
        if (order) {
            await Restaurant.findByIdAndUpdate(data.restaurantId, { $inc: { balance: order.grandTotal } })
        }
        return ({ status: httpStatus.OK, message: 'Order Added Successfully', data: { tableNumber: order.tableNumber, orderNumber: order.orderNumber } })
    } catch (error) {
        console.log(error);
        return ({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error })
    }
}

const update = async (data) => {
    try {
        await global.restaurants[data.restaurantId].Order.findByIdAndUpdate(data.id, data)
        return ({ status: httpStatus.OK, message: 'Order Updated Successfully' })
    } catch (error) {
        return ({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error })
    }
}

const remove = async (data) => {
    try {
        await global.restaurants[data.restaurantId].Order.findByIdAndDelete(data.id);
        return ({ status: httpStatus.OK, message: 'Order Deleted Successfully' })
    } catch (error) {
        return ({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error })
    }
}

module.exports = {
    create, all, update, remove
}