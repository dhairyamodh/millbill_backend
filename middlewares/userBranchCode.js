const { Restaurant, Theme } = require('../models/superAdmin')
const getUserBranchCode = async (user) => {
    if (user.branchId) {
        const branch = await global.restaurants[user.restaurantId].Branch.findById(user.branchId);
        const order = await global.restaurants[user.restaurantId].Order.find({ branchId: user.branchId }).sort({ _id: -1 }).limit(1)
        user._doc.branchCode = branch.branchCode
        const restaurant = await Restaurant.findById(user.restaurantId)
        const theme = await Theme.findById(restaurant.themeId);
        user._doc.cgst = restaurant.cgst
        user._doc.sgst = restaurant.sgst
        user._doc.restaurantName = restaurant.name
        user._doc.restaurantLogo = restaurant.logo
        user._doc.primaryColor = theme.primaryColor
        user._doc.secondaryColor = theme.secondaryColor
        if (order.length > 0) {
            user._doc.orderNumber = order[0].orderNumber
            user._doc.lastOrderTotal = order[0].grandTotal
        }
    } else if (user.restaurantId) {
        const restaurant = await Restaurant.findById(user.restaurantId)
        const theme = await Theme.findById(restaurant.themeId);
        user._doc.cgst = restaurant.cgst
        user._doc.sgst = restaurant.sgst
        user._doc.restaurantName = restaurant.name
        user._doc.restaurantLogo = restaurant.logo
        user._doc.primaryColor = theme.primaryColor
        user._doc.secondaryColor = theme.secondaryColor
    }
    return user;
}

module.exports = getUserBranchCode