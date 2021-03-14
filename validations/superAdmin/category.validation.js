const Joi = require('joi');
const { password, objectId } = require('../custom.validation');

const create = (data) => {
    const schema = Joi.object({
        restaurantId: Joi.required().custom(objectId),
        branchId: Joi.custom(objectId),
        categoryName: Joi.string().required(),
        status: Joi.string().required(),
    }).unknown();
    return schema.validate(data);
}

const update = (data) => {
    const schema = Joi.object({
        restaurantId: Joi.required().custom(objectId),
        branchId: Joi.custom(objectId),
        categoryName: Joi.string().required(),
        status: Joi.string().required(),
    }).unknown();
    return schema.validate(data);
}

module.exports = {
    create, update
};
