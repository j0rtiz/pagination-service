const handle = require('express-async-handler');
const compression = require('compression');
const express = require('express');

const defaultRouter = express.Router();
const apiRouter = express.Router();

/**
 * @param {Object} ctx - Dependency Injection
 * @param {import('src/interfaces/http/controllers/pagination/paginationController')} ctx.paginationController
 * @param {import('src/interfaces/http/middlewares/requestLoggerMiddleware')} ctx.requestLoggerMiddleware
 * @param {import('src/interfaces/http/middlewares/healthCheckMiddleware')} ctx.healthCheckMiddleware
 * @param {import('src/interfaces/http/middlewares/httpErrorMiddleware')} ctx.httpErrorMiddleware
 * @param {import('src/interfaces/http/middlewares/notFoundMiddleware')} ctx.notFoundMiddleware
 * @param {import('src/interfaces/http/middlewares/swaggerMiddleware')} ctx.swaggerMiddleware
 */
module.exports = ({
    requestLoggerMiddleware,
    healthCheckMiddleware,
    paginationController,
    httpErrorMiddleware,
    notFoundMiddleware,
    swaggerMiddleware
}) => {
    apiRouter.use('/paginations', handle(paginationController.router));
    apiRouter.use('/healthcheck', handle(healthCheckMiddleware));
    apiRouter.use('/docs', swaggerMiddleware);

    defaultRouter
        .use(express.json())
        .use(express.urlencoded({ extended: true }))
        .use(compression());
    defaultRouter.use('/api', apiRouter);
    defaultRouter.use('/*', notFoundMiddleware);
    defaultRouter.use(requestLoggerMiddleware);
    defaultRouter.use(httpErrorMiddleware);

    return defaultRouter;
};
