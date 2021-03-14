const Joi = require('joi');
const { password, objectId } = require('../custom.validation');

const create = {
    body: Joi.object().keys({
        restaurantId: Joi.string().required(),
        branchName: Joi.string().required(),
        branchCode: Joi.string().required(),
        contactPerson: Joi.string().required(),
        contactNumber: Joi.string().required(),
        status: Joi.string().required()
    }).unknown(),
};

const update = {
    body: Joi.object().keys({
        restaurantId: Joi.string().required(),
        branchName: Joi.string().required(),
        contactPerson: Joi.string().required(),
        contactNumber: Joi.string().required(),
        status: Joi.string().required()
    }).unknown(),
};

module.exports = {
    create, update
};
