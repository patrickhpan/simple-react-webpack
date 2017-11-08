const express = require('express');

const user = require('./routes/user');

let app = express.Router();
app.use('/user', user);

module.exports = app;