const { scopePerRequest } = require('awilix-express');
const express = require('express');
const morgan = require('morgan');

/**
 * @param {Object} ctx - Dependency Injection
 * @param {import('src/interfaces/http/router')} ctx.router
 * @param {import('src/infra/logging/logger')} ctx.logger
 * @param {import('src/container')} ctx.container
 * @param {import('config')} ctx.config
 */
class Server {
    constructor({ router, logger, container, config }) {
        this.logger = logger;
        this.config = config;
        this.express = express();
        this.express.use(scopePerRequest(container));
        this.express.use(router);
    }

    initLogger() {
        this.express.use(morgan('combined', { stream: this.logger.stream }));
    }

    initServer() {
        const { APP_PORT, NODE_ENV } = process.env;

        return this.express.listen(APP_PORT, () => {
            this.logger.info(`Server started on port: ${APP_PORT} - Environment: ${NODE_ENV}`);
        });
    }

    start() {
        this.initLogger();
        this.initServer();
    }
}

module.exports = Server;
