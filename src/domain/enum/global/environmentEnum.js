const Enum = require('src/domain/enum/global/enum');

module.exports = () =>
    Enum({
        DEVELOP: 'develop',
        HOMOLOG: 'homolog',
        PRODUCTION: 'production'
    });
