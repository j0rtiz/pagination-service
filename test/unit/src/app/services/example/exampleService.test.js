const ExampleService = require('src/app/services/example/exampleService');

describe('app :: services :: example :: exampleService', () => {
    const data = { example: 'test' };
    const payload = [data.example];
    const error = new Error('Example Client error sending payload');

    describe('#execute', () => {
        let exampleFactory, exampleClient, exception, exampleService;

        beforeEach(() => {
            exampleFactory = { buildPayload: jest.fn().mockReturnValue(payload) };
            exampleClient = { sendPayload: jest.fn().mockReturnValue({ data }) };
            exception = { integration: jest.fn() };
            exampleService = ExampleService({ exampleFactory, exampleClient, exception });
        });

        it('Should be successfully called', async () => {
            const response = await exampleService.execute(data);

            expect(exampleFactory.buildPayload).toHaveBeenCalledWith(data);
            expect(exampleClient.sendPayload).toHaveBeenCalledWith(payload);
            expect(exception.integration).not.toHaveBeenCalled();
            expect(response).toEqual(data);
        });
    });

    describe('#execute', () => {
        let exampleFactory, exampleClient, exception, exampleService;

        beforeEach(() => {
            exampleFactory = { buildPayload: jest.fn().mockReturnValue(payload) };
            exampleClient = { sendPayload: jest.fn().mockReturnValue({ error }) };
            exception = {
                integration: jest.fn().mockImplementation(() => {
                    throw error;
                })
            };
            exampleService = ExampleService({ exampleFactory, exampleClient, exception });
        });

        it('Should be called and return an error', async () => {
            try {
                expect(await exampleService.execute(data)).toThrowError();
            } catch (err) {
                expect(exampleFactory.buildPayload).toHaveBeenCalledWith(data);
                expect(exampleClient.sendPayload).toHaveBeenCalledWith(payload);
                expect(exception.integration).toHaveBeenCalledWith(error.message);
                expect(err).toEqual(error);
            }
        });
    });
});
