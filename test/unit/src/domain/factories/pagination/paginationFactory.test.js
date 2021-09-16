const paginationEnum = require('src/domain/enum/pagination/paginationEnum')();
const paginationFactory = require('src/domain/factories/pagination/paginationFactory')({ paginationEnum });

describe('domain :: factories :: pagination :: paginationFactory', () => {
    describe('#buildResult', () => {
        it('Should be successfully called', async () => {
            const data = { page: 1, pages: 10 };
            const expected = { pagination: ['**1**', '2', '3', '4', '5', '...'] };
            const response = paginationFactory.buildResult(data);

            expect(response).toEqual(expected);
        });

        it('Should be successfully called', async () => {
            const data = { page: 10, pages: 10 };
            const expected = { pagination: ['...', '6', '7', '8', '9', '**10**'] };
            const response = paginationFactory.buildResult(data);

            expect(response).toEqual(expected);
        });
    });
});
