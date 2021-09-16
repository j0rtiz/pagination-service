const { SQS } = require('aws-sdk');

/**
 * @param {Object} ctx - Dependency Injection
 * @param {import('src/infra/logging/logger')} ctx.logger
 * @param {import('config')} ctx.config
 */
module.exports = ({ logger, config }) => {
    const { region, apiVersion } = config.integration.queues.aws;
    const sqs = new SQS({ region, apiVersion });

    return {
        getSqs: () => sqs,
        send: async (message, extraParams = {}) => {
            try {
                const payload = { MessageBody: JSON.stringify(message), ...extraParams };
                const data = await sqs.sendMessage(payload).promise();

                logger.info('Information sent to SQS');

                return { data };
            } catch (error) {
                logger.error('SQS error when calling SQS Client to send message');
                logger.debugHttpClientError(error);

                return { error };
            }
        }
    };
};
