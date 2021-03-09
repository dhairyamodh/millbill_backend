const mongoose = require('mongoose');
const { toJSON, paginate } = require('../plugins');

const tableSchema = mongoose.Schema(
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
        tableNumber: {
            type: Number,
            require: true,
        },
        tableTypeId: {
            type: String,
            require: true
        },
        tablePrice: {
            type: Number,
            require: true,
            default: 0,
        },
        status: {
            type: String,
            default: true,
        }
    },
    {
        timestamps: true,
    }
);

// add plugin that converts mongoose to json
tableSchema.plugin(toJSON);
tableSchema.plugin(paginate);

const Table = mongoose.model('Table', tableSchema);

module.exports = { tableSchema, Table }
