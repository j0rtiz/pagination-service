const handle = require('express-async-handler');
const compression = require('compression');
const express = require('express');

const defaultRouter = express.Router();
const apiRouter = express.Router();

/**
 * @param {Object} ctx - Dependency Injection
 * @param {import('src/interfaces/http/middlewares/requestLoggerMiddleware')} ctx.requestLoggerMiddleware
 * @param {import('src/interfaces/http/middlewares/healthCheckMiddleware')} ctx.healthCheckMiddleware
 * @param {import('src/interfaces/http/middlewares/httpErrorMiddleware')} ctx.httpErrorMiddleware
 * @param {import('src/interfaces/http/middlewares/notFoundMiddleware')} ctx.notFoundMiddleware
 * @param {import('src/interfaces/http/middlewares/swaggerMiddleware')} ctx.swaggerMiddleware
 * @param {import('src/interfaces/http/controllers/exampleController')} ctx.exampleController
 */
module.exports = ({
    requestLoggerMiddleware,
    healthCheckMiddleware,
    httpErrorMiddleware,
    notFoundMiddleware,
    swaggerMiddleware,
    exampleController
}) => {
    apiRouter.use('/example', handle(exampleController.router));
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
