const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Contacts API',
        description: 'API para la gestión de contactos',
        version: '1.0.0',
    },
    host: process.env.NODE_ENV === 'production' 
        ? 'cse431-contacts-8utb.onrender.com'
        : 'localhost:3000',
    schemes: process.env.NODE_ENV === 'production' ? ['https'] : ['http'],
    basePath: '/',
    definitions: {
        Contact: {
            firstName: 'Juan',
            lastName: 'Perez',
            email: 'juan.perez@test.com',
            favoriteColor: 'Azul',
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
    console.log('✅ Swagger documentation generated successfully');
});