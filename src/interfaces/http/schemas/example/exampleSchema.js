const Joi = require('joi');

module.exports = () =>
    Joi.object({
        params: Joi.object({
            id: Joi.string().required()
        }).required(),
        body: Joi.object({
            example: Joi.string().required()
        }).required()
    }).required();
