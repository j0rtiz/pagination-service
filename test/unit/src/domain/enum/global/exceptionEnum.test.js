const Enum = require('src/domain/enum/global/exceptionEnum')();

describe('domain :: enum :: global :: exceptionEnum', () => {
    describe('#keys', () => {
        it('Should return the enum keys', () => {
            const keys = Enum.keys();
            const data = ['BUSINESS', 'CONTRACT', 'DATABASE', 'NOT_FOUND', 'OPERATION', 'INTEGRATION'];

            expect(keys.length).toEqual(6);
            expect(keys).toEqual(data);
        });
    });

    describe('#values', () => {
        it('Should return the enum values', () => {
            const values = Enum.values();
            const data = ['business', 'contract', 'database', 'notFound', 'operation', 'integration'];

            expect(values.length).toEqual(6);
            expect(values).toEqual(data);
        });
    });

    describe('#key', () => {
        it('Should return the enum key', () => {
            const keys = Enum.keys();
            const values = Enum.values();

            values.forEach((value, index) => {
                const key = Enum.key(value);
                const data = keys[index];

                expect(key).toEqual(data);
            });
        });
    });
});
