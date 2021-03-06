const mongoose = require('mongoose');
const { toJSON, paginate } = require('../plugins');

const restaurantSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        address: {
            type: String,
            required: true,
        },
        contactPerson: {
            type: String,
            require: true,
        },
        contactNumber: {
            type: Number,
            require: false
        },
        logo: {
            type: String,
            require: false,
        },
        tagLine: {
            type: String,
            require: false
        },
        themeId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'themes',
            required: true,
        },
        subscriptionId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'subscriptions',
            required: true,
        },
        balance: {
            type: Number,
            require: true,
        },
        cgst: {
            type: Number,
            require: true,
        },
        sgst: {
            type: Number,
            require: true,
        },
        role: {
            type: String,
            default: 'resturant',
        },
        database: {
            type: String,
            unique: true,
            require: true,
        },
        status: {
            type: String,
            default: 'true',
        },
    },
    {
        timestamps: true,
    }
);

// add plugin that converts mongoose to json
restaurantSchema.plugin(toJSON);
restaurantSchema.plugin(paginate);

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
