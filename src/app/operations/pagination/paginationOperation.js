/**
 * @param {Object} ctx - Dependency Injection
 * @param {import('src/app/services/pagination/paginationService')} ctx.paginationService
 */
module.exports = ({ paginationService }) => ({
    execute: async (data) => {
        const response = await paginationService.execute(data);

        return response;
    }
});
