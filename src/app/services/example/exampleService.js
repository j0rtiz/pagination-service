/**
 * @param {Object} ctx - Dependency Injection
 * @param {import('src/domain/factories/example/exampleFactory')} ctx.exampleFactory
 * @param {import('src/infra/integration/rest/exampleClient')} ctx.exampleClient
 * @param {import('src/infra/error/exception')} ctx.exception
 */
module.exports = ({ exampleFactory, exampleClient, exception }) => ({
    execute: async ({ example }) => {
        const payload = await exampleFactory.buildPayload({ example });
        const { error, data } = await exampleClient.sendPayload(payload);

        if (error) {
            throw exception.integration('Example Client error sending payload');
        }

        return data;
    }
});
