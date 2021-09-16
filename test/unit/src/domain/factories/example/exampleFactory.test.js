const exampleFactory = require('src/domain/factories/example/exampleFactory')();

describe('domain :: factories :: example :: exampleFactory', () => {
    describe('#buildPayload', () => {
        const data = { example: 'test' };
        const payload = [data.example];

        it('Should be successfully called', async () => {
            const response = exampleFactory.buildPayload(data);

            expect(response).toEqual(payload);
        });
    });
});
