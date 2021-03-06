const mongoose = require('mongoose');
const { toJSON, paginate } = require('../plugins');

const itemCategorySchema = mongoose.Schema(
    {
        restaurantId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'restaurants',
            required: true,
        },
        branchId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'branches',
            required: false,
        },
        categoryName: {
            type: String,
            required: true,
        },
        categoryImage: {
            type: String,
            required: true,
        },
        status: {
            type: Boolean,
            default: true,
        }
    },
    {
        timestamps: true,
    }
);

// add plugin that converts mongoose to json
itemCategorySchema.plugin(toJSON);
itemCategorySchema.plugin(paginate);

const ItemCategory = mongoose.model('ItemCategory', itemCategorySchema);

module.exports = { itemCategorySchema, ItemCategory }
