const ExampleClient = require('src/infra/integration/rest/exampleClient');

describe('infra :: integration :: rest :: exampleClient', () => {
    const config = {
        integration: { rest: { example: { baseURL: 'baseURL', timeout: 1000, externalCallMsg: 'externalCallMsg' } } }
    };
    const clientConfig = config.integration.rest.example;
    const payload = ['test'];
    const data = {};

    describe('#sendPayload', () => {
        let httpClient, logger, exampleClient;
        const post = jest.fn().mockReturnValue({ data });

        beforeEach(() => {
            httpClient = jest.fn().mockReturnValue(post);
            logger = { info: jest.fn(), error: jest.fn(), debugHttpClientError: jest.fn() };
            httpConfig = { method: 'post', url: '/example', data: payload };
            exampleClient = ExampleClient({ httpClient, logger, config });
        });

        it('Should call the http client with config', async () => {
            expect(httpClient).toHaveBeenCalledWith({ baseURL: clientConfig.baseURL, timeout: clientConfig.timeout });
        });

        it('Should call the http client successfully', async () => {
            const response = await exampleClient.sendPayload(payload);

            expect(post).toHaveBeenCalledWith(httpConfig);
            expect(logger.info).toHaveBeenCalledWith(`${clientConfig.externalCallMsg}, to send payload`);
            expect(response).toEqual({ data });
            expect(logger.error).not.toHaveBeenCalled();
            expect(logger.debugHttpClientError).not.toHaveBeenCalled();
        });
    });

    describe('#sendPayload', () => {
        let httpClient, logger, exampleClient;
        const error = new Error();
        const post = jest.fn().mockImplementation(() => {
            throw error;
        });

        beforeEach(() => {
            httpClient = jest.fn().mockReturnValue(post);
            logger = { info: jest.fn(), error: jest.fn(), debugHttpClientError: jest.fn() };
            httpConfig = { method: 'post', url: '/example', data: payload };
            exampleClient = ExampleClient({ httpClient, logger, config });
        });

        it('Should call the http client and return an error', async () => {
            const response = await exampleClient.sendPayload(payload);

            expect(post).toHaveBeenCalledWith(httpConfig);
            expect(logger.info).not.toHaveBeenCalled();
            expect(logger.error).toHaveBeenCalledWith('Http request error when calling Example Client to send payload');
            expect(logger.debugHttpClientError).toHaveBeenCalledWith(error);
            expect(response).toEqual({ error });
        });
    });
});
