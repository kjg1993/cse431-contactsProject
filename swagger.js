const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'API para la gestión de contactos de la Semana 01 y 02',
  },
  host: 'localhost:3000',
  schemes: ['http'],
  // Definimos la estructura del objeto para que aparezca en la documentación
  definitions: {
    Contact: {
      firstName: 'Juan',
      lastName: 'Perez',
      email: 'juan.perez@test.com',
      favoriteColor: 'Azul',
      birthday: '1990-05-15'
    }
  }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);