// Load environment variables
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const express = require('express');
const chokidar = require('chokidar');
const path = require('path')
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
        return Promise.resolve()
    } catch (e) {
        serverLoadError = e.toString();
        server = null;
        return Promise.reject(serverLoadError)
    }
};

// Listen for change in server
const serverWatch = chokidar.watch('./server/**/*.*');
serverWatch.on('ready', () => {
    // Load the server for the first time
    loadServer();

    // Reload the server on any change
    serverWatch.on('all', (type, path) => {
        console.log(path + " was changed")
        // Fully re-require server
        if (server !== null) {
            emptyCache(server.context);
        }
        loadServer()
            .then(() => {
                console.log("Reloaded server!")
            })
            .catch(e => {
                console.error("Failed to reload server: " + e.toString())
            })
            
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
    noInfo: true,
    reporter: info => {
        const { stats } = info;
        if (!stats) { 
            return;
        }
        const { compilation, startTime, endTime } = stats;
        require('fs').writeFileSync(`${+new Date}.webpack.log`, require('util').inspect(compilation), 'utf8')
        const { errors, hash, compiler } = compilation;
        const shortHash = hash.slice(0, 6);
        const duration = endTime - startTime;
        const { fileTimestamps } = compilation;
        const changedFiles = Object.entries(fileTimestamps)
            .filter(([fname, ts]) => (ts > startTime))
            .map(([fname]) => path.relative(compiler.options.entry[compiler.options.entry.length - 1] + "/..", fname))
        console.log(...changedFiles, " was changed");
        if (errors.length === 0) {
            console.log(`Webpack built ${shortHash} in ${duration} ms.`)
        } else {
            console.log(`Webpack built ${shortHash} in ${duration} ms with errors:`) 
            errors.forEach(e => {
                console.error(e.toString().split('\n')[0])
            })
        }
    } 
}));
app.use(webpackHotMiddleware(compiler, {
    log: false,
}));

// Set app to listen on specified port
app.listen(PORT, function() {
    console.log("Now listening on port " + PORT + " :)");
});
