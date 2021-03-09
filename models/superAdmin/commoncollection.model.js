const mongoose = require('mongoose');
const { toJSON, paginate } = require('../plugins');

const commonCollectionSchema = mongoose.Schema(
    {
        tableTypes: [
            {
                typeName: {
                    type: String,
                    require: true
                },
            }
        ]
    },
    {
        timestamps: true,
    }
);

// add plugin that converts mongoose to json
commonCollectionSchema.plugin(toJSON);
commonCollectionSchema.plugin(paginate);

const CommonCollection = mongoose.model('CommonCollection', commonCollectionSchema);

module.exports = CommonCollection;
