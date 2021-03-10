const { Restaurant } = require('../models/superAdmin')
const getUserBranchCode = async (user) => {
    if (user.branchId) {
        const branch = await global.restaurants[user.restaurantId].Branch.findById(user.branchId);
        const order = await global.restaurants[user.restaurantId].Order.find({ branchId: user.branchId }).sort({ _id: -1 }).limit(1)
        user._doc.branchCode = branch.branchCode
        const restaurant = await Restaurant.findById(user.restaurantId)
        user._doc.cgst = restaurant.cgst
        user._doc.sgst = restaurant.sgst
        if (order.length > 0) {
            user._doc.orderNumber = order[0].orderNumber
            user._doc.lastOrderTotal = order[0].grandTotal
        }
    }
    return user;
}

module.exports = getUserBranchCode