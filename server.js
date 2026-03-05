const express = require("express");
const app = express();
const database = require('./data/database');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
require('dotenv').config();

const port = process.env.PORT || 3000;

// CORS Middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const isProduction = process.env.NODE_ENV === 'production';
const renderUrl = 'https://cse431-contacts-8utb.onrender.com';


const swaggerOptions = {
    swaggerOptions: {
        url: '/swagger.json', 
        servers: [
            {
                url: isProduction ? renderUrl : 'http://localhost:3000',
                description: isProduction ? 'Servidor de producción' : 'Servidor local'
            },
            {
                url: 'http://localhost:3000',
                description: 'Servidor local (alternativo)'
            },
            {
                url: renderUrl,
                description: 'Servidor de producción en Render'
            }
        ]
    }
};

app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerDocument);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(null, swaggerOptions));


app.use('/', require('./routes'));

database.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Database connected and App is running on port ${port}`);
            console.log(`Swagger docs: http://localhost:${port}/api-docs`);
            if (isProduction) {
                console.log(`Swagger docs (producción): ${renderUrl}/api-docs`);
            }
        });
    }
});