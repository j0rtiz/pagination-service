const Enum = require('src/domain/enum/example/exampleEnum')();

describe('domain :: enum :: example :: exampleEnum', () => {
    describe('#keys', () => {
        it('Should return the enum keys', () => {
            const keys = Enum.keys();
            const data = ['EXAMPLE'];

            expect(keys.length).toEqual(1);
            expect(keys).toEqual(data);
        });
    });

    describe('#values', () => {
        it('Should return the enum values', () => {
            const values = Enum.values();
            const data = ['example'];

            expect(values.length).toEqual(1);
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
