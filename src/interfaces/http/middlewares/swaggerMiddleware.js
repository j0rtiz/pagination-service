const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('src/interfaces/http/swagger/swagger.json');

module.exports = () => [swaggerUi.serve, swaggerUi.setup(swaggerDocument)];
