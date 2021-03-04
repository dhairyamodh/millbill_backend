const mongoose = require('mongoose');
const { toJSON, paginate } = require('../plugins');

const branchSchema = mongoose.Schema(
    {

        name: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

// add plugin that converts mongoose to json
branchSchema.plugin(toJSON);
branchSchema.plugin(paginate);

const Branch = mongoose.model('Branch', branchSchema);

module.exports = { branchSchema, Branch }
