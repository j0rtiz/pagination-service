const Enum = require('src/domain/enum/pagination/paginationEnum')();

describe('domain :: enum :: pagination :: paginationEnum', () => {
    describe('#keys', () => {
        it('Should return the enum keys', () => {
            const keys = Enum.keys();
            const data = ['OFFSET', 'LIMIT'];

            expect(keys.length).toEqual(2);
            expect(keys).toEqual(data);
        });
    });

    describe('#values', () => {
        it('Should return the enum values', () => {
            const values = Enum.values();
            const data = [2, 5];

            expect(values.length).toEqual(2);
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
