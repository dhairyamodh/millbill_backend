const mongoose = require('mongoose');
const { toJSON, paginate } = require('../plugins');

const branchUserSchema = mongoose.Schema(
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
branchUserSchema.plugin(toJSON);
branchUserSchema.plugin(paginate);

const BranchUser = mongoose.model('BranchUser', branchUserSchema);

module.exports = BranchUser;
