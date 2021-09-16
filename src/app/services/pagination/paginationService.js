/**
 * @param {Object} ctx - Dependency Injection
 * @param {import('src/domain/factories/pagination/paginationFactory')} ctx.paginationFactory
 */
module.exports = ({ paginationFactory }) => ({
    execute: async (data) => {
        const result = await paginationFactory.buildResult(data);

        return result;
    }
});
