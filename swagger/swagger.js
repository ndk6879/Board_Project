const swaggerUi = require('swagger-ui-express');
const swaggereJsdoc = require('swagger-jsdoc');

const options = {
    swaggerDefinition: {
        info: {
            title: "Donggyun's API",
            version: '1.0.0',
            description: 'Donggyun is testing Test API with express',
        },
        host: 'localhost:3300',
        basePath: '/'
    },
    apis: ["./routers/*.js", "./routers/user/*.js"], //Swagger 파일 연동
};

const specs = swaggereJsdoc(options);

module.exports = {
    swaggerUi,
    specs
};