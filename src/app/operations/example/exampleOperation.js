/**
 * @param {Object} ctx - Dependency Injection
 * @param {import('src/app/services/example/exampleService')} ctx.exampleService
 */
module.exports = ({ exampleService }) => ({
    execute: async (data) => {
        const response = await exampleService.execute(data);

        return response;
    }
});
