const express = require('express');
const helloWorldAPI = require('../apis/helloWorld');

let router = express.Router();

router.get('/', (req, res) => {
    res.end(`hello ${helloWorldAPI.getString()}`);
})

module.exports = router;