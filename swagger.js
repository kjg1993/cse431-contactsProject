const swaggerAutogen = require('swagger-autogen')();

const isProduction = process.env.NODE_ENV === 'production';

const doc = {
  info: {
    title: 'Contacts API',
    description: 'API para la gestión de contactos',
    version: '1.0.0',
  },
  host: isProduction 
    ? 'cse431-contacts-8utb.onrender.com' 
    : 'localhost:3000',
  schemes: isProduction ? ['https'] : ['http'],
  basePath: '/',
  definitions: {
    Contact: {
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@test.com',
      favoriteColor: 'Blue',
      birthday: '1990-05-15'
    },
    ContactResponse: {
      _id: '507f1f77bcf86cd799439011',
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@test.com',
      favoriteColor: 'Blue',
      birthday: '1990-05-15'
    }
  }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js']; 

swaggerAutogen(outputFile, endpointsFiles, doc);