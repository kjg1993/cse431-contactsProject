const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Contacts API',
        description: 'API para la gestión de contactos',
        version: '1.0.0',
    },
    host: 'localhost:3000',  
    schemes: ['http', 'https'],
    basePath: '/',
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Development local server'
        },
        {
            url: 'https://cse431-contacts-8utb.onrender.com',
            description: 'SProduction server on render'
        }
    ],
    definitions: {
        Contact: {
            firstName: 'John',
            lastName: 'Smith',
            email: 'jn.smith@test.com',
            favoriteColor: 'Blue',
            birthday: '1990-05-15'
        },
        Error: {
            message: 'Error message',
            code: 500
        }
    }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js', './routes/contacts.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    console.log('Swagger documentation generated successfully');
});