/**
 * @param {Object} ctx - Dependency Injection
 * @param {import('src/infra/integration/rest/httpClient')} ctx.httpClient
 * @param {import('src/infra/logging/logger')} ctx.logger
 * @param {import('config')} ctx.config
 */
module.exports = ({ httpClient, logger, config }) => {
    const clientConfig = config.integration.rest.example;
    const HttpClient = httpClient({ baseURL: clientConfig.baseURL, timeout: clientConfig.timeout });

    return {
        sendPayload: async (payload) => {
            try {
                const httpConfig = {
                    method: 'post',
                    url: '/example',
                    data: payload
                };
                const { data } = await HttpClient(httpConfig);

                logger.info(`${clientConfig.externalCallMsg}, to send payload`);

                return { data };
            } catch (error) {
                logger.error('Http request error when calling Example Client to send payload');
                logger.debugHttpClientError(error);

                return { error };
            }
        }
    };
};
