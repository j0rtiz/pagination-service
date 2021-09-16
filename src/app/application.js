/**
 * @param {Object} ctx - Dependency Injection
 * @param {import('src/interfaces/http/Server')} ctx.server
 * @param {import('src/infra/logging/logger')} ctx.logger
 * @param {import('config')} ctx.config
 */
class Application {
    constructor({ server, logger, config }) {
        this.server = server;
        this.logger = logger;
        this.config = config;
    }

    async start() {
        this.server.start();
    }
}

module.exports = Application;
