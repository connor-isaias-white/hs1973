const express = require('express');
const http = require('http');
const formidable = require('formidable');
var fs = require('fs');
const app = express();

app.get('/', function(req, res) {
    res.sendfile("mcmods.html");
});

app.listen(3000, function() {
    console.log('listening on port 3000');
});
