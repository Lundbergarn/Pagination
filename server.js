// https://evdokimovm.github.io/javascript/nodejs/mongodb/pagination/expressjs/ejs/bootstrap/2017/08/20/create-pagination-with-nodejs-mongodb-express-and-ejs-step-by-step-from-scratch.html

const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const mainRoutes = require('./routes/main');

const app =  express();

mongoose.connect('mongodb://localhost:27017/article', {useNewUrlParser: true, useUnifiedTopology: true })
    .then(console.log('Connected to MongoDB'))    
    .catch(error => handleError(error));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use(mainRoutes);

app.listen(8080, () => {
    console.log('Listening on port ' + 8080);
});

