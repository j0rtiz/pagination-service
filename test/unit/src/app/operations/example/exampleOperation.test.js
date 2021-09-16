const ExampleOperation = require('src/app/operations/example/exampleOperation');

describe('app :: operations :: example :: exampleOperation', () => {
    describe('#execute', () => {
        let exampleService, exampleOperation;

        beforeEach(() => {
            exampleService = { execute: jest.fn().mockReturnValue({}) };
            exampleOperation = ExampleOperation({ exampleService });
        });

        it('Should be successfully called', async () => {
            const data = {};
            const response = await exampleOperation.execute(data);

            expect(exampleService.execute).toHaveBeenCalledWith(data);
            expect(response).toEqual(data);
        });
    });
});
