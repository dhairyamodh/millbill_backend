const Joi = require('joi');
const { password, objectId } = require('../custom.validation');

const create = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        address: Joi.string().required(),
        contactPerson: Joi.string().required(),
        contactNumber: Joi.number().integer(),
        tagLine: Joi.string(),
        themColor: Joi.string().required(),
        logo: Joi.string(),
        openingBalace: Joi.number().integer().required(),
        cgst: Joi.number().integer().required(),
        sgst: Joi.number().integer().required(),
    }),
};

const get = {
    query: Joi.object().keys({
        name: Joi.string(),
    }),
};

// const getOne = {
//   params: Joi.object().keys({
//     userId: Joi.string().custom(objectId),
//   }),
// };

// const update = {
//   params: Joi.object().keys({
//     userId: Joi.required().custom(objectId),
//   }),
//   body: Joi.object()
//     .keys({
//       email: Joi.string().email(),
//       password: Joi.string().custom(password),
//       name: Joi.string(),
//     })
//     .min(1),
// };

// const deleteRes = {
//   params: Joi.object().keys({
//     userId: Joi.string().custom(objectId),
//   }),
// };

module.exports = {
    create,
    get,
};
