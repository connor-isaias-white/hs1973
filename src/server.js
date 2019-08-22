const express = require('express');
const http = require('http');
const formidable = require('formidable');
const fs = require('fs')
const busboy = require('connect-busboy');
var path = require('path');
const app = express();
app.use(express.json());
app.use(busboy());
app.use(express.static(path.join(__dirname, '../mods')));
app.use(express.urlencoded());

app.get('/', function(req, res) {
    res.sendfile("mcmods.html");
});

app.get('/upload', function(req, res) {
    res.sendfile("upload.html");
});
app.route('/uploadit')
    .post(function (req, res, next) {

        let fstream;
        req.pipe(req.busboy);
        console.log("hi");
        req.busboy.on('file', function (fieldname, file, filename) {
            console.log("hello");
            console.log("Uploading: " + filename);

            //Path where image will be uploaded
            fstream = fs.createWriteStream(__dirname + '../mods/' + filename);
            file.pipe(fstream);
            fstream.on('close', function () {
                console.log("Upload Finished of " + filename);
                res.redirect('/');
            });
        });
    });

app.listen(3000, function() {
    console.log('listening on port 3000');
});
