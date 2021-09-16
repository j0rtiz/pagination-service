const ExampleStrategy = require('src/app/strategies/example/exampleStrategy');
const exampleEnum = require('src/domain/enum/example/exampleEnum')();

describe('app :: strategies :: example :: exampleStrategy', () => {
    let exampleOperation, exampleStrategy;

    beforeEach(() => {
        exampleOperation = { execute: jest.fn().mockName('exampleOperation') };
        exampleStrategy = ExampleStrategy({ exampleOperation, exampleEnum });
    });

    describe(`#${exampleEnum.EXAMPLE}`, () => {
        it('Should be successfully called and return exampleOperation', () => {
            const origin = exampleEnum.EXAMPLE;
            const operation = exampleStrategy[origin];

            expect(operation.getMockName()).toEqual('exampleOperation');
            expect(operation).toEqual(exampleOperation.execute);
        });
    });
});
