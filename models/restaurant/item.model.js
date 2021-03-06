const mongoose = require('mongoose');
const { toJSON, paginate } = require('../plugins');

const itemSchema = mongoose.Schema(
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
        categoryId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'itemcategory',
            required: false,
        },
        itemName: {
            type: String,
            required: true,
        },
        itemImage: {
            type: String,
            required: true,
        },
        itemPrice: {
            type: Number,
            require: true,
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
itemSchema.plugin(toJSON);
itemSchema.plugin(paginate);

const Item = mongoose.model('Item', itemSchema);

module.exports = { itemSchema, Item }
