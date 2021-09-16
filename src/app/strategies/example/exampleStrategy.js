/**
 * @param {Object} ctx - Dependency Injection
 * @param {import('src/app/operations/example/exampleOperation')} ctx.exampleOperation
 * @param {import('src/domain/enum/example/exampleEnum')} ctx.exampleEnum
 */
module.exports = ({ exampleOperation, exampleEnum }) => ({
    [exampleEnum.EXAMPLE]: exampleOperation.execute
});
