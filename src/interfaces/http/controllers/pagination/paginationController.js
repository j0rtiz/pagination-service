const { Router } = require('express');
const Status = require('http-status');

/**
 * @param {Object} ctx - Dependency Injection
 * @param {import('src/interfaces/http/schemas/pagination/paginationSchema')} ctx.paginationSchema
 * @param {import('src/interfaces/http/middlewares/validatorMiddleware')} ctx.validatorMiddleware
 * @param {import('src/app/operations/pagination/paginationOperation')} ctx.paginationOperation
 */
module.exports = ({ paginationSchema, validatorMiddleware, paginationOperation }) => ({
    pagination: async (req, res, next) => {
        try {
            const data = { ...req.query };
            const response = await paginationOperation.execute(data);

            return res.status(Status.OK).json(response);
        } catch (err) {
            next(err);
        }
    },
    get router() {
        return Router().get('/', validatorMiddleware(paginationSchema), this.pagination);
    }
});
