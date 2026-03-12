const express = require("express");
const bodyParser = require('body-parser'); 
const cors = require('cors');
const app = express();
const database = require('./data/database');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();

const port = process.env.PORT || 3000;

const isRender = process.env.RENDER === 'true' || 
                 process.env.RENDER_SERVICE_NAME || 
                 (process.env.HOSTNAME && process.env.HOSTNAME.includes('render'));

const isProduction = isRender || process.env.NODE_ENV === 'production';

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json()); 

const getSwaggerDocument = () => {

    delete require.cache[require.resolve('./swagger.json')];
    const swaggerDocument = require('./swagger.json');
    
    if (isProduction && isRender) {
        swaggerDocument.host = 'cse431-contacts-8utb.onrender.com';
        swaggerDocument.schemes = ['https'];
    } else {
        swaggerDocument.host = `localhost:${port}`;
        swaggerDocument.schemes = ['http'];
    }
    
    swaggerDocument.basePath = '/';
    
    console.log('Swagger host configurado:', swaggerDocument.host);
    return swaggerDocument;
};

const swaggerOptions = {
    explorer: true,
    swaggerOptions: {
        url: '/swagger.json',
        validatorUrl: null
    }
};

app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(getSwaggerDocument());
});


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(null, swaggerOptions));

app.use('/', require('./routes'));

database.initDb((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
    } else {
        app.listen(port, () => {
             console.log(`Database connected and App is running on port ${port}`);
            console.log(`Swagger UI: http://localhost:${port}/api-docs`);
        });
    }
});