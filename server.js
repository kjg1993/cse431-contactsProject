const express = require("express");
const app = express();
const database = require('./data/database');  // Cambia 'mongodb' por 'database'
require('dotenv').config();

const port = process.env.PORT || 3001;

app.use('/', require('./routes'));

// Usa database.initDb en lugar de mongodb.initDb
database.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Database connected and App is running on port ${port}`);
        });
    }
});