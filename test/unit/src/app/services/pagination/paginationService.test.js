const PaginationService = require('src/app/services/pagination/paginationService');

describe('app :: services :: pagination :: paginationService', () => {
    describe('#execute', () => {
        let paginationFactory, paginationService;
        const expected = { pagination: [] };

        beforeEach(() => {
            paginationFactory = { buildResult: jest.fn().mockReturnValue(expected) };
            paginationService = PaginationService({ paginationFactory });
        });

        it('Should be successfully called', async () => {
            const data = { page: 1, pages: 10 };
            const response = await paginationService.execute(data);

            expect(paginationFactory.buildResult).toHaveBeenCalledWith(data);
            expect(response).toEqual(expected);
        });
    });
});
