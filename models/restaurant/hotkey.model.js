const mongoose = require('mongoose');
const { toJSON, paginate } = require('../plugins');

const hotkeySchema = mongoose.Schema(
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
        hotkeyItemId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'items',
            required: false,
        },
        hotkey: {
            type: String,
            require: true,
        },
        hotkeyItem: {
            type: Object,
            require: true
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
hotkeySchema.plugin(toJSON);
hotkeySchema.plugin(paginate);

const HotKey = mongoose.model('HotKey', hotkeySchema);

module.exports = { hotkeySchema, HotKey }
