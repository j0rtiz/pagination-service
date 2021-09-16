const Enum = require('src/domain/enum/global/environmentEnum')();

describe('domain :: enum :: global :: environmentEnum', () => {
    describe('#keys', () => {
        it('Should return the enum keys', () => {
            const keys = Enum.keys();
            const data = ['DEVELOP', 'HOMOLOG', 'PRODUCTION'];

            expect(keys.length).toEqual(3);
            expect(keys).toEqual(data);
        });
    });

    describe('#values', () => {
        it('Should return the enum values', () => {
            const values = Enum.values();
            const data = ['develop', 'homolog', 'production'];

            expect(values.length).toEqual(3);
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
