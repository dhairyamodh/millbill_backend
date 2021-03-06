const { branchSchema } = require('./branch.model');
const { restaurantUserSchema } = require('./restaurantuser.model')
const { itemCategorySchema } = require('./itemcategory.model')
const { itemSchema } = require('./item.model')
const { hotkeySchema } = require('./hotkey.model')

module.exports = {
    Branch: branchSchema,
    RestaurantUser: restaurantUserSchema,
    ItemCategory: itemCategorySchema,
    Item: itemSchema,
    HotKey: hotkeySchema,
}