const SqsClient = require('src/infra/integration/queue/sqsClient');
const { SQS } = require('aws-sdk');

jest.mock('aws-sdk');

describe('infra :: integration :: queue :: sqsClient', () => {
    const config = { integration: { queues: { aws: { region: 'region', apiVersion: 'apiVersion' } } } };
    const message = 'test';

    describe('#getSqs', () => {
        let logger, sqsClient;

        beforeEach(() => {
            sqsClient = SqsClient({ logger, config });
        });

        it('Should be successfully called and return an SQS instance', async () => {
            const response = await sqsClient.getSqs();

            expect(response).toBeInstanceOf(SQS);
        });
    });

    describe('#send', () => {
        let sendMessage, logger, sqsClient;
        const data = { MessageId: 'abc-123' };

        beforeEach(() => {
            sendMessage = jest.fn().mockReturnThis();
            promise = jest.fn().mockReturnValue(data);
            logger = { info: jest.fn(), error: jest.fn(), debugHttpClientError: jest.fn() };
            SQS.mockImplementation(() => ({ sendMessage, promise }));
            sqsClient = SqsClient({ logger, config });
        });

        it('Should be successfully called and send a message to SQS', async () => {
            const response = await sqsClient.send(message);

            expect(sendMessage).toHaveBeenCalledWith({ MessageBody: JSON.stringify(message) });
            expect(promise).toHaveBeenCalledTimes(1);
            expect(logger.info).toHaveBeenCalledWith('Information sent to SQS');
            expect(logger.error).not.toHaveBeenCalled();
            expect(logger.debugHttpClientError).not.toHaveBeenCalled();
            expect(response).toEqual({ data });
        });
    });

    describe('#send', () => {
        let sendMessage, logger, sqsClient;
        const error = new Error('SQS Error');

        beforeEach(() => {
            sendMessage = jest.fn().mockReturnThis();
            promise = jest.fn().mockImplementation(() => {
                throw error;
            });
            logger = { info: jest.fn(), error: jest.fn(), debugHttpClientError: jest.fn() };
            SQS.mockImplementation(() => ({ sendMessage, promise }));
            sqsClient = SqsClient({ logger, config });
        });

        it('Should be called and throw an error', async () => {
            try {
                expect(await sqsClient.send(message)).toThrowError();
            } catch {
                expect(sendMessage).toHaveBeenCalledWith({ MessageBody: JSON.stringify(message) });
                expect(promise).toHaveBeenCalledTimes(1);
                expect(logger.info).not.toHaveBeenCalled();
                expect(logger.error).toHaveBeenCalledWith('SQS error when calling SQS Client to send message');
                expect(logger.debugHttpClientError).toHaveBeenCalledWith(error);
            }
        });
    });
});
