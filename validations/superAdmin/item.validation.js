const Joi = require('joi');
const { password, objectId } = require('../custom.validation');

const create = (data) => {
    const schema = Joi.object({
        restaurantId: Joi.required().custom(objectId),
        branchId: Joi.custom(objectId),
        categoryId: Joi.custom(objectId),
        itemName: Joi.string().required(),
        itemPrice: Joi.number().integer(),
        status: Joi.string().required(),
    }).unknown();
    return schema.validate(data);
}

const update = (data) => {
    const schema = Joi.object({
        restaurantId: Joi.required().custom(objectId),
        categoryId: Joi.custom(objectId),
        itemName: Joi.string().required(),
        itemPrice: Joi.number().integer(),
        status: Joi.string().required(),
    }).unknown();
    return schema.validate(data);
}

module.exports = {
    create, update
};
