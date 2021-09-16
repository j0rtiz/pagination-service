/**
 * @param {Object} ctx - Dependency Injection
 * @param {import('src/infra/logging/logger')} ctx.logger
 */
module.exports = ({ logger }) => {
    return (req, res, next) => {
        const receivedRequest = { receivedRequest: { url: req.url, body: req.body } };

        logger.info(JSON.stringify(receivedRequest, null, 2));

        next();
    };
};
