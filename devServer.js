// Load environment variables
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const express = require('express');
const chokidar = require('chokidar');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const emptyCache = require('require-reload').emptyCache;

// Initialize express app
const app = express();

// Import webpack configuration
const config = require('./webpack/webpack.config.js');
const compiler = webpack(config);

// Server starts initially unloaded
let server = null;
let serverLoadError = "Server is not yet loaded.";

// Attempt to load the server, setting error appropriately if it fails
const loadServer = () => {
    try {
        server = require('./server/entry');
        serverLoadError = null;
        console.log("Successfully loaded server!");
    } catch (e) {
        serverLoadError = e.toString();
        console.error("Error loading server: " + serverLoadError);
        server = null;
    }
};

// Listen for change in server
const serverWatch = chokidar.watch('./server/**/*.*');
serverWatch.on('ready', () => {
    // Load the server for the first time
    loadServer();

    // Reload the server on any change
    serverWatch.on('all', () => {
        console.log("Reloading server");
        // Fully re-require server
        if (server !== null) {
            emptyCache(server.context);
        }
        loadServer();
    });
});

// Handle server requests
app.use((req, res, next) => {
    // If there is an error, send the error on any request
    if (serverLoadError !== null) {
        return res.status(500).end("Server load error: " + serverLoadError);
    }
    
    server(req, res, next);
});

// Add webpack middlewares
app.use(webpackDevMiddleware(compiler, {
    stats: {
        colors: true,
        hash: false,
        chunks: false,
    }
}));
app.use(webpackHotMiddleware(compiler, {
    log: console.log,
}));

// Set app to listen on specified port
app.listen(PORT, function() {
    console.log("Now listening on port " + PORT + " :)");
});
