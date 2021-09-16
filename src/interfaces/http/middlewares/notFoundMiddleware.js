const Status = require('http-status');

/**
 * @param {Object} ctx - Dependency Injection
 * @param {import('src/infra/error/exception')} ctx.exception
 */
module.exports = ({ exception }) => {
    return (req, res, next) => next(exception.notFound('Resource not found on this server', Status.NOT_FOUND));
};
