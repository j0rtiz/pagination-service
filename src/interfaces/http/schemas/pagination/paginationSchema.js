const Joi = require('joi');

module.exports = () =>
    Joi.object({
        query: Joi.object({
            page: Joi.number().integer().positive().required(),
            pages: Joi.number().integer().positive().required()
        }).required()
    }).required();
