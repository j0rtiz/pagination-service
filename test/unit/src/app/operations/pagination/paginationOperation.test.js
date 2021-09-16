const PaginationOperation = require('src/app/operations/pagination/paginationOperation');

describe('app :: operations :: pagination :: paginationOperation', () => {
    describe('#execute', () => {
        let paginationService, paginationOperation;
        const expected = { pagination: [] };

        beforeEach(() => {
            paginationService = { execute: jest.fn().mockReturnValue(expected) };
            paginationOperation = PaginationOperation({ paginationService });
        });

        it('Should be successfully called', async () => {
            const data = { page: 1, pages: 10 };
            const response = await paginationOperation.execute(data);

            expect(paginationService.execute).toHaveBeenCalledWith(data);
            expect(response).toEqual(expected);
        });
    });
});
