const express = require('express');
const userAPI = require('../apis/user');

let router = express.Router();

router.get('/login', (req, res) => {
    userAPI.login()
        .then(data => {
            setTimeout(() => {
                res.json(data)
            }, 1000)
        })
});

router.get('/login/broken', (req, res) => {
    setTimeout(() => {
        res.status(500).end()
    }, 1000)
});

module.exports = router;