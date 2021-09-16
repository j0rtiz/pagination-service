const Enum = require('src/domain/enum/global/enum');

module.exports = () =>
    Enum({
        BUSINESS: 'business',
        CONTRACT: 'contract',
        DATABASE: 'database',
        NOT_FOUND: 'notFound',
        OPERATION: 'operation',
        INTEGRATION: 'integration'
    });
