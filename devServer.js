const PORT = (process.env.PORT || 9000)

var express = require('express');
var body_parser = require('body-parser');

var app = express();

app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json())

var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack/webpack.config.js');
var compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
    stats: {
        colors: true
    }
}));

app.use(webpackHotMiddleware(compiler, {
    log: console.log
}));

app.listen(PORT, function() {
    console.log("Now listening on port " + PORT + " :)");
});