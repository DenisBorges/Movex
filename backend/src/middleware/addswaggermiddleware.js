const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerDefinition = require('./config/swagger.json');
const swaggerSpec = swaggerJsDoc(swaggerDefinition);


module.exports = {
    route: '/',
    server: swaggerUi.serve,
    setup: swaggerUi.setup(swaggerSpec)
}