const { Router } = require('express');
const Status = require('http-status');

/**
 * @param {Object} ctx - Dependency Injection
 * @param {import('src/interfaces/http/middlewares/validatorMiddleware')} ctx.validatorMiddleware
 * @param {import('src/interfaces/http/schemas/example/exampleSchema')} ctx.exampleSchema
 * @param {import('src/app/strategies/example/exampleStrategy')} ctx.exampleStrategy
 * @param {import('src/domain/enum/example/exampleEnum')} ctx.exampleEnum
 */
module.exports = ({ validatorMiddleware, exampleSchema, exampleStrategy, exampleEnum }) => ({
    example: async (req, res, next) => {
        try {
            const data = { ...req.params, ...req.body };
            const response = await exampleStrategy[exampleEnum.EXAMPLE](data);

            return res.status(Status.OK).json(response);
        } catch (err) {
            next(err);
        }
    },
    get router() {
        return Router().post('/:id', validatorMiddleware(exampleSchema), this.example);
    }
});
