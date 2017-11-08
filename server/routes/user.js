const express = require('express');
const userAPI = require('../apis/user');

let router = express.Router();

router.get('/login', (req, res) => {
    res.json(userAPI.login());
});

module.exports = router;