const PORT = (process.env.PORT || 8080)

var express = require('express');
var body_parser = require('body-parser');
var serveStatic = require('serve-static');

var app = express();

app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json())
app.use(serveStatic('build'))

app.listen(PORT, function() {
    console.log("Now listening on port " + PORT + " :)");
}) 