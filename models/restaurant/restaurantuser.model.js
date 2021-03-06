const mongoose = require('mongoose');
const { toJSON, paginate } = require('../plugins');

const restaurantUserSchema = mongoose.Schema(
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
        userName: {
            type: String,
            required: true,
        },
        userMobile: {
            type: String,
            require: true,
        },
        userRole: {
            type: String,
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
restaurantUserSchema.plugin(toJSON);
restaurantUserSchema.plugin(paginate);

const RestaurantUser = mongoose.model('RestaurantUser', restaurantUserSchema);

module.exports = { RestaurantUser, restaurantUserSchema };
