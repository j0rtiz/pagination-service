const Status = require('http-status');

/**
 * @param {Object} ctx - Dependency Injection
 * @param {import('src/infra/logging/logger')} ctx.logger
 * @param {import('config')} ctx.config
 */
module.exports = ({ logger, config }) => {
    return (err, req, res, next) => {
        logger.error(JSON.stringify(err, null, 2));

        const hasTrace = config.application.stackVisibleError === 'true';
        const options = hasTrace ? { stack: err.stack } : '';
        const statusCode = err.statusCode || Status.INTERNAL_SERVER_ERROR;
        const errorCustom = { message: err.message, statusCode, details: err.details || [] };

        return res.status(statusCode).json(Object.assign(errorCustom, options));
    };
};
