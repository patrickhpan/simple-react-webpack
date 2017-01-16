const express = require('express');

const helloWorld = require('./routes/helloWorld');

let app = express.Router();
app.use('/helloworld', helloWorld);

module.exports = app;
